import * as CGE from '../../../src/CGE'
import { AirplaneView } from '../view/AirplaneView';

export class Airplane {

    protected _dir: CGE.Vector3;
    protected _up: CGE.Vector3;

    protected _type: number = 1;

    protected _speed: number = 0;

    protected _view: AirplaneView;

    constructor() {
        
    }

    public init(type: number = 1) {
        this._type = type;

        this._view = new AirplaneView;
        this._view.init(this._type);

        this._dir = new CGE.Vector3;
        this._up = new CGE.Vector3(0, 0, 1);
    }

    public getView() {
        return this._view;
    }

    public setPos(x: number, y: number,z: number) {
        this._view.setPosition(x, y, z);
    }

    public getPos(): CGE.Vector3 {
        return this._view.getPosition();
    }

    public setDir(x: number, y: number,z: number) {

    }

    public getDir(): CGE.Vector3 {
        return this._dir;
    }

}