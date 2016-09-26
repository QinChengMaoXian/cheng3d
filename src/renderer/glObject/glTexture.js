import { glObject } from './glObject.js'

export class glTexture extends glObject {
    constructor(gl) {
        super();
        Object.assign(this, {
            _minFilter: gl.LINEAR,
            _magFilter: gl.LINEAR,
            _texture: undefined,
        });
    }

    setFilter(min, mag) {
        this._minFilter = min;
        this._magFilter = mag;
    }

    getHandler() {
        return this._texture;
    }
}
