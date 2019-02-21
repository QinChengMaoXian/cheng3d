export default `
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_tangentToView0;
varying vec3 v_tangentToView1;
varying vec3 v_tangentToView2;
varying vec3 v_normal;
varying vec3 v_worldPos;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_roughnessMap;
uniform sampler2D u_metallicMap;
uniform sampler2D u_aoMap;
uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

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

// 用于pbr环境光
float FastDFG(float roughness, float NoV, float NoL)
{
    float a = roughness * roughness;
    float a2 = a * a;
    float G_V = NoV + sqrt( (NoV - NoV * a2) * NoV + a2 );
    float G_L = NoL + sqrt( (NoL - NoL * a2) * NoL + a2 );
    return 1.0 / ( G_V * G_L );
}

// vec3 brdf = FastDFG(roughness, NdotV, NdotL) * metalic;

void main()
{
    vec4 spec = pow(texture2D(u_roughnessMap, v_uv), vec4(1.0));
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec4 baseColor = pow(texture2D(u_diffuseMap, v_uv), vec4(2.2)) * u_baseColor;

    vec3 albedo = baseColor.xyz;

    vec3 F0 = vec3(0.04);
    
    F0      = F0 * (1.0 - metallic) + albedo * metallic;

    vec3 normalTex = texture2D(u_normalMap, v_uv).xyz;
    vec3 normal = normalTex * 2.0 - 1.0;    
    mat3 normalMatrix = mat3(
        normalize(v_tangentToView0), 
        normalize(v_tangentToView1), 
        normalize(v_tangentToView2)
    );

    vec3 L = normalize(u_lightDir.xyz);
    vec3 V = normalize(u_cameraPos - v_worldPos);
    vec3 N = normalize(normalMatrix * normal); // normalize(v_normal);//
    vec3 H = normalize(V + L);

    vec3 R = N * dot_plus(N, V) * 2.0 - V; 
    R = vec3(R.x, R.z, -R.y);

    float G = GeometrySmith(N, V, L, roughness);
    float D = DistributionGGX(N, H, roughness);
    vec3 F = FresnelSchlick(dot_plus(H, L), F0);

    vec3 nominator = D * G * F;//分子

    float denominator = 4.0 * max(dot(V, N), 0.0) * max(dot(L, N), 0.0) + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    float NdotL = dot_plus(N, L); 
    float NdotV = dot_plus(N, V); 

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // 直接光照结果
    vec3 lo = (kD * (albedo) / PI + brdf) * u_lightColor.xyz * NdotL;

    // 环境光部分
    vec3 coordN = vec3(N.x, N.z, -N.y);
    vec3 irradiance = textureCubeLodEXT(u_irradianceMap, coordN, 8.0).xyz;
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
    // gl_FragColor = vec4(vec3(color), 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
}
`;