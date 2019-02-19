import { glObject } from './glObject'
import { Texture } from '../../graphics/Texture';

export class glTexture extends glObject {
    protected _minFilter: number;
    protected _magFilter: number;
    protected _texture;

    constructor(gl: WebGLRenderingContext) {
        super();
        this._minFilter = gl.LINEAR;
        this._magFilter = gl.LINEAR;
    }

    public setFilter(min, mag) {
        this._minFilter = min;
        this._magFilter = mag;
    }

    public getHandler() {
        return this._texture;
    }
}
