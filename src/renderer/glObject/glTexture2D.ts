import { glTexture } from './glTexture'

export class glTexture2D extends glTexture {
    _wrapS;
    _wrapT;
    constructor(gl) {
        super(gl);
        this._wrapS = gl.CLAMP_TO_EDGE;
        this._wrapT = gl.CLAMP_TO_EDGE;
    }

    _applyParameter(gl, target, mipmap) {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, this._wrapS);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, this._wrapT);
        gl.texParameteri(target, gl.TEXTURE_MAX_ANISOTROPY, 2.0);
        if (mipmap) {
            gl.generateMipmap(target);
        }
    }

    _setTextureData(gl, target, texture) {
        let format = texture.getFormat();
        let internalformat = texture.getInternalformat();
        let type = texture.getType();

        if (texture.getImage() !== undefined && texture.isLoad()) {
            let image = texture.getImage();
            gl.texImage2D(target, 0, internalformat, format, type, image);
        } else if (texture.getWidth() !== 0 && texture.getHeight() !== 0) {
            gl.texImage2D(target, 0, internalformat, texture.getWidth(), texture.getHeight(), 0, format, type, texture.getData());
        } else {
            return undefined;
        }
        return this;
    }

    _createTextureDatas(gl, texture2d) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, handler);
        if (this._setTextureData(gl, gl.TEXTURE_2D, texture2d) === undefined) {
            return undefined;
        }
        return handler;
    }

    _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_2D, mipmap);
    }

    _createGLTextureFromTexture(gl, texture) {
        let handler = this._createTextureDatas(gl, texture);
        if (handler === undefined) {
            return undefined;
        }
        this.setFilter(texture.getMinFilter(), texture.getMagFilter());
        this.setWarp(texture.getWrapS(), texture.getWrapT());
        this._applyParameters(gl, texture.getMipmap());
        return handler;
    }

    generateFromTexture(gl, texture) {
        let handler = this._createGLTextureFromTexture(gl, texture);
        if (handler === undefined) {
            return undefined;
        }
        this._texture = handler;
        this._update = false;
        // this.setLocalVersion(texture.getUpdateVersion());
        return this;
    }

    apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }
}
