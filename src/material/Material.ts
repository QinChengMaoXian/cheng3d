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
import { Vector4 } from '../math/Vector4';

/**
 * 材质基类 
 */
export class Material extends Base {
    protected _shader: Shader = new Shader;

    /** 剔除面模式 CGE.ZERO为不剔除 TODO：变量名容易混淆应该叫做cullMode */
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

    /** uv偏移量 */
    protected _uvOffset: Vector4;

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

    protected removeClassTexture(type: string) {

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

    /** 剔除面模式 CGE.ZERO为不剔除 TODO：变量名容易混淆应该叫做cullMode */
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

    public setDepthMatData(mat: any) {
        this.setProperty(s.depthMat, mat);
    }

    public setNormalMap(texture: Texture2D) {
        if (!this.supportNormalMap) return;
        if (texture && texture !== Texture2D.Normal) {
            this._addMacro('NORMAL_MAP');
            this.setTexture(s.normalMap, texture);
        }
    }

    public removeNormalMap() {
        if (!this.supportNormalMap) return;
        this._removeMacro('NORMAL_MAP');
        this.removeTexture(s.normalMap);
    }

    public setPointLights(num: number, pos: any, colors: any) {
        if (!this.supportLighting) return;

        if (num <= 0) {
            this._removeMacro('POINT_LIGHT');
            this.removeProperty('u_pointPos');
            this.removeProperty('u_pointColors');
            return;
        }

        this._addMacro('POINT_LIGHT', num);
        this.setProperty('u_pointPos', pos);
        this.setProperty('u_pointColors', colors);
    }

    public setDirLights(num: number, dir: any, colors: any) {
        if (!this.supportLighting) return;

        if (num <= 0) {
            this._removeMacro('DIRECTION_LIGHT');
            this.removeProperty('u_directionDirs');
            this.removeProperty('u_directionColors');
            return;
        }

        this._addMacro('DIRECTION_LIGHT', num);
        this.setProperty('u_directionDirs', dir);
        this.setProperty('u_directionColors', colors);
    }

    public setSpotLights(num: number, pos: any, dir: any, colors: any) {
        if (!this.supportLighting) return;

        if (num <= 0) {
            this._removeMacro('SPOT_LIGHT');
            this.removeProperty('u_spotPos');
            this.removeProperty('u_spotDirs');
            this.removeProperty('u_spotColors');
            return;
        }
        this._addMacro('SPOT_LIGHT', num);
        this.setProperty('u_spotPos', pos);
        this.setProperty('u_spotDirs', dir);
        this.setProperty('u_spotColors', colors);
    }

    public setDirShadowLights(num: number, dir: any, colors: any, mats: any, texs: Texture[]) {
        if (!this.supportShadow) return;

        if (num <= 0) {
            this._removeMacro('DIRECTION_SHADOW_LIGHT');
            this.removeProperty('u_directionShadowDirs');
            this.removeProperty('u_directionShadowColors');
            this.removeProperty('u_directionMats');
            return;
        }

        this._addMacro('DIRECTION_SHADOW_LIGHT', num);
        this.setProperty('u_directionShadowDirs', dir);
        this.setProperty('u_directionShadowColors', colors);
        this.setProperty('u_directionMats', mats);

        // TODO: 移除时如何移除贴图；
        for (let i = 0; i < num; i++) {
            this.setTexture(`u_directionShadowMaps_${i}`, texs[i]);
        }
    }

    public setSpotShadowLights(num: number, pos: any, dir: any, colors: any, ranges: any, mats: any, texs: Texture[]) {
        if (!this.supportShadow) return;

        if (num <= 0) {
            this._removeMacro('SPOT_SHADOW_LIGHT');
            this.removeProperty('u_spotShadowPos');
            this.removeProperty('u_spotShadowDirs');
            this.removeProperty('u_spotShadowColors');
            this.removeProperty('u_spotRanges');
            this.removeProperty('u_spotMats');
            return;
        }

        this._addMacro('SPOT_SHADOW_LIGHT', num);
        this.setProperty('u_spotShadowPos', pos);
        this.setProperty('u_spotShadowDirs', dir);
        this.setProperty('u_spotShadowColors', colors);
        this.setProperty('u_spotRanges', ranges);
        this.setProperty('u_spotMats', mats);

        for (let i = 0; i < num; i++) {
            this.setTexture(`u_spotShadowMaps_${i}`, texs[i]);
        }
    }

    public setPointShadowPCF(b: boolean[]) {
        if (!this.supportShadow) return;

        if (b) {
            for (let i = 0, l = b.length; i < l; i++) {
                if (b[i]) {
                    this._addMacro(`POINT_SHADOW_PCF_${i}`);
                } else {
                    this._removeMacro(`POINT_SHADOW_PCF_${i}`);
                }
            }
        }
    }

    public setPointShadowLights(num: number, pos: any, colors: any, ranges: any, texs: Texture[]) {
        if (!this.supportShadow) return;

        if (num <= 0) {
            this._removeMacro('POINT_SHADOW_LIGHT');
            this.removeProperty('u_pointShadowPos');
            this.removeProperty('u_pointShadowColors');
            this.removeProperty('u_pointRanges');
            return;
        }

        this._addMacro('POINT_SHADOW_LIGHT', num);
        this.setProperty('u_pointShadowPos', pos);
        this.setProperty('u_pointShadowColors', colors);
        this.setProperty('u_pointRanges', ranges);

        for (let i = 0; i < num; i++) {
            this.setTexture(`u_pointShadowMaps_${i}`, texs[i]);
        }
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {

    }

    public getBaseColor(): Vector4 {
        return null
    }

    // 材质是否支持法线贴图
    public get supportNormalMap(): boolean {
        return false;
    }

    // 材质是否支持阴影
    public get supportShadow(): boolean {
        return false;
    }

    // 材质是否支持光照
    public get supportLighting(): boolean {
        return false;
    }

    // 材质是否支持延迟渲染
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
