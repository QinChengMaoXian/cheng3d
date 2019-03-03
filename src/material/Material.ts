import { Base } from '../core/Base'
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { Loader } from '../io/Loader';
import { RGBA } from '../graphics/RendererParameter';
import { Shader } from '../graphics/Shader';
import * as CGE from '../graphics/RendererParameter';
import { Blend } from '../graphics/Blend';
import { Stencil } from '../graphics/Stencil';
import { AlphaType, FaceType } from '../graphics/GraphicsTypes';

/**
 * 材质基类 
 */
export class Material extends Base {
    protected _shader: Shader = new Shader;

    /** 剔除面模式 CGE.ZERO为不剔除 */
    protected _faceMode: number;
    /** 反转面方向 */
    protected _flipFace: boolean;

    /** 半透明类型 */
    protected _alphaType: AlphaType;
    /** 半透明混合参数 */
    protected _blend: Blend;
    /** 半透明测试通过值 */
    public alphaTestValue: number;

    /** 是否启用模板 */
    protected _enableStencil: boolean;
    /** 模板参数 */
    protected _stencil: Stencil;

    /** 纹理组 */
    private _textures: Map<string | number, Texture>;
    /** 材质参数组 */
    private _properties: Map<string | number, any>;
    /** 宏数组 */
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

    public set alphaType(v: AlphaType) {
        this._alphaType = v;
    }

    public disalbeAlpha() {
        this._alphaType = AlphaType.NONE;
    }

    public enableAlphaTest() {
        this._alphaType = AlphaType.TEST;
    }

    public enableAlphaBlend() {
        this._alphaType = AlphaType.BLEND;
    }

    public get alphaTest() {
        return this._alphaType === AlphaType.TEST;
    }

    public get alphaBlend() {
        return this._alphaType === AlphaType.BLEND;
    }

    public get alphaType() {
        return this._alphaType || AlphaType.NONE;
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
    
    public setBlend(blend: Blend, deepCopy: boolean = false) {
        if (!deepCopy) {
            this._blend = blend;
        } else {
            if (!this._blend) {
                this._blend = blend.clone();
            } else {
                this._blend.copy(blend);
            }
        }
    }

    public get blend() {
        return this._blend || Blend.DefBlend;
    }

    protected _checkCreateBlend() {
        let blend = this._blend;
        if (!blend) {
            blend = new Blend();
            this._blend = blend;
        }
        return blend;
    }

    public setBlendFunc(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
        let blend = this._checkCreateBlend();
        blend.setBlendFunc.apply(blend, arguments);
    }

    public get blendFunc(): number[] {
        return this._blend ? this._blend.blendFunc : Blend.DefBlend.blendFunc;
    }

    public setBlendEquation(modeRGB: number, modeAlpha: number) {
        let blend = this._checkCreateBlend();
        blend.setBlendEquation.apply(blend, arguments);
    }

    public get blendEquation(): number[] {
        return this._blend ? this._blend.blendEquation : Blend.DefBlend.blendEquation;
    }

    public set enableStencil(v: boolean) {
        this._enableStencil = v;
    }

    public get enableStencil() {
        return this._enableStencil;
    }

    public setStencil(stencil: Stencil, deepCopy: boolean = false) {
        if (!deepCopy) {
            this._stencil = stencil;
        } else {
            if (!this._stencil) {
                this._stencil = stencil.clone();
            } else {
                this._stencil.copy(stencil);
            }
        }
    }

    public get stencil() {
        return this._stencil || Stencil.DefStencil;
    }

    protected _checkCreateStencil() {
        let stencil = this._stencil;
        if (!stencil) {
            stencil = new Stencil();
            this._stencil = stencil;
        }
        return stencil;
    }

    public setStencilFunc(func: number, ref: number, mask: number, face: FaceType = FaceType.DOUBLE) {
        let stencil = this._checkCreateStencil();
        stencil.setStencilFunc.apply(stencil, arguments);
    }

    public setStencilOp(fail: number, zfail: number, zpass: number, face: FaceType = FaceType.DOUBLE) {
        let stencil = this._checkCreateStencil();
        stencil.setStencilOp.apply(stencil, arguments);
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

    public get key(): string {
        return '';
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
