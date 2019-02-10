export default `#version 100
precision mediump float;
uniform vec4 u_baseColor;

void main()
{
    gl_FragColor = vec4(u_baseColor.xyz, 1.0);
}
`;
