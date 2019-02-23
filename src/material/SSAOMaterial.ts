import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class SSAOMaterial extends Material {
    protected _pixelSize: { data: Float32Array };
    protected _multiUsing: { data: Float32Array };
    constructor() {
        super();

        this._pixelSize = { data: new Float32Array([1.0, 1.0]) };
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._multiUsing = { data: new Float32Array([1.0, 1.0, 1.0, 1.0]) };
        this.setProperty(ShaderConst.multiUsing, this._multiUsing);
    }

    public setDiffuseTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setDepthTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.depthMap, texture);
    }

    public setAsptRtoTanHfFov(x, y, z, w) {
        this._multiUsing.data.set(arguments);
    }

    public setPixelSize(x, y) {
        let d = this._pixelSize.data;
        d[0] = x;
        d[1] = y;
    }

    get type() {
        return 'ssao'
    }
}
