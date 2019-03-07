import { PEBase, PEType, PEOrder, PEReqType } from "./PEBase";
import { IRenderer } from "../Renderer";
import { Frame } from "../../graphics/Frame";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { Texture2D } from "../../graphics/Texture2D";
import { DownSample4Material } from "../../material/DownSample4Material";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";

import * as CGE from '../../graphics/RendererParameter';
import { GaussianBlurMaterial } from "../../material/GaussianBlurMaterial";
import { DownSampleTo1Material } from "../../material/DownSampleTo1Material";
import { BloomMaterial } from "../../material/BloomMaterial";
import { ToneMappingMaterial } from "../../material/ToneMappingMaterial";
import { LumSampleMaterial } from "../../material/LumSampleMaterial";
import { PostEffectsPipeline } from "../pipeline/PostEffectsPipeline";

/**
 * 
 */
export class HDR extends PEBase {

    protected static SrcReqs = [
        PEReqType.FLOAT_COLOR,
        PEReqType.COLOR
    ];

    /** 自适应时间，单位毫秒 */
    protected _adaptationTime: number = 1000;

    /** 手动亮度调节参数 */
    protected _lumFact: number = 0.35;

    protected _down4Mat: DownSample4Material;
    protected _lumMat: LumSampleMaterial;
    protected _downTo1Mat: DownSampleTo1Material;
    protected _blurMat: GaussianBlurMaterial;
    protected _bloomMat: BloomMaterial;
    protected _toneMat: ToneMappingMaterial;

    protected _down4Frame: Frame;
    protected _down16Frame: Frame;
    protected _downTo32Frame: Frame;
    protected _downTo32Frame2: Frame;
    protected _downTo8Frame: Frame;
    // protected _downTo2Frame: Frame;

    protected _downTo1Frame: Frame[];
    protected _downTo1Idx: number = 0;

    protected _down4Frame2: Frame;

    protected _downSampleMesh: Mesh;
    protected _logMesh: Mesh;
    protected _downTo1Mesh: Mesh;
    protected _blurMesh: Mesh;
    protected _bloomMesh: Mesh;
    protected _toneMesh: Mesh;

    protected _bloomNum: number = 4;

    constructor(pipe: PostEffectsPipeline) {
        super(pipe);
    }

    public init(geo: Geometry) {
        const pipe = this._pipe;
        // const renderer = pipe.renderer;

        let w = pipe.width;
        let h = pipe.height;

        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);

        let frame: Frame;
        this._down4Frame = new Frame();
        frame = this._down4Frame;
        frame.setSize(w_4, h_4);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        this._down4Frame2 = new Frame();
        frame = this._down4Frame2;
        frame.setSize(w_4, h_4);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.LINEAR, CGE.LINEAR);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);

        this._down16Frame = new Frame();
        frame = this._down16Frame;
        frame.setSize(w_16, h_16);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.LINEAR, CGE.LINEAR);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        this._downTo32Frame = new Frame();
        frame = this._downTo32Frame;
        frame.setSize(32, 32);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        this._downTo32Frame2 = new Frame();
        frame = this._downTo32Frame2;
        frame.setSize(32, 32);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        this._downTo8Frame = new Frame();
        frame = this._downTo8Frame;
        frame.setSize(8, 8);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.LINEAR, CGE.LINEAR);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;

        // this._downTo2Frame = new Frame();
        // frame = this._downTo2Frame;
        // frame.setSize(2, 2);
        // frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        // frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo1Frame = []
        frame = new Frame();
        frame.setSize(1, 1);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo1Frame.push(frame);
        frame = new Frame();
        frame.setSize(1, 1);
        frame.addTexture(RTLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo1Frame.push(frame);

        let mesh = new Mesh();
        let mat = new DownSample4Material();
        this._down4Mat = mat;
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._downSampleMesh = mesh;

        mesh = new Mesh();
        let blurMat = new GaussianBlurMaterial();
        this._blurMat = blurMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(blurMat);
        this._blurMesh = mesh;

        mesh = new Mesh();
        let downTo1 = new DownSampleTo1Material();
        this._downTo1Mat = downTo1;
        mesh.setGeometry(geo);
        mesh.setMaterial(downTo1);
        this._downTo1Mesh = mesh;

        mesh = new Mesh();
        let bloomMat = new BloomMaterial();
        this._bloomMat = bloomMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(bloomMat);
        this._bloomMesh = mesh;

        mesh = new Mesh();
        let toneMat = new ToneMappingMaterial();
        this._toneMat = toneMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(toneMat);
        this._toneMesh = mesh;

        mesh = new Mesh();
        let lumMat = new LumSampleMaterial();
        this._lumMat = lumMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(lumMat);
        this._logMesh = mesh;

        this._isInit = true;
    }

    public resize(w: number, h: number) {
        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);

        this._down4Frame.setSize(w_4, h_4);
        this._down4Frame2.setSize(w_4, h_4);

        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);

        this._down16Frame.setSize(w_16, h_16);
    }

    public render() {
        const pipe = this._pipe

        const deltaTime = pipe.deltaTime;

        let w = pipe.width
        let h = pipe.height

        let p_x = 1.0 / w;
        let p_y = 1.0 / h;

        let colorFrame: Frame = pipe.srcFrame;
        let targetFrame: Frame = pipe.targetFrame;
        
        const sampleMesh = this._downSampleMesh;
        const downTo1Mesh = this._downTo1Mesh;
        const blurMesh = this._blurMesh;
        const bloomMesh = this._bloomMesh;
        const toneMesh = this._toneMesh;
        const logMesh = this._logMesh

        const down4Mat = this._down4Mat;
        const downTo1Mat = this._downTo1Mat;
        const blurMat = this._blurMat;
        const bloomMat = this._bloomMat;
        const toneMat = this._toneMat;
        const lumMat = this._lumMat;

        const down4Frame = this._down4Frame;
        const down4Frame2 = this._down4Frame2;
        const down16Frame = this._down16Frame;
        const downTo32Frame = this._downTo32Frame;
        const downTo32Frame2 = this._downTo32Frame2;
        const downTo8Frame = this._downTo8Frame;
        // const downTo2Frame = this._downTo2Frame;

        const downTo1Src = this.src1Frame;
        const downTo1Dst = this.dst1Frame;

        // 长宽分别降至四分之一
        let tex2D = <Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(p_x, p_y);
        pipe.renderPass(sampleMesh, down4Frame);

        let w_4 = 1.0 / down4Frame.getWidth();
        let h_4 = 1.0 / down4Frame.getHeight();

        // 长宽分别降至十六分之一
        tex2D = <Texture2D>(down4Frame.getTextureFromType(RTLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(w_4, h_4);
        pipe.renderPass(sampleMesh, down16Frame);

        // 降至32x32
        tex2D = <Texture2D>(down16Frame.getTextureFromType(RTLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / down16Frame.getWidth(), 1.0 / down16Frame.getHeight());
        pipe.renderPass(sampleMesh, downTo32Frame);

        // 32x32转为亮度图
        tex2D = <Texture2D>(downTo32Frame.getTextureFromType(RTLocation.COLOR).tex);
        lumMat.setSrcTexture(tex2D);
        pipe.renderPass(logMesh, downTo32Frame2);

        // 降至8x8
        tex2D = <Texture2D>(downTo32Frame2.getTextureFromType(RTLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / 32.0, 1.0 / 32.0);
        pipe.renderPass(sampleMesh, downTo8Frame);

        // 降到2x2
        // tex2D = <Texture2D>(downTo8Frame.getTextureFromType(RTLocation.COLOR).tex);
        // down4Mat.setSrcTexture(tex2D);
        // down4Mat.setPixelSize(1.0 / 8.0, 1.0 / 8.0);
        // pipe.renderPass(sampleMesh, downTo2Frame);

        // 降至 到1x1 对Linear的贴图，采4个像素的中心, 参数中包括前一个1px;
        tex2D = <Texture2D>(downTo8Frame.getTextureFromType(RTLocation.COLOR).tex);
        downTo1Mat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Src.getTextureFromType(RTLocation.COLOR).tex);
        downTo1Mat.setLumTexture(tex2D)
        downTo1Mat.setPixelSize(1.0 / 2.0, 1.0 / 2.0); 
        downTo1Mat.setLumPCT(Math.min(deltaTime / this._adaptationTime, 1.0));
        pipe.renderPass(downTo1Mesh, downTo1Dst);

        // bloom
        tex2D = <Texture2D>(down4Frame.getTextureFromType(RTLocation.COLOR).tex);
        bloomMat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Dst.getTextureFromType(RTLocation.COLOR).tex);
        bloomMat.setLumTexture(tex2D);
        bloomMat.setLumPCT(this._lumFact);
        pipe.renderPass(bloomMesh, down4Frame2);

        
        // 高斯模糊像素尺寸
        blurMat.setPixelSize(w_4, h_4);
        
        for (let i = 0; i < this._bloomNum; i++) {
            // 横向高斯模糊
            tex2D = <Texture2D>(down4Frame2.getTextureFromType(RTLocation.COLOR).tex);
            blurMat.setSrcTexture(tex2D);
            blurMat.setPiexlDir(1.0, 0.0);
            pipe.renderPass(blurMesh, down4Frame);

            // 纵向高斯模糊
            tex2D = <Texture2D>(down4Frame.getTextureFromType(RTLocation.COLOR).tex);
            blurMat.setSrcTexture(tex2D);
            blurMat.setPiexlDir(0.0, 1.0);
            pipe.renderPass(blurMesh, down4Frame2);
        }

        // tong mapping
        tex2D = <Texture2D>(down4Frame2.getTextureFromType(RTLocation.COLOR).tex);
        toneMat.setBloomTexture(tex2D);
        tex2D = <Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex);
        toneMat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Dst.getTextureFromType(RTLocation.COLOR).tex);
        toneMat.setLumTexture(tex2D);

        let aoFrame = pipe.getAoFrame();
        if (aoFrame) {
            tex2D = <Texture2D>(aoFrame.getTextureFromType(RTLocation.COLOR).tex);
        } else {
            tex2D = Texture2D.White;
        }
        toneMat.setAoTexture(tex2D);

        toneMat.setPixelSize(w_4, h_4);
        toneMat.setLumPCT(this._lumFact);
        
        pipe.renderPass(toneMesh, targetFrame);

        this.exchange1Frame();
    }

    public exchange1Frame() {
        this._downTo1Idx = (this._downTo1Idx + 1) % this._downTo1Frame.length;
    }

    get dst1Frame(): Frame {
        return this._downTo1Frame[this._downTo1Idx];
    }

    get src1Frame(): Frame {
        return this._downTo1Frame[(this._downTo1Idx + 1) % this._downTo1Frame.length];
    }

    public destroy(renderer: IRenderer) {
        const pipe = this._pipe
        renderer.releaseMesh(this._downSampleMesh);
        renderer.releaseMesh(this._downTo1Mesh);
        renderer.releaseMesh(this._blurMesh);
        renderer.releaseMesh(this._bloomMesh);
        renderer.releaseMesh(this._toneMesh);
        renderer.releaseMesh(this._logMesh);

        this._pipe = null;
        this._downSampleMesh = null;
        this._downTo1Mesh = null;
        this._blurMat = null;
        this._bloomMesh = null;
        this._toneMesh = null;
    }

    public srcRequires(): PEReqType[] {
        return HDR.SrcReqs;
    }

    public setBloomNum(n: number) {
        n = n > 0 ? n : 1;
        this._bloomNum = n;
    }

    public get render2Target(): boolean {
        return true;
    }

    get type(): PEType {
        return PEType.HDR;
    }

    get order() {
        return PEOrder.HDR;
    }
}
