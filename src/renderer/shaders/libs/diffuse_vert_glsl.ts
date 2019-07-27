export default `
attribute vec4 a_position;
attribute vec2 a_texcoord;
varying vec2 v_uv;
uniform mat4 u_mvpMat;
void main()
{
    v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    gl_Position = u_mvpMat * a_position;
}
`;
