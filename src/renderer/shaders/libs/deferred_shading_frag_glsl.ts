export default `
#extension GL_EXT_shader_texture_lod : enable

precision highp float;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_depthMap;

uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

uniform mat4 u_vIMat;

uniform vec2 u_pixelSize;
uniform vec3 u_cameraPos;

uniform vec4 u_lightColor;
uniform vec4 u_cameraRange;

#ifdef POINT_LIGHT
    uniform vec3 u_lightPos;
#endif

uniform vec3 u_lightDir;

const float PI = 3.14159265359;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

// 法线分布统计
float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a2     = roughness * roughness;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;

    float nom    = a2;
    float denom  = (NdotH2 * (a2 - 1.0) + 1.0);
    denom        = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float k)
{
    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

// Schlick几何方程
float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) 
{
    float NdotV = max(dot(N, V), 0.00001);
    float NdotL = max(dot(N, L), 0.00001);

    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;

    float ggx2  = GeometrySchlickGGX(NdotV, k);
    float ggx1  = GeometrySchlickGGX(NdotL, k);

    return ggx1 * ggx2;
}

//Schlick菲涅尔方程
vec3 FresnelSchlick(float NdotL, vec3 F0)
{
    return F0 + (vec3(1.0) - F0) * pow((1.0 - NdotL), 5.0);
}  

//Schlick菲涅尔方程，带粗糙度
vec3 FresnelSchlickRoughness(float NdotL, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow((1.0 - NdotL), 5.0);
}

#include <decodeRGB2Float>

float linearToDepth(float l, float f, float n) 
{
    return (f + n - 2.0 * n * f) / (l * (f - n));
}

vec3 getViewPos(vec2 texCoord, float depth, vec4 cameraRange){
    //cameraRange.x: far
    //cameraRange.y: 1.0 / far
    //cameraRange.z: aspectRatio
    //cameraRange.w: tan(fovy * 0.5)
    float d = depth * cameraRange.x;
    float temp = d * cameraRange.w;
    return vec3(texCoord.x * cameraRange.z * temp, texCoord.y * temp, -d);
}

void main() 
{
    vec2 uv = gl_FragCoord.xy * u_pixelSize;

    vec4 rt0 = texture2D(u_diffuseMap, uv);
    vec4 rt1 = texture2D(u_normalMap, uv);
    vec4 rt2 = texture2D(u_depthMap, uv);

    vec3 albedo = rt0.xyz;
    vec3 normal = rt1.xyz * 2.0 - 1.0;
    float depth = decodeRGB2Float(rt2.xyz);

    vec3 viewPos = getViewPos(uv * 2.0 - 1.0, depth, u_cameraRange);
    // vec3 viewPos = rt2.xyz;// getViewPos(uv * 2.0 - 1.0, depth, u_cameraRange);

    vec3 worldPos = (u_vIMat * vec4(viewPos, 1.0)).xyz;
    // worldPos.xyz /= worldPos.w;

    // vec4 worldPos = vec4(rt2.xyz, 1.0);

    float roughness = rt0.w;
    float metallic = rt1.w;
    float ao = rt2.w;

    vec3 F0 = vec3(0.04);
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    vec3 L;

    #ifdef POINT_LIGHT
        // vec3 lightPos = (u_vMat * vec4(u_lightPos, 1.0)).xyz;
        L = normalize(u_lightPos - worldPos.xyz);
    #else
        L = u_lightDir.xyz;
    #endif

    // vec3 cameraPos = (u_vMat * vec4(u_cameraPos, 1.0)).xyz;

    vec3 V = normalize(u_cameraPos - worldPos.xyz);
    vec3 N = normalize(normal);
    vec3 H = normalize(V + L);

    float G = GeometrySmith(N, V, L, roughness);
    float D = DistributionGGX(N, H, roughness);
    vec3 F = FresnelSchlick(dot_plus(H, L), F0);

    vec3 nominator = D * G * F;//分子

    float NdotL = dot_plus(N, L); 
    float NdotV = dot_plus(N, V); 

    float denominator = 4.0 * NdotV * NdotL + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // 直接光照结果
    vec3 lo = (kD * (albedo) / PI + brdf) * u_lightColor.xyz * NdotL;

    #ifdef POINT_LIGHT
        vec3 d3 = u_lightPos - worldPos.xyz;
        float d = 1.0 / dot(d3, d3);
        lo *= d;
        gl_FragColor = vec4(vec3(lo), 1.0);
    #else
        vec3 R = N * dot_plus(N, V) * 2.0 - V; 
        R = vec3(R.x, R.z, -R.y);
        // 环境光部分
        vec3 coordN = vec3(N.x, N.z, -N.y);
        vec3 irradiance = textureCube(u_irradianceMap, coordN).xyz;
        vec3 diffuse = irradiance * albedo;
        vec3 F_s = FresnelSchlickRoughness(NdotV, F0, roughness);
        vec3 kD_a = vec3(1.0) - F_s;
        kD_a *= 1.0 - metallic;

        vec2 envBRDF  = texture2D(u_brdfLUTMap, vec2(NdotV, roughness)).rg;
        vec3 prefilteredColor = textureCubeLodEXT(u_prefilterMap, R, roughness * 8.0).rgb;  
        vec3 specular = prefilteredColor * (F_s * envBRDF.x + envBRDF.y);
        vec3 ambient = (kD_a * diffuse + specular) * ao;

        // 最终颜色
        vec3 color = ambient + lo;

        gl_FragColor = vec4(color, 1.0);
    #endif
}
`;
