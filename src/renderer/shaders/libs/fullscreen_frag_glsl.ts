export default `
precision mediump float;
varying vec2 o_uv;
uniform sampler2D u_diffuseMap;

void main()
{
    vec4 baseColor = texture2D(u_diffuseMap, o_uv);
    // baseColor = pow(color, vec3(1.0/2.2)); 
    gl_FragColor = vec4(pow(baseColor.xyz, vec3(1.0/2.2)), 1.0);
}
`;
