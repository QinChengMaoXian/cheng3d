import { PEBase, PEOrder, PEType, PEReqType } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { SSAOMaterial } from "../../material/SSAOMaterial";
import { PostEffectsPipeline } from "../pipeline/PostEffectsPipeline";
import { IRenderer } from "../Renderer";
import * as CGE from '../../graphics/RendererParameter';
import { Vector4 } from "../../math/Vector4";

export class SSR extends PEBase {
    protected static SrcReqs = [
        PEReqType.DEPTH,
        PEReqType.COLOR,
        PEReqType.NORMAL
    ]

    protected _mesh: Mesh;
    protected _mat: SSAOMaterial;


    protected _frame: Frame;

    protected _render2Target: boolean = false;

    constructor(pipe: PostEffectsPipeline) {
        super(pipe);
    }

    public init(geometry: Geometry) {
        let material = new SSAOMaterial();
        this._mat = material;
        let mesh = new Mesh();
        mesh.setGeometry(geometry);
        mesh.setMaterial(material);
        this._mesh = mesh;

        let pipe = this._pipe;
        
        let w = Math.floor(pipe.width);
        let h = Math.floor(pipe.height);

        let frame = new Frame();
        frame.setSize(w, h);
        frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.LINEAR, CGE.LINEAR);
        frame.setClearColor(Vector4.One);
        this._frame = frame;

        pipe.setRequestFrame(PEOrder.AO, this._frame);

        this._isInit = true;
    }

    public setSampleNum(num: number) {
        this._mat.createSampleData(num);
    }

    public resize(w: number, h: number) {
        this._mat.setPixelSize(w / 4, h / 4);
        this._frame.setSize(w, h);
    }

    public render() {
        const pipe = this._pipe;
        const ssaoMat = this._mat;

        let camera = pipe.defCamera;

        let colorFrame: Frame = pipe.srcFrame;

        let frame = this._frame;

        let w = colorFrame.getWidth();
        let h = colorFrame.getHeight();

        let p_x = 1.0 / w;
        let p_y = 1.0 / h;

        let aspect = camera.aspect;
        let tan_2Fov = Math.tan(camera.fovy / 2);
        let n = camera.near;
        let f = camera.far;

        ssaoMat.setNormalTexture(null);
        ssaoMat.setDepthTexture(<Texture2D>(colorFrame.getDepthStencilTexture()));

        ssaoMat.setDiffuseTexture(<Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex));
        ssaoMat.setPixelSize(p_x, p_y);
        ssaoMat.setAsptRtoTanHfFov(aspect, tan_2Fov, (-n-f) / (n-f), (2*f*n) / (n-f));

        pipe.renderPass(this._mesh, frame);
    }

    public srcRequires(): PEReqType[] {
        return SSR.SrcReqs;
    }

    /**
     * 是否需要上一个后处理的结果
     */
    public get render2Target(): boolean {
        return this._render2Target;
    }

    public destroy(renderer: IRenderer) {
        this._pipe.removeRequsetFrame(PEOrder.SSR, this._frame);
        renderer.releaseMesh(this._mesh);
        this._pipe = null;
        this._mesh = null;
        this._mat = null;
    }

    get type(): PEType {
        return PEType.SSR;
    }

    get order() {
        return PEOrder.SSR;
    }
}
