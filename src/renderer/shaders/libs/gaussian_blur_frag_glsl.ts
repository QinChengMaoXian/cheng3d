export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;
uniform vec2 u_pixelDir;

void main()
{
    vec2 dir = u_pixelDir * u_pixelSize;
    
    vec4 result_color = vec4(0.0);

    // 0.398943, 0.241971, 0.053991, 0.004432, 0.000134
    result_color += texture2D(u_diffuseMap, dir * vec2(4.0, 4.0) + v_uv) * 0.000134;
    result_color += texture2D(u_diffuseMap, dir * vec2(3.0, 3.0) + v_uv) * 0.004432;
    result_color += texture2D(u_diffuseMap, dir * vec2(2.0, 2.0) + v_uv) * 0.053991;
    result_color += texture2D(u_diffuseMap, dir * vec2(1.0, 1.0) + v_uv) * 0.241971;

    result_color += texture2D(u_diffuseMap, dir * vec2(0.0, 0.0) + v_uv) * 0.398943;

    result_color += texture2D(u_diffuseMap, dir * vec2(-1.0, -1.0) + v_uv) * 0.241971;
    result_color += texture2D(u_diffuseMap, dir * vec2(-2.0, -2.0) + v_uv) * 0.053991;
    result_color += texture2D(u_diffuseMap, dir * vec2(-3.0, -3.0) + v_uv) * 0.004432;
    result_color += texture2D(u_diffuseMap, dir * vec2(-4.0, -4.0) + v_uv) * 0.000134;

    gl_FragColor = vec4(result_color.xyz, 1.0);
}

`;
