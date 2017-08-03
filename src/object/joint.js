import { Vector3 } from '../math/vector3.js';
import { Quaternion } from '../math/quaternion.js';
import { Matrix4 } from '../math/matrix4.js';
import { Transform } from './transform.js';

export class Joint extends Transform {
    constructor() {
        super();
        Object.assign(this, {
            _children: [],
            _parent: undefined,
        });
    }
}
