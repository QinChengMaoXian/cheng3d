import * as CGE from './rendererParameter.js';
import { VersionObject } from '../core/versionObject.js'

export class Texture extends VersionObject {
    constructor() {
        super();
        Object.assign(this, {
            _minFilter: CGE.LINEAR,
            _magFilter: CGE.LINEAR,
            _format: CGE.RGB,
            _internalformat: CGE.RGB,
            _type: CGE.UNSIGNED_BYTE,
            _mipmap: false,
        });
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

    setMipmap(value) {
        this._needMipmap = value === true;
    }

    getMipmap() {
        return this._needMipmap;
    }
}
