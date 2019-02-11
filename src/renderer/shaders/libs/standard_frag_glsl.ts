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
uniform sampler2D u_specularMap;

uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

// const vec4 lightDir = vec4(normalize(vec3(0, 0, -1)), 1.0);

// const vec4 u_lightColor = vec4(1.0);

const float PI = 3.14159265359;

float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a      = roughness*roughness;
    float a2     = a*a;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

//几何函数
float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2  = GeometrySchlickGGX(NdotV, roughness);
    float ggx1  = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}

//菲涅尔方程
vec3 FresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);
}  

float SampleDFG(float roughness, float NoV, float NoL)
{
    float a = roughness * roughness;
    float a2 = a * a;
    float G_V = NoV + sqrt( (NoV - NoV * a2) * NoV + a2 );
    float G_L = NoL + sqrt( (NoL - NoL * a2) * NoL + a2 );
    return 1.0 / ( G_V * G_L );
}

void main()
{
    vec4 spec = texture2D(u_specularMap, v_uv);
    float reflec = spec.r * 0.16;
    float roughness = spec.g;
    float metalic = spec.b;

    vec4 baseColor = (1.0 - metalic) * texture2D(u_diffuseMap, v_uv) *  u_baseColor;
    vec3 reflectance = mix(vec3(reflec), baseColor.xyz, metalic);

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

    // float G = GeometrySmith(N, V, L, roughness);
    // float D = DistributionGGX(N, H, roughness);
    // vec3 F = FresnelSchlickRoughness(max(dot(N, V), 0.0), vec3(0.04), roughness);

    // vec3 nominator = D * G * F;//分子

    // float denominator = 4.0 * max(dot(V, N), 0.0) * max(dot(L, N), 0.0) + 0.001;//分母 
    // vec3 brdf = nominator / denominator;

    float NdotL = dot(N, L); 
    float NdotV = dot(N, V); 

    float brdf = SampleDFG(roughness, NdotV, NdotL);

    // vec3 kS = F;
    // vec3 kD = vec3(1.0) - kS;

    vec3 lo = ( brdf) * u_lightColor.xyz; // * max(NdotL, 0.0); 
    
    
    gl_FragColor = vec4(baseColor.xyz * lo, 1.0);
    // gl_FragColor = vec4(v_normal, 1.0);
    
}
`;