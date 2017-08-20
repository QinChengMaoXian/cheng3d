import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { ObjectBase } from '../core/ObjectBase';

export class Skeleton extends ObjectBase {
    rootJoint = undefined;
    constructor() {
        super();
    }
}