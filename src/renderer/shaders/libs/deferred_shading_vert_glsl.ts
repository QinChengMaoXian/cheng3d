export default `

attribute vec4 a_position;

#ifdef POINT_LIGHT
    uniform mat4 u_mvpMat;
#endif

void main()
{
    #ifdef POINT_LIGHT
        gl_Position = u_mvpMat * a_position;
    #else
        gl_Position = a_position;
    #endif   
}
`;