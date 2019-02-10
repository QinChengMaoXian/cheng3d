import { PEBase } from "./PEBase";
import { Texture2D } from "../../graphics/Texture2D";
import { Frame } from "../../graphics/Frame";
import { Mesh } from "../../object/Mesh";
import { Geometry } from "../../graphics/Geometry";
import { Material } from "../../material/Material";
import { ShaderConst } from "../../graphics/ShaderConst";
import { Shader } from "../../graphics/Shader";
import { Renderer } from "../Renderer";
import { FLOAT } from "../../graphics/RendererParameter"

export class FXAA extends PEBase {
    protected _srcColor: Texture2D;
    protected _dstFrame: Frame;
    protected _mesh: Mesh;
    protected _geometry: Geometry;
    protected _material: FXAAMaterial;

    constructor(renderer: Renderer) {
        super(renderer);
    }

    public init(texture: Texture2D) {
        this._initGeometry();
        this._material = new FXAAMaterial(texture);
        let mesh = new Mesh();
        mesh.setGeometry(this._geometry);
        mesh.setMaterial(this._material);
        this._mesh = mesh;
    }

    public render() {
        
    }

    private _initGeometry() {
        let vertexPositionData = new Float32Array([
            -1.0, 1.0, 0.0,  0.0, 1.0,
            1.0,  1.0, 0.0,  1.0, 1.0,
            1.0, -1.0, 0.0,  1.0, 0.0,
            -1.0, -1.0, 0.0, 0.0, 0.0,
        ]);
        
        let indexData = new Uint16Array([
            0, 2, 1,
            2, 0, 3, 
        ]);
        
        let planeVertexGeometry = new Geometry();
        
        let attribs = [
            {
                name: 'Position',
                attribute: ShaderConst.position, 
                num: 3,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: ShaderConst.texcoord, 
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
            },
        ];
        
        planeVertexGeometry.addMultiAttribute(attribs, FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 5, vertexPositionData);
        planeVertexGeometry.setIndexData(indexData);
        planeVertexGeometry.setDrawParameter(indexData.length);

        this._geometry = planeVertexGeometry;
    }
}

export class FXAAMaterial extends Material {
    protected _data: any;
    constructor(texture: Texture2D) {
        super();

        this._data = { data: new Float32Array([1.0, 1.0]) };

        this.setSrcTexture(texture);
        this.setProperty(ShaderConst.pixelSize, this._data);
    }

    public setSrcTexture(texture: Texture2D) {
        if (!texture) {
            return;
        }
        this.setTexture(ShaderConst.diffuseMap, texture);
        let w = texture.getWidth();
        let h = texture.getHeight();
        if (!!w && !!h) {
            this.setPixelSize(1.0 / w, 1.0 / h);
        }
    }

    public setPixelSize(x, y) {
        this._data.data[0] = x;
        this._data.data[1] = y;
    }
}
