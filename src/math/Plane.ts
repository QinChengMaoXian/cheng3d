import { Vector3 } from "./Vector3";
import { Box } from "./Box";

export class Plane {

    /** 法线方向(ax + by + cz + d = 0;中的 a,b,c) */
    protected _normal: Vector3;
    /** 离开原点的距离，(ax + by + cz + d = 0;中的 d) */
    protected _distance: number;

    constructor(normal: Vector3 = Vector3.ZUp, distance: number = 0) {
        this._normal = new Vector3();
        this.setAt(normal, distance);
    }

    public set(x: number, y: number, z: number, d: number) {
        this._normal.set(x, y, z);
        this._distance = d;
        return this;
    }

    public setAt(normal: Vector3, distance: number) {
        this._normal.copy(normal);
        this._distance = distance;
        return this;
    }

    public setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3 ) {
		this._normal.copy(normal);
		this._distance = - point.dot(normal);
		return this;
	}

    public distanceToPoint(p: Vector3): number {
        return this._normal.dot(p) + this._distance;
    }

    public normalize() {
        let length = 1.0 / this._normal.length();
        this._normal.mul(length);
        this._distance *= length;
        return this;
    }

    public copy(plane: Plane) {
        this._normal.copy(plane._normal);
        this._distance = plane._distance;
        return this;
    }

    public intersectBox(box: Box) {
        
    } 

    get distance() {
        return this._distance;
    }

    get normal() {
        return this._normal;
    }



}