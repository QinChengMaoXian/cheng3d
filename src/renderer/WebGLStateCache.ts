import * as CGE from '../graphics/RendererParameter';

import { Stencil } from '../graphics/Stencil';
import { Blend } from '../graphics/Blend';
import { AlphaType } from '../graphics/GraphicsTypes';

/**
 * Webgl状态缓存
 */
export class WebGLStateCache {
    // color
    enableClearColor = true;
    clearColor = [1.0, 1.0, 1.0, 1.0];
    colorMask = [true, true, true, true];

    // depth
    enableClearDepth = true;
    clearDepth = 0;

    enableDepth = true;

    depthFunc = CGE.LESS;
    depthMask = true;

    // stencil
    clearStencil = 0;
    enableClearStencil = false;

    enableStencil = false;

    stencilMask = 1;
    stencilBackMask = 1
    stencilFunc = [CGE.ALWAYS, 0, 1];
    stencilBackFunc = [CGE.ALWAYS, 0, 1];
    stencilOp = [CGE.KEEP, CGE.KEEP, CGE.KEEP];
    stencilBackOp = [CGE.KEEP, CGE.KEEP, CGE.KEEP];

    stencil: Stencil = Stencil.DefStencil;

    // blend
    enableBlend = false;

    // blendFunc = [CGE.ONE, CGE.ZERO, CGE.ONE, CGE.ZERO];
    // blendEquation = [CGE.FUNC_ADD, CGE.FUNC_ADD];

    blend: Blend = Blend.DefBlend;

    // viewport
    viewpost = [0, 0, 800, 600];

    // cullFace
    enableCullFace = false;
    cullFaceMode = CGE.BACK;
    frontFace = CGE.CCW;

    // scissor
    enableScissorTest = false;
    scissor = [0, 0, 800, 600];

    // polygonOffset
    enablePolygonOffset = false;
    polygonOffset = [0, 0];

    init(gl: WebGLRenderingContext) {

    }

    setColor(gl: WebGLRenderingContext) {
        
    }

    setDepth() {

    }

    setStencil(gl: WebGLRenderingContext, isStencilEnable: boolean, stencil: Stencil, force: boolean = false) {
        if (!isStencilEnable) {
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

        
        if (this.stencil === stencil && !force) {
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
        if (curr[1] !== self[1], curr[2] !== self[2], curr[3] !== self[3]) {
            gl.stencilFuncSeparate.call(gl, curr);
        }

        curr = stencil.stencilBackFunc;
        self = selfStencil.stencilBackFunc;
        if (curr[1] !== self[1], curr[2] !== self[2], curr[3] !== self[3]) {
            gl.stencilFuncSeparate.call(gl, curr);
        }

        curr = stencil.stencilOp;
        self = selfStencil.stencilOp;
        if (curr[1] !== self[1], curr[2] !== self[2], curr[3] !== self[3]) {
            gl.stencilOpSeparate.call(gl, curr);
        }

        curr = stencil.stencilBackOp;
        self = selfStencil.stencilBackOp;
        if (curr[1] !== self[1], curr[2] !== self[2], curr[3] !== self[3]) {
            gl.stencilOpSeparate.call(gl, curr);
        }

        this.stencil = stencil;
    }

    setBlend(gl: WebGLRenderingContext, alphaType: AlphaType, blend: Blend, force: boolean = false) {
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

        if (this.blend === blend && !force) {
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
}
