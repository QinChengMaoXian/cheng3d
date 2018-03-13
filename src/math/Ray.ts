import { Vector3 } from './Vector3'

export class Ray {

    private _origin: Vector3 = new Vector3();
    private _dir: Vector3 = new Vector3();

    private static _diff: Vector3 = new Vector3();
    private static _edge1 = new Vector3();
    private static _edge2 = new Vector3();
    private static _normal = new Vector3();

    constructor() {

    }

    /**
     * from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
     * @param a 
     * @param b 
     * @param c 
     * @param backfaceCulling 
     * @param target 
     */
    public intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3) {
        let diff: Vector3 = Ray._diff;
        let edge1: Vector3 = Ray._edge1;
        let edge2: Vector3 = Ray._edge2;
        let normal: Vector3 = Ray._normal;

        edge1.copy(b).sub(a);
        edge2.copy(c).sub(a);
        normal.crossBy(edge1, edge2);

        let DdN: number = this._dir.dot(normal);
        let sign: number;

        if (DdN > 0) {
            if (backfaceCulling) return null;
            sign = 1;
        } else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        } else {
            return null;
        }

        diff.subBy(this._origin, a);
        let DdQxE2: number = sign * this._dir.dot(edge2.crossBy(diff, edge2));

        if ( DdQxE2 < 0 ) {
            return null;
        }

    }
}