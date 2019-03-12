import { Matrix4 } from "../math/Matrix4";
import { Texture } from "../graphics/Texture";
import { LightType } from "./Light";

export class Shadow {

    public enalbed = true;

    public get depthTex(): Texture {
        return null;
    }

    public init() {

    }

    public get type() {
        return LightType.None;
    }

    public destroy() {

    }

}
