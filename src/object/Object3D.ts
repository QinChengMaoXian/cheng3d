import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { EventDispatcher } from '../core/EventDispatcher';
import { Component } from './Component';
import { Bounding } from '../bounding/Bounding'
import { Base } from '../core/Base';

export class Object3D extends Base {
    protected _position: Vector3 = new Vector3();
    protected _rotate: Quaternion = new Quaternion();
    protected _scale: Vector3 = new Vector3(1, 1, 1);
    protected _matrix: Matrix4 = new Matrix4();
    
    protected _display: boolean = true;
    // protected _components: Component[] = [];
    
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
        this._makeMatrix(parentUpdate);
        this._update(delta);
        let l = this._children.length;
        let children = this._children;
        for (let i = 0; i < l; i++) {
            children[i].update(delta, isUpdate);
        }
    }

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
        this._makeMatrix();
        return this._matrix;
    }

    protected _makeMatrix(parentUpdate: boolean = false) {
        if (this._needsUpdate || parentUpdate) {
            if (this._needsUpdate) {
                this._matrix.compose(this._position, this._rotate, this._scale);
                this._needsUpdate = false;
            }
            if (this._parent && parentUpdate) {
                this._matrix.premultiply(this._parent.getMatrix());
            }
            this._updateBounding();
        }
    }

    protected _updateBounding() {
        
    }

    public getDisplay() {
        return this._display;
    }

    public setParent(parent: Object3D) {
        if (this._parent === parent) return;
        if (this._parent) {
            let children = this._parent._children;
            children.splice(1, children.indexOf(this));
        }
        if (parent) {
            parent._children.push(this);
        }
        this._parent = parent;
    }

    public getParent() {
        return this._parent;
    }

    public beRendering(): boolean {
        return false;
    }

    public isLighting(): boolean {
        return false;
    }

    public getBounding() {
        return this._bounding;
    }

    // TODO
    public toJson(obj?) {
        let result = super.toJson(obj);
        result.position = this._position.toJson();
        result.rotate = this._rotate.toJson();
        result.scale = this._scale.toJson();
        result.display = this._display;
        
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
