import { Bounding } from './Bounding';
import { AABB } from './AABB';
import { OBB } from './OBB'
import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Sphere } from '../math/Sphere';

export class SphereBounding extends Bounding {
    protected _sphere: Sphere = new Sphere();

    constructor() {
        super();
    }

    public setFrom(sb: SphereBounding, mat: Matrix4) {
        this._sphere.copy(sb._sphere);
        this._sphere.applyMatrix(mat);
    }

    public applyMatrix(mat: Matrix4) {
        this._sphere.applyMatrix(mat);
    }

    public intersect(bounding: Bounding) {
        const type = bounding.getType();
        switch(type) {
            case Bounding.TYPE_SPHERE:
                return Bounding.intersectSphere(<SphereBounding>bounding, this);
            case Bounding.TYPE_AABB:
                return Bounding.intersectSphereToAABB(this, <AABB>bounding);
            case Bounding.TYPE_OBB:
                return Bounding.intersectSphereToOBB(this, <OBB>bounding);
            default:
                return false;
        }
    }

    public setPosition(x: number, y: number, z: number) {
        this._sphere.pos.set(x, y, z);
    }

    public setPositionAt(vec: Vector3) {
        this._sphere.pos.setAt(vec);
    }

    public setRadius(r: number) {
        this._sphere.radius = r;
    }

    public getPosition() {
        return this._sphere.pos;
    }

    public getRadius() {
        return this._sphere.radius;
    }

    public getType() {
        return Bounding.TYPE_SPHERE;
    }

    public copy(sb: SphereBounding) {
        this._sphere.copy(sb._sphere);
    }

    public clone(): SphereBounding {
        const sphere = new SphereBounding();
        sphere.copy(this);
        return sphere;
    }

    public get sphere(): Sphere {
        return this._sphere;
    }
}