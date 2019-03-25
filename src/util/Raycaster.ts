import { Ray } from "../math/Ray";
import { Vector3 } from "../math/Vector3";
import { Vector2 } from "../math/Vector2";
import { Camera, CameraType } from "../object/Camera";

export interface IntersectObject {

}

/**
 * 射线检测类型
 */
export class Raycaster {
    public ray: Ray

    public far: number;
    public near: number;

    constructor(ray?: Ray, near: number = 0, far: number = Infinity) {
        if (ray) {
            this.ray = ray.clone()
        } else {
            this.ray = new Ray
        }

        this.near = near;
        this.far = far;
    }

    /**
     * 设置射线属性
     * @param origin 
     * @param dir 
     */
    setRay(origin: Vector3, dir: Vector3) {
        this.ray.set(origin, dir);
    }

    /**
     * 通过相机设置射线检测的属性
     * @param coords 
     * @param camera 
     */
    setFromCamera(coords: Vector2, camera: Camera) {
        const ray = this.ray;
        if (camera.type === CameraType.Perspective) {
            ray.origin.setFromMatrix4Position(camera.getMatrix()); // copy(camera.getPosition()); //
            ray.dir.set(coords.x, coords.y, 0.5).unproject(camera).subAt(ray.origin).normalize();
        } else if (camera.type === CameraType.Orthographic) {
            ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
            ray.dir.set(0, 0, -1).transformDirection(camera.getMatrix());
        }
    }
}
