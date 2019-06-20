import { Bounding, BoundingType, IBounding } from './Bounding';
import { AABB } from './AABB';
import { SphereBounding } from './SphereBounding';
import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Ray } from '../math/Ray';

export class OBB implements IBounding {
    protected _pos: Vector3 = new Vector3();
    protected _size: Vector3 = new Vector3();
    protected _rotation: Quaternion = new Quaternion();

    constructor() {
    
    }

    public applyMatrix(mat: Matrix4) {
        // TODO: 这里怎么写？
    }

    public intersectRay(ray: Ray) {
        // TODO: 这里怎么写？
        return false
    }

    public intersect(bounding: IBounding) {
        const type = bounding.getType();
        switch(type) {
            case BoundingType.TYPE_SPHERE:
                return Bounding.intersectSphereToOBB(<SphereBounding>bounding, this);
            case BoundingType.TYPE_AABB:
                return Bounding.intersectOBBToAABB(this, <AABB>bounding);
            case BoundingType.TYPE_OBB:
                return Bounding.intersectOBB(<any>bounding, this);
            default:
                return false;
        }

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

    public getType() {
        return BoundingType.TYPE_OBB;
    }

    public copy(obb: OBB) {
        this._pos.copy(obb._pos);
        this._rotation.copy(obb._rotation);
        this._size.copy(obb._size);
    }

    public clone(): OBB {
        const obb = new OBB();
        obb.copy(this);
        return obb;
    }
}
