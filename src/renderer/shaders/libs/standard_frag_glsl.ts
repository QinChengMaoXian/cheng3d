export default `
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_worldPos;

uniform sampler2D u_diffuseMap;

uniform sampler2D u_roughnessMap;
uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
    uniform sampler2D u_normalMap;
#endif

#ifdef SHADOW_MAP
    varying vec3 v_depth;
    uniform sampler2D u_depthMap;
#endif

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;


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


void main()
{
    vec4 bc = texture2D(u_diffuseMap, v_uv);
    bc.xyz = pow(bc.xyz, vec3(2.2));
    vec4 baseColor = bc * u_baseColor;
    #ifdef ALPHA_TEST
        float alpha = texture2D(u_ODMap, fract(gl_FragCoord.xy * vec2(1.0 / 16.0))).a;
        if (baseColor.a <= alpha) {
            discard;
        }
    #endif

    vec4 spec = pow(texture2D(u_roughnessMap, v_uv), vec4(1.0));
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec3 albedo = baseColor.xyz;

    vec3 F0 = vec3(0.04);
    
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    #ifdef NORMAL_MAP
        vec3 normal = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
        vec3 N = normalize(normal.x * v_tangent + normal.y * v_binormal + normal.z * v_normal);
    #else
        vec3 N = normalize(v_normal);
    #endif

    
    vec3 L = normalize(u_lightDir.xyz);
    vec3 V = normalize(u_cameraPos - v_worldPos);
    vec3 H = normalize(V + L);

    vec3 R = N * dot_plus(N, V) * 2.0 - V; 
    R = vec3(R.x, R.z, -R.y);

    float G = geometrySmith(N, V, L, roughness);
    float D = distributionGGX(N, H, roughness);
    vec3 F = fresnelSchlick(dot_plus(H, L), F0);

    vec3 nominator = D * G * F;//分子

    float denominator = 4.0 * max(dot(V, N), 0.0) * max(dot(L, N), 0.0) + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    float NdotL = dot_plus(N, L); 
    float NdotV = dot_plus(N, V); 

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // 直接光照结果
    vec3 lo = (kD * (albedo) / PI + brdf) * u_lightColor.xyz * NdotL;

    // 环境光部分
    vec3 coordN = vec3(N.x, N.z, -N.y);
    vec3 irradiance = textureCubeLodEXT(u_irradianceMap, coordN, 8.0).xyz;
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

    #ifdef SHADOW_MAP
        vec2 uvoffset[9];
        const float fenmu = 1.0 / 1024.0;
        uvoffset[0] = vec2(0.0, 0.0);
        uvoffset[1] = vec2(0.0, fenmu);
        uvoffset[2] = vec2(0.0, -fenmu);
        uvoffset[3] = vec2(fenmu, 0.0);
        uvoffset[4] = vec2(-fenmu, 0.0);
        uvoffset[5] = vec2(fenmu, fenmu);
        uvoffset[6] = vec2(-fenmu, fenmu);
        uvoffset[7] = vec2(fenmu, -fenmu);
        uvoffset[8] = vec2(-fenmu, -fenmu);
        float depth = v_depth.z;
        float bias = max(0.05 * (1.0 - dot(N, L)), 0.005);
        float shadow = 0.0;
        for (int i = 0; i < 9; i++) {
            vec2 s_uv = v_depth.xy + uvoffset[i];
            if (any(lessThan(s_uv, vec2(0.0))) || any(greaterThan(s_uv, vec2(1.0)))) {
                shadow += 1.0;
            } else {
                float depth2 = decodeRGB2Float(texture2D(u_depthMap, s_uv).rgb);
                shadow += (depth - bias > depth2 ? 0.5 : 1.0);
            }
        }
        // float depth2 = decodeRGB2Float(texture2D(u_depthMap, v_depth.xy).rgb) + bias;
        // float shadow = (depth > depth2 ? 0.5 : 1.0);
        color *= depth > 1.0 ? 1.0 : (shadow / 9.0);
    #endif

    gl_FragColor = vec4(color, baseColor.w);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
}
`;