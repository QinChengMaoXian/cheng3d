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
        if (this._geometry) {
            this._geometry.destroy();
        }
        this._geometry = geo;
    }

    public getGeometry(): Geometry {
        return this._geometry;
    }

    public setMaterial(mat: Material) {
        if (this._material) {
            this._material.destroy();
        }
        this._material = mat;
    }

    public getMaterial() {
        return this._material;
    }

    public beRendering(): boolean {
        return !(!this._geometry || !this._material);
    }

    protected _updateBounding() {
        if (this._bounding && this._bounding.getType() === this._geometry.getBounding().getType()) {
            this._bounding.copy(this._geometry.getBounding());
            this._bounding.applyMatrix(this._matrix);
        } else {
            this._bounding = this._geometry.getBounding().clone();
            this._bounding.applyMatrix(this._matrix);
        }
    }

    public get isMesh(): boolean {
        return true;
    }

    protected _destroy() {
        if (this._material) {
            this._material.destroy();
        }

        if (this._geometry) {
            this._geometry.destroy();
        }
    }
}