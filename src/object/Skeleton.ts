import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Base } from '../core/Base';

export class Skeleton extends Base {
    rootJoint = undefined;
    constructor() {
        super();
    }
}