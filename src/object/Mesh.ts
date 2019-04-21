import { Object3D } from "./Object3D";
import { Geometry } from "../graphics/Geometry";
import { Material } from "../material/Material";
import { Raycaster, IntersectObject } from "../util/RayCaster";
import * as CGE from '../graphics/RendererParameter';
import { Ray } from "../math/Ray";
import { Matrix4 } from "../math/Matrix4";
import { Triangle } from "../math/Triangle";
import { Vector3 } from "../math/Vector3";
import { ShaderConst } from "../graphics/ShaderConst";
import { Attribute } from "../graphics/Buffer";

export class Mesh extends Object3D {
    protected _geometry: Geometry;
    protected _material: Material;

    public castShadow: boolean = true;
    public receiveShadow: boolean = true;

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
        let bounding = this._geometry.getBounding();
        if (!bounding) {
            return;
        }
        if (this._bounding && this._bounding.getType() === bounding.getType()) {
            this._bounding.copy(bounding);
            this._bounding.applyMatrix(this._matrix);
        } else {
            this._bounding = bounding.clone();
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

Mesh.prototype.raycast = function() {

    const invMat: Matrix4 = new Matrix4();
    const ray: Ray = new Ray();

    const triangle: Triangle = new Triangle();
    const target: Vector3 = new Vector3();
    const normal: Vector3 = new Vector3();

    return function raycast(raycaster: Raycaster, intersects: IntersectObject[]) {
        const geo: Geometry = this._geometry;
        const mat: Material = this._material;

        if (!geo || !mat) { return; }

        const cullmode = mat.faceMode;
        const flipFace = mat.filpFace;

        if (cullmode === CGE.FRONT_AND_BACK) {
            return;
        }

        if (this._bounding && (!this._bounding.intersectRay(raycaster.ray))) {
            return;
        }

        let backCulling = true;
        if (!cullmode || cullmode === CGE.ZERO) {
            backCulling = false;
        }

        let backSide = false;
        if ((cullmode === CGE.FRONT && !flipFace) || (cullmode === CGE.BACK && flipFace)) {
            backSide = true;
        }

        const posbuf = geo.getPosBuffer();
        if (!posbuf) {
            return
        }

        let posAttrib: Attribute

        posbuf.getAttributes().forEach(attr => {
            if(attr.attribType === ShaderConst.position) {
                posAttrib = attr;
            }
        })

        ray.copy(raycaster.ray);
        ray.applyMatrix4(invMat.getInvert(this._matrix));

        const idxbuf = geo.getIndexBuffer();

        const posData = posbuf.getData();

        const offset = posAttrib.offset / posData.BYTES_PER_ELEMENT;
        const num = (posbuf.getStride() / posData.BYTES_PER_ELEMENT) || posAttrib.num;
        const thrNum = posAttrib.num > 2;

        if (idxbuf) {
            const idxData = idxbuf.getData();

            for (let i = 0, l = idxData.length; i < l; i += 3) {
                let idx0 = idxData[i] * num + offset;
                let idx1 = idxData[i + 1] * num + offset;
                let idx2 = idxData[i + 2] * num + offset;

                if(backSide) {
                    let temp = idx1;
                    idx1 = idx2;
                    idx2 = temp;
                }

                triangle.p1.set(posData[idx0], posData[idx0 + 1], thrNum ? posData[idx0 + 2] : 0);
                triangle.p2.set(posData[idx1], posData[idx1 + 1], thrNum ? posData[idx1 + 2] : 0);   
                triangle.p3.set(posData[idx2], posData[idx2 + 1], thrNum ? posData[idx2 + 2] : 0); 

                if(ray.intersectTriangle(triangle, backCulling, target)) {
                    triangle.computeNormal(normal);
                    intersects.push({
                        target: target.clone().applyMatrix4(this._matrix),
                        normal: normal.clone(),
                        object: this
                    })
                }
            }
        } else {
            for (let i = 0, l = posData.length / num; i < l; i += 3 * num) {

                let idx = i + offset;
                triangle.p1.set(posData[idx], posData[idx + 1], posData[idx + 2]);
                idx = backSide ? (i + 2 * num + offset) : (i + num + offset);
                triangle.p2.set(posData[idx], posData[idx + 1], posData[idx + 2]);
                idx = backSide ? (i + num + offset) : (i + 2 * num + offset);
                triangle.p3.set(posData[idx], posData[idx + 1], posData[idx + 2]);

                if(ray.intersectTriangle(triangle, backCulling, target)) {
                    triangle.computeNormal(normal);
                    intersects.push({
                        target: target.clone().applyMatrix4(this._matrix),
                        normal: normal.clone(),
                        object: this
                    })
                }
            }
        }
    }
}();
