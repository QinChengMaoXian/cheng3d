export default `
precision mediump float;

varying vec2 o_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;

void main()
{
    vec4 lum_fact = vec4(0.27, 0.67, 0.06, 0.0);
    vec4 color = texture2D(u_diffuseMap, o_uv);

    float ave_1_lum = 1.0 / texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    float cur_lum = dot(lum_fact, color);
    
    color *= ave_1_lum * cur_lum;
    color /= vec4(vec4(1.0, 1.0, 1.0, 0.0) + color);

    float t = dot(color, vec4(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0, 0.0));

    gl_FragColor = t > 0.8 ? color : vec4(0.0);
}
`;
