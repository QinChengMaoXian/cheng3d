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
uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

const float PI = 3.14159265359;

void main()
{
    vec4 spec = pow(texture2D(u_roughnessMap, v_uv), vec4(1.0));
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec4 baseColor = pow(texture2D(u_diffuseMap, v_uv), vec4(2.2)) * u_baseColor;

    vec3 albedo = baseColor.xyz;

    vec3 normalTex = texture2D(u_normalMap, v_uv).xyz;
    vec3 normal = normalTex * 2.0 - 1.0;    
    mat3 normalMatrix = mat3(
        normalize(v_tangentToView0), 
        normalize(v_tangentToView1), 
        normalize(v_tangentToView2)
    );

    vec3 N = normalize(normalMatrix * normal);
    
    
}
`;