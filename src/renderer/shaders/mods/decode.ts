export const decodeRGB2Float = `
float decodeRGB2Float(vec3 rgb)
{
    return dot(rgb, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));
}
`;

export const decodeRGBA2Float = `
float decodeRGBA2Float(vec4 rgba)
{
    return dot(rgba, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));
}
`;
