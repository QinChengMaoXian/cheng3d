import { Base } from '../core/Base'
import { Shader } from '../graphics/Shader';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';

/**
 * 临时的着色器代码写在了材质内，但是并不正确；
 */
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
        this._textures = new Map();
        this._properties = new Map();
    }

    public setShader(shader) {
        this._shader = shader;
    }

    public getShader() {
        return this._shader;
    }

    protected setTexture(type: string | number, texture: Texture = Texture2D.White) {
        this._textures.set(type, texture);
    }

    protected setProperty(type: string | number, data: any) {
        this._properties.set(type, data);
    }

    public setTextureUrl(type: string | number, url: string) {
        let texture2d = new Texture2D();
        texture2d.setImageUrl(url);
        this._textures.set(type, texture2d);
    }

    public clone() {
        
    }

    public getTexture(type: string | number) {
        return this._textures.get(type);
    }

    public getTextures() {
        return this._textures;
    }

    public getProperties() {
        return this._properties;
    }

    public getMapProvide() {
        return [];
    }

    public getPropertyProvide() {
        return [];
    }
}
