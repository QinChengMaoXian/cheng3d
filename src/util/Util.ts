import { Vector3 } from "../math/Vector3";

export function BuildOrderedDitheringData(n: number = 4): number[] {
    const l = Math.pow(2, n);
    const l2 = l * l;
    const r = new Array(l2);
    const cx = [0, 1, 1, 0];
    const cy = [0, 1, 0, 1];
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(Math.pow(2, n - i - 1));
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

/**
     * 计算顶点切线
     * 
     * @param posData 顶点位置数组
     * @param uvData 顶点uv数组
     * @param normalData 顶点法线数组
     * @param indexData 元素索引数组
     * @returns 切线数组
     */
export function calcTangent(posData: number[], uvData: number[], normalData: number[], indexData: number[]): number[] {
    let numVertices: number = posData.length / 3;
    let numIndices: number = indexData.length;

    let tangentData: number[] = [];
    let binormalData: number[] = [];

    let normCoef: number;
    let i: number;

    for (i = 0; i < numVertices; i++) {
        tangentData[i * 4] = 0;
        tangentData[i * 4 + 1] = 0;
        tangentData[i * 4 + 2] = 0;
        tangentData[i * 4 + 3] = 0;

        binormalData[i * 3] = 0;
        binormalData[i * 3 + 1] = 0;
        binormalData[i * 3 + 2] = 0;
    }

    let tangent: Vector3 = new Vector3();
    let tangent2: Vector3 = new Vector3();
    let binormal: Vector3 = new Vector3();
    let normal: Vector3 = new Vector3();

    let sdir: Vector3 = new Vector3();
    let tdir: Vector3 = new Vector3();

    for (i = 0; i < numIndices; i += 3) {
        let i1: number = indexData[i];
        let i2: number = indexData[i + 1];
        let i3: number = indexData[i + 2];

        let v1x = posData[i1 * 3];
        let v1y = posData[i1 * 3 + 1];
        let v1z = posData[i1 * 3 + 2];

        let v2x = posData[i2 * 3];
        let v2y = posData[i2 * 3 + 1];
        let v2z = posData[i2 * 3 + 2];

        let v3x = posData[i3 * 3];
        let v3y = posData[i3 * 3 + 1];
        let v3z = posData[i3 * 3 + 2];

        let w1x = uvData[i1 * 2];
        let w1y = uvData[i1 * 2 + 1];

        let w2x = uvData[i2 * 2];
        let w2y = uvData[i2 * 2 + 1];

        let w3x = uvData[i3 * 2];
        let w3y = uvData[i3 * 2 + 1];

        let x1 = v2x - v1x;
        let x2 = v3x - v1x;
        let y1 = v2y - v1y;
        let y2 = v3y - v1y;
        let z1 = v2z - v1z;
        let z2 = v3z - v1z;

        let s1 = w2x - w1x;
        let s2 = w3x - w1x;
        let t1 = w2y - w1y;
        let t2 = w3y - w1y;

        let r = 1.0 / (s1 * t2 - s2 * t1);

        sdir.x = (t2 * x1 - t1 * x2) * r;
        sdir.y = (t2 * y1 - t1 * y2) * r;
        sdir.z = (t2 * z1 - t1 * z2) * r;

        tdir.x = (s1 * x2 - s2 * x1) * r;
        tdir.y = (s1 * y2 - s2 * y1) * r;
        tdir.z = (s1 * z2 - s2 * z1) * r;


        tangentData[i1 * 4] += sdir.x;
        tangentData[i1 * 4 + 1] += sdir.y;
        tangentData[i1 * 4 + 2] += sdir.z;

        tangentData[i2 * 4] += sdir.x;
        tangentData[i2 * 4 + 1] += sdir.y;
        tangentData[i2 * 4 + 2] += sdir.z;

        tangentData[i3 * 4] += sdir.x;
        tangentData[i3 * 4 + 1] += sdir.y;
        tangentData[i3 * 4 + 2] += sdir.z;

        binormalData[i1 * 3] += tdir.x;
        binormalData[i1 * 3 + 1] += tdir.y;
        binormalData[i1 * 3 + 2] += tdir.z;

        binormalData[i2 * 3] += tdir.x;
        binormalData[i2 * 3 + 1] += tdir.y;
        binormalData[i2 * 3 + 2] += tdir.z;

        binormalData[i3 * 3] += tdir.x;
        binormalData[i3 * 3 + 1] += tdir.y;
        binormalData[i3 * 3 + 2] += tdir.z;
    }

    for (i = 0; i < numVertices; i++) {
        //assign normal
        normal.x = normalData[i * 3];
        normal.y = normalData[i * 3 + 1];
        normal.z = normalData[i * 3 + 2];

        //normalize tangent
        tangent.x = tangentData[i * 4];
        tangent.y = tangentData[i * 4 + 1];
        tangent.z = tangentData[i * 4 + 2];

        // Gram-Schmidt orthogonalize
        let NdotT = normal.dot(tangent);
        tangent2.x = tangent.x - normal.x * NdotT;
        tangent2.y = tangent.y - normal.y * NdotT;
        tangent2.z = tangent.z - normal.z * NdotT;
        tangent2.normalize();

        tangentData[i * 4] = tangent2.x;
        tangentData[i * 4 + 1] = tangent2.y;
        tangentData[i * 4 + 2] = tangent2.z;

        binormal.x = binormalData[i * 3];
        binormal.y = binormalData[i * 3 + 1];
        binormal.z = binormalData[i * 3 + 2];

        // Calculate handedness
        tangentData[i * 4 + 3] = (normal.cross(tangent).dot(binormal) < 0) ? -1.0 : 1.0;
    }

    return tangentData;
}

