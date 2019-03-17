export const ShadowMapDefine = `
#ifdef DIRECTION_SHADOW_LIGHT
    uniform vec3 u_directionShadowDirs[DIRECTION_SHADOW_LIGHT];
    uniform vec4 u_directionShadowColors[DIRECTION_SHADOW_LIGHT];
    uniform sampler2D u_directionShadowMaps[DIRECTION_SHADOW_LIGHT];
    varying vec3 u_directionDepths[DIRECTION_SHADOW_LIGHT];  
#endif

#ifdef POINT_SHADOW_LIGHT
    uniform vec3 u_pointShadowPos[POINT_SHADOW_LIGHT];
    uniform vec4 u_pointShadowColors[POINT_SHADOW_LIGHT];
    uniform samplerCube u_pointShadowMaps[POINT_SHADOW_LIGHT];
    uniform vec2 u_pointRanges[POINT_SHADOW_LIGHT];
#endif

#ifdef SPOT_SHADOW_LIGHT
    uniform vec3 u_spotShadowPos[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowDirs[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowColors[SPOT_SHADOW_LIGHT];
    uniform sampler2D u_spotShadowMaps[SPOT_SHADOW_LIGHT];
    uniform mat4 u_spotMats[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotRanges[SPOT_SHADOW_LIGHT];     
#endif
`;

// 废弃
export const standardShadowMap = `
#include <decodeRGB2Float>

vec4 standardShadowMap()
{
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

}

`;

export const PointShadowCalc = `

    vec3 pos = u_pointShadowPos[POINT_MAP_INDEX];
    vec4 color = u_pointShadowColors[POINT_MAP_INDEX];
    vec3 d3 = v_worldPos - pos;
    float d = length(d3);
    d3 /= d;
    d3 = vec3(d3.x, d3.z, -d3.y);

    vec3 L = normalize(pos - v_worldPos);
    float bias = max(5.0 * (1.0 - dot(N, L)), 2.0);
    float shadow = 0.0;
    #ifdef POINT_SHADOW_PCF
        float diskRadius = (1.0 + (d * u_pointRanges[POINT_MAP_INDEX].y)) * 0.005;// / 25.0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    vec3 bbi = vec3( i == 0 ? 1.0: -1.0 ,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                    float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                    float sh = d - bias > z ? 0.0 : 1.0;
                    shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
                }
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( 0,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( k == 0 ? 1.0: -1.0,   j == 0 ? 1.0: -1.0 ,0   ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( j == 0 ? 1.0: -1.0 , 0,   k == 0 ? 1.0: -1.0 ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        shadow /= 20.0;
    #else
        float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3));
        shadow = d - bias > z ? 0.0 : 1.0;
        shadow = d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : shadow;
    #endif

    float factor = max(1.0 - (1.0 - color.w) * (d * d), 0.0);
    // float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
    lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, L, color) * factor * shadow;
`;

