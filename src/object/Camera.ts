import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Quaternion } from '../math/Quaternion';
import { Object3D } from './Object3D';

export enum CameraType {
    Orthographic = 0,
    Perspective = 1,
}

export class Camera extends Object3D {
    protected _far: number;
    protected _near: number;
    protected _left: number;
    protected _right: number;
    protected _bottom: number;
    protected _top: number;
    protected _fovy: number;
    protected _aspect: number;
    protected _type: CameraType = CameraType.Perspective;
    protected _center = new Vector3();
    protected _up = new Vector3(0, 0, 1);
    protected _projectionFunc: Function;

    protected _projection = new Matrix4();
    protected _viewProjection = new Matrix4();

    protected _matrixInverse: Matrix4 = new Matrix4();
    protected _projectionInverse: Matrix4 = new Matrix4();

    constructor(width?: number, height?: number, _fovy?: number, _near?: number, _far?: number) {
        super();
        let w = (width || 800) * 0.5;
        let h = (height || 600) * 0.5;
        this._far = _far || 2000.0;
        this._near = _near || 1.0;
        this._left = -w; 
        this._right = w; 
        this._bottom = h; 
        this._top = -h;
        this._fovy = _fovy || Math.PI / 3;
        this._aspect = w / h;
        this._projection = new Matrix4();
        this._center = new Vector3();
        this._up = new Vector3(0, 0, 1);
        this._projectionFunc = this._makePerspectiveMatrix.bind(this);
        this._resetUp();
    }

    protected _resetUp() {
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        if (forward.equal(rightAxis)) 
            return;
        this._up = rightAxis.cross(forward).normalize();
    }

    public update(delta: number) {
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
        // super._makeMatrix(true);
        this._update();
        return this._matrix;
    }

    public enableOrthographicMode(_left?: number, _right?: number, _bottom?: number, _top?: number, _near?: number, _far?: number) {
        this._projectionFunc = this._makeOrthographicMatrix;
        this._type = CameraType.Orthographic
        this._left = _left || this._left;
        this._right = _right || this._right;
        this._bottom = _bottom || this._bottom;
        this._top = _top || this._top;
        this._near = _near || this._near;
        this._far = _far || this._far;
        this.resize(_right - _left, _bottom - _top);
    }

    public enablePerspectiveMode(_fovy?: number, _aspect?: number, _near?: number, _far?: number) {
        this._projectionFunc = this._makePerspectiveMatrix;
        this._type = CameraType.Perspective
        this._fovy = _fovy || this._fovy;
        this._aspect = _aspect || this._aspect;
        let height = Math.abs(this._bottom - this._top);
        let width = height * _aspect;
        this._near = _near;
        this._far = _far;
        this.resize(width, height);
    }

    public makeProjectionMatrix() {
        this._projectionFunc();
    }

    protected _makeOrthographicMatrix() {
        this._projection.orthographic(this._left, this._right, this._bottom, this._top, this._near, this._far);
        this._makeProjectionInverseMatrix();
    }

    protected _makePerspectiveMatrix() {
        this._projection.perspective(this._fovy, this._aspect, this._near, this._far);
        this._makeProjectionInverseMatrix();
    }

    protected _makeProjectionInverseMatrix() {
        this._projectionInverse.getInvert(this._projection);
    }

    public getProjectionMatrix() {
        return this._projection;
    }

    public makeViewProjectionMatrix() {
        let mat4 = this._viewProjection
        mat4.copy(this._projection);
        mat4.applyMatrix4(this._matrix);
    }

    public getViewProjectionMatrix() {
        return this._viewProjection;
    }

    public getViewInverseMatrix() {
        return this._matrixInverse;
    }

    public getProjectionInverseMatrix() {
        return this._projectionInverse;
    }

    public makeMatrix() {
        this.lookAt(this._center);
    }

    public applyMatrix4(mat4: Matrix4) {
        this._position.applyMatrix4(mat4);
        this._center.applyMatrix4(mat4);
        this._up.applyMatrix4(mat4);
    }

    public setUp(up: Vector3) {
        this._up.copy(up);
        this.enableUpdateMat();
    }

    public lookAt(center: Vector3) {
        if (center) {
            this._center.copy(center);
            this._resetUp();
            this.enableUpdateMat();
        }
    }

    protected _updateMatrix() {
        this._matrix.lookAt(this._position, this._center, this._up);
        this._matrixInverse.getInvert(this._matrix);
    }

    public resize(width: number, height: number) {
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

    public forwardStep(delta: number) {
        let dir = this._center.clone().subAt(this._position).normalize().mul(delta);
        this._addPosCenter(dir);
    }

    public horizontalStep(delta: number) {
        let dir = this._center.clone().subAt(this._position).cross(this._up).normalize().mul(delta);
        this._addPosCenter(dir);
    }

    public verticalStep(delta: number) {
        this._center.z += delta;
        this._position.z += delta;
        this.enableUpdateMat();
    }

    protected _addPosCenter(dir: Vector3) {
        this._position.addAt(dir);
        this._center.addAt(dir);
        this.enableUpdateMat();
    }

    protected _rotateView(axis: Vector3, rad: number) {
        let quat = new Quaternion();
        quat.setAxisAngle(axis, -rad);
        let temp = this._center.clone().subAt(this._position)
        let length = temp.length();
        let dir = temp.normalize();
        this._rotate.multiply(quat);
        dir.applyQuaternion(quat);
        this._center = this._position.clone().addAt(dir.mul(length));
        this._up.applyQuaternion(quat);   
    }

    public rotateViewFromForward(movementX: number, movementY: number) {
        // enhance this.
        this._rotateView(new Vector3(0,0,1), movementX);
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        this._rotateView(rightAxis, movementY);
        this.enableUpdateMat();
    }

    get type() {
        return this._type;
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
