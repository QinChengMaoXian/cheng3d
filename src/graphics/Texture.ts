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

    public setFilter(min, mag) {
        this._minFilter = min || CGE.LINEAR;
        this._magFilter = mag || CGE.LINEAR;
    }

    public getMinFilter() {
        return this._minFilter;
    }

    public getMagFilter() {
        return this._magFilter;
    }

    public setFormat(src, internal) {
        this._format = src || CGE.RGB;
        this._internalformat = internal || src || CGE.RGB;
    }

    public getFormat() {
        return this._format;
    }

    public getInternalformat() {
        return this._internalformat;
    }

    public setType(type) {
        this._type = type;
    }

    public getType() {
        return this._type;
    }

    public setMipmap(value:boolean) {
        this._needMipmap = value;
    }

    public getMipmap() {
        return this._needMipmap;
    }

    public isLoad() {
        return false;
    }
}
