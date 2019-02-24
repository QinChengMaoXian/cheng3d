import { Material } from './Material';
import { ShaderConst } from '../graphics/ShaderConst'
import { TextureCube } from '../graphics/TextureCube';

export class SkyboxMaterial extends Material {

    protected _diffuseMap;

    constructor() {
        super();
    }

    public setDiffuseMap(tex: TextureCube) {
        this.setTexture(ShaderConst.diffuseMap, tex);
    }

    public clone() {
        
    }

    public get type(): string {
        return 'skybox';
    }
}
