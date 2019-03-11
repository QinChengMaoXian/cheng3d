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
        float u_weight[4];
        u_weight[0] = 0.241971;
        u_weight[1] = 0.053991;
        u_weight[2] = 0.004432;
        u_weight[3] = 0.000134;
    #endif

    const float scale = 300.0 / 2000.0;

    // float z = u_pixelDir.x == 1.0 ? u_cameraRange.x * scale : u_cameraRange.x;
    // float w = u_pixelDir.y == 1.0 ? u_cameraRange.y / scale : u_cameraRange.y;

    float z = 300.0;
    float w = 1.0 / z;

    float d0 = decodeRGBA2Float(texture2D(u_diffuseMap, v_uv)) * z;

    // float d0 = texture2D(u_diffuseMap, v_uv).x * z;

    float color = 0.398943;

    #ifdef KERNEL_RADIUS
        for (int i = 0; i < KERNEL_RADIUS; i++) 
    #else
        for (int i = 0; i < 4; i++) 
    #endif
    {
        float d1 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv)) * z;
        float d2 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv)) * z;
        // float d1 = texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv).x * z;
        // float d2 = texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv).x * z;
        color += (exp(d1 - d0) + exp(d2 - d0)) * u_weight[i];
    }

    float result = clamp((d0 + log(color)) * w, 0.0, 0.999);// (d0 + log(color)) * w; //
    gl_FragColor = vec4(encodeFloat2RGBA(result));
    // gl_FragColor = vec4(result);
}
`;
