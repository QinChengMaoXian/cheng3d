import { Material } from './Material';
import { ShaderConst } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { Vector4 } from '../math/Vector4';

export class DepthMaterial extends Material {

    protected _baseColor: Vector4 = new Vector4();

    constructor() {
        super();

        this.setProperty(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setDiffuseMap(texture: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, texture);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r, g, b, a);
    }

    public get type(): string {
        return 'depth';
    }
}
