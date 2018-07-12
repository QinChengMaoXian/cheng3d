import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { ShaderConst } from '../graphics/ShaderConst'
import { AttribType, TextureType, MatrixType } from '../graphics/GraphicsTypes';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { GraphicsObject } from '../graphics/GraphicsObject';
import { Vector3 } from '../math/Vector3';
import { Vector4 } from '../math/Vector4';

export class ColorMatrial extends Material {
    protected _diffuseMap;
    protected _baseColor: Vector4 = new Vector4();
    constructor(diffuse) {
        super();
        let shader = ColorMatrial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setProperty(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }

    private static _nShader;
    private static getShader() {
        if (ColorMatrial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            uniform mat4 u_mvpMat;
            void main()
            {
                gl_Position = u_mvpMat * a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;
            uniform vec4 u_baseColor;
            
            void main()
            {
                gl_FragColor = vec4(u_baseColor.xyz, 1.0);
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            ColorMatrial._nShader = shader;
        }
        return ColorMatrial._nShader;
    };
}