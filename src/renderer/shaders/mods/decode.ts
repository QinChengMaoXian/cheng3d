export const decodeRGB2Float = `
float decodeRGB2Float(vec3 rgb)
{
    return dot(rgb, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));
}
`;
