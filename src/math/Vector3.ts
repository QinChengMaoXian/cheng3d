import { Quaternion } from "./Quaternion";
import { Matrix4 } from "./Matrix4";

export class Vector3 {
    private static _helper: Vector3 = new Vector3();

    public v: Float32Array;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.v = new Float32Array([x, y, z]);
    }

    public set(x: number, y: number, z: number): Vector3 {
        this.v[0] = x;
        this.v[1] = y;
        this.v[2] = z;
        return this;
    }

    public setAt(v: Vector3): Vector3 {
        this.v.set(v.v);
        return this;
    }

    public add(vec: Vector3): Vector3 {
        this.v[0] += vec.x;
        this.v[1] += vec.y;
        this.v[2] += vec.z;
        return this;
    }

    public sub(vec: Vector3): Vector3 {
        this.v[0] -= vec.x;
        this.v[1] -= vec.y;
        this.v[2] -= vec.z;
        return this;
    }

    public subBy(a: Vector3, b: Vector3): Vector3 {
        this.v[0] = a.x - b.x;
        this.v[1] = a.y - b.y;
        this.v[2] = a.z - b.z;
        return this;
    }

    public negate(): Vector3 {
        this.v[0] = -this.v[0];
        this.v[1] = -this.v[1];
        this.v[2] = -this.v[2];
        return this;
    }

    public mul(d: number): Vector3 {
        this.v[0] *= d;
        this.v[1] *= d;
        this.v[2] *= d;
        return this;
    }

    public dot(vec: Vector3): number {
        return this.v[0] * vec.x + this.v[1] * vec.y + this.v[2] * vec.z;
    }

    public crossBy(a: Vector3, b: Vector3) {
        let ax = a.x, ay = a.y, az = a.z,
            bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }

    public cross(vec3: Vector3): Vector3 {
        return this.crossd(vec3).clone();
    }

    public crossd(vec3: Vector3): Vector3 {
        let ax = this.v[0], ay = this.v[1], az = this.v[2],
            bx = vec3.x, by = vec3.y, bz = vec3.z;
        let vec = Vector3._helper;
        vec.x = ay * bz - az * by;
        vec.y = az * bx - ax * bz;
        vec.z = ax * by - ay * bx;
        return vec;
    }

    public length(): number {
        return Math.sqrt(this.v[0] * this.v[0] + this.v[1] * this.v[1] + this.v[2] * this.v[2]); 
    }

    public normalize(): Vector3 {
        let length = this.length();
        if (length == 0) return this;
        let length_inverse = 1.0 / length;
        this.v[0] *= length_inverse;
        this.v[1] *= length_inverse;
        this.v[2] *= length_inverse;
        return this;
    }

    public applyMatrix4(matrix: Matrix4): Vector3 {
        let x = this.v[0], y = this.v[1], z = this.v[2];
        let m = matrix.m;
        let nx = m[0] * x + m[4] * y + m[8] * z + m[12];
        let ny = m[1] * x + m[5] * y + m[9] * z + m[13];
        let nz = m[2] * x + m[6] * y + m[10] * z + m[14];
        let nw = m[3] * x + m[7] * y + m[11] * z + m[15];
        nw = 1.0 / nw;
        this.v[0] = nx * nw;
        this.v[1] = ny * nw;
        this.v[2] = nz * nw;
        return this;
    }

    public applyQuaternion(quat: Quaternion): Vector3 {
        let x = this.v[0], y = this.v[1], z = this.v[2],
            qx = quat.x, qy = quat.y, qz = quat.z, qw = quat.w;

        let ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        this.v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }

    public clone(): Vector3 {
        let vec = new Vector3();
        vec.x = this.v[0];
        vec.y = this.v[1];
        vec.z = this.v[2];
        return vec;
    }

    public copy(vec3: Vector3): Vector3 {
        this.v[0] = vec3.x;
        this.v[1] = vec3.y;
        this.v[2] = vec3.z;
        return this;
    }

    public equal(vec3: Vector3): boolean {
        return this.v[0] === vec3.x && this.v[1] === vec3.y && this.v[2] === vec3.z;
    }

    public set x(value: number) {
        this.v[0] = value;
    }
    
    public get x() {
        return this.v[0];
    }

    public set y(value: number) {
        this.v[1] = value;
    }
    
    public get y() {
        return this.v[1];
    }

    public set z(value: number) {
        this.v[2] = value;
    }
    
    public get z() {
        return this.v[2];
    }

    public get data() {
        return this.v;
    }

    public toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }

    public fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
    }
}
