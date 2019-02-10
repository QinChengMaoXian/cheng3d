import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';

export class StandardMaterial extends Material {
    protected _diffuseMap;
    protected _normalMap;
    protected _specularMap;
    protected _baseColor: Vector4 = new Vector4();

    constructor(diffuse?: string, normal?: string, specular?: string) {
        super();

        this.setTexture2DFromUrl(s.normalMap, normal);
        this.setTexture2DFromUrl(s.diffuseMap, diffuse);
        this.setTexture2DFromUrl(s.specularMap, specular);

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
