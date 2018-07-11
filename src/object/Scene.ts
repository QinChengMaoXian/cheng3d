import { Object3D } from "./Object3D";
import { Camera } from "./Camera";

export class Scene extends Object3D {
    
    protected _activeCamera: Camera;
    protected _defCamera: Camera;

    constructor() {
        super();
    }

    public getActiveCamera() {
        return this._activeCamera;
    }
}