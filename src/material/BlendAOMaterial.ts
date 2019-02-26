import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class BlendAOMaterial extends Material {

    constructor() {
        super();
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.aoMap, texture);
    }

    public setDstTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public get type(): string {
        return 'blendAO';
    }

}