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

export interface IPoint2D {
    x: number;
    y: number;
}

export function Check2DPointInPoly(pt: IPoint2D, poly: IPoint2D[]): boolean {
    let i, j;
    let c: boolean = false;
    for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        let posi = poly[i];
        let posj = poly[j];

        if ((((posi.y <= pt.y) && (pt.y < posj.y)) || ((posj.y <= pt.y) && (pt.y < posi.y)))
            && (pt.x < (posj.x - posi.x) * (pt.y - posi.y) / (posj.y - posi.y) + posi.x)) {
            c = !c;
        }
    }
    return c;
}
