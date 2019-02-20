import { IRenderer } from "../Renderer";

export enum PEType {
    None,
    FXAA,
    HDR,
}

export enum PEOrder {
    None,
    AA,
    HDR,
}

export class PEBase {
    
    protected _enable: boolean = false;
    protected _renderer: IRenderer;

    protected _isInit: boolean = false;
    
    constructor(renderer: IRenderer) {
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

    public destroy() {

    }

    public get type(): PEType {
        return PEType.None;
    }

    public get order(): number {
        return PEOrder.None;
    }

    public get isInit() {
        return this._isInit;
    }
}
