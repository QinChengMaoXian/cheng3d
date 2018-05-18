import { PEBase } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { Material } from "../../material/Material";
import { GraphicsConst } from "../../graphics/GraphicsConst";
import { Shader } from "../../graphics/Shader";
import { Renderer } from "../Renderer";

export class FXAA extends PEBase {
    protected _srcColor: Texture2D;
    protected _dstFrame: Frame;
    protected _mesh: Mesh;
    protected _geometry: Geometry;
    protected _material: FXAAMaterial;

    constructor(renderer: Renderer) {
        super(renderer);
    }

    public init() {
        this._geometry = new Geometry
    }

    public render() {
        
    }
}

class FXAAMaterial extends Material {
    protected _diffuseMap;
    constructor(diffuse) {
        super();
        let shader = FXAAMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setTexture(GraphicsConst.diffuseMap, diffuse);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(GraphicsConst.diffuseMap, texture);
    }

    private static _nShader;
    private static getShader() {
        if (FXAAMaterial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            varying vec2 o_uv;
            void main()
            {
                o_uv = a_texcoord;
                gl_Position = a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;
            varying vec2 o_uv;
            uniform sampler2D u_diffuseMap;

            void main()
            {
                vec4 baseColor = texture2D(u_diffuseMap, o_uv) * u_baseColor;
                gl_FragColor = vec4(baseColor.xyz, 1.0);
            }`;

            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            FXAAMaterial._nShader = shader;
        }
        return FXAAMaterial._nShader;
    };

}
