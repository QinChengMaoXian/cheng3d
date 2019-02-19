import { Renderer } from "../Renderer";

export class PEBase {
    protected _enable: boolean = false;
    protected _renderer: Renderer;
    
    constructor(renderer: Renderer) {
        this._renderer = renderer;
    }

    public render() {

    }

    public enable() {
        this._enable = true;
    }

    public disable() {

    }

    public resize(width: number, height: number) {
        
    }
}
