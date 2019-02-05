import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { ShaderConst } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';

export class FullScreenMaterial extends Material {
    protected _diffuseMap;
    protected _baseColor: Vector4 = new Vector4();
    constructor(diffuse) {
        super();
        let shader = FullScreenMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setTexture(ShaderConst.diffuseMap, diffuse);

        this.setProperty(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }

    private static _nShader;
    private static getShader() {
        if (FullScreenMaterial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            varying vec2 o_uv;
            void main()
            {
                o_uv = a_texcoord; // vec2(a_texcoord.x, 1.0 - a_texcoord.y);
                gl_Position = a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;
            varying vec2 o_uv;
            uniform sampler2D u_diffuseMap;
            
            void main()
            {
                vec4 baseColor = texture2D(u_diffuseMap, o_uv);
                gl_FragColor = vec4(baseColor.xyz, 1.0);
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            FullScreenMaterial._nShader = shader;
        }
        return FullScreenMaterial._nShader;
    };
}