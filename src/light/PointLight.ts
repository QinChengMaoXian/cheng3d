import { Light, LightType, ILight } from "./Light";

export class PointLight extends Light implements ILight {

    constructor() {
        super();
    }

    public get type() {
        return LightType.Point; //LightType.Direction;
    }

    public get isPointLight() {
        return true;
    }
}
