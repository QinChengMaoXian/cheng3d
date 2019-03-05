import * as CGE from '../graphics/RendererParameter';

import { Stencil } from '../graphics/Stencil';
import { Blend } from '../graphics/Blend';
import { AlphaType } from '../graphics/GraphicsTypes';

/**
 * Webgl状态缓存
 */
export class WebGLStateCache {

    // clear
    // enableClearColor = true;
    // enableClearDepth = true;
    // enableClearStencil = false;
    clearColor = [1.0, 1.0, 1.0, 1.0];
    clearDepth = 0;
    clearStencil = 0;

    // viewport
    viewport = [0, 0, 800, 600];

    // color
    colorMask = [true, true, true, true];

    // depth
    enableDepth = true;

    depthFunc = CGE.LESS;
    depthMask = true;

    // stencil
    enableStencil = false;

    stencil: Stencil = Stencil.DefStencil;

    // blend
    enableBlend = false;

    blend: Blend = Blend.DefBlend;

    // cullFace
    enableCullFace = false;
    cullFaceMode = CGE.BACK;
    frontFace = CGE.CCW;

    // TODO:
    // scissor
    enableScissor = false;
    scissor = [0, 0, 800, 600];

    // TODO:
    // polygonOffset
    enablePolygonOffset = false;
    polygonOffset = [0, 0];

    init(gl: WebGLRenderingContext) {
        gl.clearColor.apply(gl, this.clearColor);
        gl.colorMask.apply(gl, this.colorMask);

        this.enableDepth ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
        gl.depthFunc(this.depthFunc);
        gl.depthMask(this.depthMask);

        this.enableBlend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
        let blend = this.blend;
        gl.blendFuncSeparate.apply(gl, blend.blendFunc);
        gl.blendEquationSeparate.apply(gl, blend.blendEquation);

        this.enableStencil ? gl.enable(gl.STENCIL_TEST) : gl.disable(gl.STENCIL_TEST);
        gl.clearStencil(this.clearStencil);
        let stencil = this.stencil;
        gl.stencilMaskSeparate(gl.FRONT, stencil.stencilMask);
        gl.stencilMaskSeparate(gl.BACK, stencil.stencilBackMask);
        gl.stencilFuncSeparate.apply(gl, stencil.stencilFunc);
        gl.stencilFuncSeparate.apply(gl, stencil.stencilBackFunc);
        gl.stencilOpSeparate.apply(gl, stencil.stencilOp);
        gl.stencilOpSeparate.apply(gl, stencil.stencilBackOp);

        this.enableCullFace ? gl.enable(gl.CULL_FACE): gl.disable(gl.CULL_FACE);
        gl.cullFace(this.cullFaceMode);
        gl.frontFace(this.frontFace);
    }

    setViewport(gl: WebGLRenderingContext, viewport: number[] | Float32Array) {
        let vp = this.viewport;
        for (let i = 0; i < 4; i++) {
            if (vp[i] !== viewport[i]) {
                gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
                for (i; i < 4; i++) {
                    vp[i] = viewport[i];
                }
                return;
            }
        }        
    }

    setClearColor(gl: WebGLRenderingContext, color: number[] | Float32Array) {
        let vp = this.clearColor;
        for (let i = 0; i < 4; i++) {
            if (vp[i] !== color[i]) {
                gl.clearColor(color[0], color[1], color[2], color[3]);
                for (i; i < 4; i++) {
                    vp[i] = color[i];
                }
                return;
            }
        }
    }

    setClearDepth(gl: WebGLRenderingContext, depth: number) {
        if (this.clearDepth !== depth) {
            gl.clearDepth(depth);
            this.clearDepth = depth;
        }
    }

    setClearStencil(gl: WebGLRenderingContext, stencil: number) {
        if (this.clearStencil !== stencil) {
            gl.clearStencil(stencil);
            this.clearStencil = stencil
        }
    }

    setColor(gl: WebGLRenderingContext) {
        
    }

    setDepth(gl: WebGLRenderingContext, enable: boolean, mask: boolean, func: number = CGE.LESS) {
        if (!enable) {
            if (this.enableDepth) {
                gl.disable(gl.DEPTH_TEST);
                this.enableDepth = false;
            }
            return;
        }

        if (!this.enableDepth) {
            gl.enable(gl.DEPTH_TEST);
            this.enableDepth = true;
        }

        if (this.depthMask !== mask) {
            gl.depthMask(mask);
            this.depthMask = mask;
        }

        if (this.depthFunc !== func) {
            gl.depthFunc(func);
            this.depthFunc = func;
        }
    }

    setStencil(gl: WebGLRenderingContext, enalbe: boolean, stencil: Stencil) {
        if (!enalbe) {
            if (this.enableStencil) {
                this.enableStencil = false;
                gl.disable(gl.STENCIL_TEST);
            }
            return;
        }

        if (!this.enableStencil) {
            gl.enable(gl.STENCIL_TEST);
            this.enableStencil = true;
        }

        
        if (this.stencil === stencil) {
            return;
        }

        let selfStencil = this.stencil;

        if (selfStencil.stencilMask !== stencil.stencilMask) {
            gl.stencilMaskSeparate(gl.FRONT, stencil.stencilMask);
        }

        if (selfStencil.stencilBackMask !== stencil.stencilBackMask) {
            gl.stencilMaskSeparate(gl.BACK, stencil.stencilBackMask);
        }

        let curr = stencil.stencilFunc;
        let self = selfStencil.stencilFunc;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilFuncSeparate.apply(gl, curr);
        }

        curr = stencil.stencilBackFunc;
        self = selfStencil.stencilBackFunc;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilFuncSeparate.apply(gl, curr);
        }

        curr = stencil.stencilOp;
        self = selfStencil.stencilOp;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilOpSeparate.apply(gl, curr);
        }

        curr = stencil.stencilBackOp;
        self = selfStencil.stencilBackOp;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilOpSeparate.apply(gl, curr);
        }

        this.stencil = stencil;
    }

    setBlend(gl: WebGLRenderingContext, alphaType: AlphaType, blend: Blend) {
        if (alphaType !== AlphaType.BLEND) {
            if (this.enableBlend) {
                gl.disable(gl.BLEND);
                this.enableBlend = false;
            }
            return;
        }

        if (!this.enableBlend) {
            gl.enable(gl.BLEND);
            this.enableBlend = true;
        }

        if (this.blend === blend) {
            return;
        }

        let blendFunc = blend.blendFunc;
        let blendEquation = blend.blendEquation;

        let func = this.blend.blendFunc;
        for (let i = 0; i < 4; i++) {
            if (blendFunc[i] !== func[i]) {
                gl.blendFuncSeparate.apply(gl, blendFunc);
                break;
            }
        }

        let equation = this.blend.blendEquation;
        if (equation[0] !== blendEquation[0] || equation[1] !== blendEquation[1]) {
            gl.blendEquationSeparate(equation[0], equation[1]);
        }
        this.blend = blend;
    }

    setFaceMode(gl: WebGLRenderingContext, cullFaceMode: number, flipFace: boolean) {
        let frontFace = flipFace ? CGE.CW : CGE.CCW;
        if (frontFace !== this.frontFace) {
            gl.frontFace(frontFace);
            this.frontFace = frontFace;
        }

        let enableCullFace = !!cullFaceMode;
        if (enableCullFace !== this.enableCullFace) {
            enableCullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
            this.enableCullFace = enableCullFace;
        }

        if (cullFaceMode && cullFaceMode !== this.cullFaceMode) {
            gl.cullFace(cullFaceMode);
            this.cullFaceMode = cullFaceMode;
        }
    }

    setPolygonOffset(gl: WebGLRenderingContext, enable: boolean, values: number[]) {
        if (!enable) {
            if (this.enablePolygonOffset) {
                gl.disable(gl.POLYGON_OFFSET_FILL);
                this.enablePolygonOffset = false;
            }
            return;
        }

        if (!this.enablePolygonOffset) {
            gl.enable(gl.POLYGON_OFFSET_FILL);
            this.enablePolygonOffset = false;
        }

        if (this.polygonOffset[0] !== values[0] || this.polygonOffset[1] !== values[1]) {
            gl.polygonOffset(values[0], values[1]);
            this.polygonOffset[0] = values[0];
            this.polygonOffset[1] = values[1];
        }
    }
}
