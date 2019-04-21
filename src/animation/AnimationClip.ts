import { Base } from '../core/Base';
import { TrackBase } from './track/TrackBase';
import { Object3D } from '../object/Object3D';

/**
 * 一段动画
 * 一段动画可能由多个track组成，track可以是不同的类型
 */
export class AnimationClip extends Base {

    protected _tracks: Set<TrackBase> = new Set();

    protected _currectTime: number = 0;

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addTrack(track: TrackBase) {
        this._tracks.add(track);
    }

    public reset() {
        this._currectTime = 0;
    }

    public setTime(time: number) {
        this._currectTime = time;
    }

    public updateTIme(delta: number, target: Object3D) {
        this._currectTime += delta;
        this._tracks.forEach(track => {
            track.applyTime(this._currectTime, target);
        })
    }
}