export default `
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_worldPos;

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
    uniform sampler2D u_normalMap;
#endif

// #ifdef SHADOW_MAP
//     varying vec3 v_depth3;
//     uniform sampler2D u_depthMap;
// #endif

#ifdef DIRECTION_SHADOW_LIGHT
    uniform vec3 u_directionShadowDirs[DIRECTION_SHADOW_LIGHT];
    uniform vec4 u_directionShadowColors[DIRECTION_SHADOW_LIGHT];
    uniform sampler2D u_directionShadowMaps[DIRECTION_SHADOW_LIGHT];
    varying vec3 u_directionDepths[DIRECTION_SHADOW_LIGHT];  
#endif

#ifdef DIRECTION_LIGHT
    uniform vec3 u_directionDirs[DIRECTION_LIGHT];
    uniform vec4 u_directionColors[DIRECTION_LIGHT];
#endif

#ifdef POINT_SHADOW_LIGHT
    uniform vec3 u_pointShadowPos[POINT_SHADOW_LIGHT];
    uniform vec4 u_pointShadowColors[POINT_SHADOW_LIGHT];
    uniform samplerCube u_pointShadowMaps[POINT_SHADOW_LIGHT];
    uniform vec2 u_pointRanges[POINT_SHADOW_LIGHT];
#endif

#ifdef POINT_LIGHT
    uniform vec3 u_pointPos[POINT_LIGHT];
    uniform vec4 u_pointColors[POINT_LIGHT];
#endif

#ifdef SPOT_SHADOW_LIGHT
    uniform vec3 u_spotShadowPos[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowDirs[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowColors[SPOT_SHADOW_LIGHT];
    uniform sampler2D u_spotShadowMaps[SPOT_SHADOW_LIGHT];
    uniform mat4 u_spotMats[SPOT_SHADOW_LIGHT];
    uniform vec2 u_spotRanges[SPOT_SHADOW_LIGHT];
    #if SPOT_SHADOW_LIGHT > 0
        // varying highp vec3 v_spotDepths_0;
    #endif
     
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_spotPos[SPOT_LIGHT];
    uniform vec4 u_spotDirs[SPOT_LIGHT];
    uniform vec4 u_spotColors[SPOT_LIGHT];
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

// uniform sampler2D u_testMaps[4];

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;

uniform vec3 u_lightDir;

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

float calcShadow(vec3 depth3, float z) {
    float d = depth3.z;
    float shadow;
    if (any(lessThan(depth3.xy, vec2(0.0))) || any(greaterThan(depth3.xy, vec2(1.0)))) {
        shadow = 1.0;
    } else {
        shadow = clamp(exp((z - d) * 300.0), 0.0, 1.0);
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
    float endShadow = 1.0;

    // 方向光阴影
    #ifdef DIRECTION_SHADOW_LIGHT
        #if DIRECTION_SHADOW_LIGHT > 0
        {
            vec3 depth3 = u_directionDepths[0];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[0], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[0], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[0], u_directionShadowColors[0]) * shadow;
            // endShadow *= shadow; 
        }
        #endif
        #if DIRECTION_SHADOW_LIGHT > 1
        {
            vec3 depth3 = u_directionDepths[1];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[1], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[1], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[1], u_directionShadowColors[1]) * shadow;
            // endShadow *= shadow;
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
            vec3 pos = u_pointShadowPos[0];
            vec4 color = u_pointShadowColors[0];
            vec3 d3 = v_worldPos - pos;
            float d = length(d3);
            d3 /= d;
            d3 = vec3(d3.x, d3.z, -d3.y);

            float bias = max((5.0 - dot(N, -d3)), 2.0);
            float shadow = 0.0;

            #ifndef POINT_SHADOW_PCF_0
                
                float diskRadius = (1.0 + (d * u_pointRanges[0].y)) * 0.005;// / 25.0;
                for (int i = 0; i < 2; i++) {
                    for (int j = 0; j < 2; j++) {
                        for (int k = 0; k < 2; k++) {
                            vec3 bbi = vec3( i == 0 ? 1.0: -1.0 ,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                            float z = u_pointRanges[0].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[0], d3 + bbi));
                            float sh = d - bias > z ? 0.0 : 1.0;
                            shadow += d > u_pointRanges[0].x ? 1.0 : sh;
                        }
                    }
                }

                for (int j = 0; j < 2; j++) {
                    for (int k = 0; k < 2; k++) {
                        vec3 bbi = vec3( 0,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                        float z = u_pointRanges[0].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[0], d3 + bbi));
                        float sh = d - bias > z ? 0.0 : 1.0;
                        shadow += d > u_pointRanges[0].x ? 1.0 : sh;
                    }
                }

                for (int j = 0; j < 2; j++) {
                    for (int k = 0; k < 2; k++) {
                        vec3 bbi = vec3( k == 0 ? 1.0: -1.0,   j == 0 ? 1.0: -1.0 ,0   ) * diskRadius;
                        float z = u_pointRanges[0].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[0], d3 + bbi));
                        float sh = d - bias > z ? 0.0 : 1.0;
                        shadow += d > u_pointRanges[0].x ? 1.0 : sh;
                    }
                }

                for (int j = 0; j < 2; j++) {
                    for (int k = 0; k < 2; k++) {
                        vec3 bbi = vec3( j == 0 ? 1.0: -1.0 , 0,   k == 0 ? 1.0: -1.0 ) * diskRadius;
                        float z = u_pointRanges[0].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[0], d3 + bbi));
                        float sh = d - bias > z ? 0.0 : 1.0;
                        shadow += d > u_pointRanges[0].x ? 1.0 : sh;
                    }
                }

                shadow /= 20.0;
            #else
                float z = u_pointRanges[0].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[0], d3));
                shadow = d - bias > z ? 0.0 : 1.0;
                shadow = d > u_pointRanges[0].x ? 1.0 : shadow;
            #endif
            
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(pos - v_worldPos), color) * shadow;
        }
        #endif

        #if POINT_SHADOW_LIGHT > 1
        {
            const int index = 1;
            vec3 pos = u_pointShadowPos[1];
            vec4 color = u_pointShadowColors[1];
            vec3 d3 = v_worldPos - pos;
            float d = length(d3);
            d3 /= d;
            d3 = vec3(d3.x, d3.z, -d3.y);

            float bias = max((5.0 - dot(N, -d3)), 2.0);
            float shadow = 0.0;

            float z = u_pointRanges[1].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[index], d3));
            shadow = d - bias > z ? 0.0 : 1.0;
            shadow = d > u_pointRanges[1].x ? 1.0 : shadow;

            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(pos - v_worldPos), color) * shadow;
        }
        #endif
    #endif

    #ifdef POINT_LIGHT
        for (int i = 0; i < POINT_LIGHT; i++) {
            vec3 pos = u_pointPos[i];
            vec4 color = u_pointColors[i];
            vec3 d3 = pos - v_worldPos;
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(d3), color) / dot(d3, d3);
        }
    #endif

    // 聚光灯阴影
    #ifdef SPOT_SHADOW_LIGHT
        #if SPOT_SHADOW_LIGHT > 0
        {
            // vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y);//u_spotDepths[0]; 
            // depth3.z *= u_spotRanges[0].y;

            vec4 depthVec = u_spotMats[0] * vec4(v_worldPos, 1.0);
            vec3 depth3 = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y); //v_spotDepths_0;// 
            
            float z = decodeRGBA2Float(texture2D(u_spotShadowMaps[0], depth3.xy));
            float shadow;

            shadow = depth3.z - 0.005 > z ? 0.0 : 1.0;
            shadow = (any(lessThan(depth3.xy, vec2(0.0))) || any(greaterThan(depth3.xy, vec2(1.0)))) ? 1.0 : shadow;
            shadow = (depth3.z > 1.0 || depth3.z < 0.0) ? 1.0 : shadow;

            // shadow = calcShadow(depth3, z); // (depth3.z > 1.0 || depth3.z < 0.0) ? 1.0 : shadow;
            // = depth3.z > z ? 1.0 : 0.0;// ;
            // endShadow *= shadow;

            vec3 pos = u_spotShadowPos[0];
            vec4 color = u_spotShadowColors[0];
            vec4 dir = u_spotShadowDirs[0];
            vec3 d3 = pos - v_worldPos;
            vec3 d3_norm = normalize(d3);
            float ag = step(dir.w, dot(dir.xyz, d3_norm));
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, d3_norm, color) * ag * shadow;   
            
            // lo = depth3;
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

    #ifdef SHADOW_MAP
        // PCF
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
        //         float depth2 = decodeRGBA2Float(texture2D(u_depthMap, s_uv).rgb);
        //         shadow += clamp(exp(200.0 * (depth2 - depth)), 0.5, 1.0); 
        //         // shadow += (depth - bias > depth2 ? 0.5 : 1.0);
        //     }
        // }
        // float shadow = (depth > depth2 ? 0.5 : 1.0);

        // 改进的ESM手动差值部分，测试了一下，encode的float可以在encode状态下差值，最终结果是正确的。
        // vec2 depthPixelSize = vec2(1.0 / 512.0);
        // vec2 fullUV = v_depth3.xy * vec2(512.0, 512.0) - vec2(0.5);
        // vec2 floorUV = floor(fullUV) + vec2(0.5);
        // vec2 ceilUV = ceil(fullUV) + vec2(0.5);
        // vec2 fractUV = fract(fullUV);
        // vec2 invfractUV = vec2(1.0) - fractUV;

        // float z0 = decodeRGBA2Float(texture2D(u_depthMap, ceilUV * depthPixelSize));
        // float z1 = decodeRGBA2Float(texture2D(u_depthMap, vec2(ceilUV.x, floorUV.y) * depthPixelSize));
        // float z2 = decodeRGBA2Float(texture2D(u_depthMap, vec2(floorUV.x, ceilUV.y) * depthPixelSize));
        // float z3 = decodeRGBA2Float(texture2D(u_depthMap, floorUV * depthPixelSize));

        // float nz0 = z3 * invfractUV.x * invfractUV.y;
        // float nz1 = z2 * invfractUV.x * fractUV.y;
        // float nz2 = z1 * fractUV.x * invfractUV.y;
        // float nz3 = z0 * fractUV.x * fractUV.y;
        // texture2D(u_depthMap, v_depth3.xy).r;// nz0 + nz1 + nz2 + nz3;// 

        // float d = v_depth3.z;
        // float z = decodeRGBA2Float(texture2D(u_depthMap, v_depth3.xy)); 
        // float shadow;
        // if (any(lessThan(v_depth3.xy, vec2(0.0))) || any(greaterThan(v_depth3.xy, vec2(1.0)))) {
        //     shadow = 1.0;
        // } else {
        //     shadow = clamp(exp((z - d) * 300.0), 0.0, 1.0); //d > z ? 1.0 : 
        // }
        // shadow = d > 1.0 ? 1.0 : shadow;
        // lo = mix(lo * 0.75 + vec3(0.0, 0.0, 1.0) * 0.25, vec3(0.0), shadow);
        // lo *= vec3(1.0 - shadow, 1.0, 1.0);
    #endif    

    vec3 color = (ambient) + lo; //
    gl_FragColor = vec4(color, baseColor.w);
    // #ifdef DIRECTION_SHADOW_LIGHT
    //     gl_FragColor.xyz = vec3(decodeRGBA2Float(texture2D(u_directionShadowMaps[0], u_directionDepths[0].xy))) + color * 0.01;
    //     gl_FragColor.w = 1.0;
    // #else
    //     gl_FragColor = vec4(color, baseColor.w);
    // #endif
    
    // gl_FragColor = vec4(vec3(color), 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
}
`;