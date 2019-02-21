export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;

void main()
{
    vec4 result_color = vec4(0.0);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, 0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, 1.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, 0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, 1.5) + o_uv);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, 0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, 1.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, 0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, 1.5) + o_uv);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, -0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, -1.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, -0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, -1.5) + o_uv);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, -0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, -1.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, -0.5) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, -1.5) + o_uv);

    result_color *= 1.0 / 16.0;

    // gl_FragColor = vec4(vec3(o_uv.x, o_uv.y, 0.0), 1.0);
    gl_FragColor = vec4(result_color.xyz, 1.0);
}
`;
