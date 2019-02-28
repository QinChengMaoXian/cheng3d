import { Light, LightType, ILight } from "./Light";
import { Vector3 } from "../math/Vector3";

export class SpotLight extends Light implements ILight {

    protected _dir: Vector3 = new Vector3();
    protected _angle: number = 0;

    constructor() {
        super();
    }

    public get type() {
        return LightType.Spot;
    }

    get isSpotLight() {
        return false;
    }    
}
