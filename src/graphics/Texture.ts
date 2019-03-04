import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject'

export class Texture extends GraphicsObject {
    public static readonly TEXTURE2D = 0;
    public static readonly TEXTURECUBE = 1;

    protected _minFilter: number = CGE.LINEAR;
    protected _magFilter: number = CGE.LINEAR;
    protected _format: number = CGE.RGB;
    protected _internalformat: number = CGE.RGB;
    protected _dataType: number = CGE.UNSIGNED_BYTE;
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

    public setDataType(type) {
        this._dataType = type;
    }

    public getDataType() {
        return this._dataType;
    }

    public setMipmap(value:boolean) {
        this._needMipmap = value;
    }

    public getMipmap() {
        return this._needMipmap;
    }

    public getType() {
        return -1;
    }

    public get isUrl() {
        return false;
    }
}
