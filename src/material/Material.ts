import { Base } from '../core/Base'
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { Loader } from '../io/Loader';
import { RGBA } from '../graphics/RendererParameter';
import { Shader } from '../graphics/Shader';
import * as CGE from '../graphics/RendererParameter';


export enum AlphaMode {
    None = 0,
    Test,
    Blend,
}

// export enum FaceMode {
//     Front,
//     Back,
//     Double,
//     None
// }

/**
 * 材质基类 
 */
export class Material extends Base {
    static readonly DefBlendFunc = [CGE.ONE, CGE.ZERO, CGE.ONE, CGE.ZERO];
    static readonly DefBlendEquation = [CGE.FUNC_ADD, CGE.FUNC_ADD];

    protected _shader: Shader = new Shader;

    protected _alphaMode: AlphaMode;
    protected _faceMode: number;
    protected _flipFace: boolean;

    protected _blendFunc: number[];
    protected _blendEquation: number[];

    private _textures: Map<string | number, Texture>;
    private _properties: Map<string | number, any>;

    public alphaTestValue: number;

    private _macros: string[] = [];

    constructor() {
        super();
        this._textures = new Map();
        this._properties = new Map();
    }

    protected setTexture2DFromUrl(type: string | number, url: string, defTexture?: Texture2D) {
        this._textures.set(type, defTexture || Texture2D.White);
        if (!url || url === '') {
            return;
        }
        Loader.loadImage(url).then((img: HTMLImageElement) => {
            let tex = new Texture2D();
            tex.setFormat(RGBA, RGBA);
            tex.setData(img.width, img.height, img);
            this._textures.set(type, tex);
        })
    }

    protected setTexture(type: string | number, texture: Texture = Texture2D.White) {
        this._textures.set(type, texture);
    }

    protected removeTexture(type: string | number) {
        this._textures.delete(type);
    }

    protected setProperty(type: string | number, data: any) {
        this._properties.set(type, data);
    }

    protected removeProperty(type: string | number) {
        this._properties.delete(type);
    }

    public getProperty(type: string | number) {
        return this._properties.get(type);
    }

    public setTextureUrl(type: string | number, url: string) {
        let texture2d = new Texture2D();
        texture2d.setImageUrl(url);
        this._textures.set(type, texture2d);
    }

    public getTexture(type: string | number) {
        return this._textures.get(type);
    }

    public disalbeAlpha() {
        this._alphaMode = AlphaMode.None;
    }

    public enableAlphaTest() {
        this._alphaMode = AlphaMode.Test;
    }

    public enableAlphaBlend() {
        this._alphaMode = AlphaMode.Blend;
    }

    public get alphaTest() {
        return this._alphaMode === AlphaMode.Test;
    }

    public get alphaBlend() {
        return this._alphaMode === AlphaMode.Blend;
    }

    public get alphaMode() {
        return this._alphaMode || AlphaMode.None;
    }

    public setCullFaceMode(v: number) {
        this._faceMode = v;
    }

    public get faceMode() {
        return this._faceMode || CGE.BACK;
    }

    public setFlipFace(v: boolean) {
        this._flipFace = v;
    }

    public get filpFace() {
        return this._flipFace || false;
    }

    public setBlendFunc(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
        if (!this._blendFunc) {
            this._blendFunc = [srcRGB, dstRGB, srcAlpha, dstAlpha];
        } else {
            this._blendFunc[0] = srcRGB;
            this._blendFunc[1] = dstRGB;
            this._blendFunc[2] = srcAlpha;
            this._blendFunc[3] = dstAlpha;
        }
    }

    public get blendFunc(): number[] {
        return this._blendFunc || Material.DefBlendFunc;
    }

    public setBlendEquation(modeRGB: number, modeAlpha: number) {
        if (!this._blendEquation) {
            this._blendEquation = [modeRGB, modeAlpha];
        } else {
            this._blendEquation[0] = modeRGB;
            this._blendEquation[1] = modeAlpha;
        }
    }

    public get blendEquation(): number[] {
        return this._blendEquation || Material.DefBlendEquation;
    }

    public canLighting() {
        return false;
    }

    protected clearProperties() {
        this._properties.clear();
    }

    protected clearTextures() {
        this._textures.clear();
    }

    protected _addMacro(macro: string) {
        let idx = this._macros.indexOf(macro);
        if (idx < 0) {
            this._macros.push(macro);
        }
    }

    protected _removeMacro(macro: string) {
        let idx = this._macros.indexOf(macro);
        if (idx > -1) {
            this._macros.splice(idx, 1);
        }
    }

    public get type(): string {
        return '';
    }

    public get shader(): Shader {
        return this._shader;
    }

    public clone() {
        
    }

    public getMacros() {
        return this._macros;
    }

    public get supportDeferred(): boolean {
        return false;
    }
}
