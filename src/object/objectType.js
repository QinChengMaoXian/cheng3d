import { getTypeCount } from '../core/base.js';

let _g = getTypeCount;

export const ComponentType = {
    Transform                   : _g(),
    Geometry                    : _g(),
    Material                    : _g(),
    Camera                      : _g(),
    Light                       : _g(),
};
