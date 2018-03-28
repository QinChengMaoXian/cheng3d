export class GraphicsConst {
    private static _textureId = 0;
    private static _textures = {}

    private static _uniformId = 0;
    private static _uniforms = {}

    private static _attributeId = 0;
    private static _attributes = {}

    private static _dbg = true;
    
    // supported attribute name;
    public static readonly position     = GraphicsConst._inAtt('a_position');
    public static readonly texcoord     = GraphicsConst._inAtt('a_texcoord');
    public static readonly texcoord1    = GraphicsConst._inAtt('a_texcoord1');
    public static readonly normal       = GraphicsConst._inAtt('a_normal');
    public static readonly tangent      = GraphicsConst._inAtt('a_tangent');
    public static readonly binomial     = GraphicsConst._inAtt('a_binomial');
    public static readonly color        = GraphicsConst._inAtt('a_color');
    public static readonly joints       = GraphicsConst._inAtt('a_joints');
    public static readonly weights      = GraphicsConst._inAtt('a_weights');
    public static readonly texcoord2    = GraphicsConst._inAtt('a_texcoord2');
    public static readonly texcoord3    = GraphicsConst._inAtt('a_texcoord3');

    // supported texture name;
    public static readonly diffuseMap   = GraphicsConst._inTex('u_diffuseMap');
    public static readonly normalMap    = GraphicsConst._inTex('u_normalMap');
     
    // supported uniform name;
    public static readonly uvOffset     = GraphicsConst._inUni('u_uvOffset');
    public static readonly baseColor    = GraphicsConst._inUni('u_baseColor');

    /** world(model) matrix */
    public static readonly mMat         = GraphicsConst._inUni('u_mMat');
    /** view matrix */
    public static readonly vMat         = GraphicsConst._inUni('u_vMat');
    /** projection matrix */
    public static readonly pMat         = GraphicsConst._inUni('u_pMat');
    /** view projection matrix */
    public static readonly vpMat        = GraphicsConst._inUni('u_vpMat');
    /** model view projection matrix */
    public static readonly mvpMat       = GraphicsConst._inUni('u_mvpMat');

    /**
     * get texture map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getTextures(): any {
        return GraphicsConst._textures;
    }

    /**
     * Get unifrom map
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getUniforms(): any {
        return GraphicsConst._uniforms;
    }

    /**
     * Get attribute map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    public static _getAttributes(): any {
        return GraphicsConst._attributes;
    }

    private static _inTex(name: string) {
        const r = GraphicsConst;
        const t = r._textures;
        t[name] = r._dbg ? name : r._textureId++;
    }

    private static _inUni(name: string) {
        const r = GraphicsConst;
        const u = r._uniforms;
        u[name] = r._dbg ? name : r._uniformId++;
    }

    private static _inAtt(name: string) {
        const r = GraphicsConst;
        const a = r._attributes;
        a[name] = r._dbg ? name : r._attributeId++;
    }

    private constructor() {}
}
