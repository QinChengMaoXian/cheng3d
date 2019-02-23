export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;

void main()
{
    vec4 result_color = vec4(0.0);

    vec2 pixelSize = u_pixelSize.xy;

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, 1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, 1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, -1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, -1.5) + v_uv);

    result_color *= 1.0 / 16.0;

    gl_FragColor = vec4(result_color.xyz, 1.0);
}
`;
