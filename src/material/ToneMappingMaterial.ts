import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class ToneMappingMaterial extends Material {

    protected _lumPCT: Vector2;
    protected _pixelSize: Vector2;

    constructor() {
        super();

        this._pixelSize = new Vector2;
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._lumPCT = new Vector2;
        this.setProperty(ShaderConst.lumPCT, this._lumPCT);

        this.setTexture(ShaderConst.aoMap, Texture2D.White);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setLumTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.lumMap, texture);
    }

    public setBloomTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.bloomMap, texture);
    }

    public setAoTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.aoMap, texture);
    }

    public setPixelSize(x: number, y: number) {
        this._pixelSize.set(x, y);
    }

    public setLumPCT(p: number) {
        this._lumPCT.x = p;
    }

    public get type(): string {
        return 'tone_mapping';
    }

}