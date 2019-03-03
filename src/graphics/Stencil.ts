import * as CGE from '../graphics/RendererParameter';
import { FaceType } from './GraphicsTypes';

export class Stencil {
    static readonly DefStencil: Stencil = new Stencil();

    stencilMask = 0xFF;
    stencilBackMask = 0xFF;
    stencilFunc = [CGE.FRONT, CGE.ALWAYS, 0, 1];
    stencilBackFunc = [CGE.BACK, CGE.ALWAYS, 0, 1];
    stencilOp = [CGE.FRONT, CGE.KEEP, CGE.KEEP, CGE.KEEP];
    stencilBackOp = [CGE.BACK, CGE.KEEP, CGE.KEEP, CGE.KEEP];

    public setStencilMask(value: number, face: FaceType = FaceType.DOUBLE) {
        if (face === FaceType.DOUBLE || face === FaceType.FRONT) {
            this.stencilMask = value;
        }
        if (face === FaceType.DOUBLE || face === FaceType.BACK) {
            this.stencilBackMask = value;
        }
    }

    public setStencilFunc(func: number, ref: number, mask: number, face: FaceType = FaceType.DOUBLE) {
        let front = this.stencilFunc;
        let back = this.stencilBackFunc;
        if (face === FaceType.DOUBLE || face === FaceType.FRONT) {
            front[1] = func;
            front[2] = ref;
            front[3] = mask;
        }
        if (face === FaceType.DOUBLE || face === FaceType.BACK) {
            back[1] = func;
            back[2] = ref;
            back[3] = mask;
        }
    }

    public setStencilOp(fail: number, zfail: number, zpass: number, face: FaceType = FaceType.DOUBLE) {
        let front = this.stencilOp;
        let back = this.stencilBackOp;
        if (face === FaceType.DOUBLE || face === FaceType.FRONT) {
            front[1] = fail;
            front[2] = zfail;
            front[3] = zpass;
        }
        if (face === FaceType.DOUBLE || face === FaceType.BACK) {
            back[1] = fail;
            back[2] = zfail;
            back[3] = zpass;
        }
    }

    public clone() {
        let stencil = new Stencil();
        Stencil.Copy(this, stencil);
        return stencil;
    }

    public copy(stencil: Stencil) {
        Stencil.Copy(stencil, this);
        return this;
    }

    public static Copy(src: Stencil, dst: Stencil) {
        dst.stencilMask = src.stencilMask;
        dst.stencilBackMask = src.stencilBackMask;
        for (let i = 1; i < 4; i++) {
            dst.stencilFunc[i] = src.stencilFunc[i];
            dst.stencilBackFunc[i] = src.stencilBackFunc[i];
            dst.stencilOp[i] = src.stencilOp[i]
            dst.stencilBackOp[i] = src.stencilBackOp[i]
        }
    }
}
