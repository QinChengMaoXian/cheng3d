import { Light, ILight } from "./Light";
import { Vector3 } from "../math/Vector3";
import { DirectionShadow } from "./DirectionShadow";

export class DirectionLight extends Light implements ILight {

    protected _dir: Vector3 = new Vector3().normalize();

    protected _shadow: DirectionShadow;

    constructor() {
        super();

        this.setPosition(150, 200, 200);

        let vec = Vector3.pubTemp.set(1, 1, 0.5).normalize();
        this.setDirection(vec);
    }

    public setPosition(x, y, z) {
        super.setPosition(x, y, z);
    }

    public setDir(x:number, y: number, z: number) {
        let vec = Vector3.pubTemp.set(x, y, z).normalize();
        this.setDirection(vec);
    }

    public setDirection(dir: Vector3) {
        this._rotate.rotationTo(Light.DefDir, dir);

        this._dir.set(0, 0, 1);
        this._dir.applyQuaternion(this._rotate).normalize();
    }

    public get dir() {
        return this._dir;
    }

    public enableShadow() {
        if (!this._shadow) {
            this._shadow = new DirectionShadow();
            this._shadow.init();
        }
    }

    public disableShadow() {
        if (!this._shadow) {
            return;
        }
    }

    public clearShadow() {
        if (this._shadow) {
            this._shadow.destroy();
            this._shadow = null;
        }
    }

    public get shadow() {
        return this._shadow;
    }

    public get type() {
        return 1; //LightType.Direction;
    }

    public get isDirectionLight() {
        return true;
    }
}
