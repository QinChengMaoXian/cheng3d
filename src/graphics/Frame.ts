import { GraphicsObject } from './GraphicsObject'
import { Texture2D } from './Texture2D'
import * as CGE from './RendererParameter'
import { FrameState } from './FrameState'
import { RTLocation } from './GraphicsTypes';
import { Vector4 } from "../math/Vector4";
import { Texture } from './Texture';
import { TextureCube } from './TextureCube';

/** 渲染目标的贴图类型 */
export enum TexTarget {
    TEXTURE_2D,
    TEXTURE_CUBE_MAP_POSITIVE_X,
    TEXTURE_CUBE_MAP_NEGATIVE_X,
    TEXTURE_CUBE_MAP_POSITIVE_Y,
    TEXTURE_CUBE_MAP_NEGATIVE_Y,
    TEXTURE_CUBE_MAP_POSITIVE_Z,
    TEXTURE_CUBE_MAP_NEGATIVE_Z,
}

export interface ITexTarget {
    tex: Texture;
    target: TexTarget;
}

export class Frame extends GraphicsObject {
    private _textures: Map<RTLocation, ITexTarget> = new Map();
    private _width = 64;
    private _height = 64;
    private _isFollowScreen = false;
    private _depthStencilTexture: Texture2D = undefined;
    private _state = new FrameState();
    private _needsUpdateSize = false;
    private _needsDepthStencil;
    
    constructor() {
        super();
    }

    public update() {
        if (this._needsUpdateSize) {
            this._needsUpdateSize = false;
        }
    }

    public addTexture(targetType: RTLocation, format, dataType, filterMin, filterMag) {
        let __format = format || CGE.RGBA;
        let __dataType = dataType || CGE.UNSIGNED_BYTE;
        let tex2d = this._createTexture2d(__format, __dataType);
        tex2d.setFilter(filterMin, filterMag);
        this._textures.set(targetType, {tex: tex2d, target: TexTarget.TEXTURE_2D});
        this.needsUpdate();
    }

    public setTexture2D(targetType: RTLocation, tex2d: Texture2D) {
        this._textures.set(targetType, {tex: tex2d, target: TexTarget.TEXTURE_2D});
        this.needsUpdate();
    }

    public setTextureCube(targetType: RTLocation, texCube: TextureCube, target: TexTarget) {
        this._textures.set(targetType, {tex: texCube, target: target});
    }

    public getState() {
        return this._state;
    }

    public getDepthStencilTexture() {
        return this._depthStencilTexture;
    }

    // protected _setTexture(targetType: RTLocation, tex: Texture, type: TexTarget) {
    //     let texObj = this._textures.get(targetType);
    //     tex.retain();
    //     if (texObj) {
    //         texObj.tex.release();
    //         texObj.tex = tex;
    //     } else {
    //         this._textures.set(targetType, {tex: tex, target: type});
    //     }
    // }

    protected _createTexture2d(format, dataType) {
        let texture2d = new Texture2D();
        texture2d.setSize(this._width, this._height);
        texture2d.setFormat(format, format);
        texture2d.setDataType(dataType);
        return texture2d;
    }

    public enableDepthStencil() {
        // TODO: check webgl2 why can't used texture to be render target;
        this._state.setClearDepth(true);
        this._state.setClearStencil(true);
        let tex = this._createTexture2d(CGE.DEPTH_STENCIL, CGE.UNSIGNED_INT_24_8);
        tex.setFilter(CGE.LINEAR, CGE.LINEAR);
        this._depthStencilTexture = tex;
        this.needsUpdate();
    }

    public setDepthStencil(tex: Texture2D) {
        this._depthStencilTexture = tex;
        this._state.setClearDepth(true);
        this._state.setClearStencil(true);
        this.needsUpdate();
    }

    public setNeedsDepthStencil(b) {
        this._needsDepthStencil = b === true;
    }

    public isNeedsDepthStencil() {
        return this._needsDepthStencil;
    }

    public isFollowScreen() {
        return this._isFollowScreen;
    }

    public setFollowScreen(b) {
        this._isFollowScreen = b === true;
    }

    protected _updateTextureSize() {
        const w = this._width;
        const h = this._height;
        if (this._depthStencilTexture) {
            this._depthStencilTexture.setSize(w, h);
        }
        this._textures.forEach(function(texTarget, type) {
            let tex = texTarget.tex;
            if (tex instanceof Texture2D) {
                tex.setSize(w, h);
            }
        });
    }

    public setSize(width, height) {
        if (this._width === width && this._height === height) {
            return undefined;
        }
        this._width = width;
        this._height = height;
        this._updateTextureSize();
        this._state.setViewports(0, 0, width, height);
        this.needsUpdate();
    }

    public getWidth() {
        return this._width;
    }

    public getHeight() {
        return this._height;
    }

    public setOffset(viewport) {
        this._state.setViewportAt(viewport);
    }

    public getTextureFromType(targetType) {
        return this._textures.get(targetType);
    }

    public getTextureMap() {
        return this._textures;
    }

    public setClearColor(color) {
        this._state.setClearColor(true, color);
    }
}
