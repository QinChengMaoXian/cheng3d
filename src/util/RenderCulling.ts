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

/**
 * 渲染剔除
 * TODO想办法优化这一对东西；
 */
export class RenderCulling {

    public frustum: Frustum = new Frustum();

    public opacities: Mesh[] = new Array(64);
    public opacitySize: number = 0;

    public noDeferOpacities: Mesh[] = new Array(8);
    public noDeferOpacitySize: number;

    public alphaTests: Mesh[] = new Array(16);
    public alphaTestSize: number = 0;

    public noDeferAlphaTests: Mesh[] = new Array(4);
    public noDeferAlphaTestSize: number = 0;

    public alphaBlends: Mesh[] = new Array(16);
    public alphaBlendSize: number = 0;

    public dirLights: DirectionLight[] = new Array(4);
    public dirLightSize: number = 0;

    public dirShadowLights: DirectionLight[] = new Array(2);
    public dirShadowLightSize: number = 0;

    public pointLights: PointLight[] = new Array(4);
    public pointLightSize: number = 0;

    public pointShadowLights: PointLight[] = new Array(2);
    public pointShadowLightSize: number = 0;

    public spotLights: SpotLight[] = new Array(4);
    public spotLightSize: number = 0;

    public spotShadowLights: SpotLight[] = new Array(2);
    public spotShadowLightSize: number = 0;

    public visibleBox: Box = new Box();

    constructor() {
        
    }

    public culling(scene: Object3D, mat4: Matrix4, isDefer: boolean, isShadow: boolean) {

        this.frustum.setFromMatrix(mat4);

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

        this._clearTail(this.opacities, this.opacitySize);
        this._clearTail(this.noDeferOpacities, this.noDeferOpacitySize);
        this._clearTail(this.alphaTests, this.alphaTestSize);
        this._clearTail(this.noDeferAlphaTests, this.noDeferAlphaTestSize);
        this._clearTail(this.alphaBlends, this.alphaBlendSize);
        this._clearTail(this.dirLights, this.dirLightSize);
        this._clearTail(this.dirShadowLights, this.dirShadowLightSize);
        this._clearTail(this.pointLights, this.pointLightSize);
        this._clearTail(this.pointShadowLights, this.pointShadowLightSize);
        this._clearTail(this.spotLights, this.spotLightSize);
        this._clearTail(this.spotShadowLights, this.spotShadowLightSize);
    }

    protected _clearTail(ar: any[], i: number) {
        ar.fill(null, i);
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
            this.alphaBlends[this.alphaBlendSize++] = mesh;
        } else if (mat.alphaTest) {
            if (isDefer && !mat.supportDeferred) {
                this.noDeferAlphaTests[this.noDeferAlphaTestSize++] = mesh;
            } else {
                this.alphaTests[this.alphaTestSize++] = mesh;
            }
        } else {
            if (isDefer && !mat.supportDeferred) {
                this.noDeferOpacities[this.noDeferOpacitySize++] = mesh;
            } else {
                this.opacities[this.opacitySize++] = mesh;
            }
        }
    }

    protected _cutLight(light: Light) {

        switch (light.type) {
            case LightType.Direction:
                if(light.shadow && light.shadow.enalbed) {
                    this.dirShadowLights[this.dirShadowLightSize++] = <DirectionLight>light;
                } else {
                    this.dirLights[this.dirLightSize++] =  <DirectionLight>light;
                }
                break;
            
            case LightType.Spot:
                if(light.shadow && light.shadow.enalbed) {
                    this.spotShadowLights[this.spotShadowLightSize++] = <SpotLight>light;
                } else {
                    this.spotLights[this.spotLightSize++] = <SpotLight>light;
                }
                break;

            case LightType.Point:
                if(light.shadow && light.shadow.enalbed) {
                    this.pointShadowLights[this.pointShadowLightSize++] = <PointLight>light;
                } else {
                    this.pointLights[this.pointLightSize++] = <PointLight>light;
                }
                break;

            default:
                break;
        }
        

    }
}