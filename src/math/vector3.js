export class Vector3 {
    constructor(x, y, z) {
        Object.assign(this, {
            x: x || 0,
            y: y || 0,
            z: z || 0,
        });
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    mul(d) {
        this.x *= d;
        this.y *= d;
        this.z *= d;
        return this;
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    cross(vec3) {
        let ax = this.x, ay = this.y, az = this.z,
            bx = vec3.x, by = vec3.y, bz = vec3.z;
        let vec = new Vector3();
        vec.x = ay * bz - az * by;
        vec.y = az * bx - ax * bz;
        vec.z = ax * by - ay * bx;
        return vec;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); 
    }

    normalize() {
        let length = this.length();
        if (length == 0) return this;
        let length_inverse = 1.0 / length;
        this.x *= length_inverse;
        this.y *= length_inverse;
        this.z *= length_inverse;
        return this;
    }

    applyMatrix4(matrix) {
        let x = this.x, y = this.y, z = this.z;
        let m = matrix.data;
        this.x = m[0] * x + m[4] * y + m[8] * z + m[12];
        this.y = m[1] * x + m[5] * y + m[9] * z + m[13];
        this.z = m[2] * x + m[6] * y + m[10] * z + m[14];
        return this;
    }

    applyQuaternion(quat) {
        let x = this.x, y = this.y, z = this.z,
            qx = quat.x, qy = quat.y, qz = quat.z, qw = quat.w;

        let ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }

    clone() {
        let vec = new Vector3();
        vec.x = this.x;
        vec.y = this.y;
        vec.z = this.z;
        return vec;
    }

    copy(vec3) {
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;
    }

    equal(vec3) {
        return this.x === vec3.x && this.y === vec3.y && this.z === vec3.z;
    }
}
