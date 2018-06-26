import { Object3D } from '../object/Object3D'

import { Vector4 } from '../math/Vector4'

export enum LightType {
    None = 0,
    Direction = 1,
    Point = 2,
    Spot = 3,
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

    public isLighting() {
        return true;
    }

    public getColor() {
        return this._color;
    }

    public getType() {
        return LightType.None;
    }
}
