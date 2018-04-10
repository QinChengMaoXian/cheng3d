import { Base } from '../core/Base'
import { Shader } from '../graphics/Shader';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';

export class Material extends Base {
    protected _shader: Shader = undefined;
    protected _alphaTest: boolean = false;
    protected _alphaBlend: boolean = false;
    public blendFunc: number;
    public blendColorSrc: number;
    public blendColorDst: number;
    public blendAlphaSrc: number;
    public blendAlphaDst: number;

    protected _textures: Map<string | number, Texture>;
    protected _properties: Map<string | number, any>;

    constructor() {
        super();
    }

    public setShader(shader) {
        this._shader = shader;
    }

    public getShader(shader) {
        return this._shader;
    }

    protected addTexture(type: string | number, texture: Texture = Texture2D.White) {
        this._textures.set(type, texture);
    }

    public getTexture(type: string | number) {
        return this._textures.get(type);
    }

    public getMapProvide() {
        return [];
    }

    public getPropertyProvide() {
        return [];
    }
}
