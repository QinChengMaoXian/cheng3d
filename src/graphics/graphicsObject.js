import { VersionObject } from '../core/versionObject.js'

export class GraphicsObject extends VersionObject {
    constructor() {
        super();
        this._renderObjectRef = undefined;
    }

    setRenderObjectRef(renderer, robj) {
        this._renderObjectRef = robj;
    }

    getRenderObjectRef(renderer) {
        return this._renderObjectRef;
    }
}
