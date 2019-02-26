export default `
precision mediump float;

varying vec2 v_uv;

#ifdef NORMAL_MAP
    uniform sampler2D u_normalMap;
#endif 

uniform sampler2D u_depthMap;

uniform mat4 u_pMat;
uniform vec4 u_multiUsing;

const int SAMPLE_NUM = 8;

uniform vec3 u_samples[SAMPLE_NUM];

float calcViewZ(vec2 uv)    
{
    float depth = texture2D(u_depthMap, uv).x;
    float ViewZ = u_multiUsing.w / (2.0 * depth - 1.0 - u_multiUsing.z);
    return ViewZ;
}

void main()
{

    vec2 viewRay = vec2(gl_FragCoord.x * u_multiUsing.x * u_multiUsing.y, gl_FragCoord.x * u_multiUsing.y);

    float viewZ = calcViewZ(v_uv);
    float viewX = viewRay.x * viewZ;
    float viewY = viewRay.y * viewZ;

    vec3 pos = vec3(viewX, viewY, viewZ);

    float d = viewZ / 2000.0;

    float ao = 0.0;

    for (int i = 0; i < SAMPLE_NUM; i++) {
        vec4 np = u_pMat * vec4(vec3(pos + u_samples[i]), 1.0);
        np /= np.w;
        float nz = calcViewZ(np.xy);    
        ao += nz > viewZ ? 0.125 : 0.0;
    }
    ao /= 8.0;

    #ifdef NORMAL_MAP
        // d = 1.0;
    #else

    #endif 

    gl_FragColor = vec4(vec3(0.0), 1.0 - ao);
}
`;
