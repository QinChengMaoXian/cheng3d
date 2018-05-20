import { PEBase } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { Material } from "../../material/Material";
import { GraphicsConst } from "../../graphics/GraphicsConst";
import { Shader } from "../../graphics/Shader";
import { Renderer } from "../Renderer";
import { FLOAT } from "../../graphics/RendererParameter"

export class FXAA extends PEBase {
    protected _srcColor: Texture2D;
    protected _dstFrame: Frame;
    protected _mesh: Mesh;
    protected _geometry: Geometry;
    protected _material: FXAAMaterial;

    constructor(renderer: Renderer) {
        super(renderer);
    }

    public init(texture: Texture2D) {
        this._initGeometry();
        this._material = new FXAAMaterial(texture);
        let mesh = new Mesh();
        mesh.setGeometry(this._geometry);
        mesh.setMaterial(this._material);
        this._mesh = mesh;
    }

    public render() {
        
    }

    private _initGeometry() {
        let vertexPositionData = new Float32Array([
            -1.0, 1.0, 0.0,  0.0, 1.0,
            1.0,  1.0, 0.0,  1.0, 1.0,
            1.0, -1.0, 0.0,  1.0, 0.0,
            -1.0, -1.0, 0.0, 0.0, 0.0,
        ]);
        
        let indexData = new Uint16Array([
            0, 2, 1,
            2, 0, 3, 
        ]);
        
        let planeVertexGeometry = new Geometry();
        
        let attribs = [
            {
                name: 'Position',
                attribute: GraphicsConst.position, 
                num: 3,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: GraphicsConst.texcoord, 
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
            },
        ];
        
        planeVertexGeometry.addMultiAttribute(attribs, FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 5, vertexPositionData);
        planeVertexGeometry.setIndexData(indexData);
        planeVertexGeometry.setDrawParameter(indexData.length);

        this._geometry = planeVertexGeometry;
    }
}

class FXAAMaterial extends Material {
    protected _data: any;
    constructor(texture: Texture2D) {
        super();
        let shader = FXAAMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this._data = { data: new Float32Array([1.0, 1.0]) };

        this.setSrcTexture(texture);
        this.setProperity(GraphicsConst.pixelSize, this._data);
    }

    public setSrcTexture(texture: Texture2D) {
        if (!texture) {
            return;
        }
        this.setTexture(GraphicsConst.diffuseMap, texture);
        let w = texture.getWidth();
        let h = texture.getHeight();
        if (!!w && !!h) {
            this.setPixelSize(1.0 / w, 1.0 / h);
        }
    }

    public setPixelSize(x, y) {
        this._data.data[0] = x;
        this._data.data[1] = y;
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

            vec4 o_fragColor;

            //来自于Nvidia的FXAA算法
            void main(){
                const float FXAA_SPAN_MAX = 8.0;
                const float FXAA_REDUCE_MUL = 1.0 / 8.0;
                const float FXAA_REDUCE_MIN = 1.0 / 128.0;

                vec3 rgbNW = TEXTURE2D(u_diffuseMap, v_uv + (vec2(-1.0, -1.0) * u_pixelSize)).xyz;
                vec3 rgbNE = TEXTURE2D(u_diffuseMap, v_uv + (vec2(1.0, -1.0) * u_pixelSize)).xyz;
                vec3 rgbSW = TEXTURE2D(u_diffuseMap, v_uv + (vec2(-1.0, 1.0) * u_pixelSize)).xyz;
                vec3 rgbSE = TEXTURE2D(u_diffuseMap, v_uv + (vec2(1.0, 1.0) * u_pixelSize)).xyz;
                vec3 rgbM = TEXTURE2D(u_diffuseMap, v_uv).xyz;

                vec3 luma = vec3(0.299, 0.587, 0.114);
                float lumaNW = dot(rgbNW, luma);
                float lumaNE = dot(rgbNE, luma);
                float lumaSW = dot(rgbSW, luma);
                float lumaSE = dot(rgbSE, luma);
                float lumaM  = dot(rgbM,  luma);

                float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
                float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

                vec2 dir;
                dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
                dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

                float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

                float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);

                dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
                    max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                    dir * rcpDirMin)) * u_pixelSize;

                vec3 rgbA = 0.5 * (
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * (1.0 / 3.0 - 0.5)).xyz +
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * (2.0 / 3.0 - 0.5)).xyz);

                vec3 rgbB = rgbA * 0.5 + 0.25 * (
                    TEXTURE2D(u_diffuseMap, v_uv.xy - dir * 0.5).xyz +
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * 0.5).xyz);

                float lumaB = dot(rgbB, luma);
                if((lumaB < lumaMin) || (lumaB > lumaMax)){
                    o_fragColor.xyz = rgbA;
                }else{
                    o_fragColor.xyz = rgbB;
                }
                o_fragColor.w = 1.0;    void main(){
                const float FXAA_SPAN_MAX = 8.0;
                const float FXAA_REDUCE_MUL = 1.0 / 8.0;
                const float FXAA_REDUCE_MIN = 1.0 / 128.0;

                vec3 rgbNW = TEXTURE2D(u_diffuseMap, v_uv + (vec2(-1.0, -1.0) * u_pixelSize)).xyz;
                vec3 rgbNE = TEXTURE2D(u_diffuseMap, v_uv + (vec2(1.0, -1.0) * u_pixelSize)).xyz;
                vec3 rgbSW = TEXTURE2D(u_diffuseMap, v_uv + (vec2(-1.0, 1.0) * u_pixelSize)).xyz;
                vec3 rgbSE = TEXTURE2D(u_diffuseMap, v_uv + (vec2(1.0, 1.0) * u_pixelSize)).xyz;
                vec3 rgbM = TEXTURE2D(u_diffuseMap, v_uv).xyz;

                vec3 luma = vec3(0.299, 0.587, 0.114);
                float lumaNW = dot(rgbNW, luma);
                float lumaNE = dot(rgbNE, luma);
                float lumaSW = dot(rgbSW, luma);
                float lumaSE = dot(rgbSE, luma);
                float lumaM  = dot(rgbM,  luma);

                float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
                float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

                vec2 dir;
                dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
                dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

                float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

                float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);

                dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
                    max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                    dir * rcpDirMin)) * u_pixelSize;

                vec3 rgbA = 0.5 * (
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * (1.0 / 3.0 - 0.5)).xyz +
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * (2.0 / 3.0 - 0.5)).xyz);

                vec3 rgbB = rgbA * 0.5 + 0.25 * (
                    TEXTURE2D(u_diffuseMap, v_uv.xy - dir * 0.5).xyz +
                    TEXTURE2D(u_diffuseMap, v_uv.xy + dir * 0.5).xyz);

                float lumaB = dot(rgbB, luma);
                if((lumaB < lumaMin) || (lumaB > lumaMax)){
                    o_fragColor.xyz = rgbA;
                }else{
                    o_fragColor.xyz = rgbB;
                }
                o_fragColor.w = 1.0;

                gl_FragColor = o_fragColor;
            }
            `;

            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            FXAAMaterial._nShader = shader;
        }
        return FXAAMaterial._nShader;
    };

}
