import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";

export class FXAAMaterial extends Material {
    protected _data: any;
    constructor(texture?: Texture2D) {
        super();

        this._data = { data: new Float32Array([1.0, 1.0]) };
        this.setProperty(ShaderConst.pixelSize, this._data);

        if (texture) {
            this.setSrcTexture(texture);
        }
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

    public setPixelSize(x, y) {
        this._data.data[0] = x;
        this._data.data[1] = y;
    }

    get type() {
        return 'fxaa'
    }
}
