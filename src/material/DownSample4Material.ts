import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class DownSample4Material extends Material {

    protected _pixelSize: { data: Float32Array };

    constructor() {
        super();

        this._pixelSize = new Vector2(1, 1);
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setPixelSize(x: number, y: number) {
        this.setPixelSize(x, y);
    }

    public get type(): string {
        return 'down_sample4';
    }

}