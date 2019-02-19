import * as CGE from './RendererParameter';
import { Texture } from './Texture'
import { Texture2D } from './Texture2D';

export class TextureCube extends Texture {
    private static _White: TextureCube;
    public static get White(): TextureCube {
        if (!TextureCube._White) {
            let tex = new TextureCube();
            tex.setFormat(CGE.RGBA, CGE.RGBA);
            tex.setDataType(CGE.UNSIGNED_BYTE);
            let white2d = Texture2D.White;
            tex.setTexture2ds(white2d, white2d, white2d, white2d, white2d, white2d);
            TextureCube._White = tex;
        }
        return TextureCube._White;
    }

    protected _wrapS = CGE.CLAMP_TO_EDGE;
    protected _wrapT = CGE.CLAMP_TO_EDGE;
    protected _wrapR = CGE.CLAMP_TO_EDGE;
    _texture2ds: Texture2D[] = [undefined, undefined, undefined, undefined, undefined, undefined];

    constructor() {
        super();
    }

    public setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }

    public setTexture2ds(positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ) {
        this._texture2ds[0] = positiveX || this._texture2ds[0];
        this._texture2ds[1] = negativeX || this._texture2ds[1];
        this._texture2ds[2] = positiveY || this._texture2ds[2];
        this._texture2ds[3] = negativeY || this._texture2ds[3];
        this._texture2ds[4] = positiveZ || this._texture2ds[4];
        this._texture2ds[5] = negativeZ || this._texture2ds[5];
    }

    public getTexture2ds(){
        return this._texture2ds;
    }

    public getWrapS() {
        return this._wrapS;
    }

    public getWrapT() {
        return this._wrapT;
    }

    public getWrapR() {
        return this._wrapR;
    }

    public getType() {
        return Texture.TEXTURECUBE;
    }
}