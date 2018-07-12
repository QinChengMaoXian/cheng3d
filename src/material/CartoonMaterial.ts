import { Material } from "./Material";
import { Shader } from "../graphics/Shader";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { RGBA } from "../graphics/RendererParameter";
import { Vector4 } from "../math/Vector4";

export class CartoonMaterial extends Material {

    public param: Vector4 = new Vector4();

    constructor(baseColor: string, specular: string, emissive: string) {
        super();

        let shader = CartoonMaterial.getShader();
        this._shader = shader;

        let baseColorMap = new Texture2D();
        baseColorMap.setImageUrl(baseColor);
        baseColorMap.setFormat(RGBA, RGBA);
        this.setTexture(ShaderConst.baseColorMap, baseColorMap);

        let specularMap = new Texture2D();
        specularMap.setImageUrl(specular);
        specularMap.setFormat(RGBA, RGBA);
        this.setTexture(ShaderConst.specularMap, specularMap);

        let emissiveMap = new Texture2D();
        emissiveMap.setImageUrl(emissive);
        emissiveMap.setFormat(RGBA, RGBA);
        this.setTexture(ShaderConst.emissiveMap, emissiveMap);

        this.setTexture(ShaderConst.cartoonLUTMap, CartoonMaterial.getCartoonStyleLUT());

        this.reflectance = 1.0;
        this.aoScale = 1.0;
        this.glossiness = 1.0;

        this.setProperty(ShaderConst.merged, this.param);
    }

    get glossiness(): number {
        return this.param.v[0];
    }

    set glossiness(value: number) {
        this.param.v[0] = value;
    }

    get aoScale(): number {
        return this.param.v[1];
    }

    set aoScale(value: number) {
        this.param.v[1] = value;
    }

    get reflectance(): number {
        return this.param.v[2];
    }

    set reflectance(value: number) {
        this.param.v[2] = value;
    }

    private static _nShader;
    private static getShader() {
        if (this._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            attribute vec3 a_normal;

            varying vec2 v_uv;
            varying vec3 v_normal;
            varying vec3 v_position;

            uniform mat4 u_mvpMat;
            uniform mat4 u_mMat;
            uniform mat4 u_mIMat;

            void main()
            {
                v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
                v_normal = normalize((u_mIMat * vec4(a_normal, 1.0)).xyz);
                v_position = (u_mMat * a_position).xyz;
                gl_Position = u_mvpMat * a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;

            varying vec2 v_uv;
            varying vec3 v_normal;
            varying vec3 v_position;
            
            uniform sampler2D u_baseColorMap;
            uniform sampler2D u_specularMap;
            uniform sampler2D u_emissiveMap;
            uniform sampler2D u_cartoonLUTMap;
            
            uniform vec3 u_cameraPos;
            uniform vec4 u_merged;
            uniform vec3 u_lightDir;

            void main()
            {
                vec3 lightDir = u_lightDir;

                vec3 lightIntensity = vec3(1.0, 1.0, 1.0);

                vec4 specular = texture2D(u_specularMap, v_uv);
                vec4 emissive = texture2D(u_emissiveMap, v_uv);
                vec4 baseColor = texture2D(u_baseColorMap, v_uv);

                float aoScale = u_merged[1];
                float glossiness = u_merged[2] * 3.5;
                float reflectance = u_merged[0];

                aoScale *= specular.y;
                glossiness *= specular.x;
                reflectance *= specular.z;

                float NdotL = dot(v_normal, lightDir);

                float darkness = NdotL * aoScale;

                vec3 coldTint = vec3(0.4);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 1.0 / 8.0)).xyz;
		        vec3 warmTint = vec3(1.0);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 5.0 / 8.0)).xyz;
		        float threshold = 0.4;//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 7.0 / 8.0)).x;

                vec3 tint = mix(coldTint, warmTint, smoothstep(threshold - 0.001, threshold + 0.001, darkness));

                vec3 viewDir = normalize(u_cameraPos - v_position);

                float NdotH = pow(dot(v_normal, normalize(viewDir + lightDir)), glossiness) * reflectance;
                float specThreshold = 0.4;
                
                float s = 1.0 + smoothstep(specThreshold - 0.001, specThreshold + 0.001, NdotH) * 0.2;

                
                gl_FragColor = vec4(s * tint * lightIntensity * baseColor.rgb, 1.0);
                // gl_FragColor = vec4(v_normal, 1.0); //specular;//
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            this._nShader = shader;
        }
        return this._nShader;
    };

    private static _cartoonLUTMap: Texture2D;
    public static getCartoonStyleLUT(): Texture2D {
        if (!this._cartoonLUTMap) {
            let numStyle: number = 1;
            //第一行存暗面色调, 第一行存过度色调，第二行存亮面色调，第三行存threshold（注意色调不同于光源颜色，是要乘上光源颜色的）
            let styleData: Uint8Array = new Uint8Array(4 * 4 * 4);
            //临时测试，未来这个表可由美术绘制并加载
            for (let i: number = 0; i < 2; i++) {
                if (i == 0) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                } else if (i == 1) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                }

            }
            let texture = new Texture2D();
            texture.setData(4, 4, styleData);
            texture.setFormat(RGBA, RGBA);
            this._cartoonLUTMap = texture;
        }
        return this._cartoonLUTMap;
    }
}