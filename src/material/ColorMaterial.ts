import { Material } from './Material';
import { ShaderConst } from '../graphics/ShaderConst';
import { Vector4 } from '../math/Vector4';

export class ColorMaterial extends Material {
    protected _diffuseMap;
    protected _baseColor: Vector4 = new Vector4();
    constructor(diffuse) {
        super();
        
        this.setProperty(ShaderConst.baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }

    public setBaseColor(r: number, g: number, b: number, a: number) {
        this._baseColor.set(r,g,b,a);
    }

    public get type(): string {
        return 'color';
    }
}
