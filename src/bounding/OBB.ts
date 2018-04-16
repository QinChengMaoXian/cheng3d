import { Bounding } from './Bounding';
import { AABB } from './AABB'
import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4'

export class OBB extends Bounding {
    protected _pos: Vector3 = new Vector3();
    protected _size: Vector3 = new Vector3();
    protected _rotation: Quaternion = new Quaternion();

    constructor() {
        super();
    }

    public setFrom(obb: OBB, mat: Matrix4) {

    }

    public setPosition(x: number, y: number, z: number) {
        this._pos.set(x, y, z);
    }

    public setPositionAt(vec: Vector3) {
        this._pos.setAt(vec);
    }

    public setSize(x: number, y: number, z: number) {
        this._size.set(x, y, z);
    }

    public setSizeAt(vec: Vector3) {
        this._size.setAt(vec);
    }

    public setRotation(x: number, y: number, z: number, w: number) {
        this._rotation.set(x, y, z, w);
    }

    public setRotationAt(quat) {
        this._rotation.setAt(quat);
    }

    public getPosition() {
        return this._pos;
    }

    public getSize() {
        return this._size;
    }

    public getRoatation() {
        return this._rotation;
    }
}