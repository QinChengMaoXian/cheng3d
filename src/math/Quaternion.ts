import { Vector4 } from './Vector4'
import { Vector3 } from './Vector3'
import { Matrix4 } from './Matrix4';

export class Quaternion extends Vector4 {
    public static readonly Zero: Quaternion = new Quaternion();

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        super(x, y, z, w);
    }

    public identity() {
        this.v[0] = 0;
        this.v[1] = 0;
        this.v[2] = 0;
        this.v[3] = 1;
        return this;
    }

    public multiply(quat: Quaternion) {
        Quaternion.multiply(this, quat, this);
        return this;
    }

    public premultiply(quat: Quaternion) {
        Quaternion.multiply(quat, this, this);
        return this;
    }

    public static multiply(q1: Quaternion, q2: Quaternion, o: Quaternion) {
        let v = q1.v;
        let ax = v[0], ay = v[1], az = v[2], aw = v[3];
        v = q2.v;
        let bx = v[0], by = v[1], bz = v[2], bw = v[3];

        v = o.v;
        v[0] = ax * bw + aw * bx + ay * bz - az * by;
        v[1] = ay * bw + aw * by + az * bx - ax * bz;
        v[2] = az * bw + aw * bz + ax * by - ay * bx;
        v[3] = aw * bw - ax * bx - ay * by - az * bz;
    }

    public setAxisAngle(axis: Vector3, rad: number) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        this.v[0] = s * axis.x;
        this.v[1] = s * axis.y;
        this.v[2] = s * axis.z;
        this.v[3] = Math.cos(rad);
        return this;
    }

    public rotationTo(vec1: Vector3, vec2: Vector3) {
        return this;
    }

    public invert() {
        let a0 = this.v[0], a1 = this.v[1], a2 = this.v[2], a3 = this.v[3],
            dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
            invDot = dot ? 1.0 / dot : 0;
        
        // TODO: Would be waiting for glMatrix.js lib update;

        this.v[0] = -a0 * invDot;
        this.v[1] = -a1 * invDot;
        this.v[2] = -a2 * invDot;
        this.v[3] = a3 * invDot;

        return this;
    }

    public setFromRotationMatrix(mat4: Matrix4) {
        // copy for THREE.js same function;
        let te = mat4.m,

            m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
            m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
            m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

            trace = m11 + m22 + m33,
            s;

        if ( trace > 0 ) {

            s = 0.5 / Math.sqrt( trace + 1.0 );

            this.v[3] = 0.25 / s;
            this.v[0] = ( m32 - m23 ) * s;
            this.v[1] = ( m13 - m31 ) * s;
            this.v[2] = ( m21 - m12 ) * s;

        } else if ( m11 > m22 && m11 > m33 ) {

            s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

            this.v[3] = ( m32 - m23 ) / s;
            this.v[0] = 0.25 * s;
            this.v[1] = ( m12 + m21 ) / s;
            this.v[2] = ( m13 + m31 ) / s;

        } else if ( m22 > m33 ) {

            s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

            this.v[3] = ( m13 - m31 ) / s;
            this.v[0] = ( m12 + m21 ) / s;
            this.v[1] = 0.25 * s;
            this.v[2] = ( m23 + m32 ) / s;

        } else {

            s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

            this.v[3] = ( m21 - m12 ) / s;
            this.v[0] = ( m13 + m31 ) / s;
            this.v[1] = ( m23 + m32 ) / s;
            this.v[2] = 0.25 * s;

        }

        return this;
    }

    public clone() {
        let quat = new Quaternion();
        quat.setAt(this);
        return quat;
    }
}

Quaternion.prototype.rotationTo = function() {
    let v1 = new Vector3()
    let v2 = new Vector3()
    let v = new Vector3()
    return function(vec1: Vector3, vec2: Vector3) {
        v1.copy(vec1).normalize()
        v2.copy(vec2).normalize()
        let dot = v1.dot(v2);
        if (dot < -0.999999) {
            v.set(1,0,0).crossAt(v1);
            if (v.lengthSquare() < 0.000000001) {
                v.set(0,1,0).crossAt(v2);
            }
            v.normalize();
            this.setAxisAngle(v, Math.PI);
            return this;
        } else if (dot > 0.999999) {
            this.v[0] = 0;
            this.v[1] = 0;
            this.v[2] = 0;
            this.v[3] = 1;
            return this;
        } else {
            v.crossBy(v1, v2);
            this.v[0] = v.x;
            this.v[1] = v.y;
            this.v[2] = v.z;
            this.v[3] = 1 + dot;
            this.normalize();
            return this;
        }
    }
}();
