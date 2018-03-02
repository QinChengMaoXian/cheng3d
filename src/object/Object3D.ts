import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Base } from '../core/Base';

export class Object3D extends Base {
    protected _position: Vector3 = new Vector3();
    protected _rotate: Quaternion = new Quaternion();
    protected _scale: Vector3 = new Vector3(1, 1, 1);
    protected _matrix: Matrix4 = new Matrix4();
    protected _needsUpdate: boolean = true;

    protected _parent: Object3D = null;
    protected _children: Object3D[] = [];

    constructor() {
        super();
    }

    public addChild(child: Object3D) {
        child._parent = this;
    }

    public removeChild(child: Object3D) {
        
    }

    public setNeedUpdateMatrix() {
        this._needsUpdate = true;
    }

    public update(delta: number) {
        this.makeMatrix();
    }

    public setPosition(position: Vector3) {
        this._position.set(position.x, position.y, position.z);
        this.setNeedUpdateMatrix();
    }

    public setPositionValue(x: number, y: number, z: number) {
        this._position.set(x, y, z);
        this.setNeedUpdateMatrix();
    }

    public getPosition() {
        return this._position;
    }

    public setRotate(rotate: Quaternion) {
        this._rotate.set(rotate.x, rotate.y, rotate.z, rotate.w);
        this.setNeedUpdateMatrix();
    }

    public getRotate() {
        return this._rotate;
    }

    public setScale(scale: Vector3) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.setNeedUpdateMatrix();
    }

    public getScale() {
        return this._scale;
    }

    public getMatrix() {
        this.makeMatrix();
        return this._matrix;
    }

    public makeMatrix() {
        if (this._needsUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            this._needsUpdate = false;
        }
    }

    public decompose() {
        this._matrix.decompose(this._position, this._rotate, this._scale);
    }

    public applyMatrix4(mat4) {
        this._matrix.applyMatrix4(mat4);
        this.decompose();
    }

    public makeLookAtFromThis(initEye, initCenter, initUp) {
        let e = !initEye ? new Vector3(0,0,0) : initEye.clone();
        let c = !initCenter ? new Vector3(1,0,0) : initCenter.clone();
        let u = !initUp ? new Vector3(0,0,1) : initUp.clone();
        e.applyMatrix4(this._matrix);
        c.applyMatrix4(this._matrix);
        u.applyMatrix4(this._matrix);
        let mat = new Matrix4();
        mat.lookAt(e, c, u);
        return mat;
    }

    public lookAt(center, up) {
        let c = center.clone();
        let u = up === undefined ? new Vector3(0,0,1) : up.clone();
        this._matrix.lookAt(this._position, c, u);
        this._matrix.invert();
        this.decompose();
    }
}