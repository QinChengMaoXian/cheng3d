import { glTexture } from './glTexture'
import { Texture2D } from '../../graphics/Texture2D';

export class glTexture2D extends glTexture {
    protected _wrapS: number;
    protected _wrapT: number;
    
    constructor(gl: WebGLRenderingContext) {
        super(gl);
        this._wrapS = gl.CLAMP_TO_EDGE;
        this._wrapT = gl.CLAMP_TO_EDGE;
    }

    protected _applyParameter(gl: WebGLRenderingContext, target: number, mipmap: boolean) {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, this._wrapS);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, this._wrapT);
        if ((<any>gl).TEXTURE_MAX_ANISOTROPY) {
            gl.texParameteri(target, (<any>gl).TEXTURE_MAX_ANISOTROPY, 2.0);
        }
        if (mipmap) {
            gl.generateMipmap(target);
        }
    }

    protected _setTextureData(gl: WebGLRenderingContext, target: number, texture: Texture2D) {
        let format = texture.getFormat();
        let internalformat = texture.getInternalformat();
        let type = texture.getDataType();

        if (texture.getUrl() && texture.getImage()) {
            let image = <HTMLImageElement>texture.getImage();
            gl.texImage2D(target, 0, internalformat, format, type, image);
        } else if (texture.getWidth() !== 0 && texture.getHeight() !== 0) {
            let data = <ArrayBufferView>texture.getData();
            gl.texImage2D(target, 0, internalformat, texture.getWidth(), texture.getHeight(), 0, format, type, data);
        } else {
            return undefined;
        }
        return this;
    }

    protected _createTextureDatas(gl, texture2d) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, handler);
        if (this._setTextureData(gl, gl.TEXTURE_2D, texture2d) === undefined) {
            return undefined;
        }
        return handler;
    }

    protected _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_2D, mipmap);
    }

    protected _createGLTextureFromTexture(gl, texture) {
        let handler = this._createTextureDatas(gl, texture);
        if (!handler) {
            return;
        }
        this.setFilter(texture.getMinFilter(), texture.getMagFilter());
        this.setWarp(texture.getWrapS(), texture.getWrapT());
        this._applyParameters(gl, texture.getMipmap());
        return handler;
    }

    public generateFromTexture2D(gl: WebGLRenderingContext, texture: Texture2D) {
        let handler = this._createGLTextureFromTexture(gl, texture);
        if (!handler) {
            return;
        }
        this._texture = handler;
        this._update = false;
        gl.bindTexture(gl.TEXTURE_2D, null);
        // this.setLocalVersion(texture.getUpdateVersion());
        return this;
    }

    protected _apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    public setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }
}
