import { glTexture2D } from './glTexture2D'
import { TextureCube } from '../../graphics/TextureCube';

export class glTextureCube extends glTexture2D {
    constructor(gl) {
        super(gl);
    }

    _createTextureDatas(gl: WebGLRenderingContext, textureCube: TextureCube) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, handler);
        let textures = textureCube.getTexture2ds();
        for (let i = 0; i < textures.length; i++) {
            let texture2d = textures[i];
            if (textures[i] && this._setTextureData(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, texture2d) === undefined) {
                return undefined;
            }
        }            
        return handler;
    }

    _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_CUBE_MAP, mipmap);
    }

    apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
    }
}
