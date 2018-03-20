import { glObject } from './glObject'

export class glTexture extends glObject {
    protected _minFilter: number | string;
    protected _magFilter: number | string;
    protected _texture: number | string;

    constructor(gl) {
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
