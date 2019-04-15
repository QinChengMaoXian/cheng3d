import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Bounding } from '../bounding/Bounding'
import { Base } from '../core/Base';
import { Event } from '../core/Event';
import { Raycaster, IntersectObject } from '../util/RayCaster';

export class Object3D extends Base {
    protected _position: Vector3 = new Vector3();
    protected _rotate: Quaternion = new Quaternion();
    protected _scale: Vector3 = new Vector3(1, 1, 1);
    protected _matrix: Matrix4 = new Matrix4();
    
    protected _visible: boolean = true;
    
    protected _parent: Object3D = null;
    protected _children: Object3D[] = [];

    protected _needsUpdate: boolean = true;
    protected _bounding: Bounding;

    constructor() {
        super();
    }

    public addChild(child: Object3D) {
        if (child && child._parent !== this) child.setParent(this);
    }

    public removeChild(child: Object3D) {
        if (child && child._parent === this) child.setParent(null);
    }

    public getChildren() {
        return this._children;
    }

    public enableUpdateMat() {
        this._needsUpdate = true;
    }

    protected _update(delta: number) {

    }

    public update(delta: number, parentUpdate: boolean = false) {
        let isUpdate = this._needsUpdate || parentUpdate;
        this._update(delta);
        this._makeMatrix(parentUpdate);
        
        let l = this._children.length;
        let children = this._children;
        for (let i = 0; i < l; i++) {
            children[i].update(delta, isUpdate);
        }

        if (isUpdate) {
            this._updateBounding();
        }
    }

    public lookAt(v: Vector3, up?: Vector3) { return }
    
    public setPositionAt(position: Vector3) {
        this._position.set(position.x, position.y, position.z);
        this.enableUpdateMat();
    }

    public setPosition(x: number, y: number, z: number) {
        this._position.set(x, y, z);
        this.enableUpdateMat();
    }

    public getPosition() {
        return this._position;
    }

    public setRotateAt(rotate: Quaternion) {
        this._rotate.setAt(rotate);
        this.enableUpdateMat();
    }

    public setRotate(x: number, y: number, z: number, w: number) {
        this._rotate.set(x, y, z, w);
        this.enableUpdateMat();
    }

    public getRotate() {
        return this._rotate;
    }

    public setScaleAt(scale: Vector3) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.enableUpdateMat();
    }

    public setScale(x: number, y: number, z: number) {
        this._scale.set(x, y, z);
        this.enableUpdateMat();
    }

    public getScale() {
        return this._scale;
    }

    public getMatrix() {
        return this._matrix;
    }

    protected _makeMatrix(parentUpdate: boolean = false) {
        if (this._needsUpdate || parentUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            if (this._parent) {
                this._matrix.premultiply(this._parent.getMatrix());
            }
            this._needsUpdate = false;
        }
    }

    protected _updateBounding() {
        if (this._bounding) {
            // this._bounding
        }
    }

    public set visible(v: boolean) {
        this._visible = v;
    }

    public get visible() {
        return this._visible;
    }

    public setParent(parent: Object3D) {
        if (this._parent === parent) return;
        if (this._parent) {
            let children = this._parent._children;
            children.splice(1, children.indexOf(this));
        }
        if (parent) {
            parent._children.push(this);
        } else {
            this._preCleanup();
        }
        this._parent = parent;
    }

    public getParent() {
        return this._parent;
    }

    public beRendering(): boolean {
        return false;
    }

    public getBounding() {
        return this._bounding;
    }

    private _preCleanup() {
        this._destroy();
    }

    protected _destroy() {
        this.event(Event.DESTROTY, [this]);
    }

    public set x(v: number) {
        if (this._position.x !== v) {
            this.enableUpdateMat();
            this._position.x = v;
        }
    }

    public get x() {
        return this._position.x;
    }

    public set y(v: number) {
        if (this._position.y !== v) {
            this.enableUpdateMat();
            this._position.y = v;
        }
    }

    public get y() {
        return this._position.y;
    }

    public set z(v: number) {
        if (this._position.z !== v) {
            this.enableUpdateMat();
            this._position.z = v;
        }
    }

    public get z() {
        return this._position.z;
    }

    public set rotateZ(v: number) {

    }

    public get rotateZ() {
        return 
    }

    public get isCamera(): boolean {
        return false;
    }

    public get isLight(): boolean {
        return false;
    }

    public get isMesh(): boolean {
        return false;
    }

    public get isScene(): boolean {
        return false;
    }

    public raycast(raycaster: Raycaster, intersects?: IntersectObject[]) {}

    // TODO
    public toJson(obj?) {
        let result = super.toJson(obj);
        result.position = this._position.toJson();
        result.rotate = this._rotate.toJson();
        result.scale = this._scale.toJson();
        result.visible = this.visible;
        
        const children = [];
        this._children.forEach(child => {
            children.push(child.toJson());
        });
        result.children = children;
        return result;
    }

    // TODO
    public fromJson(obj) {

    }
}

Object3D.prototype.lookAt = function () {
    const q1 = new Quaternion();
    const m1 = new Matrix4();
    const target = new Vector3();
    const position = new Vector3();

    return function (v: Vector3, up?: Vector3) {
        const parent = this._parent;
        this._makeMatrix(true);
        target.copy(v);
        position.setFromMatrixPosition(this._matrix);
        if (this.isCamera || this.isLight) {
            m1.lookAtR(position, target, up || Vector3.ZUp);
        } else {
            m1.lookAtR(target, position, up || Vector3.ZUp);
        }
        this._rotate.setFromRotationMatrix(m1);
        if (parent) {
            m1.extractRotation(parent.getMatrix());
            q1.setFromRotationMatrix(m1);
            this._rotate.premultiply(q1.invert());
        }
        this.enableUpdateMat()
    }
}()

