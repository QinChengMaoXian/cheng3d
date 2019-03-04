import { GraphicsObject } from './GraphicsObject'

export class Shader extends GraphicsObject {
    /** do NOT altar this value */
    constructor() {
        super();
        this._count = 1;
    }
}
