import { Logger } from "../core/Logger";

/** 
 * WebGL扩展支持情况 
 * 如果WebGL2默认都支持
 */
export class WebGLSupports {
    
    protected _vao: OES_vertex_array_object;
    protected _drawBuffers: WEBGL_draw_buffers;
    protected _shaderTexLod: EXT_shader_texture_lod;
    protected _texFloat: OES_texture_float;
    protected _texFloatLinear: OES_texture_float_linear;
    protected _texHalfFloat: OES_texture_half_float;
    protected _texHalfFloatLinear: OES_texture_half_float_linear;
    protected _texFilterAni: EXT_texture_filter_anisotropic;
    protected _depthTex: WEBGL_depth_texture;
    protected _standardDerivatives: OES_standard_derivatives;
    protected _instanceArrays: ANGLE_instanced_arrays;
    protected _elementIdxUint: OES_element_index_uint;

    public MAX_COLOR_ATTACHMENTS = 1;
    public MAX_DRAW_BUFFERS = 1;

    public init(gl: WebGLRenderingContext, log?: boolean) {

        let getExtension = function(extName) {
            let ext = gl.getExtension(extName);
            // let ext = gl.getExtension(extName) || gl.getExtension('WEBKIT_' + extName) || gl.getExtension('MOZ_' + extName);
            // if (!ext && log) Logger.warn('Can not use webgl extension ' + extName);
            return ext;
        };

        this._vao = gl.getExtension("OES_vertex_array_object");

        let drawBuffers = gl.getExtension("WEBGL_draw_buffers");
        if (drawBuffers) {
            this._drawBuffers = drawBuffers;
            this.MAX_COLOR_ATTACHMENTS = drawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL;
            this.MAX_DRAW_BUFFERS = drawBuffers.MAX_DRAW_BUFFERS_WEBGL
            this.drawBuffers = drawBuffers.drawBuffersWEBGL.bind(drawBuffers);
        } else {
            this.drawBuffers = null;
        }


        // 这两个为浮点纹理写
        //"EXT_color_buffer_half_float"
        //"WEBGL_color_buffer_float" 

        this._shaderTexLod = gl.getExtension('EXT_shader_texture_lod');
        this._texFloat = gl.getExtension("OES_texture_float");
        this._texFloatLinear = gl.getExtension("OES_texture_float_linear");
        this._texHalfFloat = gl.getExtension("OES_texture_half_float");
        this._texHalfFloatLinear = gl.getExtension("OES_texture_half_float_linear");
        this._texFilterAni = gl.getExtension("EXT_texture_filter_anisotropic");
        this._depthTex = gl.getExtension("WEBGL_depth_texture");
        this._standardDerivatives = gl.getExtension("OES_standard_derivatives");
        this._instanceArrays = gl.getExtension('ANGLE_instanced_arrays');
        this._elementIdxUint = gl.getExtension("OES_element_index_uint");

        // this.drawArraysInstanced = this._instanceArrays.drawArraysInstancedANGLE.bind(this._instanceArrays);
    }

    public drawBuffers(buffers: number[]) {};

    public drawArraysInstanced(mode: number, first: number, count: number, primcount: number) {
        // this._instanceArrays.drawArraysInstancedANGLE
    }

    public setWebGL2(v: boolean) {

    }

}