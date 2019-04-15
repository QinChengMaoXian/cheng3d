import { Ray } from "../math/Ray";
import { Vector3 } from "../math/Vector3";
import { Vector2 } from "../math/Vector2";
import { Camera, CameraType } from "../object/Camera";
import { Matrix4 } from "../math/Matrix4";
import { Object3D } from "../object/Object3D";

export interface IntersectObject {
    target: Vector3;
    normal: Vector3;
    object: Object3D;
}

const vpImat = new Matrix4

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
    public setRay(origin: Vector3, dir: Vector3) {
        this.ray.set(origin, dir);
    }

    /**
     * 
     * @param object 
     * @param recursive 
     */
    public intersectObject(object: Object3D, intersects: IntersectObject[] = [], recursive: boolean = true) {
        if (object.visible === false) {
            return intersects;
        }
        object.raycast(this, intersects);
        if (recursive) {
            const children = object.getChildren();
            for (let i = 0, l = children.length; i < l; i++) {
                this.intersectObject(children[i], intersects, recursive);
            }
        }
        return intersects;
    }

    /**
     * 通过相机设置射线检测的属性
     * @param coords 
     * @param camera 
     */
    public setFromCamera(coords: Vector2, camera: Camera) {
        const ray = this.ray;
        if (camera.type === CameraType.Perspective) {
            // camera.getViewInverseMatrix()
            ray.origin.setFromMatrixPosition(camera.getMatrix());//.copy(camera.getPosition()); // copy(camera.getPosition()); //
            vpImat.copy(camera.getViewProjectionMatrix()).invert();
            ray.dir.set(coords.x, coords.y, 0.5).applyMatrix4(vpImat).subAt(ray.origin).normalize();
        } else if (camera.type === CameraType.Orthographic) {
            ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
            ray.dir.set(0, 0, -1).transformDirection(camera.getMatrix());
        }
    }
}
