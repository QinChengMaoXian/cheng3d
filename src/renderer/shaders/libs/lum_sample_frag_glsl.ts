export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;

void main()
{
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;
    float lum = dot(vec3(0.299, 0.587, 0.114), color) + 0.0001;
    
    gl_FragColor = vec4(vec3(lum), 1.0);
}
`;
