export default `#version 100
attribute vec4 a_position;
attribute vec2 a_texcoord;
varying vec2 o_uv;

void main()
{
    o_uv = a_texcoord; // vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    gl_Position = a_position;
}
`;
