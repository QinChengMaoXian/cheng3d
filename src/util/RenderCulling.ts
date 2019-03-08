import { Frustum } from "../math/Frustum";
import { Mesh } from "../object/Mesh";
import { Light } from "../light/Light";
import { Box } from "../math/Box";
import { Object3D } from "../object/Object3D";
import { Matrix4 } from "../math/Matrix4";
import { BoundingType } from "../bounding/Bounding";
import { AABB } from "../bounding/AABB";

/**
 * 渲染剔除
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

    public lights: Light[] = new Array(16);
    public lightSize: number = 0;

    public shadowLights: Light[] = new Array(4);
    public shadowLightSize: number = 0;

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
        this.lightSize = 
        this.shadowLightSize = 0;

        this.visibleBox.reset();

        this._cutObject3D(scene, scene.visible, isDefer, isShadow);

        this._clearTail(this.opacities, this.opacitySize);
        this._clearTail(this.noDeferOpacities, this.noDeferOpacitySize);
        this._clearTail(this.alphaTests, this.alphaTestSize);
        this._clearTail(this.noDeferAlphaTests, this.noDeferAlphaTestSize);
        this._clearTail(this.alphaBlends, this.alphaBlendSize);
        this._clearTail(this.lights, this.lightSize);
        this._clearTail(this.shadowLights, this.shadowLightSize);
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
        this.lights[this.lightSize++] = light;

        if(light.shadow) {
            this.shadowLights[this.shadowLightSize++] = light;
        }

    }
}