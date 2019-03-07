import { glObject } from './glObject';
import { glDraw, glDrawWithIndex } from './glDraw';
import { Geometry } from '../../graphics/Geometry';
import { glBuffer } from './glBuffer'; 
import { glProgram } from './glProgram';

export class glGeometry extends glObject {

    private static _curr: glGeometry;

    protected _vbuffers: glBuffer[] = [];
    protected _ibuffer: glBuffer = null;

    protected _draw: glDraw = null;

    constructor() {
        super();
    }

    public bindVbo(gl: WebGLRenderingContext, glProgram: glProgram, geometry: Geometry) {
        if (glGeometry._curr === this) {
            return;
        }
        glGeometry._curr = this;

        let glGeo: glGeometry = this;
        let vbuffers = glGeo.getvBuffers();
        let buffers = geometry.getBuffers();

        let length = buffers.length;
        for (let i = 0; i < length; i++) {
            let buffer = buffers[i];
            let binded = false
            let attributes = buffer.getAttributes();
            attributes.forEach( attribute => {
                let location = glProgram.getAttribLocation(attribute.attribType);
                if (location === undefined || location === -1) {
                    return;
                } else {
                    if (!binded) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, vbuffers[i].getNativeBuffer());
                        binded = true;
                    }
                }
                gl.vertexAttribPointer(location, attribute.num, attribute.type, false, buffer.getStride(), attribute.offset);
            })
        }

        glGeo.bindIbo(gl);

        return this;
    }

    public generateFromGeometry(gl: WebGLRenderingContext, geometry: Geometry) {
        let buffers = geometry.getBuffers();
        let indexBuffer = geometry.getIndexBuffer();
        let drawParameter = geometry.getDrawParameter();

        if (buffers.length === 0) {
            return undefined;
        }
        
        let vbuffers = this._vbuffers;

        vbuffers.length = buffers.length;

        buffers.forEach((buffer, index) => {
            let vbuffer = new glBuffer();
            vbuffer.generateFromBuffer(gl, buffer);
            vbuffers[index] = vbuffer;
        });

        if (indexBuffer) {
            let ibuffer = new glBuffer();
            ibuffer.generateFromBuffer(gl, indexBuffer);
            this._ibuffer = ibuffer;
            this._draw = new glDrawWithIndex(drawParameter.mode, drawParameter.offset, drawParameter.count, indexBuffer.getType());
        } else {
            this._draw = new glDraw(drawParameter.mode, drawParameter.offset, drawParameter.count, 0);
        }

        this.updated();
        return this;
    }

    public bindIbo(gl: WebGLRenderingContext) {
        if (this._ibuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibuffer.getNativeBuffer());
        }
    }

    public getvBuffers() {
        return this._vbuffers;
    }

    public getiBuffer() {
        return this._ibuffer;
    }

    public getDraw() {
        return this._draw;
    }

    public draw(gl) {
        this._draw.apply(gl);
    }

    public drawOther(draw: glDraw, gl: WebGLRenderingContext) {
        draw.apply(gl);
    }
}
