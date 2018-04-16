import { Base } from '../core/Base';
import { Vector3 } from '../math/Vector3';

import { OBB } from './OBB';
import { AABB } from './AABB';
import { Sphere } from './Sphere';

export class Bounding {
    static TYPE_SPHERE = 0;
    static TYPE_AABB = 1;
    static TYPE_OBB = 2;

    constructor() {
        
    }

    public getType() {
        return -1;
    }

    public intersect(bounding: Bounding) {
        return false;
    }

    //

    private static _auxVec: Vector3 = new Vector3();

    public static intersectOBB(obb1: OBB, obb2: OBB) {

    }

    public static intersectAABB(aabb1: AABB, aabb2: AABB) {
        const min1 = aabb1.getMin();
        const max1 = aabb1.getMax();
        const min2 = aabb2.getMin();
        const max2 = aabb2.getMax();

        if (min1.x > max2.x || max1.x < min2.x) {
            return false;
        }

        if (min1.y > max2.y || max1.y < min2.y) {
            return false;
        }

        if (min1.z > max2.z || max1.z < min2.z) {
            return false;
        }

        return true;
    }

    public static intersectSphere(sphere1: Sphere, sphere2: Sphere) {
        Bounding._auxVec.copy(sphere1.getPosition());
        Bounding._auxVec.sub(sphere2.getPosition());
        const s1 = sphere1.getRadius();
        const s2 = sphere2.getRadius();
        return Bounding._auxVec.lengthSquare() <= (s1 * s1 + s2 * s2);
    }

    public static intersectSphereToOBB(sphere: Sphere, obb: OBB) {

    }

    public static intersectSphereToAABB(sphere: Sphere, aabb: AABB) {

    }

    public static intersectOBBToAABB(obb: OBB, aabb: AABB) {

    }
}
