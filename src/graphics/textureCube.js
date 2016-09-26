import * as CGE from './rendererParameter.js';
import { Texture } from './texture.js'

export class TextureCube extends Texture {
    constructor() {
        super();
        Object.assign(this, {
            _wrapS: CGE.CLAMP_TO_EDGE,
            _wrapT: CGE.CLAMP_TO_EDGE,
            _texture2ds: [undefined, undefined, undefined, undefined, undefined, undefined],
        });
    }

    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }

    setTexture2ds(positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ) {
        this._texture2ds[0] = positiveX || this._texture2ds[0];
        this._texture2ds[1] = negativeX || this._texture2ds[1];
        this._texture2ds[2] = positiveY || this._texture2ds[2];
        this._texture2ds[3] = negativeY || this._texture2ds[3];
        this._texture2ds[4] = positiveZ || this._texture2ds[4];
        this._texture2ds[5] = negativeZ || this._texture2ds[5];
    }

    getTexture2ds(){
        return this._texture2ds;
    }

    getWrapS() {
        return this._wrapS;
    }

    getWrapT() {
        return this._wrapT;
    }
}