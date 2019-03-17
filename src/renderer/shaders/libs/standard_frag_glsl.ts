export default `
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_worldPos;

#include <ShadowMapDefine>
#include <LightingDefine>

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
    uniform sampler2D u_normalMap;
#endif

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

uniform sampler2D u_diffuseMap;

uniform sampler2D u_roughnessMap;
uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

const float PI = 3.14159265359;
const float inv_PI = 1.0 / PI;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;

#include <distributionGGX>
#include <geometrySmith>
#include <fresnelSchlick>
#include <fresnelSchlickRoughness>

#include <decodeRGBA2Float>

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

// 计算esm 当前c值为300
float calcShadow(vec3 depth3, float z) {
    float d = depth3.z;
    float shadow;
    if (any(lessThan(depth3.xy, vec2(0.0))) || any(greaterThan(depth3.xy, vec2(1.0)))) {
        shadow = 1.0;
    } else {
        shadow = clamp(exp((z - d + 0.0005) * 300.0), 0.0, 1.0);
    }
    return (d > 1.0 || d < 0.0) ? 1.0 : shadow;
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

    vec4 spec = texture2D(u_roughnessMap, v_uv);
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec3 albedo = baseColor.xyz;

    vec3 F0 = vec3(0.04);
    
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    // 是否存在法线贴图
    #ifdef NORMAL_MAP
        vec3 normal = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
        vec3 N = normalize(normal.x * v_tangent + normal.y * v_binormal + normal.z * v_normal);
    #else
        vec3 N = normalize(v_normal);
    #endif

    vec3 V = normalize(u_cameraPos - v_worldPos);

    float NdotV = dot_plus(N, V);

    vec3 lo = vec3(0.0);

    // 方向光阴影
    #ifdef DIRECTION_SHADOW_LIGHT
        #if DIRECTION_SHADOW_LIGHT > 0
        {
            vec3 depth3 = u_directionDepths[0];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[0], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[0], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[0], u_directionShadowColors[0]) * shadow;
        }
        #endif
        #if DIRECTION_SHADOW_LIGHT > 1
        {
            vec3 depth3 = u_directionDepths[1];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[1], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[1], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[1], u_directionShadowColors[1]) * shadow;
        }
        #endif
    #endif

    #ifdef DIRECTION_LIGHT
        for (int i = 0; i < DIRECTION_LIGHT; i++) {
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionDirs[i], u_directionColors[i]);
        }
    #endif

    // 点光源阴影
    #ifdef POINT_SHADOW_LIGHT
        #if POINT_SHADOW_LIGHT > 0
        {
            #define POINT_MAP_INDEX 0
            #ifndef POINT_SHADOW_PCF_0
                #define POINT_SHADOW_PCF
            #endif
            #include<PointShadowCalc>
            #ifndef POINT_SHADOW_PCF_0
                #undef POINT_SHADOW_PCF
            #endif
            #undef POINT_MAP_INDEX
        }
        #endif

        #if POINT_SHADOW_LIGHT > 1
        {
            #define POINT_MAP_INDEX 1
            #ifndef POINT_SHADOW_PCF_0
                #define POINT_SHADOW_PCF
            #endif
            #include<PointShadowCalc>
            #ifndef POINT_SHADOW_PCF_0
                #undef POINT_SHADOW_PCF
            #endif
            #undef POINT_MAP_INDEX
        }
        #endif
    #endif

    #ifdef POINT_LIGHT
        for (int i = 0; i < POINT_LIGHT; i++) {
            vec3 pos = u_pointPos[i];
            vec4 color = u_pointColors[i];
            vec3 d3 = pos - v_worldPos;
            float d3len = length(d3);
            float factor = max(1.0 - (1.0 - color.w) * (d3len * d3len), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(d3), color) * factor;
        }
    #endif

    // 聚光灯阴影
    #ifdef SPOT_SHADOW_LIGHT
        #if SPOT_SHADOW_LIGHT > 0
        {
            vec4 depthVec = u_spotMats[0] * vec4(v_worldPos, 1.0);
            vec3 depth3 = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y); //v_spotDepths_0;// 
            
            vec3 pos = u_spotShadowPos[0];
            vec4 color = u_spotShadowColors[0];
            vec4 dir = u_spotShadowDirs[0];

            vec3 d3 = pos - v_worldPos;
            vec3 L = normalize(d3);
            
            float bias = max(0.05 * (1.0 - dot(N, L)), 0.01);

            float shadow = 0.0;
            for (int i = -1; i <= 1; i++) {
                for (int j = -1; j <= 1; j++) {
                    vec2 sp_uv = depth3.xy + u_spotRanges[0].zw * vec2(float(i), float(j));
                    float z = decodeRGBA2Float(texture2D(u_spotShadowMaps[0], sp_uv));
                    float sh = depth3.z - bias > z ? 0.0 : 1.0;
                    sh = (any(lessThan(sp_uv, vec2(0.0))) || any(greaterThan(sp_uv, vec2(1.0)))) ? 1.0 : sh;
                    shadow += (depth3.z > 1.0 || depth3.z < 0.0) ? 1.0 : sh;
                }
            }
            shadow /= 9.0;

            float ag = step(dir.w, dot(dir.xyz, L));
            float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, L, color) * factor * ag * shadow;   
        }
        #endif
        #if SPOT_SHADOW_LIGHT > 1
        #endif
    #endif

    #ifdef SPOT_LIGHT
        for (int i = 0; i < SPOT_LIGHT; i++) {
            vec3 pos = u_spotPos[i];
            vec4 color = u_spotColors[i];
            vec4 dir = u_spotDirs[i];
            vec3 d3 = pos - v_worldPos;
            vec3 d3_norm = normalize(d3);
            float ag = step(dir.w, dot(dir.xyz, d3_norm));
            float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, d3_norm, color)  * factor * ag;
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

    vec3 color = (ambient) + lo;
    gl_FragColor = vec4(color, baseColor.w);
}
`;