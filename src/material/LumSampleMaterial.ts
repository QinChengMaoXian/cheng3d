import { Material } from './Material';
import { ShaderConst } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';

export class LumSampleMaterial extends Material {

    constructor() {
        super();
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public get type(): string {
        return 'lum_sample';
    }

}
