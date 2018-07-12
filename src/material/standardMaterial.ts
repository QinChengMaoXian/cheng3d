import { Material } from './Material';
import { Shader } from '../graphics/Shader';
import { ShaderConst } from '../graphics/ShaderConst'
import { AttribType, TextureType, MatrixType } from '../graphics/GraphicsTypes';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { GraphicsObject } from '../graphics/GraphicsObject';
import { Vector3 } from '../math/Vector3';
import { Vector4 } from '../math/Vector4';

export class StandardMaterial extends Material {
    protected _diffuseMap;
    protected _normalMap;
    protected _specularMap;
    protected _baseColor: Vector4 = new Vector4();

    constructor(diffuse?: Texture2D, normal?: Texture2D, specular?: Texture2D) {
        super();
        let shader = StandardMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });

        this.setTexture(ShaderConst.normalMap, normal);
        this.setTexture(ShaderConst.diffuseMap, diffuse);

        this.setProperty(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setNormalMap(texture: Texture2D) {
        this.setTexture(ShaderConst.normalMap, texture);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }

    public clone() {
        
    }

    private static _nShader;
    private static getShader() {
        if (StandardMaterial._nShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 a_position;
            attribute vec2 a_texcoord;
            attribute vec3 a_normal;
            attribute vec3 a_tangent;

            varying vec2 v_uv;
            varying vec3 v_tangentToView0;
            varying vec3 v_tangentToView1;
            varying vec3 v_tangentToView2;
            varying vec3 v_worldPos;
            varying vec3 v_normal;

            uniform mat4 u_vMat;
            uniform mat4 u_mMat;
            uniform mat4 u_mvMat;
            uniform mat4 u_mvpMat;

            void main()
            {
                v_uv = a_texcoord;

                vec4 worldPos = u_mMat * a_position;
                v_worldPos = worldPos.xyz / worldPos.w;

                vec4 normal = u_mMat * vec4(a_normal, 0.0);
                v_normal = normalize(normal.xyz);

                vec3 binormal = normalize(cross(a_tangent, a_normal));
                mat3 normalMatrix = mat3(a_tangent, binormal, a_normal);
                mat3 mMatrix3 = mat3(
                    u_mMat[0].xyz, 
                    u_mMat[1].xyz, 
                    u_mMat[2].xyz
                );

                mat3 tangentToView = mMatrix3 * normalMatrix;

                v_tangentToView0 = tangentToView[0];
                v_tangentToView1 = tangentToView[1];
                v_tangentToView2 = tangentToView[2];

                gl_Position = u_mvpMat * a_position;
            }`;

            let fragmentShaderText = `#version 100
            precision mediump float;

            varying vec2 v_uv;
            varying vec3 v_tangentToView0;
            varying vec3 v_tangentToView1;
            varying vec3 v_tangentToView2;
            varying vec3 v_normal;

            varying vec3 v_worldPos;

            uniform sampler2D u_diffuseMap;
            uniform sampler2D u_normalMap;

            uniform vec3 u_cameraPos;
            uniform vec4 u_baseColor;
            // uniform vec3 u_lightDir;
            // uniform vec4 u_lightColor;

            const vec4 lightDir = vec4(normalize(vec3(0, 0, -1)), 1.0);

            const vec4 u_lightColor = vec4(1.0);

            float Roughness = 0.04;

            const float PI = 3.14159265359;

            float DistributionGGX(vec3 N, vec3 H, float roughness)
            {
                float a      = roughness*roughness;
                float a2     = a*a;
                float NdotH  = max(dot(N, H), 0.0);
                float NdotH2 = NdotH*NdotH;

                float nom   = a2;
                float denom = (NdotH2 * (a2 - 1.0) + 1.0);
                denom = PI * denom * denom;

                return nom / denom;
            }

            float GeometrySchlickGGX(float NdotV, float roughness)
            {
                float r = (roughness + 1.0);
                float k = (r*r) / 8.0;

                float nom   = NdotV;
                float denom = NdotV * (1.0 - k) + k;

                return nom / denom;
            }

            //几何函数
            float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
            {
                float NdotV = max(dot(N, V), 0.0);
                float NdotL = max(dot(N, L), 0.0);
                float ggx2  = GeometrySchlickGGX(NdotV, roughness);
                float ggx1  = GeometrySchlickGGX(NdotL, roughness);

                return ggx1 * ggx2;
            }

            //菲涅尔方程
            vec3 FresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
            {
                return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);
            }  

            float SampleDFG(float roughness, float NoV, float NoL)
            {
                float a = roughness * roughness;
                float a2 = a * a;
                float G_V = NoV + sqrt( (NoV - NoV * a2) * NoV + a2 );
                float G_L = NoL + sqrt( (NoL - NoL * a2) * NoL + a2 );
                return 1.0 / ( G_V * G_L );
            }
            
            void main()
            {
                vec3 normalTex = texture2D(u_normalMap, v_uv).xyz;
                vec3 normal = normalTex * 2.0 - 1.0;
                mat3 normalMatrix = mat3(
                    normalize(v_tangentToView0), 
                    normalize(v_tangentToView1), 
                    normalize(v_tangentToView2)
                );

                vec3 L = normalize(lightDir.xyz);
                vec3 V = normalize(u_cameraPos - v_worldPos);
                vec3 N = normalize(normalMatrix * normal); // normalize(v_normal);//
                vec3 H = normalize(V + L);

                // float G = GeometrySmith(N, V, L, Roughness);
                // float D = DistributionGGX(N, H, Roughness);
                // vec3 F = FresnelSchlickRoughness(max(dot(N, V), 0.0), vec3(0.04), Roughness);

                // vec3 nominator = D * G * F;//分子

                // float denominator = 4.0 * max(dot(V, N), 0.0) * max(dot(L, N), 0.0) + 0.001;//分母 
                // vec3 brdf = nominator / denominator;

                float NdotL = dot(N, L); 
                float NdotV = dot(N, V); 

                float brdf = SampleDFG(Roughness, NdotV, NdotL);

                // vec3 kS = F;
                // vec3 kD = vec3(1.0) - kS;

                vec3 lo = ( brdf) * u_lightColor.xyz; // * max(NdotL, 0.0); 
                vec4 baseColor = texture2D(u_diffuseMap, v_uv) *  u_baseColor;
                
                gl_FragColor = vec4(baseColor.xyz * lo, 1.0);
                // gl_FragColor = vec4(v_normal, 1.0);
                
            }`;
            let shader = new Shader();
            if (!shader) return;
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            StandardMaterial._nShader = shader;
        }
        return StandardMaterial._nShader;
    };
}