import { Vector3 } from "../math/Vector3";

let vec0 = new Vector3();
let vec1 = new Vector3();

export const FloatD = 0.000001;

export function createNormal(poly: number[] | Float32Array, out: Vector3) {
    vec0.set(poly[0] - poly[3], poly[1] - poly[4], poly[2] - poly[5]);
    vec1.set(poly[3] - poly[6], poly[4] - poly[7], poly[5] - poly[8]);
    out.crossBy(vec0, vec1);
}

let n0 = new Vector3()
let n1 = new Vector3();

export function crossConvexPolygon(poly0: number[] | Float32Array, poly1: number[] | Float32Array): boolean {
    if (poly0.length < 9 || poly1.length < 9) {
        return false;
    }

    createNormal(poly0, n0);
    createNormal(poly1, n1);
    
    let dot = n0.dot(n1);

    if (dot < FloatD) {

    }
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


