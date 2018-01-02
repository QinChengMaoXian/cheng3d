import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject'

export class Texture extends GraphicsObject {
    protected _minFilter: number = CGE.LINEAR;
    protected _magFilter: number = CGE.LINEAR;
    protected _format: number = CGE.RGB;
    protected _internalformat: number = CGE.RGB;
    protected _type: number = CGE.UNSIGNED_BYTE;
    protected _mipmap: boolean = false;
    protected _needMipmap: boolean = false;

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
