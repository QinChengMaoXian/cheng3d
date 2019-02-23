import { Object3D } from '../object/Object3D';
import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';
import { Point2 } from '../math/Point2';
import { Event } from '../core/Event';

export class Sprite extends Object3D {

    /** all other paramter */
    // protected _P:{} = {};

    protected _: Float32Array = new Float32Array(4);

    protected _isThrough: boolean = false;

    constructor() {
        super();

        this.mouseEnable = true;
    }

    protected _update() {
        if (this._needsUpdate) {
            this._needsUpdate = false;
        }
    }

    public needsUpdate() {
        this._needsUpdate = true;
    }

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

    public getStageData(): number[] {
        let rectData = this.getRectData();

        let mat = this._matrix;

        let xs = rectData[0];
        let ys = rectData[1];
        let xe = xs + rectData[2];
        let ye = ys + rectData[3];

        let param = [[xs, ys], [xs, ye], [xe, ye], [xe, ys]];

        let result = [];

        let vec = new Vector3;

        for (let i = 0; i < 4; i++) {
            let d = param[i];
            vec.set(d[0], d[1], 0);
            vec.applyMatrix4(mat);
            result.push(vec.x, vec.y);
        }

        return result;
    }

    public isRender(): boolean {
        return false;
    }

    public getUIData(): string {
        return '';
    }

    public getIsFont(): boolean {
        return false;
    }

    /**
     * 点选检测
     * @param x client坐标x
     * @param y client坐标y
     */
    public checkPick(x: number, y: number) {
        let pmat = this._parent ? this._parent.getMatrix() : Matrix4.unitMat4;
        let mat = Matrix4.pubTemp.copy(this._matrix).applyMatrix4(pmat);
        mat.invert();
        let vec = new Vector3(x, y, 0);
        vec.applyMatrix4(mat);

        let rectData = this.getRectData();

        let sx = 0;
        let sy = 0;

        let ex = sx + rectData[2];
        let ey = sy + rectData[3];

        return vec.x >= sx && vec.x <= ex && vec.y >= sy && vec.y <= ey;
    }

    /**
     * 子节点检测
     * @param x 
     * @param y 
     * @param e 
     */
    public checkChildPick(x: number, y: number, e: Event) {
        // 是否选中自己
        if (!this.checkPick(x, y) || !this.mouseEnable) {
            return false;
        }
        // 将自己添加到path中 TODO: 可以穿透的物体没有事件怎么办？
        e.path.push(this);

        // 遍历子节点的选中情况
        let children = this._children;
        let l = children.length;
        for (let i = 0 ; i < l; i++) {
            let child = <Sprite>children[i];
            if (child.checkChildPick(x, y, e)) {
                return true;
            }
        }

        // 对自己发送事件
        this.event(e.type, [e]);
        if (!this._isThrough || e.stopPropagation) {
            return true;
        }
    }

    public screenPointToLocal(pos: Point2) {
        let pmat = this._parent ? this._parent.getMatrix() : Matrix4.unitMat4;
        let mat = Matrix4.pubTemp.copy(this._matrix).applyMatrix4(pmat);
        mat.invert();
        let vec = new Vector3(pos.x, pos.y, 0);
        vec.applyMatrix4(mat);
        return new Point2(vec.x, vec.y)
    }
}