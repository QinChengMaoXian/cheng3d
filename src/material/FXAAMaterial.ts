import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector2 } from "../math/Vector2";

export class FXAAMaterial extends Material {
    protected _data: Vector2;
    constructor(texture?: Texture2D) {
        super();

        this._data = new Vector2(1.0, 1.0);
        this.setProperty(ShaderConst.pixelSize, this._data);

        if (texture) {
            this.setSrcTexture(texture);
        }

        this.enableDepth = false;
    }

    public setSrcTexture(texture: Texture2D) {
        if (!texture) {
            return;
        }
        this.setTexture(ShaderConst.diffuseMap, texture);
        let w = texture.getWidth();
        let h = texture.getHeight();
        if (!!w && !!h) {
            this.setPixelSize(1.0 / w, 1.0 / h);
        }
    }

    public setPixelSize(x: number, y: number) {
        this._data.set(x, y);
    }

    get type() {
        return 'fxaa'
    }
}
