export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_lumPCT;

#include <ACESToneMapping>

void main()
{
    vec3 lum_fact = vec3(0.27, 0.67, 0.06);
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;

    float ave_lum = texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    
    vec3 ecolor = ACESToneMapping(color, ave_lum, u_lumPCT.x);

    float t = dot(ecolor, vec3(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0));

    gl_FragColor = t > 0.9 ? vec4(color, 1.0) : vec4(0.0);
}
`;
