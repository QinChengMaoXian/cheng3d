import { Vector4 } from './Vector4'
import { Vector3 } from './Vector3'

export class Quaternion extends Vector4 {
    constructor(x?, y?, z?, w?) {
        super(x, y, z, w);
    }

    identity() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
        return this;
    }

    multiply(quat) {
        let ax = this.x, ay = this.y, az = this.z, aw = this.w,
            bx = quat.x, by = quat.y, bz = quat.z, bw = quat.w;

        this.x = ax * bw + aw * bx + ay * bz - az * by;
        this.y = ay * bw + aw * by + az * bx - ax * bz;
        this.z = az * bw + aw * bz + ax * by - ay * bx;
        this.w = aw * bw - ax * bx - ay * by - az * bz;

        return this;
    }

    setAxisAngle(axis, rad) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        this.x = s * axis.x;
        this.y = s * axis.y;
        this.z = s * axis.z;
        this.w = Math.cos(rad);
        return this;
    }

    rotationTo(vec1, vec2) {
        let v1 = vec1.clone().normalize();
        let v2 = vec2.clone().normalize();
        let dot = v1.dot(v2);
        if (dot < -0.999999) {
            let tmpvec3 = new Vector3(1,0,0).cross(v1);
            if (tmpvec3.length() < 0.000001) {
                tmpvec3 = new Vector3(0,1,0).cross(v2);
            }
            tmpvec3.normalize();
            this.setAxisAngle(tmpvec3, Math.PI)
            return this;
        } else if (dot > 0.999999) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
            return this;
        } else {
            let tmpvec3 = v1.clone().cross(v2);
            this.x = tmpvec3.x;
            this.y = tmpvec3.y;
            this.z = tmpvec3.z;
            this.w = 1 + dot;
            this.normalize();
            return this;
        }
    }

    invert() {
        let a0 = this.x, a1 = this.y, a2 = this.z, a3 = this.w,
            dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
            invDot = dot ? 1.0 / dot : 0;
        
        // TODO: Would be waiting for glMatrix.js lib update;

        this.x = -a0 * invDot;
        this.y = -a1 * invDot;
        this.z = -a2 * invDot;
        this.w = a3 * invDot;

        return this;
    }

    setFromRotationMatrix(mat4) {
        // copy for THREE.js same function;
        let te = mat4.data,

            m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
            m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
            m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

            trace = m11 + m22 + m33,
            s;

        if ( trace > 0 ) {

            s = 0.5 / Math.sqrt( trace + 1.0 );

            this.w = 0.25 / s;
            this.x = ( m32 - m23 ) * s;
            this.y = ( m13 - m31 ) * s;
            this.z = ( m21 - m12 ) * s;

        } else if ( m11 > m22 && m11 > m33 ) {

            s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

            this.w = ( m32 - m23 ) / s;
            this.x = 0.25 * s;
            this.y = ( m12 + m21 ) / s;
            this.z = ( m13 + m31 ) / s;

        } else if ( m22 > m33 ) {

            s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

            this.w = ( m13 - m31 ) / s;
            this.x = ( m12 + m21 ) / s;
            this.y = 0.25 * s;
            this.z = ( m23 + m32 ) / s;

        } else {

            s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

            this.w = ( m21 - m12 ) / s;
            this.x = ( m13 + m31 ) / s;
            this.y = ( m23 + m32 ) / s;
            this.z = 0.25 * s;

        }

        return this;
    }

    clone() {
        let vec4 = new Quaternion();
        vec4.x = this.x;
        vec4.y = this.y;
        vec4.z = this.z;
        vec4.w = this.w;
        return vec4;
    }
}
