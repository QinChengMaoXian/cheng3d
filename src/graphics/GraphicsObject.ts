import { RenderBase } from './RenderBase'
import { Base } from '../core/Base'

export class GraphicsObject extends Base {
    protected _renderObjectRef: RenderBase[] = [];
    constructor() {
        super();
    }

    public setRenderObjectRef(renderer, robj) {
        this._renderObjectRef[renderer.getRendererId()] = robj;
    }

    public getRenderObjectRef(renderer) {
        return this._renderObjectRef[renderer.getRendererId()];
    }

    protected _updateRenderObjectRef() {
        
    }

    public needsUpdate() {
        let rbfs = this._renderObjectRef
        let l = rbfs.length;
        for (let i = 0; i < l; i++) {
            rbfs[i].needsUpdate();
        } 
    }
}
