import { Camera } from "../object/Camera";
import { Object3D } from "../object/Object3D";
import { Vector3 } from "../math/Vector3";

export class FollowCamera extends Camera {

    protected _target: Object3D;
    protected _distance: number = 200;

    constructor(width: number, height: number, fovy?: number, near?: number, far?: number) {
        super(width, height, fovy, near, far);
    }

    protected _update() {
        if (this._target) {
            let dir = Vector3.pool.create().copy(this._center).sub(this._position).normalize();
            this._center.copy(this._target.getPosition());
            this.setPositionAt(dir.mul(this._distance));
        }
        super._update();
    }

    set target(t: Object3D) {
        this._target = t;
        this.enableUpdateMat();
    }

    get target(): Object3D {
        return this.target;
    }

    set distance(v: number) {
        this._distance = v;
    }

    get distance() {
        return this._distance;
    }
}
