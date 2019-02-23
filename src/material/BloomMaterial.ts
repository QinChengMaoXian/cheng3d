import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class BloomMaterial extends Material {

    protected _lumPCT: { data: Float32Array };

    constructor() {
        super();

        this._lumPCT = { data: new Float32Array([0.35, 1.0]) };
        this.setProperty(ShaderConst.lumPCT, this._lumPCT);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setLumTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.lumMap, texture);
    }

    public setLumPCT(p: number) {
        this._lumPCT.data[0] = p;
    }

    public get type(): string {
        return 'bloom';
    }

}