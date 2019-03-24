import { Vector3 } from './Vector3'
import { Box } from '../../build/src/math/Box';
import { Sphere } from '../../build/src/math/Sphere';

export class Ray {

    public origin: Vector3 = new Vector3();
    public dir: Vector3 = new Vector3();

    private static _diff: Vector3 = new Vector3();
    private static _edge1 = new Vector3();
    private static _edge2 = new Vector3();
    private static _normal = new Vector3();

    constructor() {

    }

    public at(t: number, target?: Vector3) {
        if (target === undefined) {
            console.warn('CGE.Ray: .at() target is now required');
            target = new Vector3();
        }
        return target.copy(this.dir).mul(t).addAt(this.origin);
    }

    public distanceSqToPoint(point: Vector3) {
        const temp = Vector3.pubTemp;
        let directionDistance = temp.subBy(point, this.origin).dot(this.dir);

        if (directionDistance < 0) {
            return this.origin.distanceToSquare(point);
        }

        temp.copy(this.dir).mul(directionDistance).addAt(this.origin);
        return temp.distanceToSquare(point);
    }

    /**
     * 射线与box相交检测
     * @param box 
     * @param target 
     */
    public intersectBox(box: Box, target ?: Vector3) {
    const min = box.min;
    const max = box.max;

    let tmin, tmax, tymin, tymax, tzmin, tzmax;

    let invdirx = 1 / this.dir.x,
        invdiry = 1 / this.dir.y,
        invdirz = 1 / this.dir.z;

    let origin = this.origin;

    if (invdirx >= 0) {
        tmin = (min.x - origin.x) * invdirx;
        tmax = (max.x - origin.x) * invdirx;
    } else {
        tmin = (max.x - origin.x) * invdirx;
        tmax = (min.x - origin.x) * invdirx;
    }

    if (invdiry >= 0) {
        tymin = (min.y - origin.y) * invdiry;
        tymax = (max.y - origin.y) * invdiry;
    } else {
        tymin = (max.y - origin.y) * invdiry;
        tymax = (min.y - origin.y) * invdiry;
    }

    if ((tmin > tymax) || (tymin > tmax)) return null;

    // These lines also handle the case where tmin or tmax is NaN
    // (result of 0 * Infinity). x !== x returns true if x is NaN

    if (tymin > tmin || tmin !== tmin) tmin = tymin;
    if (tymax < tmax || tmax !== tmax) tmax = tymax;

    if (invdirz >= 0) {
        tzmin = (min.z - origin.z) * invdirz;
        tzmax = (max.z - origin.z) * invdirz;
    } else {
        tzmin = (max.z - origin.z) * invdirz;
        tzmax = (min.z - origin.z) * invdirz;
    }

    if ((tmin > tzmax) || (tzmin > tmax)) return null;

    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
    if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

    if (tmax < 0) return null;

    return this.at(tmin >= 0 ? tmin : tmax, target);
}

    public instersectSphere(sphere: Sphere) {

}

    /**
     * intersect triangle
     * http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
     * @param a 
     * @param b     
     * @param c 
     * @param backfaceCulling 
     * @param target 
     */
    public intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target ?: Vector3) {
    let diff: Vector3 = Ray._diff;
    let edge1: Vector3 = Ray._edge1;
    let edge2: Vector3 = Ray._edge2;
    let normal: Vector3 = Ray._normal;

    edge1.copy(b).subAt(a);
    edge2.copy(c).subAt(a);
    normal.crossBy(edge1, edge2);

    // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
    // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
    //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
    //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
    //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)

    let DdN: number = this.dir.dot(normal);
    let sign: number;

    if (DdN > 0) {
        if (backfaceCulling) return false;
        sign = 1;
    } else if (DdN < 0) {
        sign = -1;
        DdN = -DdN;
    } else {
        return false;
    }

    diff.subBy(this.origin, a);
    let DdQxE2: number = sign * this.dir.dot(edge2.crossBy(diff, edge2));

    // b1 < 0, no intersection
    if (DdQxE2 < 0) {
        return false;
    }

    let DdE1xQ: number = sign * this.dir.dot(edge1.cross(diff));

    // b2 < 0, no intersection
    if (DdE1xQ < 0) {
        return false;
    }

    // b1+b2 > 1, no intersection TODO: what is 1 ?
    if (DdQxE2 + DdE1xQ > DdN) {
        return false;
    }

    // Line intersects triangle, check whether ray does.
    let QdN: number = -sign * diff.dot(normal);

    // t < 0, no intersection
    if (QdN < 0) {
        return false;
    }

    this.at(QdN / DdN, target);

    return true;
}

    public copy(ray: Ray) {
    this.dir.copy(ray.dir);
    this.origin.copy(ray.origin);
}

    public toJson() {
    return {
        origin: this.origin.toJson(),
        dir: this.dir.toJson()
    };
}

    public fromJson(obj: any) {
    this.origin.fromJson(obj.origin);
    this.dir.fromJson(obj.dir);
}
}