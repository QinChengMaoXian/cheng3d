import { Base } from '../core/Base'

export class GraphicsObject extends Base {
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

    public needsUpdate() {
        this._renderObjectRef.update();
    }
}
