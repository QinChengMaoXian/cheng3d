import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { GraphicsConst } from '../graphics/GraphicsConst'
import { AttribType, TextureType, MatrixType } from '../graphics/GraphicsTypes';

export class DiffuseMaterial extends Material {
    protected _diffuseMap;
    constructor(diffuse) {
        super();
        this._diffuseMap = diffuse;

        let shader = DiffuseMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });
    }

    public setDiffuseMap(map) {
        this._diffuseMap = map;
    }

    public getMapProvide() {
        return [
            {
                map: this._diffuseMap,
                type: GraphicsConst.diffuseMap
            },
        ];
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
            
            void main()
            {
                vec4 color = texture2D(u_diffuseMap, o_uv);
                gl_FragColor = vec4(color.xyz, 1.0);
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            shader.addMatrixName(MatrixType.MVPMatrix, 'u_mvpMat');
            DiffuseMaterial._nShader = shader
        }
        return DiffuseMaterial._nShader;
    };
}