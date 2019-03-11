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

#include <encodeFloat2RGB>
#include <decodeRGB2Float>

void main()
{
    vec2 dir = u_pixelDir * u_pixelSize;
    // vec4 fact = vec4(0.241971, 0.053991, 0.004432, 0.000134);

    float fact[4];
    fact[0] = 0.241971;
    fact[1] = 0.053991;
    fact[2] = 0.004432;
    fact[3] = 0.000134;

    // float d0 = decodeRGB2Float(texture2D(u_diffuseMap, v_uv).xyz) * u_cameraRange.x;
    float d0 = texture2D(u_diffuseMap, v_uv).x * u_cameraRange.x;

    float color = 0.398943;

    for (int i = 0; i < 4; i++) 
    {
        // float d1 = decodeRGB2Float(texture2D(u_diffuseMap, dir * vec2(float(i)) + v_uv).xyz) * u_cameraRange.x;
        // float d2 = decodeRGB2Float(texture2D(u_diffuseMap, dir * vec2(float(-i)) + v_uv).xyz) * u_cameraRange.x;
        float d1 = texture2D(u_diffuseMap, dir * vec2(float(i)) + v_uv).x * u_cameraRange.x;
        float d2 = texture2D(u_diffuseMap, dir * vec2(float(i)) + v_uv).x * u_cameraRange.x;
        color += (exp(d1 - d0) + exp(d2 - d0)) * fact[i];
    }

    float result = (d0 + log(color)) * u_cameraRange.y;
    // gl_FragColor = vec4(encodeFloat2RGB(result), 1.0);
    gl_FragColor = vec4(vec3(result), 1.0);
}
`;
