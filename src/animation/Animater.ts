import { Base } from '../core/Base';
import { AnimationClip } from './AnimationClip';
import { Object3D } from '../object/Object3D';

/**
 * 动画控制
 */
export class Animater extends Base {

    protected _animaterClips: Map<string, AnimationClip> = new Map();

    protected _currectClip: AnimationClip;

    protected _target: Object3D;

    constructor(target: Object3D) {
        super();
        this._target = target;
    }

    public addAnimationClip(animationClip: AnimationClip) {
        this._animaterClips.set(animationClip.name, animationClip);
    }

    public removeAnimationClip(animationClip: AnimationClip) {
        this._animaterClips.delete(animationClip.name);
    }

    public play(name: string) {
        const clip = this._animaterClips.get(name);
        if (clip) {
            this._currectClip = clip;
        }
    }

    public stop() {
        this._currectClip = null;
    }

    public update(delta: number) {
        if (this._currectClip) {
            this._currectClip.updateTIme(delta, this._target);
        }
    }
}
