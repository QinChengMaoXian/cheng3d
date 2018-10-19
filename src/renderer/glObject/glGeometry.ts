import { glObject } from './glObject';
import { glDraw, glDrawWithIndex } from './glDraw';
import { Geometry } from '../../graphics/Geometry';

export class glGeometry extends glObject {
    protected _vbos: WebGLBuffer[] = [];
    protected _ibo: WebGLBuffer = undefined;
    protected _draw: glDraw = undefined;

    constructor() {
        super();
    }

    private _createBufferFromData(gl: WebGLRenderingContext, target: number, data: any, usage: number) {
        let buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, usage);
        gl.bindBuffer(target, null);
        return buffer;
    }

    public generateFromGeometry(gl: WebGLRenderingContext, geometry: Geometry) {
        // let version = geometry.getUpdateVersion();
        let buffers = geometry.getBuffers();
        let indexBuffer = geometry.getIndexBuffer();
        let drawParameter = geometry.getDrawParameter();

        if (buffers.length === 0) {
            return undefined;
        }
        
        buffers.forEach( buffer => {
            let vbo = this._createBufferFromData(gl, gl.ARRAY_BUFFER, buffer.getData(), buffer.getUsage());
            this._vbos.push(vbo);
        });

        if (geometry.getIndexBuffer()) {
            this._ibo = this._createBufferFromData(gl, gl.ELEMENT_ARRAY_BUFFER, indexBuffer.getData(), indexBuffer.getUsage());
            this._draw = new glDrawWithIndex(drawParameter.mode, drawParameter.offset, drawParameter.count, indexBuffer.getType());
        } else {
            this._draw = new glDraw(drawParameter.mode, drawParameter.offset, drawParameter.count, 0);
        }
        
        // this.setLocalVersion(version);
        this._update = false;
        return this;
    }

    public bindIbo(gl: WebGLRenderingContext) {
        if (this._ibo) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        }
    }

    public getVbos() {
        return this._vbos;
    }

    public getIbo() {
        return this._ibo;
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
