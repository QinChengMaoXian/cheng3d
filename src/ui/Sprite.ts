import { Object3D } from '../object/Object3D';
import { Event } from '../core/Event'
import { Base } from '../core/Base';

export class Sprite extends Base {

    // all paramter
    protected _P:{} = {};

    protected _parent: Sprite = null;
    protected _children: Sprite[] = [];

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
        this._P[2] = width;
        this._P[3] = height;
        this._update();
    }

    public set x(v: number) {
        this._P['x'] = v
    }

    public get x(): number {
        return this._P['x'] || 0;
    } 

    public set y(v: number) {
        this._P['y'] = v
    }

    public get y(): number {
        return this._P['y'] || 0;
    } 

    public set width(v: number) {
        this._P['width'] = v;
    } 

    public get width(): number {
        return this._P['width'] || 0;
    }

    public set height(v: number) {
        this._P['height'] = v;
    } 

    public get height(): number {
        return this._P['height'] || 0;
    }

    public set mouseEnable(v: boolean) {
        this._P['mouseEnable'] = v;
    }

    public get mouseEnable(): boolean {
        return this._P['mouseEnable'] || false;
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