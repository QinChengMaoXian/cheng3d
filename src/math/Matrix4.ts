import { GLMAT_EPSILON } from '../core/Base';

import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';

export class Matrix4 {

    private static _float32Data = new Float32Array(16);

    static pubTemp: Matrix4 = new Matrix4;
    static readonly unitMat4: Matrix4 = new Matrix4;

    public m: Float32Array;
    // public _data: Float32Array;
    constructor() {
        // this._data = new Float32Array(16);
        this.m = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    public identity() {
        let m = this.m;
        m[0]    = 1; m[1]   = 0; m[2]   = 0; m[3]   = 0;
        m[4]    = 0; m[5]   = 1; m[6]   = 0; m[7]   = 0;
        m[8]    = 0; m[9]   = 0; m[10]  = 1; m[11]  = 0;
        m[12]   = 0; m[13]  = 0; m[14]  = 0; m[15]  = 1;
        return this;
    }

    public translate(position: Vector3) {
        let m = this.m;
        let x = position.x, y = position.y, z = position.z;
        m[12] += m[0] * x + m[4] * y + m[8] * z;
        m[13] += m[1] * x + m[5] * y + m[9] * z;
        m[14] += m[2] * x + m[6] * y + m[10] * z;
        m[15] += m[3] * x + m[7] * y + m[11] * z;
        return this;
    }

    public setPosition(position: Vector3) {
        let m = this.m;
        let x = position.x, y = position.y, z = position.z;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        return this;
    }

    public rotate(axis: Vector3, rad: number) {
        let m = this.m;
        let x = axis.x, y = axis.y, z = axis.z,
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t,
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            b00, b01, b02,
            b10, b11, b12,
            b20, b21, b22;

        if (Math.abs(len) < GLMAT_EPSILON) { return null; }
        
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;

        a00 = m[0]; a01 = m[1]; a02 = m[2]; a03 = m[3];
        a10 = m[4]; a11 = m[5]; a12 = m[6]; a13 = m[7];
        a20 = m[8]; a21 = m[9]; a22 = m[10]; a23 = m[11];

        b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

        m[0] = a00 * b00 + a10 * b01 + a20 * b02;
        m[1] = a01 * b00 + a11 * b01 + a21 * b02;
        m[2] = a02 * b00 + a12 * b01 + a22 * b02;
        m[3] = a03 * b00 + a13 * b01 + a23 * b02;
        m[4] = a00 * b10 + a10 * b11 + a20 * b12;
        m[5] = a01 * b10 + a11 * b11 + a21 * b12;
        m[6] = a02 * b10 + a12 * b11 + a22 * b12;
        m[7] = a03 * b10 + a13 * b11 + a23 * b12;
        m[8] = a00 * b20 + a10 * b21 + a20 * b22;
        m[9] = a01 * b20 + a11 * b21 + a21 * b22;
        m[10] = a02 * b20 + a12 * b21 + a22 * b22;
        m[11] = a03 * b20 + a13 * b21 + a23 * b22;

        return this;
    }

    public scale(v: Vector3) {
        let m = this.m;

        m[0] *= v.x;
        m[1] *= v.x;
        m[2] *= v.x;
        m[3] *= v.x;

        m[4] *= v.y;
        m[5] *= v.y;
        m[6] *= v.y;
        m[7] *= v.y;

        m[8] *= v.z;
        m[9] *= v.z;
        m[10] *= v.z;
        m[11] *= v.z;

        return this;
    }

    public transpose() {
        let m = this.m;
        this.m.set([
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15],
        ]);
        return this;
    }

    public invert() {
        let m = this.m;
        let a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
            a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
            a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11],
            a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) { 
            return null; 
        }
        det = 1.0 / det;

        m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return this;
    }

    public invertTranspose() {
        return this.transpose().invert();
    }

    public multiply(matrix: Matrix4) {
        return Matrix4.multiply(this, matrix, this);
    }

    public premultiply(matrix: Matrix4) {
        return Matrix4.multiply(matrix, this, this);
    }

    public applyMatrix4(matrix) {
        return this.multiply(matrix);
    }

    public lookAt(eye: Vector3, center: Vector3, up: Vector3) {
        let vec_z = eye.clone().subAt(center);
        vec_z.normalize();

        let vec_x = up.cross(vec_z);
        vec_x.normalize();

        let vec_y = vec_z.cross(vec_x);
        vec_y.normalize();

        let m = this.m;

        m[0] = vec_x.x;
        m[1] = vec_y.x;
        m[2] = vec_z.x;
        m[3] = 0;
        m[4] = vec_x.y;
        m[5] = vec_y.y;
        m[6] = vec_z.y;
        m[7] = 0;
        m[8] = vec_x.z;
        m[9] = vec_y.z;
        m[10] = vec_z.z;
        m[11] = 0;
        m[12] = 0;//-(x0 * eyex + x1 * eyey + x2 * eyez);
        m[13] = 0;//-(y0 * eyex + y1 * eyey + y2 * eyez);
        m[14] = 0;//-(z0 * eyex + z1 * eyey + z2 * eyez);
        m[15] = 1;

        let vec3 = Vector3.pubTemp.copy(eye).applyMatrix4(this);

        m[12] = -vec3.x;
        m[13] = -vec3.y;
        m[14] = -vec3.z;

        return this;
    }

    public perspective(fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(fovy / 2), 
            nf = 1.0 / (near - far);
        let m = this.m;
        m[0] = f / aspect;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = f;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = (far + near) * nf;
        m[11] = -1;
        m[12] = 0;
        m[13] = 0;
        m[14] = (2 * far * near) * nf;
        m[15] = 0;
        return this;
    }

    public frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        let rl = 1 / (right - left),
            tb = 1 / (top - bottom),
            nf = 1 / (near - far);
        this.m[0] = (near * 2) * rl;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = (near * 2) * tb;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = (right + left) * rl;
        this.m[9] = (top + bottom) * tb;
        this.m[10] = (far + near) * nf;
        this.m[11] = -1;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = (2 * far * near) * nf;
        this.m[15] = 0;
        return this;
    }

    public orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        let lr = 1 / (left - right),
            bt = 1 / (bottom - top),
            nf = 1 / (near - far);
        this.m[0] = -2 * lr;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = -2 * bt;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = 2 * nf;
        this.m[11] = 0;
        this.m[12] = (left + right) * lr;
        this.m[13] = (top + bottom) * bt;
        this.m[14] = (far + near) * nf;
        this.m[15] = 1;
        return this;
    }

    public makeForQuaternion(quat: Quaternion) {
        let m = this.m;
        let x = quat.x, y = quat.y, z = quat.z, w = quat.w,
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        m[0] = 1 - yy - zz;
        m[1] = yx + wz;
        m[2] = zx - wy;
        m[3] = 0;

        m[4] = yx - wz;
        m[5] = 1 - xx - zz;
        m[6] = zy + wx;
        m[7] = 0;

        m[8] = zx + wy;
        m[9] = zy - wx;
        m[10] = 1 - xx - yy;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }

    public determinant () {
        var te = this.m;

        var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
        var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
        var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
        var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

        //TODO: make this more efficient
        // copy from THREE.js;
        //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

        return (
            n41 * (
                + n14 * n23 * n32
                 - n13 * n24 * n32
                 - n14 * n22 * n33
                 + n12 * n24 * n33
                 + n13 * n22 * n34
                 - n12 * n23 * n34
            ) +
            n42 * (
                + n11 * n23 * n34
                 - n11 * n24 * n33
                 + n14 * n21 * n33
                 - n13 * n21 * n34
                 + n13 * n24 * n31
                 - n14 * n23 * n31
            ) +
            n43 * (
                + n11 * n24 * n32
                 - n11 * n22 * n34
                 - n14 * n21 * n32
                 + n12 * n21 * n34
                 + n14 * n22 * n31
                 - n12 * n24 * n31
            ) +
            n44 * (
                - n13 * n22 * n31
                 - n11 * n23 * n32
                 + n11 * n22 * n33
                 + n13 * n21 * n32
                 - n12 * n21 * n33
                 + n12 * n23 * n31
            )

        );
    }

    public compose(position: Vector3, quaternion: Quaternion, scale: Vector3) {
        this.makeForQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this;
    }

    public decompose(position: Vector3, quaternion: Quaternion, scale: Vector3) {
        let vector = new Vector3();
        let matrix = new Matrix4();

        let te = this.m;

        let sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
        let sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
        let sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

        // if determine is negative, we need to invert one scale
        var det = this.determinant();
        if ( det < 0 ) {
            sx = - sx;
        }

        position.x = te[ 12 ];
        position.y = te[ 13 ];
        position.z = te[ 14 ];

        // scale the rotation part

        matrix.m.set( this.m ); 
        // at this point matrix is incomplete so we can't use .copy()

        var invSX = 1 / sx;
        var invSY = 1 / sy;
        var invSZ = 1 / sz;

        matrix.m[ 0 ] *= invSX;
        matrix.m[ 1 ] *= invSX;
        matrix.m[ 2 ] *= invSX;

        matrix.m[ 4 ] *= invSY;
        matrix.m[ 5 ] *= invSY;
        matrix.m[ 6 ] *= invSY;

        matrix.m[ 8 ] *= invSZ;
        matrix.m[ 9 ] *= invSZ;
        matrix.m[ 10 ] *= invSZ;

        quaternion.setFromRotationMatrix( matrix );

        scale.x = sx;
        scale.y = sy;
        scale.z = sz;

        return this;
    }

    public makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3) {
        this.m.set([
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            0,       0,       0,       1
        ]);
        return this;
    }

    public clone() {
        let mat4 = new Matrix4();
        mat4.m.set(this.m);
        return mat4;
    }

    public copy(matrix: Matrix4) {
        this.m.set(matrix.m);
        return this;
    }

    /**
     * 请勿对通过data获取的float32Array赋值。
     * 修改数值请使用mat.m。
     */
    public get data() {
        // this._data.set(this.m);
        // this._data.set(this.m);
        return this.m;
        // return this.m;
    }

    public static multiply(l: Matrix4, r: Matrix4, out: Matrix4) {
        //l, r, out 可以为相同的矩阵
        let a = l.m, b = r.m, o = out.m;
        let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
            a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
            a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
            a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
        o[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        o[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        o[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        o[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
        o[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        o[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        o[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        o[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
        o[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        o[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        o[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        o[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
        o[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        o[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        o[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        o[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

        return out;
    }
}
