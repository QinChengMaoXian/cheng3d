import { Vector3 } from "./Vector3";
import { Matrix4 } from "./Matrix4";

export class Sphere {

    public pos: Vector3 = new Vector3();
    public radius: number = 0;

    constructor(pos: Vector3 = Vector3.ZUp, r: number = 0) {
        this.setAt(pos, r);
    }

    public set(x: number, y: number, z: number, r: number) {
        this.pos.set(x, y, z);
        this.radius = r;
    }

    public setAt(pos: Vector3, r: number) {
        this.pos.copy(pos);
        this.radius = r;
    }

    public applyMatrix(mat: Matrix4) {
        
    }

    public copy(s: Sphere) {
        this.pos.copy(s.pos);
        this.radius = s.radius;
    }

}