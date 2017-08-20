export class Vector4 {
    x;
    y;
    z;
    w;
    constructor(x?, y?, z?, w?) {
        Object.assign(this, {
            x: x || 0,
            y: y || 0,
            z: z || 0,
            w: w || 0,
        });
    }

    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    normalize() {
        let x = this.x, y = this.y, z = this.z, w = this.w;
        let len = x*x + y*y + z*z + w*w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
            this.w = w * len;
        }
        return this;
    }

    applyMatrix4(mat4) {
        let x = this.x, y = this.y, z = this.z, w = this.w, m = mat4.data;
        this.x = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        this.y = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        this.z = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        this.w = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return this;
    }

    clone() {
        let vec4 = new Vector4();
        vec4.x = this.x;
        vec4.y = this.y;
        vec4.z = this.z;
        vec4.w = this.w;
        return vec4;
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
    }
}
