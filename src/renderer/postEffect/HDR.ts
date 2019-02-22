import { PEBase, PEType, PEOrder } from "./PEBase";
import { IRenderer, Renderer } from "../Renderer";
import { Frame } from "../../graphics/Frame";
import { RenderTargetLocation } from "../../graphics/GraphicsTypes";
import { Texture2D } from "../../graphics/Texture2D";
import { DownSample4Material } from "../../material/DownSample4Material";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";

import * as CGE from '../../graphics/RendererParameter';
import { GaussianBlurMaterial } from "../../material/GaussianBlurMaterial";
import { DownSampleTo1Material } from "../../material/DownSampleTo1Material";
import { BloomMaterial } from "../../material/BloomMaterial";
import { ToneMappingMaterial } from "../../material/ToneMappingMaterial";
import { LogSampleMaterial } from "../../material/LogSampleMaterial";

// 
// TODO：修改着色器, log加和，exp之后再平均；

export class HDR extends PEBase {

    // 自适应时间，单位毫秒；
    protected _adaptationTime: number = 1000;

    // 手动亮度调节参数
    protected _lumFact: number = 0.35;

    protected _down4Mat: DownSample4Material;
    protected _logMat: LogSampleMaterial;
    protected _downTo1Mat: DownSampleTo1Material;
    protected _blurMat: GaussianBlurMaterial;
    protected _bloomMat: BloomMaterial;
    protected _toneMat: ToneMappingMaterial;

    protected _down4Frame: Frame;
    protected _down16Frame: Frame;
    protected _downTo32Frame: Frame;
    protected _downTo32Frame2: Frame;
    protected _downTo8Frame: Frame;
    protected _downTo2Frame: Frame;

    protected _downTo1Frame: Frame[];
    protected _downTo1Idx: number = 0;

    protected _down4Frame2: Frame;

    protected _downSampleMesh: Mesh;
    protected _logMesh: Mesh;
    protected _downTo1Mesh: Mesh;
    protected _blurMesh: Mesh;
    protected _bloomMesh: Mesh;
    protected _toneMesh: Mesh;

    constructor(renderer: IRenderer) {
        super(renderer);
    }

    public init(geo: Geometry) {
        let w = this._renderer.getWidth();
        let h = this._renderer.getHeight();

        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);

        let frame: Frame;
        this._down4Frame = new Frame();
        frame = this._down4Frame;
        frame.setSize(w_4, h_4);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._down4Frame2 = new Frame();
        frame = this._down4Frame2;
        frame.setSize(w_4, h_4);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.LINEAR, CGE.LINEAR);
        frame.getState().clearColor.set(0, 0, 0, 0);

        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);

        this._down16Frame = new Frame();
        frame = this._down16Frame;
        frame.setSize(w_16, h_16);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.LINEAR, CGE.LINEAR);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo32Frame = new Frame();
        frame = this._downTo32Frame;
        frame.setSize(32, 32);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo32Frame2 = new Frame();
        frame = this._downTo32Frame2;
        frame.setSize(32, 32);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo8Frame = new Frame();
        frame = this._downTo8Frame;
        frame.setSize(8, 8);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo2Frame = new Frame();
        frame = this._downTo2Frame;
        frame.setSize(2, 2);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);

        this._downTo1Frame = []
        frame = new Frame();
        frame.setSize(1, 1);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
        this._downTo1Frame.push(frame);
        frame = new Frame();
        frame.setSize(1, 1);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGB, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.getState().clearColor.set(0, 0, 0, 0);
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
        let logMat = new LogSampleMaterial();
        this._logMat = logMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(logMat);
        this._logMesh = mesh;
    }

    public resize(w: number, h: number) {
        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);

        this._down4Frame.setSize(w_4, h_4);

        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);

        this._down16Frame.setSize(w_16, h_16);
    }

    public render() {
        const renderer = this._renderer;

        const deltaTime = renderer.deltaTime;

        let w = renderer.getWidth();
        let h = renderer.getHeight();

        let p_x = 1.0 / w;
        let p_y = 1.0 / h;

        const colorFrame: Frame = renderer.currentColorFrame;
        const targetFrame: Frame = renderer.currectTargetFrame;
        
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
        const logMat = this._logMat;

        const down4Frame = this._down4Frame;
        const down16Frame = this._down16Frame;
        const downTo32Frame = this._downTo32Frame;
        const downTo32Frame2 = this._downTo32Frame2;
        const downTo8Frame = this._downTo8Frame;
        const downTo2Frame = this._downTo2Frame;

        const downTo1Src = this.src1Frame;
        const downTo1Dst = this.dst1Frame;

        const down4Frame2 = this._down4Frame2;

        // 长宽分别降至四分之一
        let tex2D = <Texture2D>(colorFrame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(p_x, p_y);
        renderer.renderScene(sampleMesh, null, down4Frame);

        let w_4 = 1.0 / down4Frame.getWidth();
        let h_4 = 1.0 / down4Frame.getHeight();

        // 长宽分别降至十六分之一
        tex2D = <Texture2D>(down4Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(w_4, h_4);
        renderer.renderScene(sampleMesh, null, down16Frame);

        // 降至32x32
        tex2D = <Texture2D>(down16Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / down16Frame.getWidth(), 1.0 / down16Frame.getHeight());
        renderer.renderScene(sampleMesh, null, downTo32Frame);

        // 32x32的log采样
        tex2D = <Texture2D>(downTo32Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        logMat.setSrcTexture(tex2D);
        renderer.renderScene(logMesh, null, downTo32Frame2);

        // 降至8x8
        tex2D = <Texture2D>(downTo32Frame2.getTextureFromType(RenderTargetLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / 32.0, 1.0 / 32.0);
        renderer.renderScene(sampleMesh, null, downTo8Frame);

        // 降到2x2
        tex2D = <Texture2D>(downTo8Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / 8.0, 1.0 / 8.0);
        renderer.renderScene(sampleMesh, null, downTo2Frame);

        // 降至 到1x1 对Linear的贴图，采4个像素的中心, 参数中包括前一个1px;
        tex2D = <Texture2D>(downTo2Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        downTo1Mat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Src.getTextureFromType(RenderTargetLocation.COLOR).tex);
        downTo1Mat.setLumTexture(tex2D)
        downTo1Mat.setPixelSize(1.0 / 2.0, 1.0 / 2.0); 
        downTo1Mat.setLumPCT(deltaTime / this._adaptationTime);
        renderer.renderScene(downTo1Mesh, null, downTo1Dst);

        // bloom
        tex2D = <Texture2D>(down4Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        bloomMat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Dst.getTextureFromType(RenderTargetLocation.COLOR).tex);
        bloomMat.setLumTexture(tex2D);
        renderer.renderScene(bloomMesh, null, down4Frame2);

        // 横向高斯模糊
        tex2D = <Texture2D>(down4Frame2.getTextureFromType(RenderTargetLocation.COLOR).tex);
        blurMat.setSrcTexture(tex2D);
        blurMat.setPixelSize(w_4, h_4);
        blurMat.setPiexlDir(1.0, 0.0);
        renderer.renderScene(blurMesh, null, down4Frame);

        // 纵向高斯模糊
        tex2D = <Texture2D>(down4Frame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        blurMat.setSrcTexture(tex2D);
        blurMat.setPiexlDir(0.0, 1.0);
        renderer.renderScene(blurMesh, null, down4Frame2);

        // tong mapping
        tex2D = <Texture2D>(down4Frame2.getTextureFromType(RenderTargetLocation.COLOR).tex);
        toneMat.setBloomTexture(tex2D);
        tex2D = <Texture2D>(colorFrame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        toneMat.setSrcTexture(tex2D);
        tex2D = <Texture2D>(downTo1Dst.getTextureFromType(RenderTargetLocation.COLOR).tex);
        toneMat.setLumTexture(tex2D);

        toneMat.setPixelSize(w_4, h_4);
        toneMat.setLumPCT(this._lumFact);
        
        renderer.renderScene(toneMesh, null, targetFrame);

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

    public destroy() {
        let renderer = this._renderer;
        renderer.releaseMesh(this._downSampleMesh);
        renderer.releaseMesh(this._downTo1Mesh);
        renderer.releaseMesh(this._blurMesh);
        renderer.releaseMesh(this._bloomMesh);
        renderer.releaseMesh(this._toneMesh);
        renderer.releaseMesh(this._logMesh);

        this._renderer = null;
        this._downSampleMesh = null;
        this._downTo1Mesh = null;
        this._blurMat = null;
        this._bloomMesh = null;
        this._toneMesh = null;

    }

    get type(): PEType {
        return PEType.HDR;
    }

    get order() {
        return PEOrder.HDR;
    }
}
