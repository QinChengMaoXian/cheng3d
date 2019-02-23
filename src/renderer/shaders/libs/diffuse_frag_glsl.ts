export default `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_diffuseMap;
uniform vec4 u_baseColor;

void main()
{
    vec4 baseColor = texture2D(u_diffuseMap, v_uv) * u_baseColor;
    gl_FragColor = vec4(baseColor.xyz, 1.0);
}
`;
