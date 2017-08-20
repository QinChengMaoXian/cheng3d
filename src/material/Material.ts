import { ObjectBase } from '../core/ObjectBase'

export class Material extends ObjectBase {
    _shader = undefined;
    _state = undefined;

    constructor() {
        super();
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