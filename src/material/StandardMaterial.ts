import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';

export class StandardMaterial extends Material {

    protected _diffuseMap;
    protected _normalMap;

    protected _roughnessMap;
    protected _metallicMap;
    protected _aoMap;

    protected _baseColor: Vector4 = new Vector4();

    constructor(diffuse?: string, normal?: string, roughness?: string, metallic?: string, ao?: string) {
        super();

        if (diffuse) {
            this.setTexture2DFromUrl(s.diffuseMap, diffuse);
        }

        if (normal) {
            this.setTexture2DFromUrl(s.normalMap, normal);
        }
        
        if (roughness && roughness === metallic &&  metallic === ao) {

        }

        if (roughness) {
            this.setTexture2DFromUrl(s.roughnessMap, roughness);
        }

        if (metallic) {
            this.setTexture2DFromUrl(s.metallicMap, metallic);
        }
        
        if (ao) {
            this.setTexture2DFromUrl(s.aoMap, ao);
        } else {
            this.setTexture(s.aoMap, Texture2D.White);
        }

        this.setProperty(s.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(s.diffuseMap, texture);
    }

    public setNormalMap(texture: Texture2D) {
        this.setTexture(s.normalMap, texture);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }
 
    public clone() {
        
    }

    public get type(): string {
        return 'standard';
    }
}
