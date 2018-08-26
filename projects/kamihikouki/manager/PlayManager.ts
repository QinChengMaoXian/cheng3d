import { Airplane } from "../model/Airplane";
import { Ground } from "../model/Ground";
import { Wind } from "../model/wind";
import { Relic } from "../model/Relic";
import { App, manager } from "../App";
import { LayerKey } from "../base/Constant";
import { PlayScene } from "../model/PlayScene";

export class PlayManager {

    protected _currectPlayScene: PlayScene;

    constructor() {

    }

    public init() {
        this._currectPlayScene = new PlayScene;
        this._currectPlayScene.init();

    }

    public checkPoint() {

    } 

    get airPlane() {
        return this._currectPlayScene.airPlane;
    }

    get ground() {
        return this._currectPlayScene.ground;
    }

    get winds() {
        return this._currectPlayScene.winds;
    }

    get relics() {
        return this._currectPlayScene.relics;
    }

}