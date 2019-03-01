import { Vector4 } from './Vector4'
import { Vector3 } from './Vector3'

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

    public multiply(quat) {
        let ax = this.v[0], ay = this.v[1], az = this.v[2], aw = this.v[3],
            bx = quat.x, by = quat.y, bz = quat.z, bw = quat.w;

        this.v[0] = ax * bw + aw * bx + ay * bz - az * by;
        this.v[1] = ay * bw + aw * by + az * bx - ax * bz;
        this.v[2] = az * bw + aw * bz + ax * by - ay * bx;
        this.v[3] = aw * bw - ax * bx - ay * by - az * bz;

        return this;
    }

    public setAxisAngle(axis: Vector3, rad) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        this.v[0] = s * axis.x;
        this.v[1] = s * axis.y;
        this.v[2] = s * axis.z;
        this.v[3] = Math.cos(rad);
        return this;
    }

    public rotationTo(vec1, vec2) {
        let v1 = vec1.clone().normalize();
        let v2 = vec2.clone().normalize();
        let dot = v1.dot(v2);
        if (dot < -0.999999) {
            let tmpvec3 = Vector3.pool.create();
            tmpvec3.set(1,0,0).crossAt(v1);
            if (tmpvec3.lengthSquare() < 0.000000001) {
                tmpvec3.set(0,1,0).crossAt(v2);
            }
            tmpvec3.normalize();
            this.setAxisAngle(tmpvec3, Math.PI);
            Vector3.pool.recovery(tmpvec3);
            return this;
        } else if (dot > 0.999999) {
            this.v[0] = 0;
            this.v[1] = 0;
            this.v[2] = 0;
            this.v[3] = 1;
            return this;
        } else {
            let tmpvec3 = v1.clone().cross(v2);
            this.v[0] = tmpvec3.x;
            this.v[1] = tmpvec3.y;
            this.v[2] = tmpvec3.z;
            this.v[3] = 1 + dot;
            this.normalize();
            return this;
        }
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

    public setFromRotationMatrix(mat4) {
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
        let vec4 = new Quaternion();
        vec4.x = this.v[0];
        vec4.y = this.v[1];
        vec4.z = this.v[2];
        vec4.w = this.v[3];
        return vec4;
    }
}
