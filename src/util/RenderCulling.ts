import { Frustum } from "../math/Frustum";
import { Mesh } from "../object/Mesh";
import { Light, LightType } from "../light/Light";
import { Box } from "../math/Box";
import { Object3D } from "../object/Object3D";
import { Matrix4 } from "../math/Matrix4";
import { BoundingType } from "../bounding/Bounding";
import { AABB } from "../bounding/AABB";
import { DirectionLight } from "../light/DirectionLight";
import { PointLight } from "../light/PointLight";
import { SpotLight } from "../light/SpotLight";
import { Vector3 } from "../math/Vector3";
import { Plane } from "../math/Plane";
import { ObjectPool } from "./ObjectPool";

export class Object3DProxy<T> {
    obj: T;
    distance: number;
}

enum SortType {
    None = 0,
    Positive,
    Inveried,
}

type MeshProxy = Object3DProxy<Mesh>;
type DirLightProxy = Object3DProxy<DirectionLight>;
type PointLightProxy = Object3DProxy<PointLight>;
type SpotLightProxy = Object3DProxy<SpotLight>;

/**
 * 渲染剔除
 * TODO想办法优化这一对东西；
 */
export class RenderCulling {

    protected _objPool: ObjectPool<any> = new ObjectPool<any>(Object3DProxy, 32);
    // protected _directionPool: ObjectPool<DirLightProxy> = new ObjectPool<DirLightProxy>(Object3DProxy, 4);
    // protected _pointPool: ObjectPool<PointLightProxy> = new ObjectPool<PointLightProxy>(Object3DProxy, 4);
    // protected _spotPool: ObjectPool<SpotLightProxy> = new ObjectPool<SpotLightProxy>(Object3DProxy, 4);

    public frustum: Frustum = new Frustum();

    public opacities: MeshProxy[] = new Array(64);
    public opacitySize: number = 0;

    public noDeferOpacities: MeshProxy[] = new Array(8);
    public noDeferOpacitySize: number;

    public alphaTests: MeshProxy[] = new Array(16);
    public alphaTestSize: number = 0;

    public noDeferAlphaTests: MeshProxy[] = new Array(4);
    public noDeferAlphaTestSize: number = 0;

    public alphaBlends: MeshProxy[] = new Array(16);
    public alphaBlendSize: number = 0;

    public dirLights: DirLightProxy[] = new Array(4);
    public dirLightSize: number = 0;

    public dirShadowLights: DirLightProxy[] = new Array(2);
    public dirShadowLightSize: number = 0;

    public pointLights: PointLightProxy[] = new Array(4);
    public pointLightSize: number = 0;

    public pointShadowLights: PointLightProxy[] = new Array(2);
    public pointShadowLightSize: number = 0;

    public spotLights: SpotLightProxy[] = new Array(4);
    public spotLightSize: number = 0;

    public spotShadowLights:SpotLightProxy[] = new Array(2);
    public spotShadowLightSize: number = 0;

    public basePlane: Plane;

    public visibleBox: Box = new Box();

    constructor() {
        
    }

    public culling(scene: Object3D, mat4: Matrix4, isDefer: boolean, isShadow: boolean) {

        this.frustum.setFromMatrix(mat4);
        this.basePlane = this.frustum.getPlane(4);

        this.opacitySize = 
        this.noDeferOpacitySize =
        this.alphaTestSize = 
        this.noDeferAlphaTestSize = 
        this.alphaBlendSize = 
        this.dirLightSize = 
        this.dirShadowLightSize = 
        this.pointLightSize = 
        this.pointShadowLightSize = 
        this.spotLightSize = 
        this.spotShadowLightSize = 
        0;

        this.visibleBox.reset();

        this._cutObject3D(scene, scene.visible, isDefer, isShadow);

        this._postCulling(this.opacities, this.opacitySize, SortType.Positive);
        this._postCulling(this.noDeferOpacities, this.noDeferOpacitySize, SortType.Positive);
        this._postCulling(this.alphaTests, this.alphaTestSize, SortType.Positive);
        this._postCulling(this.noDeferAlphaTests, this.noDeferAlphaTestSize, SortType.Positive);
        this._postCulling(this.alphaBlends, this.alphaBlendSize, SortType.Inveried);
        this._postCulling(this.dirLights, this.dirLightSize);
        this._postCulling(this.dirShadowLights, this.dirShadowLightSize);
        this._postCulling(this.pointLights, this.pointLightSize);
        this._postCulling(this.pointShadowLights, this.pointShadowLightSize);
        this._postCulling(this.spotLights, this.spotLightSize);
        this._postCulling(this.spotShadowLights, this.spotShadowLightSize);
    }

    protected _postCulling(ar: Object3DProxy<any>[], size: number, sorting: SortType = SortType.None) {
        this._clearTail(ar, size);
        if (sorting === SortType.Positive) {
            this._sortObjects(ar, false);
        } else if (sorting === SortType.Inveried) {
            this._sortObjects(ar, true);
        }
    }

    protected _clearTail(ar: Object3DProxy<any>[], size: number) {
        for (let i = size, l = ar.length; i < l; i++) {
            if (ar[i]) {
                this._objPool.recovery(ar[i]);
                ar[i].obj = null;
                ar[i] = null;
            } else {
                break;
            }
        }
    }

    protected _sortObjects(list: Object3DProxy<any>[], inv: boolean = false) {
        if (inv) {
            list.sort((a, b) => {
                if (!b) return -1;
                if (!a) return 1;
                return a.distance - b.distance;
            })
        } else {
            list.sort((a, b) => {
                if (!b) return -1;
                if (!a) return 1;
                return b.distance - a.distance;
            })
        }
    }

    protected _cutObject3D(obj: Object3D, isRendering: boolean, isDefer: boolean, isShadow: boolean) {
        let display = obj.visible && isRendering;
        if (obj.isMesh && display) {
            this._cutMesh(<Mesh>obj, isDefer, isShadow);
        } else if (obj.isLight) {
            this._cutLight(<Light>obj);
        }

        let children = obj.getChildren();
        let l = children.length;
        for (let i = 0; i < l; i++) {
            this._cutObject3D(children[i], display, isDefer, isShadow);
        }
    }

    protected _setObjToArray(ar: Object3DProxy<any>[], obj: Object3D, idx: number) {
        let proxy = ar[idx];
        if (!proxy) {
            proxy = this._objPool.create();
            ar[idx] = proxy;
        }
        proxy.obj = obj;
        proxy.distance = this.basePlane.distanceToPoint(obj.getPosition());
    }

    protected _cutMesh(mesh: Mesh, isDefer: boolean, isShadow: boolean) {
        if (!mesh.beRendering() || (isShadow && !mesh.castShadow)) {
            return;
        }

        let visibleBox = this.visibleBox;
        let frustum = this.frustum;
        let bounding = mesh.getBounding();
        let mat = (<Mesh>mesh).getMaterial();

        if (bounding) {
            switch (bounding.getType()) {
                case BoundingType.TYPE_AABB:
                    let box = (bounding as AABB).box;
                    if (box) {
                        if (!frustum.intersectBox(box)) {
                            return;
                        }
                        visibleBox.expandAtBox(box);
                    }
                    break;
                
            
                default:
                    break;
            }    
        }
        
        if (mat.alphaBlend) {
            this._setObjToArray(this.alphaBlends, mesh, this.alphaBlendSize++);
        } else if (mat.alphaTest) {
            if (isDefer && !mat.supportDeferred) {
                this._setObjToArray(this.noDeferAlphaTests, mesh, this.noDeferAlphaTestSize++);
            } else {
                this._setObjToArray(this.alphaTests, mesh, this.alphaTestSize++);
            }
        } else {
            if (isDefer && !mat.supportDeferred) {
                this._setObjToArray(this.noDeferOpacities, mesh, this.noDeferOpacitySize++);
            } else {
                this._setObjToArray(this.opacities, mesh, this.opacitySize++);
            }
        }
    }

    protected _cutLight(light: Light) {

        switch (light.type) {
            case LightType.Direction:
                if(light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.dirShadowLights, light, this.dirShadowLightSize++);
                } else {
                    this._setObjToArray(this.dirLights, light, this.dirLightSize++);
                }
                break;
            
            case LightType.Spot:
                if(light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.spotShadowLights, light, this.spotShadowLightSize++);
                } else {
                    this._setObjToArray(this.spotLights, light, this.spotLightSize++);
                }
                break;

            case LightType.Point:
                if(light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.pointShadowLights, light, this.pointShadowLightSize++);
                } else {
                    this._setObjToArray(this.pointLights, light, this.pointLightSize++);
                }
                break;
        }
    }
}