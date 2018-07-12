import { Object3D } from "./Object3D";
import { Camera } from "./Camera";
import { DirectionLight } from "../light/DirectionLight";

export class Scene extends Object3D {
    
    protected _activeCamera: Camera;
    protected _defCamera: Camera;

    protected _mainLight: DirectionLight = new DirectionLight;

    constructor() {
        super();
    }

    public getMainLight() {
        return this._mainLight;
    }

    public getActiveCamera() {
        return this._activeCamera;
    }
}