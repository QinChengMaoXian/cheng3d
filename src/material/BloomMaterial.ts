import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class BloomMaterial extends Material {

    constructor() {
        super();
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setLumTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.lumMap, texture);
    }

    public get type(): string {
        return 'bloom';
    }

}