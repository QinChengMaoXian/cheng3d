export class ShaderConst {
    private static _tid = 0;
    private static _textures = {}

    private static _uid = 0;
    private static _uniforms = {}

    private static _aid = 0;
    private static _attributes = {}

    private static _dbg = true;

    // supported attribute name;
    public static readonly position = ShaderConst._inAtt('a_position');
    public static readonly texcoord = ShaderConst._inAtt('a_texcoord');
    public static readonly texcoord1 = ShaderConst._inAtt('a_texcoord1');
    public static readonly normal = ShaderConst._inAtt('a_normal');
    public static readonly tangent = ShaderConst._inAtt('a_tangent');
    public static readonly binomial = ShaderConst._inAtt('a_binomial');
    public static readonly color = ShaderConst._inAtt('a_color');
    public static readonly joints = ShaderConst._inAtt('a_joints');
    public static readonly weights = ShaderConst._inAtt('a_weights');
    public static readonly texcoord2 = ShaderConst._inAtt('a_texcoord2');
    public static readonly texcoord3 = ShaderConst._inAtt('a_texcoord3');

    // supported texture name;
    public static readonly baseColorMap = ShaderConst._inTex('u_baseColorMap');
    public static readonly diffuseMap = ShaderConst._inTex('u_diffuseMap');
    public static readonly normalMap = ShaderConst._inTex('u_normalMap');
    public static readonly specularMap = ShaderConst._inTex('u_specularMap');
    public static readonly roughnessMap = ShaderConst._inTex('u_roughnessMap');
    public static readonly metallicMap = ShaderConst._inTex('u_metallicMap');
    public static readonly aoMap = ShaderConst._inTex('u_aoMap');
    public static readonly emissiveMap = ShaderConst._inTex('u_emissiveMap');
    public static readonly cartoonLUTMap = ShaderConst._inTex('u_cartoonLUTMap');
    public static readonly brdfLUTMap = ShaderConst._inTex('u_brdfLUTMap');
    public static readonly lumMap = ShaderConst._inTex('u_lumMap');
    public static readonly bloomMap = ShaderConst._inTex('u_bloomMap');
    /**
     * Ordered Dithering Map used for alpha test
     */
    public static readonly ODMap = ShaderConst._inTex('u_ODMap');

    /** cube map */
    public static readonly irradianceMap = ShaderConst._inTex('u_irradianceMap');

    public static readonly prefilterMap = ShaderConst._inTex('u_prefilterMap');
    

    // supported uniform name;
    /**
     * Ordered Dithering size' inverse;
     */
    public static readonly ODSizeInv = ShaderConst._inUni('u_ODSizeInv');
    public static readonly uvOffset = ShaderConst._inUni('u_uvOffset');
    public static readonly baseColor = ShaderConst._inUni('u_baseColor');
    public static readonly pixelSize = ShaderConst._inUni('u_pixelSize');
    public static readonly pixelDir = ShaderConst._inUni('u_pixelDir');
    public static readonly cameraPos = ShaderConst._inUni('u_cameraPos');
    public static readonly lightColor = ShaderConst._inUni('u_lightColor');
    public static readonly lightPos = ShaderConst._inUni('u_lightPos');
    public static readonly lightDir = ShaderConst._inUni('u_lightDir');
    public static readonly aoScale = ShaderConst._inUni('u_aoScale');
    public static readonly glossiness = ShaderConst._inUni('u_glossiness');
    public static readonly reflectance = ShaderConst._inUni('u_reflectance');
    public static readonly merged = ShaderConst._inUni('u_merged');
    public static readonly merged1 = ShaderConst._inUni('u_merged1');
    public static readonly merged2 = ShaderConst._inUni('u_merged2');
    public static readonly merged3 = ShaderConst._inUni('u_merged3');
    public static readonly specular = ShaderConst._inUni('u_specular');
    public static readonly lumPCT = ShaderConst._inUni('u_lumPCT');

    /** world(model) matrix */
    public static readonly mMat = ShaderConst._inUni('u_mMat');
    /** inv world(model) matrix */
    public static readonly mIMat = ShaderConst._inUni('u_mIMat');
    /** view matrix */
    public static readonly vMat = ShaderConst._inUni('u_vMat');
    /** projection matrix */
    public static readonly pMat = ShaderConst._inUni('u_pMat');
    /** view projection matrix */
    public static readonly mvMat = ShaderConst._inUni('u_mvMat');
    /** view projection matrix */
    public static readonly vpMat = ShaderConst._inUni('u_vpMat');
    /** model view projection matrix */
    public static readonly mvpMat = ShaderConst._inUni('u_mvpMat');

    /**
     * get texture map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getTextures(): any {
        return ShaderConst._textures;
    }

    /**
     * Get unifrom map
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getUniforms(): any {
        return ShaderConst._uniforms;
    }

    /**
     * Get attribute map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getAttributes(): any {
        return ShaderConst._attributes;
    }

    private static _inTex(name: string) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._tid++;
        r._textures[name] = value;
        return value;
    }

    private static _inUni(name: string) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._uid++;
        r._uniforms[name] = value;
        return value;
    }

    private static _inAtt(name: string) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._aid++;
        r._attributes[name] = value;
        return value;
    }

    private constructor() { }
}
