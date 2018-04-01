export class Vector4 {
    public v: Float32Array;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.v = new Float32Array([x, y, z, w]);
    }

    public set(x, y, z, w) {
        this.v[0] = x;
        this.v[1] = y;
        this.v[2] = z;
        this.v[3] = w;
        return this;
    }

    public setAt(v: Vector4) {
        this.v.set(v.v);
    }

    public normalize() {
        let x = this.v[0], y = this.v[1], z = this.v[2], w = this.v[3];
        let len = x*x + y*y + z*z + w*w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.v[0] = x * len;
            this.v[1] = y * len;
            this.v[2] = z * len;
            this.v[3] = w * len;
        }
        return this;
    }

    public applyMatrix4(mat4) {
        let x = this.v[0], y = this.v[1], z = this.v[2], w = this.v[3], m = mat4.m;
        this.v[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        this.v[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        this.v[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        this.v[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return this;
    }

    public clone() {
        let vec4 = new Vector4();
        vec4.x = this.v[0];
        vec4.y = this.v[1];
        vec4.z = this.v[2];
        vec4.w = this.v[3];
        return vec4;
    }

    public copy(v) {
        this.v[0] = v.v[0];
        this.v[1] = v.v[1];
        this.v[2] = v.v[2] ;
        this.v[3] = v.v[3];
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

    public set w(value: number) {
        this.v[3] = value;
    }

    public get w() {
        return this.v[3];
    }

    public get data() {
        return this.v;
    }

    public toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        }
    }

    public fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        this.w = obj.w;
    }
}
