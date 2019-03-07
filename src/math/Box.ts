import { Vector3 } from "./Vector3";
import { Matrix4 } from "./Matrix4";
import { Sphere } from "./Sphere";
import { Bounding } from "../bounding/Bounding";

export class Box {

    public static pubTemp: Box = new Box();

    public min: Vector3;
    public max: Vector3;

    constructor(min?: Vector3, max?: Vector3) {
        this.min = min ? min.clone() : new Vector3(Infinity, Infinity, Infinity);
        this.max = min ? max.clone() : new Vector3(-Infinity, -Infinity, -Infinity);
    }

    public reset() {
        this.min.set(Infinity, Infinity, Infinity);
        this.max.set(-Infinity, -Infinity, -Infinity);
        return this;
    }

    public setAt(min: Vector3 = Vector3.Zero, max: Vector3 = Vector3.Zero) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }

    public expandAtPoint(vec: Vector3) {
        this.min.min(vec);
        this.max.max(vec);
    }

    public expandAtBox(box: Box) {
        this.expandAtPoint(box.min);
        this.expandAtPoint(box.max);
    }

    public expandAtSphere(sphere: Sphere) {
        let r = sphere.radius;
        let vec = Vector3.pubTemp.copy(sphere.pos).add(r, r, r);
        this.expandAtPoint(vec);
        vec.copy(sphere.pos).sub(r, r, r);
        this.expandAtPoint(vec);
    }

    public applyMatrix(mat: Matrix4) {
        const min = this.min, max = this.max;
        const minx = min.x, miny = min.y, minz = min.z;
        const maxx = max.x, maxy = max.y, maxz = max.z;

        const vec3pool = Vector3.pool;

        const new_min = vec3pool.create().set(Infinity, Infinity, Infinity);
        const new_max = vec3pool.create().set(-Infinity, -Infinity, -Infinity);

        let aux = Vector3.pubTemp;

        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                    aux.set(
                        i === 1 ? maxx : minx,
                        j === 1 ? maxy : miny,
                        k === 1 ? maxz : minz
                    );

                    aux.applyMatrix4(mat);
                    new_max.max(aux);
                    new_min.min(aux);
                }
            }
        }
        min.copy(new_min);
        max.copy(new_max);

        vec3pool.recovery(new_min);
        vec3pool.recovery(new_max);
        return this;
    }

    public isEmpty() {
        return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
    }

    public cross(box: Box) {
        this.min.max(box.min);
        this.max.min(box.max);
        if (this.isEmpty()) {
            this.reset;
        }
    }

    public union(box: Box) {
        this.min.min(box.min);
        this.max.max(box.max);
    }

    public containBox(box: Box) {
        return this.min.lequal(box.min) || this.max.gequal(box.max);
    }

    public containSphere(sphere: Sphere) {
        let vec = Vector3.pubTemp;
        let pos = sphere.pos;
        let r = sphere.radius;
        vec.copy(pos).sub(r, r, r);
        if (!this.min.lequal(vec)) {
            return false;
        }
        vec.copy(pos).add(r, r, r);
        if (!this.max.gequal(vec)) {
            return false;
        }
        return true;
    }

    public containBounding(bounding: Bounding) {
        return false;
    }

    public setFromMatrix(mat: Matrix4) {

    }

    public copy(box: Box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }

    public clone() {
        let box = new Box();
        box.copy(this);
        return box;
    }
}
