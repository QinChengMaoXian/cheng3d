import * as CGE from '../graphics/RendererParameter';

export class Blend {
    static readonly DefBlend: Blend = new Blend();

    blendFunc = [CGE.ONE, CGE.ZERO, CGE.ONE, CGE.ZERO];
    blendEquation = [CGE.FUNC_ADD, CGE.FUNC_ADD];

    public setBlendFunc(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
        this.blendFunc[0] = srcRGB;
        this.blendFunc[1] = dstRGB;
        this.blendFunc[2] = srcAlpha;
        this.blendFunc[3] = dstAlpha;
        return this;
    }

    public setBlendEquation(modeRGB: number, modeAlpha: number) {
        this.blendEquation[0] = modeRGB;
        this.blendEquation[1] = modeAlpha;
        return this;
    }

    public clone(): Blend {
        let blend = new Blend();
        Blend.Copy(this, blend);
        return blend;
    }

    public copy(blend: Blend) {
        Blend.Copy(blend, this);
        return this;
    }

    public static Copy(src: Blend, dst: Blend) {
        dst.setBlendFunc.apply(dst, src.blendFunc);
        dst.setBlendEquation.apply(dst, src.blendEquation);
    }
}
