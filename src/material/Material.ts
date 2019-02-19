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

    protected setTexture2DFromUrl(type: string | number, url: string, defTexture?: Texture2D) {
        this._textures.set(type, defTexture || Texture2D.White);
        if (!url || url === '') {
            return;
        }
        Loader.loadImage(url).then((img: HTMLImageElement) => {
            let tex = new Texture2D();
            tex.setFormat(RGBA, RGBA);
            tex.setImageUrl(url, img);
            this._textures.set(type, tex);
        })
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

    public get type(): string {
        return '';
    }

    public get shader(): Shader {
        return this._shader;
    }
}
