export default `#version 100
attribute vec4 a_position;
uniform mat4 u_mvpMat;
void main()
{
    gl_Position = u_mvpMat * a_position;
}
`;
