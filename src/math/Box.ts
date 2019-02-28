import { Vector3 } from "./Vector3";
import { Matrix4 } from "./Matrix4";

export class Box {

    public min: Vector3;
    public max: Vector3;

    constructor(min?: Vector3, max?: Vector3) {
        this.min = min ? min.clone(): new Vector3(Infinity, Infinity, Infinity);
        this.max = min ? max.clone(): new Vector3(-Infinity, -Infinity, -Infinity);
    }

    public setAt(min: Vector3 = Vector3.Zero, max: Vector3 = Vector3.Zero) {
        this.min.copy(min);
        this.max.copy(max);
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
    }

    public copy(box: Box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
    }
}
