import { Vector3 } from '../math/Vector3';

import { OBB } from './OBB';
import { AABB } from './AABB';
import { SphereBounding } from './SphereBounding';

import { Matrix4 } from '../math/Matrix4';

/**
 * 包围盒基类
 */
export class Bounding {
    static TYPE_SPHERE = 0;
    static TYPE_AABB = 1;
    static TYPE_OBB = 2;

    constructor() {
        
    }

    public applyMatrix(mat: Matrix4) {

    }

    public getType() {
        return -1;
    }

    public intersect(bounding: Bounding) {
        return false;
    }

    public copy(bounding: Bounding) {

    }

    public clone(): Bounding {
        return null;
    }

    public static _auxVec: Vector3 = new Vector3();

    private static _obb1Pos: Vector3[] = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
    private static _obb2Pos: Vector3[] = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];

    private static _obb1Dir: Vector3[] = [new Vector3(), new Vector3(), new Vector3()];
    private static _obb2Dir: Vector3[] = [new Vector3(), new Vector3(), new Vector3()];

    private static _buildObbVecs(obb: OBB, dirs: Vector3[], poses: Vector3[]) {
        const center = obb.getPosition();
        const rot = obb.getRoatation();
        const size = obb.getSize();
        const aux = Bounding._auxVec;
        
        dirs[0].set(1, 0, 0);
        dirs[0].applyQuaternion(rot);

        dirs[1].set(0, 1, 0);
        dirs[1].applyQuaternion(rot);

        dirs[2].set(0, 0, 1);
        dirs[2].applyQuaternion(rot);

        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                    let pos = poses[k * 4 + j * 2 + i];
                    pos.setAt(center);
                    aux.copy(dirs[0]);
                    pos.add(i === 1 ? aux.negate().mul(size.x) : aux.mul(size.x));
                    aux.copy(dirs[1]);
                    pos.add(j === 1 ? aux.negate().mul(size.y) : aux.mul(size.y));
                    aux.copy(dirs[2]);
                    pos.add(k === 1 ? aux.negate().mul(size.z) : aux.mul(size.z));
                }
            }
        }
    }

    private static _intersectCheck(asix: Vector3, poses1: Vector3[], poses2: Vector3[]) {
        let min1 = Infinity;
        let max1 = -Infinity;

        let min2 = Infinity;
        let max2 = -Infinity;

        let l = poses1.length;
        let temp;
        for(let i = 0; i < l; i++) {
            temp = asix.dot(poses1[i]);
            min1 = Math.min(min1, temp);
            max1 = Math.max(max1, temp);
        }

        l = poses2.length;
        for(let i = 0; i < l; i++) {
            temp = asix.dot(poses2[i]);
            min2 = Math.min(min2, temp);
            max2 = Math.max(max2, temp);
        }

        if (min1 > max2 || min2 > max1) {
            return true;
        } else {
            return false;
        }
    }

    public static intersectOBB(obb1: OBB, obb2: OBB) {
        const obb1Dir = Bounding._obb1Dir;
        const obb2Dir = Bounding._obb2Dir;

        const obb1Pos = Bounding._obb1Pos;
        const obb2Pos = Bounding._obb2Pos;

        Bounding._buildObbVecs(obb1, obb1Dir, obb1Pos);
        Bounding._buildObbVecs(obb2, obb2Dir, obb2Pos);

        const dir1length = obb1Dir.length;
        const dir2length = obb2Dir.length;

        const aux = Bounding._auxVec;

        for (let i = 0; i < dir1length; i++) {
            if (Bounding._intersectCheck(obb1Dir[i], obb1Pos, obb2Pos)) {
                return false;
            }
        }

        for (let i = 0; i < dir2length; i++) {
            if (Bounding._intersectCheck(obb2Dir[i], obb1Pos, obb2Pos)) {
                return false;
            }
        }

        for (let i = 0; i < dir1length; i++) {
            for (let j = 0; j < dir2length; j++) {
                if (Bounding._intersectCheck(aux.crossBy(obb1Dir[i], obb2Dir[j]), obb1Pos, obb2Pos)) {
                    return false;
                }
            }
        }

        return true;
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

    public static intersectSphere(sphere1: SphereBounding, sphere2: SphereBounding) {
        Bounding._auxVec.copy(sphere1.getPosition());
        Bounding._auxVec.sub(sphere2.getPosition());
        const s1 = sphere1.getRadius();
        const s2 = sphere2.getRadius();
        return Bounding._auxVec.lengthSquare() <= (s1 * s1 + s2 * s2);
    }

    public static intersectSphereToOBB(sphere: SphereBounding, obb: OBB) {

    }

    public static intersectSphereToAABB(sphere: SphereBounding, aabb: AABB) {

    }

    public static intersectOBBToAABB(obb: OBB, aabb: AABB) {

    }
}
