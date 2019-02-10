export default `#version 100
precision mediump float;
varying vec2 o_uv;
uniform sampler2D u_diffuseMap;

void main()
{
    vec4 baseColor = texture2D(u_diffuseMap, o_uv);
    gl_FragColor = vec4(baseColor.xyz, 1.0);
}
`;
