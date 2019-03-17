import * as CGE from '../../graphics/RendererParameter';
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { DeferredShadingMaterial } from "../../material/DeferredShadingMaterial";
import { IRenderer } from "../Renderer";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { FrameState } from "../../graphics/FrameState";
import { Vector4 } from '../../math/Vector4';
import { Texture2D } from '../../graphics/Texture2D';
import { Geometry } from '../../graphics/Geometry';
import { SphereGeometry, ScreenGeometry } from '../../util/GeometryUtil';
import { RenderCulling } from '../../util/RenderCulling';
import { Camera } from '../../object/Camera';
import { PointLight } from '../../light/PointLight';
import { glProgram } from '../glObject/glProgram';

export class DeferredPipeline {

    protected _renderer: IRenderer;

    /** gBuffer Frame */
    protected _gFrame: Frame;
    
    /** 延迟着色用的Mesh */
    protected _deferMesh: Mesh;

    /** 延迟着色用的材质 */
    protected _deferMat: DeferredShadingMaterial;

    /** 延迟着色用点光源模型 */
    protected _pointLightMesh: Mesh;

    /** 延迟着色用点光源材质 */
    protected _pointLightMat: DeferredShadingMaterial;

    /** 不清理深度的帧缓冲状态对象 */
    protected _notClearDepthState: FrameState;

    constructor(renderer: IRenderer) {
        this._renderer = renderer;
        this._init()
    }

    public setSize(w: number, h: number) {
        this._gFrame.setSize(w, h);
        this._notClearDepthState.setViewports(0, 0, w, h);
    }

    protected _init() {
        let renderer = this._renderer;

        let frame = new Frame;
        frame.setSize(renderer.getWidth(), renderer.getHeight());
        frame.addTexture(RTLocation.RT0, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
        frame.addTexture(RTLocation.RT1, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
        frame.addTexture(RTLocation.RT2, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
        frame.enableDepthStencil();
        frame.getState().setClearColor(true, Vector4.Zero);
        this._gFrame = frame;

        let mat = new DeferredShadingMaterial();
        let tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT0).tex)
        mat.setDiffuseMap(tex);
        tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT1).tex)
        mat.setNormalMap(tex);
        tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT2).tex)
        mat.setDepthMap(tex);
        mat.enableStencil = true;
        mat.setStencilFunc(CGE.EQUAL, 0x80, 0x80);
        mat.setStencilOp(CGE.KEEP, CGE.KEEP, CGE.KEEP);
        mat.enableDepth = false;
        this._deferMat = mat;

        let mesh = new Mesh();
        let defGeo = new ScreenGeometry();
        mesh.setGeometry(defGeo);
        mesh.setMaterial(mat);
        this._deferMesh = mesh;

        mat = new DeferredShadingMaterial();
        tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT0).tex)
        mat.setDiffuseMap(tex);
        tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT1).tex)
        mat.setNormalMap(tex);
        tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT2).tex)
        mat.setDepthMap(tex);
        mat.useForPointLight();
        mat.enableStencil = true;
        mat.setStencil(this._deferMat.stencil);
        mat.enableAlphaBlend();
        mat.setBlendFunc(CGE.ONE, CGE.ONE, CGE.ONE, CGE.ONE);
        mat.setBlendEquation(CGE.FUNC_ADD, CGE.FUNC_ADD);
        mat.enableDepth = false;
        mat.setFlipFace(true);
        this._pointLightMat = mat;

        let geo = new SphereGeometry(1, 32, 32);
        mesh = new Mesh();
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._pointLightMesh = mesh;

        let defFrameState = renderer.getDefFrameState();
        let state = new FrameState();
        state.setClearDepth(false);
        state.setClearColor(true, defFrameState.clearColor);
        state.setClearStencil(false, defFrameState.clearStencil);
        state.setViewportAt(defFrameState.viewport);
        this._notClearDepthState = state;
    }

    public render(culling: RenderCulling, camera: Camera, targetFrame: Frame) {
        let renderer = this._renderer;
        let gFrame = this._gFrame;

        let ps_x = 1.0 / renderer.getWidth();
        let ps_y = 1.0 / renderer.getHeight();

        renderer.useCamera(camera);
        renderer.useFrame(gFrame);

        renderer.directRenderOrderedList(culling.opacities, culling.opacitySize);
        renderer.directRenderOrderedList(culling.alphaTests, culling.alphaTestSize);

        let depthTex = targetFrame.getDepthStencilTexture();
        targetFrame.setDepthStencil(gFrame.getDepthStencilTexture());
        gFrame.setDepthStencil(depthTex);

        this._deferMat.setPixelSize(ps_x, ps_y);

        renderer.useCamera(camera);
        renderer.useFrame(targetFrame, this._notClearDepthState);

        renderer.directRenderMesh(this._deferMesh);

        let mesh = this._pointLightMesh;
        let mat = this._pointLightMat;

        mat.setPixelSize(ps_x, ps_y);

        let l = culling.pointLightSize;
        let lightsList = culling.pointLights;

        for (let i = 0; i < l; i++) {
            let pl = lightsList[i].obj;
            let r = pl.radius;
            mat.setLightPos(pl.getPosition());  
            mesh.setScale(r, r, r);
            mesh.setPositionAt(pl.getPosition());
            glProgram.lightColor.copy(pl.color);
            renderer.directRenderMesh(mesh);
        }

        renderer.directRenderOrderedList(culling.noDeferOpacities, culling.noDeferOpacitySize);
        renderer.directRenderOrderedList(culling.noDeferAlphaTests, culling.noDeferAlphaTestSize);
        renderer.directRenderOrderedList(culling.alphaBlends, culling.alphaBlendSize);
    }

    public get gFrame() {
        return this._gFrame;
    }
}