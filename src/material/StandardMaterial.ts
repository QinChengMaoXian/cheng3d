import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { TextureCube } from '../graphics/TextureCube';

export class StandardMaterial extends Material {

    protected _baseColor: Vector4 = new Vector4();
    protected _specular: Vector3 = new Vector3(1, 1, 1);

    constructor(
        diffuse: Texture2D = Texture2D.White, 
        normal: Texture2D = Texture2D.Normal, 
        roughness: Texture2D = Texture2D.White, 
        metallic: Texture2D = Texture2D.White, 
        ao: Texture2D = Texture2D.White,
        irradiance: TextureCube = TextureCube.White,
        prefilter: TextureCube = TextureCube.White) {

        super();

        this.setTexture(s.diffuseMap, diffuse);
        this.setTexture(s.normalMap, normal);
        this.setTexture(s.roughnessMap, roughness);
        this.setTexture(s.metallicMap, metallic);
        this.setTexture(s.aoMap, ao);

        this.setTexture(s.irradianceMap, irradiance);
        this.setTexture(s.prefilterMap, prefilter);

        this.setProperty(s.baseColor, this._baseColor);
        this.setProperty(s.specular, this._specular);

        
        // this.setProperty()
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(s.diffuseMap, texture);
    }

    public setNormalMap(texture: Texture2D) {
        this.setTexture(s.normalMap, texture);
    }

    public setIrradianceMap(texCube: TextureCube) {
        this.setTexture(s.irradianceMap, texCube);
    }

    public setPrefilterMap(texCube: TextureCube) {
        this.setTexture(s.prefilterMap, texCube);
    }

    public setBrdfLUTMap(tex: Texture2D) {
        this.setTexture(s.brdfLUTMap, tex);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }
 
    public clone() {
        
    }

    public setSpecular(roughness: number, metallic: number, ao: number) {
        this._specular.set(roughness, metallic, ao);

    }

    public get type(): string {
        return 'standard';
    }
}
