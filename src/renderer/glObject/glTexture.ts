import { glObject } from './glObject'
import { Texture } from '../../graphics/Texture';

export class glTexture extends glObject {
    /** 纹理索引的cache */
    private static _texIdx: {[loc: number]: glTexture} = {};
    public static clear() {
        for(let key in glTexture._texIdx) {
            glTexture._texIdx[key] = null;
        }
    }

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

    public apply(gl, index) {
        // if (glTexture._texIdx[index] !== this) {
            this._apply(gl, index);
            // glTexture._texIdx[index] = this
        // }
    }

    protected _apply(gl, index) {

    }
}
