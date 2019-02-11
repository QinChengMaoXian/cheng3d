export default `
precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform sampler2D u_baseColorMap;
uniform sampler2D u_specularMap;
uniform sampler2D u_emissiveMap;
uniform sampler2D u_cartoonLUTMap;

uniform vec3 u_cameraPos;
uniform vec4 u_merged;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

void main()
{
    vec3 lightDir = u_lightDir;

    vec3 lightIntensity = u_lightColor.xyz;

    vec4 specular = texture2D(u_specularMap, v_uv);
    vec4 emissive = texture2D(u_emissiveMap, v_uv);
    vec4 baseColor = texture2D(u_baseColorMap, v_uv);

    float aoScale = u_merged[1];
    float glossiness = u_merged[2] * 3.5;
    float reflectance = u_merged[0];

    aoScale *= specular.y;
    glossiness *= specular.x;
    reflectance *= specular.z;

    float NdotL = dot(v_normal, lightDir);

    float darkness = NdotL * aoScale;

    vec3 coldTint = vec3(0.4);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 1.0 / 8.0)).xyz;
    vec3 warmTint = vec3(1.0);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 5.0 / 8.0)).xyz;
    float threshold = 0.4;//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 7.0 / 8.0)).x;

    vec3 tint = mix(coldTint, warmTint, smoothstep(threshold - 0.001, threshold + 0.001, darkness));

    vec3 viewDir = normalize(u_cameraPos - v_position);

    float NdotH = pow(dot(v_normal, normalize(viewDir + lightDir)), glossiness) * reflectance;
    float specThreshold = 0.4;
    
    float s = 1.0 + smoothstep(specThreshold - 0.001, specThreshold + 0.001, NdotH) * 0.2;

    
    gl_FragColor = vec4(s * tint * lightIntensity * baseColor.rgb, 1.0);
    // gl_FragColor = vec4(v_normal, 1.0); //specular;//
}
`;
