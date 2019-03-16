import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class DownSampleTo1Material extends Material {

    protected _pixelSize: Vector2;
    protected _lumPCT: Vector2;

    constructor() {
        super();

        this._pixelSize = new Vector2(1, 1);
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._lumPCT = new Vector2(1, 1);
        this.setProperty(ShaderConst.lumPCT, this._lumPCT);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setLumTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.lumMap, texture);
    }

    public setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }

    public setLumPCT(p: number) {
        this._lumPCT.x = p;
    }

    public get type(): string {
        return 'down_sample_to1';
    }

}