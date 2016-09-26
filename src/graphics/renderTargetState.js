import { Vector4 } from '../math/vector4.js'

export class RenderTargetState {
    constructor() {
        Object.assign(this, {
            isClearColor: true,
            clearColor: new Vector4(1,1,1,1),
            isClearDepth: false,
            clearDepth: 1.0,
            isClearStencil: false,
            clearStencil: 0,
            viewport: new Vector4(),
        });
    }

    setClearColor(enable, color) {
        this.isClearColor = enable === true;
        if (color) {
            this.clearColor.copy(color);
        }
    }

    setClearDepth(enable, depth) {
        this.isClearDepth = enable === true;
        if (depth) {
            this.clearDepth = depth;
        }
    }

    setClearStencil(enable, stencil) {
        this.isClearStencil = enable === true;
        if (stencil) {
            this.clearStencil = stencil;
        }
    }

    setViewport(offset) {
        this.viewport.copy(offset);
    }
}
