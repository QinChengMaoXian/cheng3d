import { Light, ILight } from "./Light";
import { Vector3 } from "../math/Vector3";

export class DirectionLight extends Light implements ILight {
    protected static readonly DefDir = new Vector3(0, 0, 1);

    protected _dir: Vector3 = new Vector3(0.5, 0.5, 0.5).normalize();

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

    public get dir() {
        return this._dir;
    }

    public get type() {
        return 1; //LightType.Direction;
    }

    public get isDirectionLight() {
        return true;
    }
}
