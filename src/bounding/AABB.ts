import { Bounding } from './Bounding';
import { OBB } from './OBB'
import { Vector3 } from '../math/Vector3';
import { Matrix4 } from '../math/Matrix4';

export class AABB extends Bounding {
    protected _min: Vector3 = new Vector3();
    protected _max: Vector3 = new Vector3();

    constructor() {
        super();
    }

    public makeFrom(src: AABB, mat: Matrix4) {
        
    }

    public setMin(x: number, y: number, z: number) {
        this._min.set(x, y, z);
    }

    public setMinAt(vec: Vector3) {
        this._min.setAt(vec);
    }

    public setMax(x: number, y: number, z: number) {
        this._max.set(x, y, z);
    }

    public setMaxAt(vec: Vector3) {
        this._max.setAt(vec);
    }

    public getMin() {
        return this._min;
    }

    public getMax() {
        return this._max;
    }
}