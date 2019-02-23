export default `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_depthMap;
uniform vec4 u_multiUsing;

float calcViewZ(vec2 uv)
{
    float depth = texture2D(u_depthMap, uv).x;
    float ViewZ = u_multiUsing.w / (2.0 * depth - 1.0 - u_multiUsing.z);
    return ViewZ;
}

void main()
{
    vec2 viewRay = vec2(gl_FragCoord.x * u_multiUsing.x * u_multiUsing.y, gl_FragCoord.x * u_multiUsing.y);

    float viewZ = calcViewZ(v_uv);
    float viewX = viewRay.x * viewZ;
    float viewY = viewRay.y * viewZ;

    vec3 pos = vec3(viewX, viewY, viewZ);

    float AO = 0.0;

    gl_FragColor = vec4(vec3(viewZ / 2000.0), 1.0);
}
`;
