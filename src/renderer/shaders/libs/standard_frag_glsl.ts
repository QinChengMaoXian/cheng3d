export default `
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

uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

// const vec4 lightDir = vec4(normalize(vec3(0, 0, -1)), 1.0);

// const vec4 u_lightColor = vec4(1.0);

const float PI = 3.14159265359;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

// 法线分布统计
float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a2     = roughness*roughness;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

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

//菲涅尔方程
vec3 FresnelSchlickRoughness(float NdotL, vec3 F0, float roughness)
{
    return F0 + (vec3(1.0) - F0) * pow((1.0 - NdotL), 5.0);
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

void main()
{
    vec4 spec = texture2D(u_roughnessMap, v_uv);
    
    float roughness = texture2D(u_roughnessMap, v_uv).r;
    float metallic = texture2D(u_metallicMap, v_uv).g;
    float ao = texture2D(u_aoMap, v_uv).b;

    vec4 baseColor = texture2D(u_diffuseMap, v_uv) *  u_baseColor;

    vec3 albedo = baseColor.xyz;

    vec3 F0 = vec3(0.04);
    
    F0      = F0 * (1.0 - metallic) + baseColor.xyz * metallic;

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

    float G = GeometrySmith(N, V, L, roughness);
    float D = DistributionGGX(N, H, roughness);
    vec3 F = FresnelSchlickRoughness(dot_plus(H, L), F0, roughness);

    vec3 nominator = D * G * F;//分子

    float denominator = 4.0 * max(dot(V, N), 0.0) * max(dot(L, N), 0.0) + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    float NdotL = dot_plus(N, L); 
    float NdotV = dot(N, V); 

    // vec3 brdf = FastDFG(roughness, NdotV, NdotL) * metalic;

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    vec3 lo = (kD * albedo / PI + brdf) * NdotL;

    vec3 ambient = vec3(0.03) * albedo * ao;

    vec3 color = ambient + lo;

    // color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0/2.2)); 

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vec3(nominator), 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
}
`;