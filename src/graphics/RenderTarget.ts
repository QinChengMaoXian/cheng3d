import { GraphicsObject } from './GraphicsObject'
import { Texture2D } from './Texture2D'
import * as CGE from './RendererParameter'
import { RenderTargetState } from './RenderTargetState'
import { Vector4 } from "../math/Vector4";

export class RenderTarget extends GraphicsObject {
    private _textures = new Map();
    private _width = 64;
    private _height = 64;
    private _isFollowScreen = false;
    private _depthStencilTexture = undefined;
    private _state = new RenderTargetState();
    private _needsUpdateSize = false;
    private _needsDepthStencil;
    
    constructor() {
        super();
    }

    update() {
        if (this._needsUpdateSize) {
            this._needsUpdateSize = false;
        }
    }

    getState() {
        return this._state;
    }

    getDepthStencilTexture() {
        return this._depthStencilTexture;
    }

    _createTexture2d(format, dataType) {
        let texture2d = new Texture2D();
        texture2d.setSize(this._width, this._height);
        texture2d.setFormat(format, format);
        texture2d.setType(dataType);
        return texture2d;
    }

    enableDepthStencil() {
        // TODO: check webgl2 why can't used texture to be render target;
        this._state.setClearDepth(true);
        this._state.setClearStencil(true);
        let texture2d = this._createTexture2d(CGE.DEPTH_STENCIL, CGE.UNSIGNED_INT_24_8);
        texture2d.setFilter(CGE.NEAREST, CGE.NEAREST);
        this._depthStencilTexture = texture2d;
    }

    setNeedsDepthStencil(b) {
        this._needsDepthStencil = b === true;
    }

    isNeedsDepthStencil() {
        return this._needsDepthStencil;
    }

    isFollowScreen() {
        return this._isFollowScreen;
    }

    setFollowScreen(b) {
        this._isFollowScreen = b === true;
    }

    _updateTextureSize() {
        const w = this._width;
        const h = this._height;
        if (this._depthStencilTexture) {
            this._depthStencilTexture.setSize(w, h);
        }
        this._textures.forEach(function(texture, type) {
            texture.setSize(w, h);
        });
    }

    setSize(width, height) {
        if (this._width === width && this._height === height) {
            return undefined;
        }
        this._width = width;
        this._height = height;
        this._updateTextureSize();
        this._state.setViewport(new Vector4(0, 0, width, height));
        this.needsUpdate();
    }

    getSize() {
        return {
            w: this._width,
            h: this._width,
        }
    }

    setOffset(viewport) {
        this._state.setViewport(viewport);
    }

    addTexture(targetType, format, dataType, filterMin, filterMag) {
        let __format = format || CGE.RGBA;
        let __dataType = dataType || CGE.UNSIGNED_BYTE;
        let texture2d = this._createTexture2d(__format, __dataType);
        texture2d.setFilter(filterMin, filterMag);
        this._textures.set(targetType, texture2d);
    }

    getTextureFromType(targetType) {
        return this._textures.get(targetType);
    }

    getTextureMap() {
        return this._textures;
    }

    setClearColor(color) {
        this._state.setClearColor(true, color);
    }
}
