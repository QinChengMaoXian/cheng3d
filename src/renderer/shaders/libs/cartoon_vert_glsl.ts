export default `
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform mat4 u_mvpMat;
uniform mat4 u_mMat;
uniform mat4 u_mIMat;

void main()
{
    v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    v_normal = normalize((u_mIMat * vec4(a_normal, 1.0)).xyz);
    v_position = (u_mMat * a_position).xyz;
    gl_Position = u_mvpMat * a_position;
}
`;
