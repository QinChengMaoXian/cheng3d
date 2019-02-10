export default `#version 100
attribute vec4 a_position;
attribute vec2 a_texcoord;
varying vec2 o_uv;
uniform mat4 u_mMat;
uniform mat4 u_vpMat;
void main()
{
    o_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    gl_Position = u_vpMat * u_mMat * a_position;
}
`;
