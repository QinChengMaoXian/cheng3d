export default `
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;
attribute vec3 a_tangent;

varying vec2 v_uv;
varying vec3 v_worldPos;
varying vec3 v_viewPos;
varying vec3 v_normal;

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
#endif

varying float v_depth;

uniform vec4 u_uvOffset;

uniform mat4 u_mMat;
uniform mat4 u_mvMat;
uniform mat4 u_mITMat;
uniform mat4 u_mvpMat;
uniform vec4 u_cameraRange;

#ifdef DIRECTION_SHADOW_LIGHT
    uniform mat4 u_directionMats[DIRECTION_SHADOW_LIGHT];
    varying vec3 u_directionDepths[DIRECTION_SHADOW_LIGHT];  
#endif

#ifdef SPOT_SHADOW_LIGHT
    // uniform mat4 u_spotMats[SPOT_SHADOW_LIGHT];
    // uniform vec2 u_spotRanges[SPOT_SHADOW_LIGHT];
    // varying vec3 v_spotDepths[SPOT_SHADOW_LIGHT];  
    #if SPOT_SHADOW_LIGHT > 0
        // varying highp vec3 v_spotDepths_0;
    #endif

#endif

// #ifdef SHADOW_MAP
//     uniform mat4 u_depthMat;
//     varying vec3 v_depth3;  
// #endif

void main()
{
    v_uv = a_texcoord * u_uvOffset.xy + u_uvOffset.zw;

    vec4 worldPos = u_mMat * a_position;
    v_worldPos = worldPos.xyz;

    #ifdef NORMAL_MAP
        v_tangent = normalize((u_mMat * vec4(a_tangent, 0.0)).xyz);
        v_binormal = cross(v_tangent, v_normal);
    #endif
    v_normal = normalize((u_mITMat * vec4(a_normal, 0.0)).xyz);

    v_viewPos = (u_mvMat * a_position).xyz;

    vec4 pos = u_mvpMat * a_position;
    v_depth = pos.w * u_cameraRange.y;

    // #ifdef SHADOW_MAP
    //     vec4 depthVec = u_depthMat * vec4(v_worldPos, 1.0);
    //     v_depth3 = depthVec.xyz * 0.5 + 0.5;
    // #endif

    #ifdef DIRECTION_SHADOW_LIGHT
        for (int i = 0; i < DIRECTION_SHADOW_LIGHT; i++) {
            vec4 depthVec = u_directionMats[i] * vec4(v_worldPos, 1.0);
            u_directionDepths[i] = depthVec.xyz * 0.5 + 0.5;
        }
    #endif

    #ifdef SPOT_SHADOW_LIGHT

        #if SPOT_SHADOW_LIGHT > 0
            // vec4 depthVec = u_spotMats[0] * vec4(v_worldPos, 1.0);
            // v_spotDepths_0 = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y);
        #endif

        // for (int i = 0; i < SPOT_SHADOW_LIGHT; i++) {
        //     vec4 depthVec = u_spotMats[i] * vec4(v_worldPos, 1.0);
        //     u_spotDepths[i] = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[i].y);
        // }
    #endif

    gl_Position = pos;
}
`;