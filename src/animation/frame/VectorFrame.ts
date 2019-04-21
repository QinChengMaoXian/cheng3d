import { FrameBase } from "./FrameBase";
import { Vector3 } from "../../math/Vector3";

export class VectorFrame extends FrameBase {
    public vector: Vector3 = new Vector3();

    constructor(time:number, vector: Vector3) {
        super(time);
        this.vector.copy(vector);
    }
}