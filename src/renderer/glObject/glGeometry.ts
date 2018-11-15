import { glObject } from './glObject';
import { glDraw, glDrawWithIndex } from './glDraw';
import { Geometry } from '../../graphics/Geometry';
import { glBuffer } from './glBuffer'; 

export class glGeometry extends glObject {
    // protected _vbos: WebGLBuffer[] = [];
    // protected _ibo: WebGLBuffer = null;

    protected _vbuffers: glBuffer[] = [];
    protected _ibuffer: glBuffer = null;

    protected _draw: glDraw = null;

    constructor() {
        super();
    }

    public generateFromGeometry(gl: WebGLRenderingContext, geometry: Geometry) {
        // let version = geometry.getUpdateVersion();
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

        this._update = false;
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
