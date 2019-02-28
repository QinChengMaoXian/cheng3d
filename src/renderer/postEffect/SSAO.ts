import { PEBase, PEOrder, PEType, PEReqType } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { SSAOMaterial } from "../../material/SSAOMaterial";
import { PostEffectsPipeline } from "../PostEffectsPipeline";
import { IRenderer } from "../Renderer";
import * as CGE from '../../graphics/RendererParameter';
import { Vector4 } from "../../math/Vector4";
import { ShaderConst } from "../../graphics/ShaderConst";
import { BlendAOMaterial } from "../../material/BlendAOMaterial";

/**
 * SSAO后处理。
 * TODO：线性深度的问题，采样随机扰动。
 */
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

    protected _blendMesh: Mesh;
    protected _blendMat: BlendAOMaterial;

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

        let blendMat = new BlendAOMaterial;
        this._blendMat = blendMat;
        mesh = new Mesh();
        mesh.setGeometry(geometry);
        mesh.setMaterial(blendMat);
        this._blendMesh = mesh;

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

        let aoFrame = this._frame;

        let w = colorFrame.getWidth();
        let h = colorFrame.getHeight();

        let p_x = 1.0 / w;
        let p_y = 1.0 / h;

        let aspect = camera.aspect;
        let tan_2Fov = Math.tan(camera.fovy / 2);
        let n = camera.near;
        let f = camera.far;

        // if (pipe.isDeferredRendering) {
        //     let gFrame = pipe.gBufferFrame;
        //     let normal = <Texture2D>(gFrame.getTextureFromType(RTLocation.RT1).tex);
        //     ssaoMat.setNormalTexture(normal);
        //     ssaoMat.setDepthTexture(<Texture2D>gFrame.getTextureFromType(RTLocation.RT2).tex);
        // } else {
            
        // }

        ssaoMat.setNormalTexture(null);
        ssaoMat.setDepthTexture(<Texture2D>(colorFrame.getDepthStencilTexture()));

        ssaoMat.setDiffuseTexture(<Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex));
        ssaoMat.setPixelSize(p_x, p_y);
        ssaoMat.setAsptRtoTanHfFov(aspect, tan_2Fov, (-n-f) / (n-f), (2*f*n) / (n-f));

        pipe.renderPass(this._mesh, aoFrame);

        if (pipe.isEnablePEOrder(PEOrder.HDR)) {
            this._render2Target = false;
        } else {
            this._render2Target = true;
            this._blendMat.setSrcTexture(<Texture2D>(aoFrame.getTextureFromType(RTLocation.COLOR).tex));
            this._blendMat.setDstTexture(<Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex));
            pipe.renderPass(this._blendMesh, pipe.targetFrame);
        }
    }

    public srcRequires(): PEReqType[] {
        return SSAO.SrcReqs;
    }

    /**
     * 是否需要上一个后处理的结果
     */
    public get render2Target(): boolean {
        return this._render2Target;
    }

    public destroy(renderer: IRenderer) {
        this._pipe.removeRequsetFrame(PEOrder.AO, this._frame);
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
