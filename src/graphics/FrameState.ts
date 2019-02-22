import { Vector4 } from '../math/Vector4'

export class FrameState {
    public isClearColor: boolean = true;
    public clearColor: Vector4 = new Vector4(1,1,1,1);
    public isClearDepth: boolean = true;
    public clearDepth: number = 0.0;
    public isClearStencil: boolean = false;
    public clearStencil: number = 0;
    public viewport: Vector4 = new Vector4();
    public needClear = true;

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
