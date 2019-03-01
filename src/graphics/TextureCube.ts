import * as CGE from './RendererParameter';
import { Texture } from './Texture'
import { Texture2D } from './Texture2D';

// 渲染到cude6个面的相机参数
// position          target             up
// [(0.0, 0.0, 0.0), (1.0,  0.0,  0.0), (0.0,  0.0,  1.0)],
// [(0.0, 0.0, 0.0), (-1.0, 0.0,  0.0), (0.0,  0.0,  1.0)],
// [(0.0, 0.0, 0.0), (0.0,  0.0, -1.0), (0.0,  1.0,  0.0)],
// [(0.0, 0.0, 0.0), (0.0,  0.0,  1.0), (0.0, -1.0,  0.0)],
// [(0.0, 0.0, 0.0), (0.0,  1.0,  0.0), (0.0,  0.0,  1.0)],
// [(0.0, 0.0, 0.0), (0.0, -1.0,  0.0), (0.0,  0.0,  1.0)]

export class TextureCube extends Texture {
    private static _gen1pxColorTextureCube(tex2d: Texture2D) {
        let tex = new TextureCube();
        tex.setFormat(CGE.RGBA, CGE.RGBA);
        tex.setDataType(CGE.UNSIGNED_BYTE);
        tex.setTexture2ds(tex2d, tex2d, tex2d, tex2d, tex2d, tex2d);
        return tex;
    }

    private static _White: TextureCube;
    public static get White(): TextureCube {
        if (!TextureCube._White) {
            TextureCube._White = TextureCube._gen1pxColorTextureCube(Texture2D.White);
        }
        return TextureCube._White;
    }

    private static _Black: TextureCube;
    public static get Black(): TextureCube {
        if (!TextureCube._Black) {
            TextureCube._Black = TextureCube._gen1pxColorTextureCube(Texture2D.Black);
        }
        return TextureCube._Black;
    }

    protected _wrapS = CGE.CLAMP_TO_EDGE;
    protected _wrapT = CGE.CLAMP_TO_EDGE;
    protected _wrapR = CGE.CLAMP_TO_EDGE;
    protected _texture2ds: Texture2D[] = [undefined, undefined, undefined, undefined, undefined, undefined];

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
