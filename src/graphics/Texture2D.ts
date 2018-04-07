import * as CGE from './RendererParameter';
import { Texture } from './Texture';
import { Loader } from '../io/Loader';
import { BuildOrderedDitheringData } from '../util/Util';

export class Texture2D extends Texture {
    private static _White: Texture2D;
    public static get White(): Texture2D {
        if (!Texture2D._White) {
            let tex = new Texture2D();
            tex.setFormat(CGE.RGB, CGE.RGB);
            tex.setType(CGE.UNSIGNED_SHORT_5_6_5);
            tex.setData(1, 1, new Uint16Array([65535]));
            Texture2D._White = tex;
        }
        return Texture2D._White;
    }

    private static _ODTex: Texture2D;
    public static get ODTex(): Texture2D {
        if (!Texture2D._ODTex) {
            let tex = new Texture2D();
            tex.setFormat(CGE.ALPHA, CGE.ALPHA);
            tex.setType(CGE.UNSIGNED_BYTE);
            tex.setData(16, 16, new Uint8Array(BuildOrderedDitheringData(4)));
            Texture2D._ODTex = tex;
        }
        return Texture2D._ODTex;
    }

    protected _wrapS: number = CGE.CLAMP_TO_EDGE;
    protected _wrapT: number = CGE.CLAMP_TO_EDGE;
    protected _data: Uint8Array | Float32Array | Uint16Array | HTMLImageElement;
    protected _isLoad = false;
    protected _url: string;
    protected _width = 0;
    protected _height = 0;

    constructor() {
        super();
    }

    public setImageUrl(url:string) {
        this._isLoad = false;
        this._url = url;
        let img = new Image()
        img.onload = () => {
            this._isLoad = true;
            this._width = img.width;
            this._height = img.height;
        };
        img.src = url;
        this._data = img;
    }

    public setData(width: number, height: number, data: Uint8Array | Float32Array | Uint16Array) {
        this._width = width;
        this._height = height;
        this._data = data;
    }

    getImage() {
        return this._data instanceof HTMLImageElement ? this._data : null;
    }

    getData() {
        return this._data;
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

    public getUrl(): string {
        return this._url;
    }
}
