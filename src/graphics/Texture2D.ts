import * as CGE from './RendererParameter';
import { Texture } from './Texture'
import { Loader } from '../io/Loader'

export class Texture2D extends Texture {
    protected _wrapS: number = CGE.CLAMP_TO_EDGE;
    protected _wrapT: number = CGE.CLAMP_TO_EDGE;
    protected _data: Uint8Array | HTMLImageElement;
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

    getImage() {
        return this._data instanceof HTMLImageElement ? this._data : null;
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
