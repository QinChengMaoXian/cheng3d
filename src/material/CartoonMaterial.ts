import { Material } from "./Material";
import { Shader } from "../graphics/Shader";

export class CartoonMartial extends Material {

    protected _bas

    constructor() {
        super();

        let shader = CartoonMartial.getShader();
        this._shader = shader;
    }

    private static _nShader;
    private static getShader() {
        if (this._nShader === undefined) {
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
            this._nShader = shader;
        }
        return this._nShader;
    };

}