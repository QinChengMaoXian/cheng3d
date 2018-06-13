import { Object3D } from '../object/Object3D'

import { Vector4 } from '../math/Vector4'

export enum LightType {
    Direction = 0,
    Point = 1,
    Spot = 2,
}

export class Light extends Object3D {

    protected _color: Vector4 = new Vector4();

    protected _shadow: boolean = false;

    constructor() {
        super();
    }

    public setColor(r: number, g: number, b: number) {
        const color = this._color;
        color.set(r, g, b, color.w);
    }

    public enableShadow() {
        this._shadow = true;
    }

    public disableShadow() {
        this._shadow = false;
    }

    public getType() {
        return -1;
    }
}
