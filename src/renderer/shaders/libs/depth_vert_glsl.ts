export default `

attribute vec4 a_position;

varying float v_depth;
uniform mat4 u_mvpMat;
uniform vec4 u_cameraRange;


#ifdef POINT_SHADOW
    uniform mat4 u_mMat;
    uniform vec3 u_cameraPos;
#endif

#ifdef ALPHA_TEST
    attribute vec2 a_texcoord;

    varying vec2 v_uv;
    uniform vec4 u_uvOffset;
#endif

const float dd = 1.0 / sqrt(3.0);

void main()
{
    #ifdef ALPHA_TEST
        v_uv = a_texcoord * u_uvOffset.xy + u_uvOffset.zw;
    #endif

    vec4 pos = u_mvpMat * a_position;

    #ifdef POINT_SHADOW
        vec4 mpos = u_mMat * a_position;
        v_depth = length(mpos.xyz - u_cameraPos) * u_cameraRange.y * dd;
    #else
        v_depth = pos.w == 1.0 ? pos.z * 0.5 + 0.5 : pos.w * u_cameraRange.y; //
    #endif
    gl_Position = pos;
}
`;
