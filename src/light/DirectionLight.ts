import { LightType, Light } from "./Light";
import { Vector3 } from "../math/Vector3";

export class DirectionLight extends Light {
    protected static readonly DefDir = new Vector3(0, 0, -1);

    constructor() {
        super();
    }

    public setDirection(dir: Vector3) {
        this._rotate.rotationTo(DirectionLight.DefDir, dir);
    }

    public getDirection(out: Vector3) {
        if (!out) {
            out = new Vector3();
        }
        out.set(0, 0, 1);
        out.applyQuaternion(this._rotate);
        return out;
    }

    public getType() {
        return LightType.Direction;
    }
}
