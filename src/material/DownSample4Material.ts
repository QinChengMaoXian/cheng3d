import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class DownSample4Material extends Material {

    protected _data: { data: Float32Array };

    constructor() {
        super();

        this._data = {data: new Float32Array([1.0, 1.0])};
        this.setProperty(ShaderConst.pixelSize, this._data);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setPixelSize(x, y) {
        this._data.data.set([x, y]);
    }

    public get type(): string {
        return 'down_sample4';
    }

}