import { TrackBase } from "./TrackBase";
import { Vector3 } from "../../math/Vector3";
import { VectorFrame } from "../frame/VectorFrame";
import { Object3D } from "../../object/Object3D";

export class VectorTrack extends TrackBase {

    protected _frames: VectorFrame[] = [];

    constructor(name:string, fps:number = 30, loop:boolean = false,) {
        super(name, fps, loop);
    }

    /**
     * 通过帧数添加frame
     * @param frame 
     * @param vec 
     */
    public addVectorByFrame(frame: number, vec: Vector3) {
        let time = frame * this._fps;
        this.addVector(time, vec);
    }

    /**
     * 通过时间添加frame
     * @param time 毫秒
     * @param vec 
     */
    public addVector(time: number, vec: Vector3) {
        let frame = new VectorFrame(time, vec);
        this.addFrame(frame);
        this._maxTime = Math.max(time, this._maxTime);
    }

    /**
     * 添加一个frame
     * @param frame
     */
    public addFrame(frame: VectorFrame) {
        this._frames.push(frame);
    }

    /**
     * 移除一个frame
     * @param frame
     */
    public removeFrame(frame: VectorFrame) {
        const idx = this._frames.indexOf(frame);
        if (idx >= 0) {
            this._frames.splice(idx, 1);
        }
    }

    /**
     * 通过时间移除一个frame
     * @param time 
     */
    public removeFrameFromTime(time: number) {
        const frames = this._frames;
        for (let i = 0, l = frames.length; i < l; i++) {
            if (frames[i].time === time) {
                this._frames.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 通过时间的先后对其排序
     */
    public sortTime() {
        this._frames.sort((a: VectorFrame, b: VectorFrame) => {
            return a.time - b.time;
        })
    }

    /**
     * 
     * @param time 
     * @param target 
     */
    public applyTime(time: number, target: Object3D) {
        const frames = this._frames;

        if (frames.length === 0 || !target) {
            return;
        }

        let realTime = time / this._maxTime;
        realTime -= Math.floor(realTime);
        realTime *= this._maxTime;

        let i = 0;
        for (let l = frames.length; i < l; i++) {
            if (frames[i].time >= realTime) {
                break;
            }
        }

        if (0 === i) {
            target.setPositionAt((frames[i]).vector);
        } else {
            const begin = frames[i-1];
            const end = frames[i];

            let time = end.time - begin.time;
            let ctime = realTime - begin.time;

            let pos = target.getPosition();
            pos.lerp(begin.vector, end.vector, ctime / time);
            target.enableUpdateMat();
        }
    }
}


