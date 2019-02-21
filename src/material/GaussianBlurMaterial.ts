import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class GaussianBlurMaterial extends Material {
    protected _size: { data: Float32Array };
    protected _dir: { data: Float32Array };

    constructor() {
        super();

        this._size = {data: new Float32Array([1.0, 1.0])};
        this._dir = {data: new Float32Array([1.0, 0.0])};
        this.setProperty(ShaderConst.pixelSize, this._size);
        this.setProperty(ShaderConst.pixelDir, this._dir);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setPixelSize(x: number, y: number) {
        this._size.data.set([x, y]);
    }

    public setPiexlDir(x: number, y: number) {
        this._dir.data.set([x, y]);
    }

    public get type(): string {
        return 'gaussian_blur';
    }

}