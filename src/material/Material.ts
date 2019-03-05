import { Base } from '../core/Base'
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { Loader } from '../io/Loader';
import { Shader } from '../graphics/Shader';
import * as CGE from '../graphics/RendererParameter';
import { Blend } from '../graphics/Blend';
import { Stencil } from '../graphics/Stencil';
import { AlphaType, FaceType } from '../graphics/GraphicsTypes';
import { ShaderConst as s } from '../graphics/ShaderConst';
import { Matrix4 } from '../math/Matrix4';

/**
 * 材质基类 
 */
export class Material extends Base {
    protected _shader: Shader = new Shader;

    /** 剔除面模式 CGE.ZERO为不剔除 TODO：变量名容易混淆 */
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

    public enableDepth = true;
    public depthMask = true;
    protected _depthFunc: number;

    public enablePolygonOffset = false;
    public polygonOffset = [0, 0];

    /** 纹理组 */
    private _textures: Map<string | number, Texture>;
    /** 材质参数组 */
    private _properties: Map<string | number, any>;
    /** 宏数组 */
    private _macros: {[key: string]: number};

    /** 特征值 */
    private _key: string;

    constructor() {
        super();
        this._textures = new Map();
        this._properties = new Map();
    }

    protected setTexture2DFromUrl(type: string | number, url: string, defTexture?: Texture2D) {
        if (!url || url === '') {
            this._textures.set(type, defTexture || Texture2D.White);
        }
        let tex = new Texture2D();
        tex.setUrl(url, defTexture);
        this.setTexture(type, tex);
    }

    protected setTexture(type: string | number, texture: Texture = Texture2D.White) {
        if (!texture) {
            return;
        }
        let tex = this._textures.get(type);
        if (tex && tex.isUrl) {
            tex.release();
        }
        if (texture.isUrl) {
            texture.retain();
        }
        this._textures.set(type, texture);
    }

    protected removeTexture(type: string | number) {
        let tex = this._textures.get(type);
        if (tex && tex.isUrl) {
            tex.release();
            this._textures.delete(type);
        }
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

    public getTexture(type: string | number) {
        return this._textures.get(type);
    }

    public set alphaType(v: AlphaType) {
        this._alphaType = v;
    }

    public disalbeAlpha() {
        this.removeTexture(s.ODMap);
        this._removeMacro('ALPHA_TEST');
        this._alphaType = AlphaType.NONE;
    }

    public enableAlphaTest() {
        this.setTexture(s.ODMap, Texture2D.ODTex);
        this._addMacro('ALPHA_TEST');
        this._alphaType = AlphaType.TEST;
    }

    public enableAlphaBlend() {
        this.removeTexture(s.ODMap);
        this._removeMacro('ALPHA_TEST');
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

    /** enable表现不一致 */
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

    public set depthFunc(v: number) {
        this._depthFunc = v;
    }

    public get depthFunc() {
        return this._depthFunc || CGE.LESS;
    }

    public canLighting() {
        return false;
    }

    protected clearProperties() {
        this._properties.clear();
    }

    protected clearTextures() {
        this._textures.forEach(tex => {
            tex.release();
        });
        this._textures.clear();
    }

    protected _addMacro(macro: string, value?: number) {
        let macros = this._macros;
        if (!macros) {
            macros = {}
            this._macros = macros;
        }
        macros[macro] = value;
        this._computeKey();
    }

    protected _removeMacro(macro: string) {
        let macros = this._macros;
        if (!macros) {
            return;
        }
        delete macros[macro];
        if (Object.keys(macros).length === 0) {
            delete this._macros;
        }
        this._computeKey();
    }

    protected _computeKey() {
        let macros = this._macros;
        if (!macros) {
            this._key = null;
            return;
        }
        let result = '' + this.type;
        for (let key in macros) {
            let value = macros[key];
            result += value !== undefined ? `_${key} ${value}` : `_${key}`;
        }
        this._key = result;
    }

    public get key(): string {
        return this._key || this.type;
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

    public setDepthMap(tex: Texture) {
        this.setTexture(s.depthMap, tex);
    }

    public setDepthMatData(mat: Matrix4) {
        this.setProperty(s.depthMat, mat);
    }

    public enableShadow() {
        this._addMacro('SHADOW_MAP');
    }

    public disableShadow() {
        this._removeMacro('SHADOW_MAP');
    }

    public get supportDeferred(): boolean {
        return false;
    }

    public destroy() {
        this._shader.release();
        this._textures.forEach(tex => {
            tex.release();
        })
    }
}
