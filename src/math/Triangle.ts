import { Vector3 } from "./Vector3";


export class Triangle {
    public points: Vector3[] = [new Vector3(), new Vector3(), new Vector3()];

    constructor(p1?: Vector3, p2?: Vector3, p3?: Vector3) {
        if (p1) {
            this.point1.copy(p1);
        }
        if (p2) {
            this.point2.copy(p2);
        }
        if (p3) {
            this.point3.copy(p3);
        }
    }

    get point1(): Vector3 {
        return this.points[0];
    }

    get point2(): Vector3 {
        return this.points[1];
    }

    get point3(): Vector3 {
        return this.points[2];
    }
}