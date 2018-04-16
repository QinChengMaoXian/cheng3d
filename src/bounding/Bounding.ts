import { Base } from '../core/Base';
import { Vector3 } from '../math/Vector3';

import { OBB } from './OBB';
import { AABB } from './AABB';
import { Sphere } from './Sphere';

export class Bounding {
    constructor() {
        
    }

    private static _auxVec: Vector3 = new Vector3();

    public static intersectOBB(obb1: OBB, obb2: OBB) {

    }

    public static intersectAABB(aabb1: AABB, aabb2: AABB) {

    }

    public static intersectSphere(sphere1: Sphere, sphere2: Sphere) {
        Bounding._auxVec.copy(sphere1.getPosition());
        Bounding._auxVec.sub(sphere2.getPosition());
    }

    public static intersectSphereToOBB(sphere: Sphere, obb: OBB) {

    }

    public static intersectSphereToAABB(sphere: Sphere, aabb: AABB) {

    }

    public static intersectOBBToAABB(obb: OBB, aabb: AABB) {

    }
}
