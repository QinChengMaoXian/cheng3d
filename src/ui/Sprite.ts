import { Base } from '../core/Base';
import { Matrix4 } from '../math/Matrix4';
import { Object3D } from '../object/Object3D';

export class Sprite extends Object3D {

    /** all other paramter */
    // protected _P:{} = {};

    protected _: Float32Array = new Float32Array(4);

    // protected _parent: Sprite = null;
    // protected _children: Sprite[] = [];

    constructor() {
        super();
    }

    // public addChild(child: Sprite) {
    //     if (child && child._parent !== this) child.setParent(this);
    // }

    // public removeChild(child: Sprite) {
    //     if (child && child._parent === this) child.setParent(null);
    // }

    // public getChildren() {
    //     return this._children;
    // }

    protected _update() {
        if (this._needsUpdate) {
            this._needsUpdate = false;
        }
    }

    public needsUpdate() {
        this._needsUpdate = true;
    }

    // public setParent(parent: Sprite) {
    //     if (this._parent === parent) return;
    //     if (this._parent) {
    //         let children = this._parent._children;
    //         children.splice(1, children.indexOf(this));
    //     }
    //     if (parent) {
    //         parent._children.push(this);
    //     }
    //     this._parent = parent;
    // }

    // public getParent() {
    //     return this._parent;
    // }

    public setSize(width: number, height: number) {
        this._[0] = width;
        this._[1] = height;
        this.needsUpdate();
    }

    public set width(v: number) {
        this._[0] = v;
    } 

    public get width(): number {
        return this._[0];
    }

    public set height(v: number) {
        this._[1] = v;
    } 

    public get height(): number {
        return this._[1];
    }

    public set rotate(v: number) {
        this._[2] = v;
    }

    public get rotate() {
        return this._[2] = 0;
    }

    public set mouseEnable(v: boolean) {
        this._[3] = v ? 1 : 0;
    }

    public get mouseEnable(): boolean {
        return this._[3] !== 0;
    }

    public getRectData(): number[] {
        return [this.x, this.y, this.width, this.height];
    }

    public getStagePosData(): number[] {
        let mat:Matrix4 = this._parent ? this._parent.getMatrix() : Matrix4.unitMat4;
        return []
    }
}