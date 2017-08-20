import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject'

export class Texture extends GraphicsObject {
    _minFilter = CGE.LINEAR;
    _magFilter = CGE.LINEAR;
    _format = CGE.RGB;
    _internalformat = CGE.RGB;
    _type = CGE.UNSIGNED_BYTE;
    _mipmap = false;
    _needMipmap = false;

    constructor() {
        super();
    }

    setFilter(min, mag) {
        this._minFilter = min || CGE.LINEAR;
        this._magFilter = mag || CGE.LINEAR;
    }

    getMinFilter() {
        return this._minFilter;
    }

    getMagFilter() {
        return this._magFilter;
    }

    setFormat(src, internal) {
        this._format = src || CGE.RGB;
        this._internalformat = internal || src || CGE.RGB;
    }

    getFormat() {
        return this._format;
    }

    getInternalformat() {
        return this._internalformat;
    }

    setType(type) {
        this._type = type;
    }

    getType() {
        return this._type;
    }

    setMipmap(value:boolean) {
        this._needMipmap = value;
    }

    getMipmap() {
        return this._needMipmap;
    }
}
