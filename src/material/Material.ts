import { ObjectBase } from '../core/ObjectBase'
import { Shader } from '../graphics/Shader';

export class Material extends ObjectBase {
    protected _shader:Shader = undefined;
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