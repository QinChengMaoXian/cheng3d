import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Quaternion } from '../math/Quaternion';
import { Object3D } from './Object3D';

export class Camera extends Object3D {
    public static readonly Orthographic = 0;
    public static readonly Perspective = 1;

    protected _far: number;
    protected _near: number;
    protected _left: number;
    protected _right: number;
    protected _bottom: number;
    protected _top: number;
    protected _fovy: number;
    protected _aspect: number;
    protected _mode: number = Camera.Perspective;
    protected _projection = new Matrix4();
    protected _viewProjection = new Matrix4();
    protected _center = new Vector3();
    protected _up = new Vector3(0, 0, 1);
    protected _projectionFunc: Function;

    constructor(width?: number, height?: number, _fovy?: number, _near?: number, _far?: number) {
        super();
        let w = (width || 800) * 0.5;
        let h = (height || 600) * 0.5;
        Object.assign(this, {
            _far: _far || 2000.0,
            _near: _near || 1.0,
            _left: -w, 
            _right: w, 
            _bottom: h, 
            _top: -h,
            _fovy: _fovy || Math.PI / 3,
            _aspect: w / h,
            _mode: Camera.Perspective,
            _projection: new Matrix4(),
            _center: new Vector3(),
            _up: new Vector3(0, 0, 1),
            _projectionFunc: this._makePerspectiveMatrix.bind(this)
        });
        this._resetUp();
    }

    protected _resetUp() {
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        if (forward.equal(rightAxis)) 
            return;
        this._up = rightAxis.cross(forward).normalize();
    }

    update(delta: number) {
        this._update();
    }

    protected _update() {
        if (this._needsUpdate) {
            this._updateMatrix();
            this.makeProjectionMatrix();
            this.makeViewProjectionMatrix();
            this._needsUpdate = false;
        }
    }

    protected _makeMatrix() {
        this._update();
        return this._matrix;
    }

    enableOrthographicMode(_left?, _right?, _bottom?, _top?, _near?, _far?) {
        this._projectionFunc = this._makeOrthographicMatrix;
        this._mode = Camera.Orthographic;
        this._left = _left || this._left;
        this._right = _right || this._right;
        this._bottom = _bottom || this._bottom;
        this._top = _top || this._top;
        this._near = _near || this._near;
        this._far = _far || this._far;
        this.resize(_right - _left, _bottom - _top);
    }

    enablePerspectiveMode(_fovy, _aspect, _near, _far) {
        this._projectionFunc = this._makePerspectiveMatrix;
        this._mode = Camera.Perspective;
        this._fovy = _fovy || this._fovy;
        this._aspect = _aspect || this._aspect;
        let height = Math.abs(this._bottom - this._top);
        let width = height * _aspect;
        this._near = _near;
        this._far = _far;
        this.resize(width, height);
    }

    get mode() {
        return this._mode;
    }

    makeProjectionMatrix() {
        this._projectionFunc();
    }

    protected _makeOrthographicMatrix() {
        this._projection.orthographic(this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    protected _makePerspectiveMatrix() {
        this._projection.perspective(this._fovy, this._aspect, this._near, this._far);
    }

    getProjectionMatrix() {
        return this._projection;
    }

    makeViewProjectionMatrix() {
        let mat4 = this._viewProjection
        mat4.copy(this._projection);
        mat4.applyMatrix4(this._matrix);
    }

    getViewProjectionMatrix() {
        return this._viewProjection;
    }

    makeMatrix() {
        this.lookAt(this._center);
    }

    applyMatrix4(mat4) {
        this._position.applyMatrix4(mat4);
        this._center.applyMatrix4(mat4);
        this._up.applyMatrix4(mat4);
    }

    setUp(_up) {
        this._up.copy(_up);
        this.enableUpdateMat();
    }

    lookAt(center) {
        if (center) {
            this._center.copy(center);
            this._resetUp();
            this.enableUpdateMat();
        }
    }

    _updateMatrix() {
        this._matrix.lookAt(this._position, this._center, this._up);
    }

    resize(width, height) {
        let xCenter = (this._right - this._left) * 0.5 + this._left;
        let yCenter = (this._bottom - this._top) * 0.5 + this._top;
        let halfWidth = width * 0.5;
        let halfHeight = height * 0.5;
        this._left = xCenter - halfWidth;
        this._right = xCenter + halfWidth;
        this._top = yCenter - halfHeight;
        this._bottom = yCenter + halfHeight;
        this._aspect = width / height;
        this._needsUpdate = true;
        this._update();
    }

    forwardStep(delta) {
        let dir = this._center.clone().subAt(this._position).normalize().mul(delta);
        this._addPosCenter(dir);
    }

    horizontalStep(delta) {
        let dir = this._center.clone().subAt(this._position).cross(this._up).normalize().mul(delta);
        this._addPosCenter(dir);
    }

    verticalStep(delta) {
        this._center.z += delta;
        this._position.z += delta;
        this.enableUpdateMat();
    }

    _addPosCenter(dir) {
        this._position.addAt(dir);
        this._center.addAt(dir);
        this.enableUpdateMat();
    }

    _rotateView(axis, rad) {
        let quat = new Quaternion();
        quat.setAxisAngle(axis, -rad);
        let temp = this._center.clone().subAt(this._position)
        let length = temp.length();
        let dir = temp.normalize();

        dir.applyQuaternion(quat);
        this._center = this._position.clone().addAt(dir.mul(length));
        this._up.applyQuaternion(quat);   
    }

    rotateViewFromForward(movementX, movementY) {
        // enhance this.
        this._rotateView(new Vector3(0,0,1), movementX);
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        this._rotateView(rightAxis, movementY);
        this.enableUpdateMat();
    }

    get fovy() {
        return this._fovy;
    }

    get aspect() {
        return this._aspect;
    }

    get far() {
        return this._far;
    }

    get near() {
        return this._near;
    }
}
