import { Bounding, BoundingType, IBounding } from './Bounding';
import { OBB } from './OBB';
import { SphereBounding } from './SphereBounding';
import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Box } from '../math/Box';
import { Ray } from '../math/Ray';

export class AABB implements IBounding {
    protected _box: Box = new Box();

    constructor() {
        // super();
    }

    public applyMatrix(mat: Matrix4) {
        this._box.applyMatrix(mat);
    }

    public intersectRay(ray: Ray) {
        return ray.isIntersectBox(this._box);
    }

    public intersect(bounding: IBounding) {
        const type = bounding.getType();
        switch(type) {
            case BoundingType.TYPE_SPHERE:
                return Bounding.intersectSphereToAABB(<SphereBounding>bounding, this);
            case BoundingType.TYPE_AABB:
                return Bounding.intersectAABB(<AABB>bounding, this);
            case BoundingType.TYPE_OBB:
                return Bounding.intersectOBBToAABB(<OBB>bounding, this);
            default:
                return false;
        }
    }

    public setMin(x: number, y: number, z: number) {
        this._box.min.set(x, y, z);
    }

    public setMinAt(vec: Vector3) {
        this._box.min.setAt(vec);
    }

    public setMax(x: number, y: number, z: number) {
        this._box.max.set(x, y, z);
    }

    public setMaxAt(vec: Vector3) {
        this._box.max.setAt(vec);
    }

    public getMin() {
        return this._box.min;
    }

    public getMax() {
        return this._box.max;
    }

    public getType() {
        return BoundingType.TYPE_AABB;
    }

    public copy(aabb: AABB) {
        this._box.copy(aabb._box);
    }

    public get box(): Box {
        return this._box;
    }

    public clone(): AABB {
        const aabb = new AABB();
        aabb.copy(this);
        return aabb;
    }
}
