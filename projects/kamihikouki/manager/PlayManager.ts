import { Airplane } from "../model/Airplane";
import { Ground } from "../model/Ground";
import { Wind } from "../model/wind";
import { Relic } from "../model/Relic";
import { App, manager } from "../App";
import { LayerKey } from "../base/Constant";
import { PlayScene } from "../model/PlayScene";

export class PlayManager {
    
    protected _air: Airplane;
    protected _ground: Ground;

    protected _winds: Wind[];
    protected _relics: Relic[];

    protected _currectPlayScene: PlayScene;

    constructor() {

    }

    public init() {
        // test
        this._air = new Airplane;
        this._air.init(1);

        this._currectPlayScene = new PlayScene;

        manager.layer.addToLayer(this._air.getView(), LayerKey.Player);
    }

    public checkPoint() {

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