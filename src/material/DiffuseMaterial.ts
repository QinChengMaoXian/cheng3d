import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { GraphicsConst } from '../graphics/GraphicsConst'
import { AttribType, TextureType, MatrixType } from '../graphics/GraphicsTypes';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { GraphicsObject } from '../graphics/GraphicsObject';

export class DiffuseMaterial extends Material {
    protected _diffuseMap;
    constructor(diffuse) {
        super();
        let shader = DiffuseMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setTexture(GraphicsConst.diffuseMap, diffuse);
        this.setTexture(GraphicsConst.ODMap, Texture2D.ODTex);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(GraphicsConst.diffuseMap, texture);
    }

    private static _nShader;
    private static getShader() {
        if (DiffuseMaterial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            varying vec2 o_uv;
            uniform mat4 u_mvpMat;
            void main()
            {
                o_uv = a_texcoord; // vec2(a_texcoord.x, 1.0 - a_texcoord.y);
                gl_Position = u_mvpMat * a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;
            varying vec2 o_uv;
            uniform sampler2D u_diffuseMap;
            // #define OB_MAP
            #include[OBMapDecl]
            
            void main()
            {
                vec4 baseColor = texture2D(u_diffuseMap, o_uv);
                baseColor.a = 0.4;
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