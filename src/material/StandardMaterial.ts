import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { TextureCube } from '../graphics/TextureCube';

export class StandardMaterial extends Material {

    protected _baseColor: Vector4 = new Vector4(1, 1, 1, 1);
    protected _specular: Vector3 = new Vector3(1, 1, 1);
    protected _uvOffset: Vector4 = new Vector4(1, 1, 0, 0);

    constructor(
        diffuse: Texture2D = Texture2D.White, 
        normal: Texture2D = Texture2D.Normal, 
        roughness: Texture2D = Texture2D.White, 
        metallic: Texture2D = Texture2D.White, 
        ao: Texture2D = Texture2D.White,
        irradiance: TextureCube = TextureCube.Black,
        prefilter: TextureCube = TextureCube.Black) {

        super();

        this.setTexture(s.diffuseMap, diffuse);
        this.setNormalMap(normal);
        this.setTexture(s.roughnessMap, roughness);
        this.setTexture(s.metallicMap, metallic);
        this.setTexture(s.aoMap, ao);

        this.setTexture(s.irradianceMap, irradiance);
        this.setTexture(s.prefilterMap, prefilter);

        this.setTexture(s.brdfLUTMap, Texture2D.BrdfLUT);

        this.setProperty(s.baseColor, this._baseColor);
        this.setProperty(s.specular, this._specular);
        this.setProperty(s.uvOffset, this._uvOffset);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(s.diffuseMap, texture);
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

    public setUVOffset(sx: number, sy: number, ox: number, oy: number) {
        this._uvOffset.set(sx, sy, ox, oy);
    }

    public get supportNormalMap(): boolean {
        return true;
    }

    public get supportShadow(): boolean {
        return true;
    }

    public get supportLighting(): boolean {
        return true;
    }

    public get type(): string {
        return 'standard';
    }

    public get supportDeferred(): boolean {
        return true;
    }
}
