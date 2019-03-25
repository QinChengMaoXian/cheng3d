import { Plane } from "./Plane";
import { Matrix4 } from "./Matrix4";
import { Box } from "./Box";
import { Vector3 } from "./Vector3";
import { Sphere } from "./Sphere";

/**
 * 平头截体
 */
export class Frustum {

    protected _planes: Plane[];

    constructor() {
        this._planes = [
            new Plane(),
            new Plane(),
            new Plane(),
            new Plane(),
            new Plane(),
            new Plane(),
        ]
    }

    public set(p0?: Plane, p1?: Plane, p2?: Plane, p3?: Plane, p4?: Plane, p5?: Plane) {
        const planes = this._planes;
        for (let i = 0; i < 6; i++) {
            arguments[i] && planes[i].copy(arguments[i]);
        }
        return this;
    } 

    public setFromMatrix(mat: Matrix4) {
        const planes = this._planes;
        const m = mat.m;
        const me0 = m[0], me1 = m[1], me2 = m[2], me3 = m[3];
        const me4 = m[4], me5 = m[5], me6 = m[6], me7 = m[7];
        const me8 = m[8], me9 = m[9], me10 = m[10], me11 = m[11];
        const me12 = m[12], me13 = m[13], me14 = m[14], me15 = m[15];

        planes[0].set(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].set(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].set(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].set(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].set(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].set(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

        return this;
    }

    public intersectBox(box: Box) { return false }

    public intersectSphere(sphere: Sphere) {
        const planes = this._planes;
        const pos = sphere.pos;
        const negRadius = - sphere.radius;

        for (var i = 0; i < 6; i++) {
            var distance = planes[i].distanceToPoint(pos);
            if (distance < negRadius) {
                return false;
            }
        }

        return true;
    }

    public containsPoint(p: Vector3) {
        const planes = this._planes;

        for (var i = 0; i < 6; i++) {
            if (planes[i].distanceToPoint(p) < 0) {
                return false;
            }
        }

        return true;

    }

    public getPlane(idx: number) {
        return this._planes[idx];
    }

    public copy(frustum: Frustum) {
        let selfPlanes = this._planes;
        let orderPlanes = frustum._planes;
        for(let i = 0; i < 6; i++) {
            selfPlanes[i].copy(orderPlanes[i]);
        }
        return this;
    }
}

Frustum.prototype.intersectBox = function() {
    const p = new Vector3()
    return function(box: Box) {
        const planes = this._planes;
        const max = box.max;
        const min = box.min;

        for (let i = 0; i < 6; i++) {
            let plane = planes[i];
            let normal = plane.normal;
            p.x = normal.x > 0 ? max.x : min.x;
            p.y = normal.y > 0 ? max.y : min.y;
            p.z = normal.z > 0 ? max.z : min.z;

            if (plane.distanceToPoint(p) < 0) {
                return false;
            }
        }
        return true;
    }
}()
