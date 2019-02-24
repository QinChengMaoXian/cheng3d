import { Base } from '../core/Base'
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { Loader } from '../io/Loader';
import { RGBA } from '../graphics/RendererParameter';
import { Shader } from '../graphics/Shader';

/**
 * 材质基类 
 */
export class Material extends Base {
    
    protected _shader: Shader = new Shader;
    protected _alphaTest: boolean;
    protected _alphaBlend: boolean;

    public blendFunc: number;
    public blendColorSrc: number;
    public blendColorDst: number;
    public blendAlphaSrc: number;
    public blendAlphaDst: number;

    private _textures: Map<string | number, Texture>;
    private _properties: Map<string | number, any>;

    constructor() {
        super();
        this._textures = new Map();
        this._properties = new Map();
    }

    protected setTexture2DFromUrl(type: string | number, url: string, defTexture?: Texture2D) {
        this._textures.set(type, defTexture || Texture2D.White);
        if (!url || url === '') {
            return;
        }
        Loader.loadImage(url).then((img: HTMLImageElement) => {
            let tex = new Texture2D();
            tex.setFormat(RGBA, RGBA);
            tex.setData(img.width, img.height, img);
            this._textures.set(type, tex);
        })
    }

    protected setTexture(type: string | number, texture: Texture = Texture2D.White) {
        this._textures.set(type, texture);
    }

    protected removeTexture(type: string | number) {
        this._textures.delete(type);
    }

    protected setProperty(type: string | number, data: any) {
        this._properties.set(type, data);
    }

    protected removeProperty(type: string | number) {
        this._properties.delete(type);
    }

    public getProperty(type: string | number) {
        return this._properties.get(type);
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

    public disalbeAlpha() {
        this._alphaTest = this._alphaBlend = false;
    }

    public enableAlphaTest() {
        this._alphaTest = true;
        this._alphaBlend = false;
    }

    public enableAlphaBlend() {
        this._alphaBlend = true;
        this._alphaTest = false;
    }

    public get alphaTest() {
        return this._alphaTest;
    }

    public get alphaBlend() {
        return this._alphaBlend;
    }

    public getMapProvide() {
        return [];
    }

    public getPropertyProvide() {
        return [];
    }

    public canLighting() {
        return false;
    }

    protected clearProperties() {
        this._properties.clear();
    }

    protected clearTextures() {
        this._textures.clear();
    }

    public get type(): string {
        return '';
    }

    public get shader(): Shader {
        return this._shader;
    }

    public get supportDeferred(): boolean {
        return false;
    }
}
