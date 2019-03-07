import { TextureCube } from '../../graphics/TextureCube';
import { glTexture2D } from './glTexture2D';

export class glTextureCube extends glTexture2D {
    protected _wrapR: number;

    constructor(gl) {
        super(gl);
    }

    protected _createGLTextureFromTexture(gl: WebGLRenderingContext, texCube: TextureCube) {
        this._wrapR = texCube.getWrapR();
        return super._createGLTextureFromTexture(gl, texCube);
    }

    protected _applyParameter(gl: WebGLRenderingContext, target: number, mipmap: boolean) {
        // gl.texParameteri(target, gl.TEXTURE_WRAP_R, this._wrapS);
        super._applyParameter(gl, target, mipmap);
    }

    protected _createTextureDatas(gl: WebGLRenderingContext, textureCube: TextureCube) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, handler);
        let textures = textureCube.getTexture2ds();
        for (let i = 0; i < textures.length; i++) {
            let texture2d = textures[i];
            if (!texture2d.loaded) {
                texture2d = texture2d._def;
            }
            if (texture2d && this._setTextureData(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, texture2d) === undefined) {
                return undefined;
            }
        }            
        return handler;
    }

    protected _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_CUBE_MAP, mipmap);
    }

    public generateFromTextureCube(gl: WebGLRenderingContext, textureCube: TextureCube) {
        let handler = this._createGLTextureFromTexture(gl, textureCube);
        if (!handler) {
            return;
        }
        this._texture = handler;
        this.updated();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)   ;
        return this;
    }

    protected _apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
    }
}
