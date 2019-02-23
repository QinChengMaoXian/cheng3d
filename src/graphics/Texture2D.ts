import * as CGE from './RendererParameter';
import { Texture } from './Texture';
import { Loader } from '../io/Loader';
import { BuildOrderedDitheringData } from '../util/Util';

export class Texture2D extends Texture {
    private static _gen1pxColorTexture2D(color: number[]) {
        let tex = new Texture2D();
        tex.setFormat(CGE.RGBA, CGE.RGBA);
        tex.setDataType(CGE.UNSIGNED_BYTE);
        tex.setData(1, 1, new Uint8Array(color));
        return tex;
    }

    private static _White: Texture2D;
    public static get White(): Texture2D {
        if (!Texture2D._White) {
            Texture2D._White = this._gen1pxColorTexture2D([255, 255, 255, 255]);
        }
        return Texture2D._White;
    }

    private static _Normal: Texture2D;
    public static get Normal(): Texture2D {
        if (!Texture2D._Normal) {
            Texture2D._Normal = this._gen1pxColorTexture2D([127, 127, 255, 255]);
        }
        return Texture2D._Normal;
    }

    private static _Black: Texture2D;
    public static get Black(): Texture2D {
        if (!Texture2D._Black) {
            Texture2D._Black = this._gen1pxColorTexture2D([0, 0, 0, 255]);
        }
        return Texture2D._Black;
    }

    private static _BrdfLUT: Texture2D;
    public static get BrdfLUT(): Texture2D {
        if (!Texture2D._BrdfLUT) {
            let tex = new Texture2D();
            tex.setImageUrl('./resources/envLUT.png', Texture2D.White);
            Texture2D._BrdfLUT = tex;
        }
        return Texture2D._BrdfLUT;
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
    protected _loaded = true;
    public _def: Texture2D;

    constructor() {
        super();
    }

    public setImageUrl(url:string, def: Texture2D = Texture2D.White) {
        this._url = url;
        this._loaded = false;
        this._def = def;

        Loader.loadImage(url).then((img: HTMLImageElement) => {
            this._data = img;
            this._width = img.width;
            this._height = img.height;
            this.needsUpdate();
            this._loaded = true;
            this._def = null;
            return img;
        });
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

    public get loaded() {
        return this._loaded;
    }

    public getUrl(): string {
        return this._url;
    }

    public getType() {
        return Texture.TEXTURE2D;
    }
}
