import * as CGE from '../../../src/CGE';
import { App } from '../App';
import { Airplane } from '../model/Airplane';


export class AirCamera {

    protected _camera: CGE.Camera;

    protected _target: Airplane;

    protected _dir: CGE.Vector3 = new CGE.Vector3(0, 1, 1).normalize();

    constructor(camera?: CGE.Camera) {
        this._camera = camera || App.instance.cgeApp.getCamera();
    }

    public update() {
        if (!this._target) {
            return;
        }

        let pos = this._target.getPos();
        this._camera.lookAt(pos);

        let d = pos.clone().add(this._dir);

        this._camera.setPositionAt(d);
    }

    public setTarget(target: Airplane) {
        this._target = target;
    }

    public getCameraObj(): CGE.Camera {
        return this._camera;
    }

}