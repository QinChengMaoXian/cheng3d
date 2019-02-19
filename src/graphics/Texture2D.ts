import * as CGE from './RendererParameter';
import { Texture } from './Texture';
import { Loader } from '../io/Loader';
import { BuildOrderedDitheringData } from '../util/Util';

export class Texture2D extends Texture {
    private static _White: Texture2D;
    public static get White(): Texture2D {
        if (!Texture2D._White) {
            let tex = new Texture2D();
            tex.setFormat(CGE.RGBA, CGE.RGBA);
            tex.setDataType(CGE.UNSIGNED_BYTE);
            tex.setData(1, 1, new Uint8Array([255, 255, 255, 255]));
            Texture2D._White = tex;
        }
        return Texture2D._White;
    }

    private static _Normal: Texture2D;
    public static get Normal(): Texture2D {
        if (!Texture2D._Normal) {
            let tex = new Texture2D();
            tex.setFormat(CGE.RGBA, CGE.RGBA);
            tex.setDataType(CGE.UNSIGNED_BYTE);
            tex.setData(1, 1, new Uint8Array([127, 127, 255, 255]));
            Texture2D._Normal = tex;
        }
        return Texture2D._Normal;
    }

    private static _ODTex: Texture2D;
    public static get ODTex(): Texture2D {
        if (!Texture2D._ODTex) {
            let tex = new Texture2D();
            tex.setFormat(CGE.ALPHA, CGE.ALPHA);
            tex.setDataType(CGE.UNSIGNED_BYTE);
            tex.setData(16, 16, new Uint8Array(BuildOrderedDitheringData(4)));
            Texture2D._ODTex = tex;
        }
        return Texture2D._ODTex;
    }

    protected _wrapS: number = CGE.CLAMP_TO_EDGE;
    protected _wrapT: number = CGE.CLAMP_TO_EDGE;
    protected _data: Uint8Array | Float32Array | Uint16Array | HTMLImageElement;
    protected _url: string;
    protected _width = 0;
    protected _height = 0;

    constructor() {
        super();
    }

    public setImageUrl(url:string, image?: HTMLImageElement) {
        this._url = url;
        if (image) {
            this._data = image;
        } else {
            Loader.loadImage(url).then((img: HTMLImageElement) => {
                this._data = img;
                this._width = img.width;
                this._height = img.height;
                this.needsUpdate();
                return img;
            });     
        }
    }

    public setData(width: number, height: number, data: HTMLImageElement | Uint8Array | Float32Array | Uint16Array) {
        this._width = width;
        this._height = height;
        this._data = data;
    }

    public getImage() {
        return this._data;
    }

    public getData() {
        return this._data;
    }

    public getWidth() {
        return this._width;
    }

    public getHeight() {
        return this._height;
    }

    public setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }

    public getWrapS() {
        return this._wrapS;
    }

    public getWrapT() {
        return this._wrapT;
    }

    public setSize(width, height) {
        this._width = width;
        this._height = height;
        this.needsUpdate();
    }

    public getUrl(): string {
        return this._url;
    }

    public getType() {
        return Texture.TEXTURE2D;
    }
}
