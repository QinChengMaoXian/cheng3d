export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_bloomMap;
uniform sampler2D u_lumMap;
uniform vec2 u_lumPCT;
uniform vec2 u_pixelSize;

void main()
{
    vec4 lum_fact = vec4(0.27, 0.67, 0.06, 0.0);
    vec4 color = texture2D(u_diffuseMap, o_uv);

    float ave_1_lum = 1.0 / texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    float cur_lum = dot(lum_fact, color);
    
    color *= u_lumPCT.x * ave_1_lum * cur_lum;
    color /= vec4(vec4(1.0, 1.0, 1.0, 0.0) + color);

    vec4 bloom = vec4(0.0);//texture2D(u_bloomMap, o_uv);

    bloom += texture2D(u_bloomMap, u_pixelSize * vec2(1.0, 1.0) + o_uv);
    bloom += texture2D(u_bloomMap, u_pixelSize * vec2(1.0, -1.0) + o_uv);
    bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-1.0, 1.0) + o_uv);
    bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-1.0, -1.0) + o_uv);

    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(4, 4) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-2, 3) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(1, 2) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-4, 1) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(3, -1) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-1, -2) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(-3, -3) + o_uv);
    // bloom += texture2D(u_bloomMap, u_pixelSize * vec2(2, -4) + o_uv);

    bloom *= 1.3 * 0.25;

    gl_FragColor = clamp(color + bloom, 0.0, 1.0);
}
`;
