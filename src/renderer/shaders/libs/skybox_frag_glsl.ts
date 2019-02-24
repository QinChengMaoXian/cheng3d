export default `
precision mediump float;

varying vec3 v_uv;
uniform samplerCube u_diffuseMap;

void main()
{
    vec4 baseColor = textureCube(u_diffuseMap, v_uv);
    gl_FragColor = vec4(baseColor.xyz, 1.0);
}
`;
