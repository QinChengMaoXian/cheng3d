export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_lumPCT;

// 美国电影艺术与科学学会的tone mapping (一堆magic number用来拟合曲线);
vec3 ACESToneMapping(vec3 color, float avgLum, float adapted_lum)
{
	const float A = 2.51;
	const float B = 0.03;
	const float C = 2.43;
	const float D = 0.59;
	const float E = 0.14;

	color *= adapted_lum / avgLum;
	return (color * (A * color + B)) / (color * (C * color + D) + E);
}

void main()
{
    vec3 lum_fact = vec3(0.27, 0.67, 0.06);
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;

    float ave_lum = texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    
    vec3 ecolor = ACESToneMapping(color, ave_lum, u_lumPCT.x);

    float t = dot(ecolor, vec3(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0));

    gl_FragColor = t > 0.8 ? vec4(ecolor, 1.0) : vec4(0.0);
}
`;
