
import { glObject } from './glObject';
import { Buffer } from '../../graphics/Buffer';

export class glBuffer extends glObject {
    protected _buffer: WebGLBuffer;
    protected _isIndex: boolean = false;
    
    constructor() {
        super();
    }

    public setData(gl: WebGLRenderingContext, target: number, data: any, usage: number) {
        let glbuffer = this._buffer;
        gl.bindBuffer(target, glbuffer);
        gl.bufferData(target, data, usage);
        gl.bindBuffer(target, null);
    }

    public generateFromBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
        let glbuffer = this._buffer;
        if (!glbuffer) {
            glbuffer = gl.createBuffer();
            this._buffer = glbuffer;
        }
        
        this._isIndex = buffer.isIndex();
        this.setData(gl, buffer.isIndex() ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER, 
            buffer.getData(), buffer.getUsage());

        return this;
    }

    public getNativeBuffer() {
        return this._buffer;
    }
}
