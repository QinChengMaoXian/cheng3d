export default `
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_depthMap;

uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

uniform mat4 u_vIMat;

uniform vec2 u_pixelSize;
uniform vec3 u_cameraPos;

uniform vec4 u_lightColor;
uniform vec4 u_cameraRange;

#ifdef POINT_LIGHT
    uniform vec3 u_lightPos;
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_lightPos;
#endif

uniform vec3 u_lightDir;

const float PI = 3.14159265359;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

#include <distributionGGX>
#include <geometrySmith>
#include <fresnelSchlick>
#include <fresnelSchlickRoughness>

#include <decodeRGB2Float>

vec3 getViewPos(vec2 texCoord, float depth, vec4 cameraRange){
    //cameraRange.x: far
    //cameraRange.y: 1.0 / far
    //cameraRange.z: aspectRatio
    //cameraRange.w: tan(fovy * 0.5)
    float d = depth * cameraRange.x;
    float temp = d * cameraRange.w;
    return vec3(texCoord.x * cameraRange.z * temp, texCoord.y * temp, -d);
}

void main() 
{
    vec2 uv = gl_FragCoord.xy * u_pixelSize;

    vec4 rt0 = texture2D(u_diffuseMap, uv);
    vec4 rt1 = texture2D(u_normalMap, uv);
    vec4 rt2 = texture2D(u_depthMap, uv);

    vec3 albedo = rt0.xyz;
    vec3 normal = rt1.xyz * 2.0 - 1.0;
    float depth = decodeRGB2Float(rt2.xyz);

    vec3 viewPos = getViewPos(uv * 2.0 - 1.0, depth, u_cameraRange);
    vec3 worldPos = (u_vIMat * vec4(viewPos, 1.0)).xyz;

    float roughness = rt0.w;
    float metallic = rt1.w;
    float ao = rt2.w;

    vec3 F0 = vec3(0.04);
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    vec3 L;

    #ifdef POINT_LIGHT
        L = normalize(u_lightPos - worldPos.xyz);
    #else
        L = u_lightDir.xyz;
    #endif

    vec3 V = normalize(u_cameraPos - worldPos.xyz);
    vec3 N = normalize(normal);
    vec3 H = normalize(V + L);

    float NdotL = dot_plus(N, L); 
    float NdotH = dot_plus(N, H); 
    float HdotV = dot_plus(H, V);
    float NdotV = dot_plus(N, V);

    float G = geometrySmith(NdotV, NdotL, roughness);
    float D = distributionGGX(NdotH, roughness);
    vec3 F = fresnelSchlick(HdotV, F0);

    vec3 nominator = D * G * F;//分子
    float denominator = 4.0 * NdotV * NdotL + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // 直接光照结果
    vec3 lo = (kD * (albedo) / PI + brdf) * u_lightColor.xyz * NdotL;

    #ifdef POINT_LIGHT
        vec3 d3 = u_lightPos - worldPos.xyz;
        lo *= 1.0 / dot(d3, d3);
        gl_FragColor = vec4(lo, 1.0);
    #else
        vec3 R = N * dot_plus(N, V) * 2.0 - V; 
        R = vec3(R.x, R.z, -R.y);
        // 环境光部分
        vec3 coordN = vec3(N.x, N.z, -N.y);
        vec3 irradiance = textureCube(u_irradianceMap, coordN).xyz;
        vec3 diffuse = irradiance * albedo;
        vec3 F_s = fresnelSchlickRoughness(NdotV, F0, roughness);
        vec3 kD_a = vec3(1.0) - F_s;
        kD_a *= 1.0 - metallic;

        vec2 envBRDF  = texture2D(u_brdfLUTMap, vec2(NdotV, roughness)).rg;
        vec3 prefilteredColor = textureCubeLodEXT(u_prefilterMap, R, roughness * 8.0).rgb;  
        vec3 specular = prefilteredColor * (F_s * envBRDF.x + envBRDF.y);
        vec3 ambient = (kD_a * diffuse + specular) * ao;

        // 最终颜色
        vec3 color = ambient + lo;

        gl_FragColor = vec4(color, 1.0);
    #endif
}
`;
