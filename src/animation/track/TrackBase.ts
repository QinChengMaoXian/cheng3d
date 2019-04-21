import { Base } from "../../core/Base";
import { FrameBase } from "../frame/FrameBase";
import { Object3D } from "../../object/Object3D";

/**
 * 一段track由若干个frame组成。
 * frame可以理解为关键帧。
 */
export class TrackBase extends Base {
    protected _fps:number;
    protected _loop:boolean = false;
    protected _currentTime = 0;
    protected _frames: FrameBase[];
    protected _maxTime: number = 0;

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

    public applyTime(time: number, target: Object3D) {
        
    }
}