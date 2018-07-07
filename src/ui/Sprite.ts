import { Object3D } from '../object/Object3D';
import { Event } from '../core/Event'
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

    public setSize(width: number, height: number) {
        this._data[2] = width;
        this._data[3] = height;
        this._update();
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

    public set width(value: number) {
        this._data[2] = value;
    } 

    public get width(): number {
        return this._data[2];
    }

    public set height(value: number) {
        this._data[3] = value;
    } 

    public get height(): number {
        return this._data[3];
    }

    public get scalex(): number {
        return this._data[4];
    }

    public get scaley(): number {
        return this._data[5];
    }

    static checkEvent(base: Sprite, event: Event) {
        let px = event.stageX;
        let py = event.stageY;

        let sx = base.x;
        let sy = base.y;

        let ex = sx + base.width;
        let ey = sy + base.height;

        if (px >= sx && px <= ex && py >= sy && py <= ey) {
            
        }

    }
}