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
    varying vec3 v_depth3;
    uniform sampler2D u_depthMap;
#endif

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

#ifdef DIRECTION_LIGHT
    uniform vec3 u_directionDirs[DIRECTION_LIGHT];
    uniform vec4 u_directionColors[DIRECTION_LIGHT];
#endif

#ifdef POINT_LIGHT
    uniform vec3 u_pointPos[POINT_LIGHT];
    uniform vec4 u_pointColors[POINT_LIGHT];
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_spotPos[SPOT_LIGHT];
    uniform vec4 u_spotDirs[SPOT_LIGHT];
    uniform vec4 u_spotColors[SPOT_LIGHT];
#endif

const float PI = 3.14159265359;
const float inv_PI = 1.0 / PI;
float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;

uniform vec3 u_lightDir;

#include <distributionGGX>
#include <geometrySmith>
#include <fresnelSchlick>
#include <fresnelSchlickRoughness>

#include <decodeRGB2Float>

vec3 directionLight(float NdotV, float roughness, float metallic, vec3 albedo, vec3 F0, vec3 N, vec3 V, vec3 dir, vec4 color) {
    vec3 L = dir;
    vec3 H = normalize(V + L);

    float NdotL = dot_plus(N, L); 
    float NdotH = dot_plus(N, H); 
    float HdotV = dot_plus(H, V);

    float G = geometrySmith(NdotV, NdotL, roughness);
    float D = distributionGGX(NdotH, roughness);
    vec3 F = fresnelSchlick(HdotV, F0);

    vec3 nominator = D * G * F;//分子
    float denominator = 4.0 * NdotV * NdotL + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    vec3 kD = vec3(1.0) - F;
    kD *= 1.0 - metallic;

    return (kD * (albedo) * inv_PI + brdf) * color.xyz * NdotL;
}

float shadow() {
    return 0.0;
}

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

    vec3 V = normalize(u_cameraPos - v_worldPos);

    float NdotV = dot_plus(N, V); 

    vec3 L = normalize(u_lightDir.xyz);

    vec3 lo = vec3(0.0);

    #ifdef DIRECTION_LIGHT
        for (int i = 0; i < DIRECTION_LIGHT; i++) {
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionDirs[i], u_directionColors[i]);
        }
    #endif

    #ifdef POINT_LIGHT
        for (int i = 0; i < POINT_LIGHT; i++) {
            vec3 pos = u_pointPos[i];
            vec4 color = u_pointColors[i];
            vec3 d3 = pos - v_worldPos;
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(d3), color) / dot(d3, d3);
        }
    #endif

    #ifdef SPOT_LIGHT
        for (int i = 0; i < SPOT_LIGHT; i++) {
            vec3 pos = u_spotPos[i];
            vec4 color = u_spotColors[i];
            vec4 dir = u_spotDirs[i];
            vec3 d3 = pos - v_worldPos;
            vec3 d3_norm = normalize(d3);
            float ag = step(dir.w, dot(dir.xyz, d3_norm));
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, d3_norm, color) / dot(d3, d3) * ag;
        }
    #endif

    // 环境光部分
    vec3 coordN = vec3(N.x, N.z, -N.y);
    vec3 irradiance = textureCubeLodEXT(u_irradianceMap, coordN, 8.0).xyz;
    vec3 diffuse = irradiance * albedo;
    vec3 F_s = fresnelSchlickRoughness(NdotV, F0, roughness);
    vec3 kD_a = vec3(1.0) - F_s;
    kD_a *= 1.0 - metallic;

    vec3 R = N * dot_plus(N, V) * 2.0 - V; 
    R = vec3(R.x, R.z, -R.y);

    vec2 envBRDF  = texture2D(u_brdfLUTMap, vec2(NdotV, roughness)).rg;
    vec3 prefilteredColor = textureCubeLodEXT(u_prefilterMap, R, roughness * 8.0).rgb;  
    vec3 specular = prefilteredColor * (F_s * envBRDF.x + envBRDF.y);
    vec3 ambient = (kD_a * diffuse + specular) * ao;

    // 最终颜色
    vec3 color = ambient + lo;

    #ifdef SHADOW_MAP
        // vec2 uvoffset[9];
        // const float fenmu = 1.0 / 1024.0;
        // uvoffset[0] = vec2(0.0, 0.0);
        // uvoffset[1] = vec2(0.0, fenmu);
        // uvoffset[2] = vec2(0.0, -fenmu);
        // uvoffset[3] = vec2(fenmu, 0.0);
        // uvoffset[4] = vec2(-fenmu, 0.0);
        // uvoffset[5] = vec2(fenmu, fenmu);
        // uvoffset[6] = vec2(-fenmu, fenmu);
        // uvoffset[7] = vec2(fenmu, -fenmu);
        // uvoffset[8] = vec2(-fenmu, -fenmu);
        
        // float bias = max(0.005 * (1.0 - dot(N, L)), 0.0005);
        // float shadow = 0.0;
        // for (int i = 0; i < 9; i++) {
        //     vec2 s_uv = v_depth3.xy + uvoffset[i];
        //     if (any(lessThan(s_uv, vec2(0.0))) || any(greaterThan(s_uv, vec2(1.0)))) {
        //         shadow += 1.0;
        //     } else {
        //         float depth2 = decodeRGB2Float(texture2D(u_depthMap, s_uv).rgb);
        //         shadow += clamp(exp(200.0 * (depth2 - depth)), 0.5, 1.0); 
        //         // shadow += (depth - bias > depth2 ? 0.5 : 1.0);
        //     }
        // }

        // float shadow = (depth > depth2 ? 0.5 : 1.0);

        vec2 depthPixelSize = vec2(1.0 / 512.0);
        vec2 fullUV = v_depth3.xy * vec2(512.0, 512.0) - vec2(0.5);
        vec2 floorUV = floor(fullUV) + vec2(0.5);
        vec2 ceilUV = ceil(fullUV) + vec2(0.5);
        vec2 fractUV = fract(fullUV);
        vec2 invfractUV = vec2(1.0) - fractUV;

        // float z0 = decodeRGB2Float(texture2D(u_depthMap, ceilUV * depthPixelSize).rgb);
        // float z1 = decodeRGB2Float(texture2D(u_depthMap, vec2(ceilUV.x, floorUV.y) * depthPixelSize).rgb);
        // float z2 = decodeRGB2Float(texture2D(u_depthMap, vec2(floorUV.x, ceilUV.y) * depthPixelSize).rgb);
        // float z3 = decodeRGB2Float(texture2D(u_depthMap, floorUV * depthPixelSize).rgb);

        // float nz0 = z3 * invfractUV.x * invfractUV.y;
        // float nz1 = z2 * invfractUV.x * fractUV.y;
        // float nz2 = z1 * fractUV.x * invfractUV.y;
        // float nz3 = z0 * fractUV.x * fractUV.y;

        float d = v_depth3.z;
        float z = texture2D(u_depthMap, v_depth3.xy).r;//nz0 + nz1 + nz2 + nz3;//decodeRGB2Float(texture2D(u_depthMap, v_depth3.xy).rgb);
        float shadow;
        if (any(lessThan(v_depth3.xy, vec2(0.0))) || any(greaterThan(v_depth3.xy, vec2(1.0)))) {
            shadow = 1.0;
        } else {
            shadow = clamp(z * exp((-d) * 80.0), 0.5, 1.0);
        }
        color *= d > 1.0 ? 1.0 : shadow;
    #endif

    gl_FragColor = vec4(color, baseColor.w);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
}
`;