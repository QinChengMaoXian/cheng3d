import { VersionObject } from '../core/VersionObject'

export class GraphicsObject extends VersionObject {
    protected _renderObjectRef = undefined;
    constructor() {
        super();
    }

    setRenderObjectRef(renderer, robj) {
        this._renderObjectRef = robj;
    }

    getRenderObjectRef(renderer) {
        return this._renderObjectRef;
    }
}
