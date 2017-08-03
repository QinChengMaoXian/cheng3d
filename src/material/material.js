import { CObject } from '../core/object.js'

export class Material extends CObject {
    constructor() {
        super();
        Object.assign(this, {
            _shader: undefined,
            _state: undefined,
        });
    }

    setShader(shader) {
        this._shader = shader;
    }

    getShader(shader) {
        return this._shader;
    }

    getMapProvide() {
        return [];
    }

    getPropertyProvide() {
        return [];
    }
}