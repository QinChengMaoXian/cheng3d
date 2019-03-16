export default `

#extension GL_EXT_draw_buffers : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
#endif

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_roughnessMap;
uniform sampler2D u_metallicMap;
uniform sampler2D u_aoMap;

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

uniform mat4 u_vMat;
uniform vec3 u_specular;
uniform vec4 u_baseColor;
uniform vec2 u_matType;
varying vec3 v_viewPos;
varying float v_depth;

#include <encodeFloat2RGB>

void main()
{
    vec4 baseColor = pow(texture2D(u_diffuseMap, v_uv), vec4(2.2)) * u_baseColor;
    #ifdef ALPHA_TEST
        float alpha = texture2D(u_ODMap, fract(gl_FragCoord.xy * vec2(1.0 / 16.0))).a;
        if (baseColor.a <= alpha) {
            discard;
        }
    #endif

    vec4 spec = texture2D(u_roughnessMap, v_uv);
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec3 albedo = baseColor.xyz;

    
    #ifdef NORMAL_MAP
        vec3 normal = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
        normal = normalize(normal.x * v_tangent + normal.y * v_binormal + normal.z * v_normal);
    #else 
        vec3 normal = v_normal;
    #endif
    
    // normal = (u_vMat * vec4(normal, 0.0)).xyz;

    vec3 depth3 = encodeFloat2RGB(v_depth);

    gl_FragData[0] = vec4(albedo, roughness);
    gl_FragData[1] = vec4(normal * 0.5 + 0.5, metallic);
    gl_FragData[2] = vec4(depth3, ao);
}
`;