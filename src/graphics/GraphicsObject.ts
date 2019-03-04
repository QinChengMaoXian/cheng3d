import { RenderBase } from './RenderBase'
import { Base } from '../core/Base'

export class GraphicsObject extends Base {
    protected _renderObjectRef: RenderBase[] = [];
    protected _count: number = 0;
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

    public retain() {
        this._count++;
    }

    public release() {
        this._count--
        if (this._count === 0) {
            this.destroy();
        }
    }
    
    protected destroy() {
        let rbfs = this._renderObjectRef;
        let l = rbfs.length;
        for (let i = 0; i < l; i++) {
            rbfs[i] && rbfs[i].remove(i);
        } 
    }

    public needsUpdate() { 
        let rbfs = this._renderObjectRef;
        let l = rbfs.length;
        for (let i = 0; i < l; i++) {
            rbfs[i] && rbfs[i].needsUpdate();
        } 
    }
}
