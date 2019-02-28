import { Vector3 } from "./Vector3";
import { triangleIntersect } from "../util/TriangleIntersect";

export class Triangle {
    
    public point1 = new Vector3();
    public point2 = new Vector3();
    public point3 = new Vector3();

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

    public intersectTriangle(triangle: Triangle) {
        return triangleIntersect(this, triangle);
    }
}