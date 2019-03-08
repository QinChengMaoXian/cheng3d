export const distributionGGX = `
// 法线分布统计
float distributionGGX(vec3 N, vec3 H, float roughness)
{
    float a2     = roughness * roughness;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;

    float nom    = a2;
    float denom  = (NdotH2 * (a2 - 1.0) + 1.0);
    denom        = PI * denom * denom;

    return nom / denom;
}
`;

export const geometrySmith = `
float geometrySchlickGGX(float NdotV, float k)
{
    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

// Schlick几何方程
float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness) 
{
    float NdotV = max(dot(N, V), 0.00001);
    float NdotL = max(dot(N, L), 0.00001);

    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;

    float ggx2  = geometrySchlickGGX(NdotV, k);
    float ggx1  = geometrySchlickGGX(NdotL, k);

    return ggx1 * ggx2;
}
`;

export const fresnelSchlick = `
//Schlick菲涅尔方程
vec3 fresnelSchlick(float NdotL, vec3 F0)
{
    return F0 + (vec3(1.0) - F0) * pow((1.0 - NdotL), 5.0);
}
`;

export const fresnelSchlickRoughness = `
//Schlick菲涅尔方程，带粗糙度
vec3 fresnelSchlickRoughness(float NdotL, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow((1.0 - NdotL), 5.0);
}
`;

// vec3 brdf = FastDFG(roughness, NdotV, NdotL) * metalic;
export const fastDFG = `
float fastDFG(float roughness, float NoV, float NoL)
{
    float a = roughness * roughness;
    float a2 = a * a;
    float G_V = NoV + sqrt( (NoV - NoV * a2) * NoV + a2 );
    float G_L = NoL + sqrt( (NoL - NoL * a2) * NoL + a2 );
    return 1.0 / ( G_V * G_L );
}
`;

