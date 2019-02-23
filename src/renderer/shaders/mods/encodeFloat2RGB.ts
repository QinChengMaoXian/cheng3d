export default `
vec3 encodeFloat2RGB(float v)
{
    vec3 enc = vec3(1.0, 255.0, 65025.0) * v;
    enc = fract(enc);
    enc -= enc.yzz * vec3(1.0/255.0, 1.0/255.0, 0.0);
    return enc;
}
`;
