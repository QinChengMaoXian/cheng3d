import { Vector3 } from '../math/vector3.js';
import { Matrix4 } from '../math/matrix4.js';
import { Transform } from './transform.js';

export class Camera extends Transform {
    static get Orthographic() { return 0; }
    static get Perspective() { return 1; }

    constructor(width, height, fovy, near, far) {
        super();
        let w = (width || 800) * 0.5;
        let h = (height || 600) * 0.5;
        Object.assign(this, {
            far: far || 2000.0,
            near: near || 0.1,
            left: -w, 
            right: w, 
            bottom: h, 
            top: -h,
            fovy: fovy || Math.PI / 3,
            aspect: w / h,
            mode: Camera.Perspective,
            projection: new Matrix4(),
            center: new Vector3(),
            up: new Vector3(0, 0, 1),
            _projectionFunc: this._makePerspectiveMatrix,
        });
    }

    update() {
        if (this._needsUpdate) {
            this.lookAt(this.center);
            this.makeProjectionMatrix();
            this._needsUpdate = false;
        }
    }

    enableOrthographicMode(left, right, bottom, top, near, far) {
        this._projectionFunc = this._makeOrthographicMatrix;
        this.mode = Camera.Orthographic;
        this.left = left || this.left;
        this.right = right || this.right;
        this.bottom = bottom || this.bottom;
        this.top = top || this.top;
        this.near = near || this.near;
        this.far = far || this.far;
    }

    enablePerspectiveMode(fovy, aspect, near, far) {
        this._projectionFunc = this._makePerspectiveMatrix;
        this.mode = Camera.Perspective;
        this.fovy = fovy || this.fovy;
        this.aspect = aspect || this.aspect;
        let height = Math.abs(this.bottom - this.top);
        let width = height * aspect;
        this.resize(width, height);
    }

    getMode() {
        return this.mode;
    }

    makeProjectionMatrix() {
        this._projectionFunc();
    }

    _makeOrthographicMatrix() {
        this.projection.orthographic(this.left, this.right, this.bottom, this.top, this.near, this.far);
    }

    _makePerspectiveMatrix() {
        this.projection.perspective(this.fovy, this.aspect, this.near, this.far);
    }

    getProjectionMatrix() {
        return this.projection;
    }

    getViewProjectionMatrix() {
        let mat4 = this.projection.clone();
        mat4.applyMatrix4(this.getMatrix());
        return mat4;
    }

    makeMatrix() {
        this.lookAt(this.center);
    }

    applyMatrix4(mat4) {
        super.applyMatrix4(mat4);
        this.eye.applyMatrix4(mat4);
        this.center.applyMatrix4(mat4);
        this.up.applyMatrix4(mat4);
    }

    setUp(up) {
        this.up.copy(up);
        this.setNeedUpdateMatrix();
    }

    lookAt(center) {
        if (center) {
            this.center.copy(center);
            this._matrix.lookAt(this._position, center, this.up);
        }
    }

    resize(width, height) {
        this.setNeedUpdateMatrix();
        let xCenter = (this.right - this.left) * 0.5 + this.left;
        let yCenter = (this.bottom - this.top) * 0.5 + this.top;
        let halfWidth = width * 0.5;
        let halfHeight = height * 0.5;
        this.left = xCenter - halfWidth;
        this.right = xCenter + halfWidth;
        this.top = yCenter - halfHeight;
        this.bottom = yCenter + halfHeight;
        this.aspect = width / height;
    }
}