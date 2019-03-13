import { Object3D } from '../object/Object3D';
import { Vector4 } from '../math/Vector4';
import { Vector3 } from '../math/Vector3';
import { Shadow } from './Shadow';
import { Camera } from '../object/Camera';

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

    protected static readonly DefDir = new Vector3(0, 0, 1);

    static readonly LumFactor = new Vector4(0.27, 0.67, 0.06, 0.0);

    protected _color: Vector4 = new Vector4(1.0, 1.0, 1.0, 1.0);

    protected _shadow: Shadow;

    constructor() {
        super();
    }

    public setColor(r: number, g: number, b: number) {
        const color = this._color;
        color.set(r, g, b, 1);
    }

    public enableShadow() {

    }

    public disableShadow() {
        
    }

    public clearShadow() {

    }

    public get shadow(): Shadow {
        return null;
    }

    public setScale(x, y, z) {}
    public setScaleAt(vec: Vector3) {}
    public getScale() {
        return Vector3.One;
    }

    public get pos() {
        return this._position;
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
