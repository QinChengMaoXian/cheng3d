import { IRenderer } from "../Renderer";

import { FXAA } from '../postEffect/FXAA';
import { PEType, PEBase, PEOrder, PEReqType } from '../postEffect/PEBase';
import { HDR } from '../postEffect/HDR';
import { SSAO } from '../postEffect/SSAO';
import { Geometry } from "../../graphics/Geometry";
import { Frame } from "../../graphics/Frame";

import * as CGE from '../../graphics/RendererParameter';
import { RTLocation } from "../../graphics/GraphicsTypes";
import { Camera } from "../../object/Camera";
import { Mesh } from "../../object/Mesh";

/**
 * 后处理管线
 */
export class PostEffectsPipeline {

    /** 后处理单位 */
    protected _postEffects: PEBase[];
    protected _renderer: IRenderer;

    protected _defGeo: Geometry;

    protected _srcRequires: PEReqType[];

    protected _srcFrame: Frame;

    protected _isDeferredRendering: boolean;

    /** 缓存的离屏帧缓冲对象 */
    private _cacheFrames: Frame[];
    /** 缓存的离屏帧缓冲当前索引 */
    private _frameIndex: number;

    protected _requestFrames: Map<number | string, Frame>;

    protected _peNumber: number;

    protected _enabledPEOrders: boolean[];

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._requestFrames = new Map();
    }

    /** 初始化 */
    public init(geo: Geometry) {
        this._defGeo = geo;
        this._postEffects = [];
        this._srcRequires = [];
        this._initFrame();
    }

    /** 初始化frame */
    protected _initFrame() {
        let renderer = this._renderer;
        let width = renderer.getWidth();
        let height = renderer.getHeight();
        let frames = [];

        for (let i = 0; i < 2; i++) {
            let frame = new Frame();
            frame.setSize(width, height);
            frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(0, 0, 0, 0.0);
            frames.push(frame);
        }

        this._cacheFrames = frames;
        this._frameIndex = 0;
    }

    /**
     * 后处理管线渲染
     * @param srcFrame 原始帧，
     */
    public render(srcFrame: Frame, isDefer: boolean = false) {
        if (!srcFrame) {
            return;
        }
        this._isDeferredRendering = isDefer;
        this._srcFrame = srcFrame;
        this._postEffects.forEach((pe, index) => {
            this._peNumber = index;
            pe.render();
            pe.render2Target && this.exchangeFrame();
        });
    }

    /**
     * 提供给
     * @param obj
     * @param frame
     */
    public renderPass(obj: Mesh, frame: Frame) {
        this._renderer.useFrame(frame);
        this._renderer.directRenderMesh(obj);
    }

    /**
     * 重置尺寸
     * @param w 
     * @param h 
     */
    public resize(w: number, h: number) {
        this._postEffects.forEach(pe => {
            pe.resize(w, h);
        });

        this._cacheFrames.forEach(frame => {
            frame.setSize(w, h);
        })
    }

    /**
     * 更新后处理需要的数据源
     */
    protected _updateSrcReqs() {
        let pes = this._postEffects;
        let result = [];
        let peOrders = [];
        pes.forEach(pe => {
            peOrders.push[pe.order] = true;
            pe.srcRequires().forEach(v => {
                if (result.indexOf(v) < 0) {
                    result.push(v);
                }
            });
        });
        this._srcRequires = result;
        this._enabledPEOrders = peOrders;
    }

    /**
     * 通过后处理对象启用或替换一个后处理对象
     * @param pe
     */
    protected _enablePostEffect(pe: PEBase) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === pe.order) {
                pes[i] = pe;
                return;
            }
        }
        pes.push(pe);
        pes.sort((a, b) => { return b.order - a.order });
        this._updateSrcReqs();
    }

    /**
     * 通过后处理对象移除一个后处理对象
     * @param pe 
     */
    protected _disablePostEffect(pe: PEBase) {
        let idx = this._postEffects.indexOf(pe);
        if (idx > -1) {
            this._postEffects.splice(idx, 1);
            pe.destroy(this._renderer);
            this._updateSrcReqs();
        }
    }

    /**
     * 通过后处理类型生成后处理
     * @param type 
     */
    protected _createPEFromType(type: PEType) {
        let pe: PEBase;
        switch (type) {
            case PEType.FXAA:
                let fxaa = new FXAA(this);
                fxaa.init(this._defGeo);
                pe = fxaa;
                break;

            case PEType.HDR:
                let hdr = new HDR(this);
                hdr.init(this._defGeo);
                pe = hdr;
                break;

            case PEType.SSAO:
                let ssao = new SSAO(this);
                ssao.init(this._defGeo);
                pe = ssao;
            default:
                break;
        }
        return pe;
    }

    /**
     * 关闭后处理
     * @param pe 
     */
    public disablePostEffect(pe: PEType | PEBase) {
        if (pe instanceof PEBase) {
            this._disablePostEffect(pe);
        } else {
            let pes = this._postEffects;
            let l = pes.length;
            for (let i = 0; i < l; i++) {
                if (pes[i].type === pe) {
                    this._disablePostEffect(pes[i]);
                    return;
                }
            }
        }
    }

    /**
     * 关闭某一个序列的后处理
     * @param order 
     */
    public disablePostEffectByOrder(order: PEOrder) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === order) {
                this._disablePostEffect(pes[i]);
                return;
            }
        }
    }

    /**
     * 启用后处理
     * @param pe 
     */
    public enablePostEffect(pe: PEType | PEBase) {
        if (pe instanceof PEBase) {
            this._enablePostEffect(pe);
        } else {
            let peObj = this._createPEFromType(pe);
            if (peObj) {
                this._enablePostEffect(peObj);
            }
        }
    }

    /** 
     * 获取当前启用的后处理类型组
     */
    public getEnablingPostEffect(): PEType[] {
        let a = [];
        this._postEffects.forEach(p => {
            a.push(p.type);
        })
        return a;
    }

    /**
     * 交换帧缓冲
     */
    public exchangeFrame() {
        this._frameIndex = (this._frameIndex + 1) % this._cacheFrames.length;
    }

    /**
     * 获取渲染目标帧缓冲
     */
    public get targetFrame(): Frame {
        return this._cacheFrames[this._frameIndex];
    }

    /**
     * 获取颜色源帧缓冲
     */
    public get currentFrame(): Frame {
        return this._cacheFrames[(this._frameIndex + 1) % this._cacheFrames.length];
    }

    /**
     * 获取生成ao的Frame
     */
    public getAoFrame(): Frame {
        return this._requestFrames.get(PEOrder.AO);
    }

    public setRequestFrame(type: PEOrder, frame: Frame) {
        if (frame) {
            this._requestFrames.set(type, frame);
        }
    }

    public removeRequsetFrame(type: PEOrder, frame?: Frame) {
        this._requestFrames.delete(type);
    }

    /**
     * 获取当前帧的原始帧数据
     */
    public get srcFrame(): Frame {
        return this._srcFrame;
    }

    /**
     * 获取全部的支持申请组
     */
    public getSrcReqs() {
        return this._srcRequires;
    }

    public get width(): number {
        return this._renderer.getWidth();
    }

    public get height(): number {
        return this._renderer.getHeight();
    }

    public get deltaTime(): number {
        return this._renderer.deltaTime;
    }

    public get defCamera(): Camera {
        return this._renderer.defCamera;
    }

    public get isDeferredRendering(): boolean {
        return this._isDeferredRendering;
    }

    /**
     * 获取gBuffer
     */
    public get gBufferFrame(): Frame {
        return this._renderer.getGBufferFrame();
    }

    public get peNumber(): number {
        return this._peNumber;
    }

    // public get isFirst(): boolean {
    //     return this._peNumber === 0;
    // }

    // public get isLast(): boolean {
    //     return this._peNumber === (this._postEffects.length - 1);
    // }

    public isEnablePEOrder(order: PEOrder): boolean {
        return this._enabledPEOrders[order];
    }

    /**
     * 获取数量
     */
    public get length() {
        return this._postEffects.length;
    }
}
