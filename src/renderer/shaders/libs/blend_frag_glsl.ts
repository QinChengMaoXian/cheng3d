export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_aoMap;

void main()
{
    vec4 color = texture2D(u_diffuseMap, v_uv);

    vec4 ao = texture2D(u_aoMap, v_uv);

    vec4 result = color * ao.a + ao * (1.0 - ao.a);

    result.a = 1.0;

    gl_FragColor = result;
}
`;
