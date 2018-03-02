import { Object3D } from "./Object3D";

export class Bone extends Object3D {
    protected _children:Bone[] = [];
    protected _parent:Bone;
    constructor() {
        super();
    }
}
