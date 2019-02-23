import { IRenderer } from "../Renderer";
import { PostEffectsPipeline } from "../PostEffectsPipeline";

export enum PEType {
    None,
    FXAA,
    SSAO,
    HDR,
}

export enum PEOrder {
    None,
    AA,
    AO,
    HDR,
}

export enum PEReqType {
    FLOAT_COLOR,
    LAST_COLOR,
    LAST_DEPTH,
    LAST_NORMAL,
    COLOR,
    NORMAL,
    DEPTH,
}

export class PEBase {
    
    protected _enable: boolean = false;
    protected _pipe: PostEffectsPipeline;

    protected _isInit: boolean = false;
    
    constructor(pipe: PostEffectsPipeline) {
        this._pipe = pipe;
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

    /** 需求的源贴图类型 */
    public srcRequires(): PEReqType[] {
        return [];
    }

    /** 需求的过程贴图类型 */
    public pipeRequires(): PEReqType[] {
        return [];
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
