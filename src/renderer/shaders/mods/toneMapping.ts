export const ACESToneMapping = `
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
`;
