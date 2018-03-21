import { Object3D } from "./Object3D";
import { Geometry } from "../graphics/Geometry";
import { Material } from "../material/Material";

export class Mesh extends Object3D {
    protected _geometry: Geometry;
    protected _material: Material;
    constructor() {
        super();
    }

    public setGeometry(geo: Geometry) {
        this._geometry = geo;
    }

    public getGeometry(): Geometry {
        return this._geometry;
    }

    public setMaterial(mat: Material) {
        this._material = mat;
    }

    public getMaterial() {
        return this._material;
    }

    public beRendering(): boolean {
        return !(!this._geometry || !this._material);
    }
}