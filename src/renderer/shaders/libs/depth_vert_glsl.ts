export default `

attribute vec4 a_position;

varying float v_depth;
uniform mat4 u_mvpMat;
uniform vec4 u_cameraRange;

#ifdef ALPHA_TEST
    attribute vec2 a_texcoord;

    varying vec2 v_uv;
    uniform vec4 u_uvOffset;
#endif

void main()
{
    #ifdef ALPHA_TEST
        v_uv = a_texcoord * u_uvOffset.xy + u_uvOffset.zw;
    #endif

    vec4 pos = u_mvpMat * a_position;
    v_depth = pos.w * u_cameraRange.y;
    gl_Position = pos;
}
`;