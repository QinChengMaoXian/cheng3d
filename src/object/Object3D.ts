import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Base } from '../core/Base';
import { Component } from './Component';
import { Bounding } from '../bounding/Bounding'

export class Object3D extends Base {
    protected _position: Vector3 = new Vector3();
    protected _rotate: Quaternion = new Quaternion();
    protected _scale: Vector3 = new Vector3(1, 1, 1);
    protected _matrix: Matrix4 = new Matrix4();
    
    protected _display: boolean = true;
    protected _components: Component[] = [];
    
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

    public setNeedUpdateMatrix() {
        this._needsUpdate = true;
        let l = this._children.length;
        let children = this._children;
        for (let i = 0; i < l; i++) {
            children[i].setNeedUpdateMatrix();
        }
    }

    public update(delta: number) {
        this._makeMatrix();
        let l = this._children.length;
        let children = this._children;
        for (let i = 0; i < l; i++) {
            children[i].update(delta);
        }
    }

    public setPositionAt(position: Vector3) {
        this._position.set(position.x, position.y, position.z);
        this.setNeedUpdateMatrix();
    }

    public setPosition(x: number, y: number, z: number) {
        this._position.set(x, y, z);
        this.setNeedUpdateMatrix();
    }

    public getPosition() {
        return this._position;
    }

    public setRotateAt(rotate: Quaternion) {
        this._rotate.setAt(rotate);
        this.setNeedUpdateMatrix();
    }

    public setRotate(x: number, y: number, z: number, w: number) {
        this._rotate.set(x, y, z, w);
        this.setNeedUpdateMatrix();
    }

    public getRotate() {
        return this._rotate;
    }

    public setScaleAt(scale: Vector3) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.setNeedUpdateMatrix();
    }

    public setScale(x: number, y: number, z: number) {
        this._scale.set(x, y, z);
        this.setNeedUpdateMatrix();
    }

    public getScale() {
        return this._scale;
    }

    public getMatrix() {
        this._makeMatrix();
        return this._matrix;
    }

    protected _makeMatrix() {
        if (this._needsUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            if (this._parent) {
                this._matrix.premultiply(this._parent.getMatrix());
            }
            this._needsUpdate = false;
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

    public getBounding() {
        return this._bounding;
    }

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

    public fromJson(obj) {

    }
}
