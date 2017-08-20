import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Transform } from './Transform';
import { ObjectBase } from '../core/ObjectBase';

export class Bone extends ObjectBase {
    _children = [];
    _parent = undefined;
    constructor() {
        super();
    }
}
