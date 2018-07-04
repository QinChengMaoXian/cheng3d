import { Object3D } from '../object/Object3D';
import { Base } from '../core/Base';

export class Sprite extends Base {

    // x, y, w, h
    protected _data: Int32Array = new Int32Array(6);

    protected _parent: Sprite = null;
    protected _children: Sprite[] = [];

    protected _sizeForce = false;

    protected _needsUpdate: boolean = true;

    constructor() {
        super();
    }

    public addChild(child: Sprite) {
        if (child && child._parent !== this) child.setParent(this);
    }

    public removeChild(child: Sprite) {
        if (child && child._parent === this) child.setParent(null);
    }

    public getChildren() {
        return this._children;
    }

    private _update() {
        if (this._needsUpdate) {
            this._needsUpdate = false;
        }
    }

    public needsUpdate() {
        this._needsUpdate = true;
    }

    public setParent(parent: Sprite) {
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

    public set x(value: number) {
        this._data[0] = value
    }

    public get x(): number {
        return this._data[0];
    } 

    public set y(value: number) {
        this._data[1] = value
    }

    public get y(): number {
        return this._data[1];
    } 

    public get width(): number {
        this._update();
        return this._data[2];
    }

    public get height(): number {
        this._update();
        return this._data[3];
    }

    public get scalex(): number {
        return this._data[4];
    }
}