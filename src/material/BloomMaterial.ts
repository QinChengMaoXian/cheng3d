import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class BloomMaterial extends Material {

    protected _lumPCT: Vector2

    constructor() {
        super();

        this._lumPCT = new Vector2;
        this.setProperty(ShaderConst.lumPCT, this._lumPCT);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setLumTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.lumMap, texture);
    }

    public setLumPCT(p: number) {
        this._lumPCT.x = p;
    }

    public get type(): string {
        return 'bloom';
    }

}