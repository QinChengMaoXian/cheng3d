import { PEBase } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { Material } from "../../material/Material";

export class FXAA extends PEBase {
    protected _srcColor: Texture2D;
    protected _dstFrame: Frame;
    protected _mesh: Mesh;
    protected _geometry: Geometry;

    constructor() {
        super();
    }

    public init() {

    }
}
