import { Object3D } from "../object/Object3D";
import { Camera } from "../object/Camera";
import { Vector3 } from "../math/Vector3";

export class Object3DThirdController {

    protected _target: Object3D;
    protected _source: Camera;

    protected _distance: number;

    protected _dir: Vector3;

    protected _up: Vector3;

    constructor() {

    }

    public setData(target: Object3D, source: Camera) {
        this._target = target;
        this._source = source;
    }

    public rotateFromScreen(x: number, y: number) {

    }
}