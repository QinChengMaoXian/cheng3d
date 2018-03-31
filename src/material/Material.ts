import { Base } from '../core/Base'
import { Shader } from '../graphics/Shader';

export class Material extends Base {
    protected _shader:Shader = undefined;
    protected _alphaTest: boolean = false;
    protected _alphaBlend: boolean = false;
    public blendFunc: number;
    public blendColorSrc: number;
    public blendColorDst: number;
    public blendAlphaSrc: number;
    public blendAlphaDst: number;

    constructor() {
        super();
    }

    public setShader(shader) {
        this._shader = shader;
    }

    public getShader(shader) {
        return this._shader;
    }

    public getMapProvide() {
        return [];
    }

    public getPropertyProvide() {
        return [];
    }
}
