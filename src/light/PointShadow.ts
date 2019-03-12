import { Shadow } from "./Shadow";
import { LightType } from "./Light";

export class PointShadow extends Shadow {

    constructor() {
        super();
    }

    public get type() {
        return LightType.Point;
    }

}