import { Vector3 } from '../math/vector3.js';
import { Quaternion } from '../math/quaternion.js';
import { Matrix4 } from '../math/matrix4.js';
import { CObject } from '../core/object.js';

export class Transform extends CObject {
    constructor(position, rotate, scale) {
        super();
        Object.assign(this, {
            _position: position || new Vector3(),
            _rotate: rotate || new Quaternion(),
            _scale: scale || new Vector3(1, 1, 1),
            _matrix: new Matrix4(),
            _needsUpdate: true,
        });
        this.makeMatrix();
    }

    setNeedUpdateMatrix() {
        this._needsUpdate = true;
    }

    update() {
        this.makeMatrix();
    }

    setPosition(position) {
        this._position.set(position.x, position.y, position.z);
        this.setNeedUpdateMatrix();
    }

    getPosition() {
        return this._position;
    }

    setRotate(rotate) {
        this._rotate.set(position.x, position.y, position.z, rotate.w);
        this.setNeedUpdateMatrix();
    }

    getRotate() {
        return this._rotate;
    }

    setScale(scale) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.setNeedUpdateMatrix();
    }

    getScale() {
        return this._scale;
    }

    getMatrix() {
        return this._matrix;
    }

    makeMatrix() {
        if (this._needsUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            this._needsUpdate = false;
        }
    }

    decompose() {
        this._matrix.decompose(this._position, this._rotate, this._scale);
    }

    applyMatrix4(mat4) {
        this._matrix.applyMatrix4(mat4);
        this.decompose();
    }

    makeLookAtFromThis(initEye, initCenter, initUp) {
        let e = initEye === undefined ? new Vector3(0,0,0) : initEye.clone();
        let c = initCenter === undefined ? new Vector3(1,0,0) : initCenter.clone();
        let u = initUp === undefined ? new Vector3(0,0,1) : initUp.clone();
        e.applyMatrix4(this._matrix);
        c.applyMatrix4(this._matrix);
        u.applyMatrix4(this._matrix);
        let mat = new Matrix4();
        mat.lookAt(e, c, u);
        return mat;
    }

    lookAt(center, up) {
        let c = center.clone();
        let u = up === undefined ? new Vector3(0,0,1) : up.clone();
        this._matrix.lookAt(this.position, c, u);
        this._matrix.invert();
        this.decompose();
    }
}