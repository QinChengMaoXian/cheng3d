export default `

precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;
uniform vec2 u_pixelDir;
uniform vec4 u_cameraRange;
#ifdef KERNEL_RADIUS 
    uniform float u_weight[KERNEL_RADIUS];
#endif

#include <encodeFloat2RGBA>
#include <decodeRGBA2Float>

void main()
{
    vec2 dir = u_pixelDir * u_pixelSize;

    #ifdef KERNEL_RADIUS
        
    #else
        
    #endif

    float u_weight[4];
    u_weight[0] = 0.241971;
    u_weight[1] = 0.053991;
    u_weight[2] = 0.004432;
    u_weight[3] = 0.000134;

    float z = 300.0;
    float w = 1.0 / z;

    float d0 = decodeRGBA2Float(texture2D(u_diffuseMap, v_uv)) * z;

    float color = 1.0;

    #ifdef KERNEL_RADIUS
        for (int i = 0; i < KERNEL_RADIUS; i++) 
    #else
       
    #endif
    for (int i = 0; i < 4; i++) 
    {
        float d1 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv)) * z;
        float d2 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv)) * z;
        // float d1 = texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv).x * z;
        // float d2 = texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv).x * z;
        color += (exp(d1 - d0) + exp(d2 - d0)) * u_weight[i];
    }

    float result = clamp((d0 + log(color)) * w, 0.0, 0.999);
    gl_FragColor = vec4(encodeFloat2RGBA(result));
}
`;
