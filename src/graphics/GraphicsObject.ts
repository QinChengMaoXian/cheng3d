import { VersionObject } from '../core/VersionObject'

export class GraphicsObject extends VersionObject {
    protected _renderObjectRef = undefined;
    constructor() {
        super();
    }

    public setRenderObjectRef(renderer, robj) {
        this._renderObjectRef = robj;
    }

    public getRenderObjectRef(renderer) {
        return this._renderObjectRef;
    }

    protected _updateRenderObjectRef() {
        
    }
}
