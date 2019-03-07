import { PEBase, PEOrder, PEType, PEReqType } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { RTLocation } from "../../graphics/GraphicsTypes";
import { FXAAMaterial } from "../../material/FXAAMaterial";
import { PostEffectsPipeline } from "../pipeline/PostEffectsPipeline";
import { IRenderer } from "../Renderer";

export class FXAA extends PEBase {
    protected static SrcReqs = [
        PEReqType.COLOR
    ];

    protected _mesh: Mesh;
    protected _material: FXAAMaterial;

    constructor(pipe: PostEffectsPipeline) {
        super(pipe);
    }

    public init(geometry: Geometry) {
        let material = new FXAAMaterial(null);
        this._material = material;
        let mesh = new Mesh();
        mesh.setGeometry(geometry);
        mesh.setMaterial(material);
        this._mesh = mesh;
        this._isInit = true;
    }

    public resize(w: number, h: number) {
        this._material.setPixelSize(1.0 / w, 1.0 / h);
    }

    public render() {
        const pipe = this._pipe

        let colorFrame: Frame = pipe.peNumber === 0 ? pipe.srcFrame : pipe.currentFrame;
        let targetFrame: Frame = pipe.targetFrame;

        let tex2D = <Texture2D>(colorFrame.getTextureFromType(RTLocation.COLOR).tex);
        this._material.setSrcTexture(tex2D);

        pipe.renderPass(this._mesh, targetFrame);
    }

    public srcRequires(): PEReqType[] {
        return FXAA.SrcReqs;
    }

    public destroy(renderer: IRenderer) {
        const pipe = this._pipe
        renderer.releaseMesh(this._mesh);
        this._pipe = null;
        this._mesh = null;
        this._material = null;
    }

    public get render2Target(): boolean {
        return true;
    }

    get type(): PEType {
        return PEType.FXAA;
    }

    get order() {
        return PEOrder.AA;
    }
}
