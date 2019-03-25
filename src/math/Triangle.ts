import { Vector3 } from "./Vector3";
import { triangleIntersect } from "../util/TriangleIntersect";

export class Triangle {
    
    public p1 = new Vector3();
    public p2 = new Vector3();
    public p3 = new Vector3();

    constructor(p1?: Vector3, p2?: Vector3, p3?: Vector3) {
        if (p1) {
            this.p1.copy(p1);
        }
        if (p2) {
            this.p2.copy(p2);
        }
        if (p3) {
            this.p3.copy(p3);
        }
    }

    public intersectTriangle(triangle: Triangle) {
        return triangleIntersect(this, triangle);
    }
}