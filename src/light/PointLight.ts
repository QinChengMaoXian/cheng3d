import { Light, LightType, ILight } from "./Light";
import { SphereBounding } from "../bounding/SphereBounding";
import { PointShadow } from "./PointShadow";

export class PointLight extends Light implements ILight {

    protected _radius: number;//4.0;

    protected _shadow: PointShadow;

    constructor() {
        super();
        this._bounding = new SphereBounding();
        this.setFactor(0.9375);
    }

    protected _updateBounding() {
        let bounding = this._bounding as SphereBounding;
        bounding.setPositionAt(this._position);
        bounding.setRadius(this._radius);
    }

    public setColor(r: number, g: number, b: number) {
        super.setColor(r, g, b);
        // let lum = Light.LumFactor.dot(this._color);
        // 这里计算亮度衰减到1 / 255的时的半径;
        // this._radius = Math.sqrt(lum) * 4.0;
    }

    public setFactor(v: number) {
        this._color.w = Math.min(v, 1.0);
        this._radius = Math.sqrt(1.0 / (1.0 - v));
    }

    public enableShadow() {
        if (!this._shadow) {
            this._shadow = new PointShadow();
            this._shadow.init();
        }
        this._shadow.enalbed = true;
    }

    public disableShadow() {
        if (!this._shadow) {
            return;
        }
        this._shadow.enalbed = false;
    }

    public clearShadow() {
        if (this._shadow) {
            this._shadow.destroy();
            this._shadow = null;
        }
    }

    public get shadow() {
        return this._shadow;
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
