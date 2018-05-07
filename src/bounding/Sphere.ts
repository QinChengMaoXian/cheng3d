import { Bounding } from './Bounding';
import { AABB } from './AABB';
import { OBB } from './OBB'
import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';

export class Sphere extends Bounding {
    protected _pos: Vector3 = new Vector3();
    protected _radius: number = 0;

    constructor() {
        super();
    }

    public setFrom(sphere: Sphere, mat: Matrix4) {
        this._pos.copy(sphere._pos);
        this._pos.applyMatrix4(mat);
        this._radius = sphere._radius;
    }

    public intersect(bounding: Bounding) {
        const type = bounding.getType();
        switch(type) {
            case Bounding.TYPE_SPHERE:
                return Bounding.intersectSphere(<Sphere>bounding, this);
            case Bounding.TYPE_AABB:
                return Bounding.intersectSphereToAABB(this, <AABB>bounding);
            case Bounding.TYPE_OBB:
                return Bounding.intersectSphereToOBB(this, <OBB>bounding);
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

    public setRadius(r: number) {
        this._radius = r;
    }

    public getPosition() {
        return this._pos;
    }

    public getRadius() {
        return this._radius;
    }

    public getType() {
        return Bounding.TYPE_SPHERE;
    }

    public copy(sphere: Sphere) {
        this._pos.copy(sphere._pos);
        this._radius = sphere._radius;
    }

    public clone(): Sphere {
        const sphere = new Sphere();
        sphere.copy(this);
        return sphere;
    }
}