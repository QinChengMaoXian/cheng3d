import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';

export class DeferredShadingMaterial extends Material {

    private _pixelSize: { data: Float32Array }

    constructor() {
        super();

        this._pixelSize = { data: new Float32Array([1.0, 1.0]) };
        this.setProperty(s.pixelSize, this._pixelSize);

        this.setTexture(s.irradianceMap, TextureCube.White);
        this.setTexture(s.prefilterMap, TextureCube.White);
        this.setTexture(s.brdfLUTMap, Texture2D.BrdfLUT);
    }

    public setDiffuseMap(tex: Texture2D) {
        this.setTexture(s.diffuseMap, tex);
    }

    public setNormalMap(tex: Texture2D) {
        this.setTexture(s.normalMap, tex);
    }

    public setSpecularMap(tex: Texture2D) {
        this.setTexture(s.specularMap, tex);
    }

    public setDepthMap(tex: Texture2D) {
        this.setTexture(s.depthMap, tex);
    }

    public setBrdfLUT(tex: Texture2D) {
        this.setTexture(s.brdfLUTMap, tex);
    }

    public setPixelSize(x: number, y: number) {
        this._pixelSize.data.set(arguments);
    }

    public get type(): string {
        return 'deferred_shading';
    }
}
