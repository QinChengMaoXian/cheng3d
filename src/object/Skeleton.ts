import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Base } from '../core/Base';
import { Bone } from './Bone';

export class Skeleton extends Base {
    protected bones: Bone[] = [];
    constructor() {
        super();
    }
}