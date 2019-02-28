export default `
precision mediump float;

varying vec2 v_uv;

#ifdef NORMAL_MAP
    uniform sampler2D u_normalMap;
#endif 

uniform sampler2D u_depthMap;
uniform sampler2D u_randomMap;

uniform mat4 u_pMat;
uniform mat4 u_pIMat;
uniform vec4 u_multiUsing;
uniform vec4 u_cameraRange;
uniform vec2 u_pixelSize;

uniform vec3 u_samples[SAMPLE_NUM];

#include <decodeRGB2Float>

float linearToDepth(float l, float f, float n) 
{
    return (f + n - 2.0 * n * f) / (l * (f - n));
}

void main()
{
    // vec2 randomUV = v_uv * u_pixelSize;
    // vec3 randomDir = texture2D(u_randomMap, randomUV).xyz * 2.0;

    #ifdef NORMAL_MAP
        vec4 rt2 = texture2D(u_depthMap, v_uv);
        float d = decodeRGB2Float(rt2.xyz);
        float depth = linearToDepth(d * 2.0 - 1.0, u_cameraRange.x, u_cameraRange.y);
    #else
        float depth = texture2D(u_depthMap, v_uv).x;
        float d = depth;
    #endif 

    vec4 pos = u_pIMat * (vec4(v_uv, depth, 1.0) * 2.0 - 1.0);
    pos.xyz /= pos.w;

    float ao = 0.0;

    for (int i = 0; i < SAMPLE_NUM; i++) {
        vec4 np = u_pMat * vec4(vec3(pos.xyz + u_samples[i]), 1.0);
        np.xyz /= np.w;
        np.xyz = np.xyz * 0.5 + 0.5;

        #ifdef NORMAL_MAP
            vec4 rtn = texture2D(u_depthMap, np.xy);
            float nzSrc = decodeRGB2Float(rtn.xyz);
            float nz = linearToDepth(nzSrc * 2.0 - 1.0, u_cameraRange.x, u_cameraRange.y);
            float rangeCheck = smoothstep(0.0, 1.0, u_cameraRange.z / abs(nzSrc - d));
        #else
            float nz = texture2D(u_depthMap, np.xy).x;
            vec4 nView = u_pIMat * (vec4(np.xy, nz, 1.0) * 2.0 - 1.0);
            nView.xyz /= nView.w;
            float rangeCheck = smoothstep(0.0, 1.0, 1.0 / abs(pos.z - nView.z));
        #endif 
    
        ao += (nz < np.z ? 1.0 : 0.0) * rangeCheck;
    }
    ao /= float(SAMPLE_NUM);

    gl_FragColor = vec4(vec3(0.0), 1.0 - ao);
    // gl_FragColor = vec4(vec3(1.0 - ao), 1.0);
}
`;
