import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Transform } from './Transform';
import { Base } from '../core/Base';

export class Bone extends Base {
    protected _children:Bone[] = [];
    protected _parent:Bone;
    constructor() {
        super();
    }
}
