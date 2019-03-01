import { Light, LightType, ILight } from "./Light";
import { SphereBounding } from "../bounding/SphereBounding";

export class PointLight extends Light implements ILight {

    protected _radius: number = 4.0;

    constructor() {
        super();
        this._bounding = new SphereBounding();
    }

    protected _updateBounding() {
        let bounding = this._bounding as SphereBounding;
        bounding.setPositionAt(this._position);
        bounding.setRadius(this._radius);
    }

    public setColor(r: number, g: number, b: number) {
        super.setColor(r, g, b);
        let lum = Light.LumFactor.dot(this._color);
        // 这里计算亮度衰减到1 / 255的时的半径;
        this._radius = Math.sqrt(lum) * 4.0;
    }

    public get radius(): number {
        return this._radius;
    }

    public get type() {
        return LightType.Point;
    }

    public get isPointLight() {
        return true;
    }
}
