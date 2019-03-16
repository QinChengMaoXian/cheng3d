

export class Vector2 {

    // private static _float32Data = new Float32Array(2);

    public static readonly Zero: Vector2 = new Vector2(0, 0);
    public static readonly ZUp: Vector2 = new Vector2(0, 0);
    public static readonly One: Vector2 = new Vector2(1, 1);

    public static pubTemp: Vector2 = new Vector2();

    public v: Float32Array;

    constructor(x: number = 0, y: number = 0) {
        this.v = new Float32Array([x, y]);
    }

    public set(x: number, y: number): Vector2 {
        this.v[0] = x;
        this.v[1] = y;
        return this;
    }

    public setAt(v: Vector2): Vector2 {
        this.v.set(v.v);
        return this;
    }

    public add(x: number, y: number): Vector2 {
        this.v[0] += x;
        this.v[1] += y;
        return this;
    }

    public addAt(vec: Vector2): Vector2 {
        this.v[0] += vec.x;
        this.v[1] += vec.y;
        return this;
    }

    public sub(x: number, y: number): Vector2 {
        this.v[0] -= x;
        this.v[1] -= y;
        return this;
    }

    public subAt(vec: Vector2): Vector2 {
        this.v[0] -= vec.x;
        this.v[1] -= vec.y;
        return this;
    }

    public subBy(a: Vector2, b: Vector2): Vector2 {
        this.v[0] = a.x - b.x;
        this.v[1] = a.y - b.y;
        return this;
    }

    public negate(): Vector2 {
        this.v[0] = -this.v[0];
        this.v[1] = -this.v[1];
        return this;
    }

    public mul(d: number): Vector2 {
        this.v[0] *= d;
        this.v[1] *= d;
        return this;
    }

    public mulAt(v: Vector2): Vector2 {
        this.v[0] *= v.x;
        this.v[1] *= v.y;
        return this;
    }

    public dot(vec: Vector2): number {
        return this.v[0] * vec.x + this.v[1] * vec.y
    }

    // /**
    //  * Will change this;
    //  */
    // public crossBy(a: Vector2, b: Vector2) {
    //     let ax = a.x, ay = a.y, az = a.z,
    //         bx = b.x, by = b.y, bz = b.z;
    //     this.x = ay * bz - az * by;
    //     this.y = az * bx - ax * bz;
    //     this.z = ax * by - ay * bx;
    //     return this;
    // }

    /**
     * Will new a Vector2, not change this;
     * @param vec 
     */
    // public cross(vec: Vector2): Vector2 {
    //     return Vector2.pool.create().crossBy(this, vec);
    // }

    /**
     * Will change this;
     */
    // public crossAt(vec: Vector2): Vector2 {
    //     return this.crossBy(this, vec);
    // }

    public length(): number {
        return Math.sqrt(this.lengthSquare());
    }

    public lengthSquare(): number {
        let v = this.v;
        return v[0] * v[0] + v[1] * v[1];
    }

    public normalize(): Vector2 {
        let length = this.length();
        if (length == 0) return this;
        let length_inverse = 1.0 / length;
        this.v[0] *= length_inverse;
        this.v[1] *= length_inverse;
        return this;
    }

    // public applyMatrix4(matrix: Matrix4): Vector2 {
    //     let x = this.v[0], y = this.v[1], z = this.v[2];
    //     let m = matrix.m;
    //     let nx = m[0] * x + m[4] * y + m[8] * z + m[12];
    //     let ny = m[1] * x + m[5] * y + m[9] * z + m[13];
    //     let nz = m[2] * x + m[6] * y + m[10] * z + m[14];
    //     let nw = m[3] * x + m[7] * y + m[11] * z + m[15];
    //     nw = nw === 1.0 ? 1.0 : 1.0 / nw;
    //     this.v[0] = nx * nw;
    //     this.v[1] = ny * nw;
    //     this.v[2] = nz * nw;
    //     return this;
    // }

    // public applyQuaternion(quat: Quaternion): Vector2 {
    //     let x = this.v[0], y = this.v[1], z = this.v[2],
    //         qx = quat.x, qy = quat.y, qz = quat.z, qw = quat.w;

    //     let ix = qw * x + qy * z - qz * y,
    //         iy = qw * y + qz * x - qx * z,
    //         iz = qw * z + qx * y - qy * x,
    //         iw = -qx * x - qy * y - qz * z;

    //     this.v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    //     this.v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    //     this.v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    //     return this;
    // }

    public clone(): Vector2 {
        let vec = new Vector2();
        vec.v.set(this.v);
        return vec;
    }

    public copy(vec: Vector2): Vector2 {
        this.v.set(vec.v);
        return this;
    }

    public equal(vec: Vector2): boolean {
        return this.v[0] === vec.x && this.v[1] === vec.y;
    }

    public lequal(vec: Vector2): boolean {
        return this.v[0] <= vec.x && this.v[1] <= vec.y;
    }

    public gequal(vec: Vector2): boolean {
        return this.v[0] >= vec.x && this.v[1] >= vec.y;
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

    public get data() {
        // Vector2._float32Data.set(this.v);
        return this.v;//Vector2._float32Data;
    }

    public min(vec: Vector2) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.min(sv[0], mv[0]);
        sv[1] = Math.min(sv[1], mv[1]);
        return this;
    }

    public max(vec: Vector2) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.max(sv[0], mv[0]);
        sv[1] = Math.max(sv[1], mv[1]);
        return this;
    }

    public clamp(min: Vector2, max: Vector2) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }

    public toJson() {
        return {
            x: this.x,
            y: this.y,
        }
    }

    public fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
    }
}
