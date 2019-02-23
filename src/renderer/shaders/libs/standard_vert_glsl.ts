export default `
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;
attribute vec3 a_tangent;

varying vec2 v_uv;
varying vec3 v_worldPos;
varying vec3 v_normal;
varying vec3 v_tangent;
varying vec3 v_binormal;

uniform mat4 u_mMat;
uniform mat4 u_mITMat;
uniform mat4 u_mvpMat;

void main()
{
    v_uv = a_texcoord;

    vec4 worldPos = u_mMat * a_position;
    v_worldPos = worldPos.xyz / worldPos.w;

    v_tangent = normalize((u_mMat * vec4(a_tangent, 0.0)).xyz);
    v_normal = normalize((u_mITMat * vec4(a_normal, 0.0)).xyz);
    v_binormal = cross(v_tangent, v_normal);

    gl_Position = u_mvpMat * a_position;
}
`;