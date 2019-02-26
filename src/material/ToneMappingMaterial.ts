import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class ToneMappingMaterial extends Material {

    protected _lumPCT: { data: Float32Array };
    protected _pixelSize: { data: Float32Array };

    constructor() {
        super();

        this._pixelSize = { data: new Float32Array([1.0, 1.0]) };
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._lumPCT = { data: new Float32Array([1.0, 1.0]) };
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

    public setPixelSize(x, y) {
        this._pixelSize.data.set([x, y]);
    }

    public setLumPCT(p: number) {
        this._lumPCT.data[0] = p;
    }

    public get type(): string {
        return 'tone_mapping';
    }

}