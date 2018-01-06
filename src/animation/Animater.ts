import { Base } from '../core/Base';
import { AnimationClip } from './AnimationClip';

export class Animater extends Base {
    private _animaterClips: Map<string, AnimationClip> = new Map();

    constructor() {
        super();
    }

    public addAnimationClip(animationClip: AnimationClip) {
        this._animaterClips.set(AnimationClip.name, animationClip);
    }

    public removeAnimationClip(animationClip: AnimationClip) {
        this._animaterClips.delete(animationClip.name);
    }
}
