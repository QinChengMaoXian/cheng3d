import { Airplane } from "./Airplane";
import { Ground } from "./Ground";
import { Wind } from "./wind";
import { Relic } from "./Relic";

export class PlayScene {

    protected _air: Airplane;
    protected _ground: Ground;

    protected _winds: Wind[];
    protected _relics: Relic[];

    public init() {
        
    }

}
