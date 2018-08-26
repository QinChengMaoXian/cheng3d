import { Airplane } from "./Airplane";
import { Ground } from "./Ground";
import { Wind } from "./wind";
import { Relic } from "./Relic";

import { LayerKey } from "../base/Constant";
import { AirCamera } from "./AirCamera";
import { App } from "../App";

export class PlayScene {

    protected _camera: AirCamera

    protected _air: Airplane;
    protected _ground: Ground;

    protected _winds: Wind[];
    protected _relics: Relic[];

    public init() {

        let air = new Airplane;
        air.init(1);

        air.getView().addToLayer(LayerKey.Player);

        this._air = air;

        this._camera = new AirCamera();
        this._camera.setTarget(air);

        this._ground = new Ground;
        this._ground.init();

        this._winds = [];
        this._relics = [];

        App.instance.timer.frameLoop(1, this, this.update);
    }

    public update() {
        let arr = this._winds;
        let l = arr.length;
        for (let i = 0; i < l; i++) {
            let wind = arr[i];
            wind.update();
        }

        this._air.update();
        this._camera.update();

    }

    get airPlane() {
        return this._air;
    }

    get ground() {
        return this._ground;
    }

    get winds() {
        return this._winds;
    }

    get relics() {
        return this._relics;
    }

}
