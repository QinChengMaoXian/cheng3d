import * as CGE from './rendererParameter.js';
import { Texture } from './texture.js'

export class Texture2D extends Texture {
    constructor() {
        super();
        Object.assign(this, {
            _wrapS: CGE.CLAMP_TO_EDGE,
            _wrapT: CGE.CLAMP_TO_EDGE,
            _img: undefined,
            _isLoad: false,
            _width: 0,
            _height: 0,
        });
    }

    setImageSrc(src) {
        this._isLoad = false;
        let img = new Image()
        img.onload = function() {
            this._isLoad = true;
            // TODO: try to add culling image size;
        }.bind(this);
        img.src = src;
        this._img = img;
    }

    getImage() {
        return this._img;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }

    getWrapS() {
        return this._wrapS;
    }

    getWrapT() {
        return this._wrapT;
    }

    isLoad() {
        return this._isLoad;
    }

    setSize(width, height) {
        this._width = width;
        this._height = height;
        this.needsUpdate();
    }
}
