import { glObject } from './glObject'

export class glTexture extends glObject {
    _minFilter;
    _magFilter;
    _texture;

    constructor(gl) {
        super();
        this._minFilter = gl.LINEAR;
        this._magFilter = gl.LINEAR;
    }

    setFilter(min, mag) {
        this._minFilter = min;
        this._magFilter = mag;
    }

    getHandler() {
        return this._texture;
    }
}
