export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_pixelSize;
uniform vec2 u_lumPCT;

void main()
{
    vec4 lum_fact = vec4(0.27, 0.67, 0.06, 0.0);
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

    vec2 lum = vec2(texture2D(u_lumMap, vec2(0.5, 0.5)).x, dot(lum_fact, result_color));
    vec2 pct = vec2((1.0 - u_lumPCT.x), u_lumPCT.x);

    float fin = dot(lum, pct) + 0.0001;

    gl_FragColor = vec4(fin, fin, fin, 1.0);
}
`;
