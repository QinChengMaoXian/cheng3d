import { Light } from "./Light";
import { Vector3 } from "../math/Vector3";

export class DirectionLight extends Light {
    protected static readonly DefDir = new Vector3(0, 0, 1);

    protected _dir: Vector3 = new Vector3(0, 0, 1);

    constructor() {
        super();

        this.setPosition(1,1,1);
    }

    public setPosition(x, y, z) {
        super.setPosition(x, y, z);
        // this._dir.set(x, y, z).normalize();
    }

    public setDirection(dir: Vector3) {
        this._rotate.rotationTo(DirectionLight.DefDir, dir);

        this._dir.set(0, 0, 1);
        this._dir.applyQuaternion(this._rotate).normalize();
    }

    public getDirection() {
        return this._dir;
    }

    public getType() {
        return 1; //LightType.Direction;
    }
}
