import { PEBase, PEOrder, PEType } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { IRenderer } from "../Renderer";
import { RenderTargetLocation } from "../../graphics/GraphicsTypes";
import { FXAAMaterial } from "../../material/FXAAMaterial";

export class FXAA extends PEBase {
    protected _mesh: Mesh;
    protected _material: FXAAMaterial;

    constructor(renderer: IRenderer) {
        super(renderer);
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
        const renderer = this._renderer;

        let colorFrame: Frame = renderer.currentColorFrame;
        let targetFrame: Frame = renderer.currectTargetFrame;

        let tex2D = <Texture2D>(colorFrame.getTextureFromType(RenderTargetLocation.COLOR).tex);
        this._material.setSrcTexture(tex2D);

        this._renderer.renderScene(this._mesh, null, targetFrame);
    }

    public destroy() {
        this._renderer.releaseMesh(this._mesh);
        this._renderer = null;
        this._mesh = null;
        this._material = null;
    }

    get type(): PEType {
        return PEType.FXAA;
    }

    get order() {
        return PEOrder.AA;
    }
}
