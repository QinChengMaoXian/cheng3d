import { Base } from '../core/Base'
import { Shader } from '../graphics/Shader';
import { Texture2D } from '../graphics/Texture2D';

export class Material extends Base {
    protected _shader:Shader = undefined;
    protected _alphaTest: boolean = false;
    protected _alphaBlend: boolean = false;
    public blendFunc: number;
    public blendColorSrc: number;
    public blendColorDst: number;
    public blendAlphaSrc: number;
    public blendAlphaDst: number;
    protected _maps;
    protected _properties;

    constructor() {
        super();
    }

    public setShader(shader) {
        this._shader = shader;
    }

    public getShader(shader) {
        return this._shader;
    }

    protected add2DMap(type:string|number, def: Texture2D) {

    }

    public get2DMap(type: string|number) {

    }

    public getMapProvide() {
        return [];
    }

    public getPropertyProvide() {
        return [];
    }
}
