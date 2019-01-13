import { Object3D } from '../object/Object3D';
import { Vector3 } from '../math/Vector3';

export class Sprite extends Object3D {

    /** all other paramter */
    // protected _P:{} = {};

    protected _: Float32Array = new Float32Array(4);

    constructor() {
        super();
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

    public checkPick(x: number, y: number) {

        let mat = this._matrix.clone().applyMatrix4(this._parent.getMatrix());
        mat.invert();
        let vec = new Vector3(x, y, 0);
        vec.applyMatrix4(mat);

        let rectData = this.getRectData();

        let sx = rectData[0];
        let sy = rectData[1];

        let ex = sx + rectData[2];
        let ey = sy + rectData[3];

        return vec.x >= sx && vec.x <= ex && vec.y >= sy && vec.y <= ey;
    }

    static checkEvent(base: Sprite, x: number, y: number) {

        let rectData = base.getRectData();

        let sx = rectData[0];
        let sy = rectData[1];

        let ex = sx + rectData[2];
        let ey = sy + rectData[3];

        return x >= sx && x <= ex && y >= sy && y <= ey;
    }
}