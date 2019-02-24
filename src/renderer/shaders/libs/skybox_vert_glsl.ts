export default `

attribute vec3 a_position;

varying vec3 v_uv;

uniform mat4 u_vpMat;
uniform vec3 u_cameraPos;

void main()
{
    v_uv = vec3(-a_position.x, -a_position.z, a_position.y);
    vec4 pos = u_vpMat * vec4(u_cameraPos - a_position, 1.0);
    gl_Position = pos.xyww;
}
`;
