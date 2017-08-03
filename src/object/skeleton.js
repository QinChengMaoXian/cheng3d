import { Vector3 } from '../math/vector3.js';
import { Quaternion } from '../math/quaternion.js';
import { Matrix4 } from '../math/matrix4.js';
import { CObject } from '../core/object.js';

export class Skeleton extends CObject {
    constructor() {
        super();
        rootJoint = undefined;
    }
}