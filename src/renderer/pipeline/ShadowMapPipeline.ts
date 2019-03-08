import { IRenderer } from "../Renderer";
import { RenderCulling } from "../../util/RenderCulling";
import { Object3D } from "../../object/Object3D";
import { Light, LightType } from "../../light/Light";
import { Box } from "../../math/Box";
import { Camera } from "../../object/Camera";
import { Frame } from "../../graphics/Frame";
import { DepthMaterial } from "../../material/DepthMaterial";
import { DirectionLight } from "../../light/DirectionLight";
import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { RTLocation } from "../../graphics/GraphicsTypes";


export class ShadowMapPipeline {

    /** 渲染器引用 */
    protected _renderer: IRenderer;

    /** 阴影图可渲染裁剪 */
    protected _culling: RenderCulling = new RenderCulling();

    /** 渲染阴影图用的帧缓冲对象 */
    private _frame: Frame;

    /** 渲染深度用的材质 */
    private _material: DepthMaterial;

    /** 深度用的相机 */
    private _camera: Camera;

    constructor(renderer: IRenderer) {
        this._renderer = renderer;

        let frame = new Frame();
        frame.enableDepthStencil();
        frame.getState().clearColor.set(1, 1, 1, 1);
        this._frame = frame;

        this._material = new DepthMaterial;

        this._camera = new Camera();
    }

    public setSize(w: number, h: number) {
        
    }

    public renderShadow(scene: Object3D, light: Light, sceneBox: Box, srcCamera: Camera) {
        switch (light.type) {
            case LightType.Direction:
                this._directionShadow(scene, <DirectionLight>light, sceneBox, srcCamera);
                break;

            case LightType.Spot:

                break;

            case LightType.Point:

                break;

            default:
                break;
        }
    }

    protected _directionShadow(scene: Object3D, light: DirectionLight, sceneBox: Box, srcCamera: Camera) {
        let culling = this._culling;

        let camera = this._camera;
        let frame = this._frame;
        let material = this._material;

        let dirLight = <DirectionLight>light;
        let dirShadow = dirLight.shadow;
        let dir = dirLight.dir;

        let vmin = sceneBox.min;
        let vmax = sceneBox.max;

        let boxCenter = Vector3.pool.create();
        let vec3 = Vector3.pubTemp;

        boxCenter.copy(vmax).subAt(vmin).mul(0.5).addAt(vmin);
        let mat4 = Matrix4.pubTemp;
        vec3.copy(boxCenter).addAt(dir);

        mat4.lookAt(boxCenter, dir, Vector3.ZUp);

        let box = Box.pubTemp;
        box.reset();

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    vec3.set(i ? vmin.x : vmax.x, j ? vmin.y : vmax.y, k ? vmin.z : vmax.z);
                    vec3.applyMatrix4(mat4);
                    box.expandAtPoint(vec3);
                }
            }
        }

        let min = box.min;
        let max = box.max;

        // let x = max.x - min.x;
        // let y = max.y - min.y;
        // let z = max.z + 1;

        let range = dirShadow.range; //Math.ceil((x > y ? x : y) / 2);
        // dirShadow.range =range
        let far = dirShadow.far;//max.z - min.z + 1;
        let near = 1;

        // vec3.copy(boxCenter).add(dir.x * z, dir.y * z, dir.z * z);
        // camera.setPositionAt(vec3);
        // camera.lookAt(boxCenter);
        // camera.enableOrthographicMode(-range, range, -range, range, near, far);

        // camera.resize(range * 2, range * 2);
        camera.setPositionAt(dirLight.getPosition());
        camera.lookAt(vec3.copy(dirLight.getPosition()).subAt(dir));
        camera.setUp(Vector3.ZUp);
        camera.enableOrthographicMode(-range, range, -range, range, near, far);
        camera.update(0);

        dirShadow.matrix.copy(camera.getViewProjectionMatrix());

        culling.culling(scene, camera.getViewProjectionMatrix(), false, true);

        frame.setSize(dirShadow.size, dirShadow.size);
        frame.setTexture2D(RTLocation.COLOR, dirShadow.depthTex);

        let renderer = this._renderer;
        renderer.useCamera(camera);
        renderer.useFrame(frame);

        this._renderer.directRenderList(culling.opacities, culling.opacitySize, material);

        Vector3.pool.recovery(boxCenter);
    }
}