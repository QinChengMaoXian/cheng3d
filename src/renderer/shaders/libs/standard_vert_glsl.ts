export default `
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;
attribute vec3 a_tangent;

varying vec2 v_uv;
varying vec3 v_tangentToView0;
varying vec3 v_tangentToView1;
varying vec3 v_tangentToView2;
varying vec3 v_worldPos;
varying vec3 v_normal;

uniform mat4 u_mMat;
uniform mat4 u_mvpMat;

void main()
{
    v_uv = a_texcoord;

    vec4 worldPos = u_mMat * a_position;
    v_worldPos = worldPos.xyz / worldPos.w;

    vec4 normal = u_mMat * vec4(a_normal, 0.0);
    v_normal = normalize(normal.xyz);

    vec3 binormal = normalize(cross(a_tangent, a_normal));
    mat3 normalMatrix = mat3(a_tangent, binormal, a_normal);
    mat3 mMatrix3 = mat3(
        u_mMat[0].xyz, 
        u_mMat[1].xyz, 
        u_mMat[2].xyz
    );

    mat3 tangentToView = mMatrix3 * normalMatrix;

    v_tangentToView0 = tangentToView[0];
    v_tangentToView1 = tangentToView[1];
    v_tangentToView2 = tangentToView[2];

    gl_Position = u_mvpMat * a_position;
}
`;