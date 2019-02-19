export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;

void main()
{
    vec4 result_color = vec4(0);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2( 1.0,  1.0) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.0,  1.0) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2( 1.0, -1.0) + o_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.0, -1.0) + o_uv);

    result_color *= 0.25;

    gl_FragColor = vec4(result_color.xyz, 1.0);
}
`;
