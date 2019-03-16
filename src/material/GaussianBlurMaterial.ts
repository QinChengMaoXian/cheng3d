import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class GaussianBlurMaterial extends Material {
    protected _size: Vector2;
    protected _dir: Vector2;

    constructor() {
        super();

        this._size = new Vector2(1, 1);
        this.setProperty(ShaderConst.pixelSize, this._size);

        this._dir = new Vector2(1, 0);
        this.setProperty(ShaderConst.pixelDir, this._dir);
    }

    public setSrcTexture(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setPixelSize(x: number, y: number) {
        this._size.set(x, y);
    }

    public setPiexlDir(x: number, y: number) {
        this._dir.set(x, y);
    }

    public get type(): string {
        return 'gaussian_blur';
    }

}