import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { ShaderConst } from '../graphics/ShaderConst'
import { AttribType, TextureType, MatrixType } from '../graphics/GraphicsTypes';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { GraphicsObject } from '../graphics/GraphicsObject';
import { Vector3 } from '../math/Vector3';
import { Vector4 } from '../math/Vector4';

export class DiffuseMaterial extends Material {
    protected _diffuseMap;
    protected _baseColor: Vector4 = new Vector4();
    constructor(diffuse) {
        super();
        let shader = DiffuseMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setTexture(ShaderConst.diffuseMap, diffuse);
        this.setTexture(ShaderConst.ODMap, Texture2D.ODTex);

        this.setProperity(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }

    public clone() {
        
    }

    private static _nShader;
    private static getShader() {
        if (DiffuseMaterial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            varying vec2 o_uv;
            uniform mat4 u_mMat;
            uniform mat4 u_vpMat;
            void main()
            {
                o_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y); //a_texcoord; // 
                gl_Position = u_vpMat * u_mMat * a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;
            varying vec2 o_uv;
            uniform sampler2D u_diffuseMap;
            uniform vec4 u_baseColor;
            // #define OB_MAP
            #include[OBMapDecl]
            
            void main()
            {
                vec4 baseColor = texture2D(u_diffuseMap, o_uv) * u_baseColor;
                #include[OBMap]
                gl_FragColor = vec4(baseColor.xyz, 1.0);
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            DiffuseMaterial._nShader = shader;
        }
        return DiffuseMaterial._nShader;
    };
}