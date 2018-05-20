import { Vector4 } from '../math/Vector4'

export class RenderTargetState {
    isClearColor: boolean = true;
    clearColor: Vector4 = new Vector4(1,1,1,1);
    isClearDepth: boolean = false;
    clearDepth: number = 1.0;
    isClearStencil: boolean = false;
    clearStencil: number = 0;
    viewport: Vector4 = new Vector4();

    constructor() {
        
    }

    public setClearColor(enable: boolean, color: Vector4) {
        this.isClearColor = enable === true;
        if (color) {
            this.clearColor.copy(color);
        }
    }

    public setClearDepth(enable: boolean, depth?: number) {
        this.isClearDepth = enable === true;
        if (depth) {
            this.clearDepth = depth;
        }
    }

    public setClearStencil(enable: boolean, stencil?: number) {
        this.isClearStencil = enable === true;
        if (stencil) {
            this.clearStencil = stencil;
        }
    }

    public setViewport(offset: Vector4) {
        this.viewport.copy(offset);
    }
}
