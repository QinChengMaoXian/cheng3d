import { Object3D } from '../object/Object3D';
import { Vector4 } from '../math/Vector4';

export enum LightType {
    None = 0,
    Direction = 1,
    Point = 2,
    Spot = 3,
}

export interface ILight {
    isPointLight?: boolean;
    isSpotLight?: boolean;
    isDirectionLight?: boolean;
}

export class Light extends Object3D {

    protected _color: Vector4 = new Vector4(1.0, 1.0, 1.0, 1.0);

    protected _shadow: boolean = false;

    constructor() {
        super();
    }

    public setColor(r: number, g: number, b: number) {
        const color = this._color;
        color.set(r, g, b, 1);
    }

    public enableShadow() {
        this._shadow = true;
    }

    public disableShadow() {
        this._shadow = false;
    }

    public get isLight() {
        return true;
    }

    public get color() {
        return this._color;
    }

    public get type() {
        return 0; //LightType.None;
    }
}
