import { ObjectBase } from "../../core/ObjectBase";
import { FrameBase } from "../frame/FrameBase";

export class TrackBase extends ObjectBase {
    protected _fps:number;
    protected _loop:boolean = false;
    protected _currentTime = 0;
    protected _frames: FrameBase[];

    constructor(name:string, fps:number = 30, loop:boolean = false,) {
        super();
        this.name = name;
        this._fps = fps;
        this._loop = loop;
    }

    public addFrame(frame: FrameBase) {

    }

    public removeFrame(frame: FrameBase) {

    }
}