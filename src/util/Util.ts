import { Vector3 } from "../math/Vector3";

export const FloatD = 0.000001;

export function createNormal(poly: number[] | Float32Array, out: Vector3) {
    let vec0 = Vector3.pool.create();
    let vec1 = Vector3.pool.create();
    vec0.set(poly[0] - poly[3], poly[1] - poly[4], poly[2] - poly[5]);
    vec1.set(poly[3] - poly[6], poly[4] - poly[7], poly[5] - poly[8]);
    out.crossBy(vec0, vec1);
    Vector3.pool.recovery(vec0);
    Vector3.pool.recovery(vec1);
}

let n0 = new Vector3()
let n1 = new Vector3();

export function crossConvexTriangle(poly0: number[] | Float32Array, poly1: number[] | Float32Array): boolean {

    let vec0 = Vector3.pool.create();
    let vec1 = Vector3.pool.create();

    let a0 = [];
    let a1 = [];

    createNormal(poly0, n0);
    createNormal(poly1, n1);

    vec0.set(poly0[3], poly0[4], poly0[5]);
    vec1.set(poly1[3], poly1[4], poly1[5]);

    let nv0 = n0.v;
    let nv1 = n1.v;

    let d0 = -n0.dot(vec0);
    let d1 = -n1.dot(vec1);

    Vector3.pool.recovery(vec0);
    Vector3.pool.recovery(vec1);

    // first 

    // vec1.set(poly1[0], poly1[1], poly1[2]);
    let t0p10 = nv0[0] * poly1[0] + nv0[1] * poly1[1] + nv0[1] * poly1[2] + d0; //n0.dot(vec1) + d0;

    // vec1.set(poly1[3], poly1[4], poly1[5]);
    let t0p11 = nv0[0] * poly1[3] + nv0[1] * poly1[4] + nv0[1] * poly1[5] + d0; //n0.dot(vec1) + d0;

    // vec1.set(poly1[6], poly1[7], poly1[8]);
    let t0p12 = nv0[0] * poly1[6] + nv0[1] * poly1[7] + nv0[1] * poly1[8] + d0; //n0.dot(vec1) + d0;

    if ((t0p10 > 0 && t0p11 > 0 && t0p12 > 0) || (t0p10 < 0 && t0p11 < 0 && t0p12 < 0)) {
        return false;
    } else if (t0p10 === 0 && t0p11 === 0 && t0p12 === 0) {
        // on same plane
    }

    // vec0.set(poly0[0], poly0[1], poly0[2]);
    let t1p00 = nv1[0] * poly0[0] + nv1[1] * poly0[1] + nv1[1] * poly0[2] + d1; //n1.dot(vec0) + d1;

    // vec0.set(poly0[3], poly0[4], poly0[5]);
    let t1p01 = nv1[0] * poly0[3] + nv1[1] * poly0[4] + nv1[1] * poly0[5] + d1; //n1.dot(vec0) + d1;

    // vec0.set(poly0[6], poly0[7], poly0[8]);
    let t1p02 = nv1[0] * poly0[6] + nv1[1] * poly0[7] + nv1[1] * poly0[8] + d1; //n1.dot(vec0) + d1;

    if ((t1p00 > 0 && t1p01 > 0 && t1p02 > 0) || (t1p00 < 0 && t1p01 < 0 && t1p02 < 0)) {
        return false;
    }

    return false;
}

export function BuildOrderedDitheringData(n: number = 4): number[] {
    const l = Math.pow(2, n);
    const l2 = l * l;
    const r = new Array(l2);
    const cx = [0, 1, 1, 0]; 
    const cy = [0, 1, 0, 1];
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(Math.pow(2, n-i-1));
    }
    let x, y, b, p;
    let t = new Uint32Array([0]);
    for (let i = 0; i < l2; i++) {
        x = y = 0;
        t[0] = i;
        for (let j = 0; j < n; j++) {
            b = t[0] % 4;
            p = a[j];
            x += cx[b] * p;
            y += cy[b] * p;
            t[0] /= 4;
        }
        r[y * l + x] = i;
    }
    let helf = l2 / 2 - 1;
    for (let i = 0; i < l2; i++) {
        if (r[i] < helf) {
            r[i]++;
        }
    }
    return r;
}


