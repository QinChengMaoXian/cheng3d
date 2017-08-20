import { Vector4 } from '../math/Vector4'

export class RenderTargetState {
    isClearColor = true;
    clearColor = new Vector4(1,1,1,1);
    isClearDepth = false;
    clearDepth = 1.0;
    isClearStencil = false;
    clearStencil = 0;
    viewport = new Vector4();

    constructor() {
        
    }

    setClearColor(enable, color) {
        this.isClearColor = enable === true;
        if (color) {
            this.clearColor.copy(color);
        }
    }

    setClearDepth(enable, depth?) {
        this.isClearDepth = enable === true;
        if (depth) {
            this.clearDepth = depth;
        }
    }

    setClearStencil(enable, stencil?) {
        this.isClearStencil = enable === true;
        if (stencil) {
            this.clearStencil = stencil;
        }
    }

    setViewport(offset) {
        this.viewport.copy(offset);
    }
}
