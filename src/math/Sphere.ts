import { Vector3 } from "./Vector3";

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

}