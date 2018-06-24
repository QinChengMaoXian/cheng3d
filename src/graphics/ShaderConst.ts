export class ShaderConst {
    private static _tid = 0;
    private static _textures = {}

    private static _uid = 0;
    private static _uniforms = {}

    private static _aid = 0;
    private static _attributes = {}

    private static _dbg = true;
    
    // supported attribute name;
    public static readonly position     = ShaderConst._inAtt('a_position');
    public static readonly texcoord     = ShaderConst._inAtt('a_texcoord');
    public static readonly texcoord1    = ShaderConst._inAtt('a_texcoord1');
    public static readonly normal       = ShaderConst._inAtt('a_normal');
    public static readonly tangent      = ShaderConst._inAtt('a_tangent');
    public static readonly binomial     = ShaderConst._inAtt('a_binomial');
    public static readonly color        = ShaderConst._inAtt('a_color');
    public static readonly joints       = ShaderConst._inAtt('a_joints');
    public static readonly weights      = ShaderConst._inAtt('a_weights');
    public static readonly texcoord2    = ShaderConst._inAtt('a_texcoord2');
    public static readonly texcoord3    = ShaderConst._inAtt('a_texcoord3');

    // supported texture name;
    public static readonly diffuseMap   = ShaderConst._inTex('u_diffuseMap');
    public static readonly normalMap    = ShaderConst._inTex('u_normalMap');
    public static readonly specularMap  = ShaderConst._inTex('u_normalMap');

    /**
     * Ordered Dithering Map used for alpha test
     */
    public static readonly ODMap        = ShaderConst._inTex('u_ODMap');
     
    // supported uniform name;
    /**
     * Ordered Dithering size' inverse;
     */
    public static readonly ODSizeInv    = ShaderConst._inUni('u_ODSizeInv');
    public static readonly uvOffset     = ShaderConst._inUni('u_uvOffset');
    public static readonly baseColor    = ShaderConst._inUni('u_baseColor');
    public static readonly pixelSize    = ShaderConst._inUni('u_pixelSize');
    public static readonly cameraPos    = ShaderConst._inUni('u_cameraPos');
    public static readonly lightColor   = ShaderConst._inUni('u_lightColor');
    public static readonly lightPos     = ShaderConst._inUni('u_lightPos');
    public static readonly lightDir     = ShaderConst._inUni('u_lightDir');

    /** world(model) matrix */
    public static readonly mMat         = ShaderConst._inUni('u_mMat');
    /** view matrix */
    public static readonly vMat         = ShaderConst._inUni('u_vMat');
    /** projection matrix */
    public static readonly pMat         = ShaderConst._inUni('u_pMat');
    /** view projection matrix */
    public static readonly mvMat        = ShaderConst._inUni('u_mvMat');
    /** view projection matrix */
    public static readonly vpMat        = ShaderConst._inUni('u_vpMat');
    /** model view projection matrix */
    public static readonly mvpMat       = ShaderConst._inUni('u_mvpMat');

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

    private constructor() {}
}
