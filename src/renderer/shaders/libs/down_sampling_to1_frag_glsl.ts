export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_pixelSize;
uniform vec2 u_lumPCT;

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
    

    float l = result_color.x / 16.0; //exp(result_color.x * 256.0) / 1024.0;

    vec2 lum = vec2(texture2D(u_lumMap, vec2(0.5, 0.5)).x, l);
    vec2 pct = vec2((1.0 - u_lumPCT.x), u_lumPCT.x);
    float fin = dot(lum, pct);
    
    gl_FragColor = vec4(fin, fin, fin, 1.0);
}
`;
