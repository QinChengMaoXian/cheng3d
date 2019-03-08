export const shadowMapDefine = `
uniform sampler2D u_depthMap;
uniform mat4 u_depthMat;
`;

export const standardShadowMap = `
#include <decodeRGB2Float>

vec4 standardShadowMap()
{

}

`;

