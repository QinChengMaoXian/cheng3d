import { PEBase, PEOrder, PEType, PEReqType } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { IRenderer } from "../Renderer";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { SSAOMaterial } from "../../material/SSAOMaterial";
import { PostEffectsPipeline } from "../PostEffectsPipeline";

export class SSAO extends PEBase {
    protected static SrcReqs = [
        PEReqType.DEPTH,
        PEReqType.COLOR
    ]

    protected _scale: number;
    protected _bias: number;
    protected _sampleRad: number;
    protected _intensity: number;

    protected _mesh: Mesh;
    protected _mat: SSAOMaterial;

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
        this._isInit = true;
    }

    public resize(w: number, h: number) {
        // this._mat.setPixelSize(1.0 / w, 1.0 / h);
    }

    public render() {
        const pipe = this._pipe;
        const renderer = pipe.renderer;
        
        const ssaoMat = this._mat;

        let camera = renderer.defCamera;

        let colorFrame: Frame = renderer.currentColorFrame;
        let targetFrame: Frame = renderer.currectTargetFrame;

        let w = colorFrame.getWidth();
        let h = colorFrame.getHeight();

        let p_x = 1.0 / w;
        let p_y = 1.0 / h;

        let aspect = camera.aspect;
        let tan_2Fov = Math.tan(camera.fovy / 2);
        let n = camera.near;
        let f = camera.far;

        let tex2D = <Texture2D>(colorFrame.getDepthStencilTexture());
        this._mat.setDepthTexture(tex2D);
        tex2D = <Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex);
        this._mat.setDiffuseTexture(tex2D);

        ssaoMat.setPixelSize(p_x, p_y);
        ssaoMat.setAsptRtoTanHfFov(aspect, tan_2Fov, (-n-f) / (n-f), (2*f*n) / (n-f));

        pipe.renderPass(this._mesh, targetFrame);
    }

    public srcRequires(): PEReqType[] {
        return SSAO.SrcReqs;
    }

    public destroy() {
        const pipe = this._pipe;
        const renderer = pipe.renderer;
        renderer.releaseMesh(this._mesh);
        this._pipe = null;
        this._mesh = null;
        this._mat = null;
    }

    get type(): PEType {
        return PEType.SSAO;
    }

    get order() {
        return PEOrder.AO;
    }
}
