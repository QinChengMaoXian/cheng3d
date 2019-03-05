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

    public at(t: number, target: Vector3) {
        if (target === undefined) {
            console.warn('CGE.Ray: .at() target is now required');
            target = new Vector3();
        }
        return target.copy(this._dir).mul(t).addAt(this._origin);
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
    public intersectTriangle(a: Vector3, b: Vector3, c: Vector3, backfaceCulling: boolean, target: Vector3) {
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

        let DdN: number = this._dir.dot(normal);
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

        diff.subBy(this._origin, a);
        let DdQxE2: number = sign * this._dir.dot(edge2.crossBy(diff, edge2));

        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return false;
        }

        let DdE1xQ: number = sign * this._dir.dot(edge1.cross(diff));

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

    public toJson() {
        return {
            origin: this._origin.toJson(),
            dir: this._dir.toJson
        }
    }

    public fromJson(obj:any) {
        this._origin.fromJson(obj.origin);
        this._dir.fromJson(obj.dir);
    }
}