import { IRenderer } from "./Renderer";

import { FXAA } from './postEffect/FXAA';
import { PEType, PEBase, PEOrder, PEReqType } from './postEffect/PEBase';
import { HDR } from './postEffect/HDR';
import { SSAO } from './postEffect/SSAO';
import { Geometry } from "../graphics/Geometry";
import { Object3D } from "../object/Object3D";
import { Frame } from "../graphics/Frame";

/**
 * 
 */
export class PostEffectsPipeline {

    protected _postEffects: PEBase[];
    protected _renderer: IRenderer;

    protected _defGeo: Geometry;

    protected _srcRequires: PEReqType[];

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
    }

    public init(geo: Geometry) {
        this._defGeo = geo;
        this._postEffects = [];
        this._srcRequires = [];
    }

    public render() {
        let renderer = this._renderer;
        this._postEffects.forEach(pe => {
            pe.render();
            renderer.exchangeFrame();
        })
    }

    public renderPass(obj: Object3D, frame: Frame) {
        this._renderer.renderScene(obj, null, frame);
    }

    public resize(w: number, h: number) {
        this._postEffects.forEach(pe => {
            pe.resize(w, h);
        })
    }

    protected _updateSrcReqs() {
        let pes = this._postEffects;
        let result = [];
        pes.forEach(pe => {
            pe.srcRequires().forEach(v => {
                if (result.indexOf(v) < 0) {
                    result.push(v);
                }
            });
        });
        this._srcRequires = result;
    }

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

    protected _disablePostEffect(pe: PEBase) {
        let idx = this._postEffects.indexOf(pe);
        if (idx > -1) {
            this._postEffects.splice(idx, 1);
            pe.destroy();
        }
        this._updateSrcReqs();
    }

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

    public getEnablingPostEffect(): PEType[] {
        let a = [];
        this._postEffects.forEach(p => {
            a.push(p.type);
        })
        return a;
    }

    public getSrcReqs() {
        return this._srcRequires;
    }

    public get renderer() {
        return this._renderer;
    }
}
