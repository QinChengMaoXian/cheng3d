import { Camera } from "../object/Camera";
import { Sprite } from "../ui/Sprite";
import { Timer } from "../core/Timer";
import { Event } from "../core/Event";
import { Object3D } from "../object/Object3D";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";

const quatTemp = new Quaternion();
const vecTemp = new Vector3();

/**
 * 第一人称相机控制
 */
export class FirstPersonControl {
    protected _camera: Camera;
    protected _sprite: Sprite;
    protected _timer: Timer;

    protected _horizontalObj: Object3D;
    protected _verticalObj: Object3D;

    public moveDelta: number = 2;
    public rotateDelta: number = 0.005;

    protected _enable: boolean = true;

    constructor(camera: Camera, sprite: Sprite, timer: Timer) {
        this._camera = camera;
        this._sprite = sprite;
        this._timer = timer;

        this._horizontalObj = new Object3D();
        this._verticalObj = new Object3D();

        this._horizontalObj.addChild(this._verticalObj);
        
        // let parent = camera.getParent();
        // if (parent) {
        //     parent.addChild(this._horizontalObj);
        // }

        // this._verticalObj.addChild(camera);

        this.init();
    }

    public init() {
        const sprite = this._sprite;

        sprite.on(Event.KEY_DOWN, this, this._onKeyDown);
        sprite.on(Event.KEY_UP, this, this._onKeyUp);

        sprite.on(Event.MOUSE_DOWN, this, this._onMouseDown);
        sprite.on(Event.MOUSE_UP, this, this._onMouseUp);

        sprite.on(Event.ON_BLUR, this, this.cancel);
    }

    public dispose() {
        this.cancel();
        const sprite = this._sprite;

        sprite.off(Event.KEY_DOWN, this, this._onKeyDown);
        sprite.off(Event.KEY_UP, this, this._onKeyUp);

        sprite.off(Event.MOUSE_DOWN, this, this._onMouseDown);
        sprite.off(Event.MOUSE_UP, this, this._onMouseUp);

        sprite.off(Event.ON_BLUR, this, this.cancel);
    }

    public resetCamera(camera: Camera) {
        this.cancel();
        this._camera = camera;
    }

    public cancel() {
        const camera = this._camera;
        const timer = this._timer;
        timer.remove(camera, camera.forwardStep);
        timer.remove(camera, camera.horizontalStep);
        timer.remove(camera, camera.verticalStep);
    }

    protected _onKeyDown(e: Event) {
        const camera = this._camera;
        const timer = this._timer;
        const _d = this.moveDelta;
        switch (e.key) {
            case 'w':
                timer.frameLoop(1, camera, camera.forwardStep, [_d]);
                break;
        
            case 's':
                timer.frameLoop(1, camera, camera.forwardStep, [-_d]);
                break;
    
            case 'a':
                timer.frameLoop(1, camera, camera.horizontalStep, [-_d]);
                break;
            
            case 'd':
                timer.frameLoop(1, camera, camera.horizontalStep, [_d]);
                break;
    
            case 'q':
                timer.frameLoop(1, camera, camera.verticalStep, [-_d]);
                break;
    
            case 'e':
                timer.frameLoop(1, camera, camera.verticalStep, [_d]);
                break;
    
            default:
                break;
        }
    }

    protected _onKeyUp(e: Event) {
        const camera = this._camera;
        const timer = this._timer;
        switch (e.key) {
            case 'w':
            case 's':
                timer.remove(camera, camera.forwardStep);
                break;
    
            case 'a':
            case 'd':
                timer.remove(camera, camera.horizontalStep);
                break;
    
            case 'q':
            case 'e':
                timer.remove(camera, camera.verticalStep);
                break;
    
            default:
                break;
        }
    }


    protected _onKeyDown2(e: Event) {
        const camera = this._camera;
        const timer = this._timer;
        const _d = this.moveDelta;
        switch (e.key) {
            case 'w':
                timer.frameLoop(1, camera, camera.forwardStep, [_d]);
                break;
        
            case 's':
                timer.frameLoop(1, camera, camera.forwardStep, [-_d]);
                break;
    
            case 'a':
                timer.frameLoop(1, camera, camera.horizontalStep, [-_d]);
                break;
            
            case 'd':
                timer.frameLoop(1, camera, camera.horizontalStep, [_d]);
                break;
    
            case 'q':
                timer.frameLoop(1, camera, camera.verticalStep, [-_d]);
                break;
    
            case 'e':
                timer.frameLoop(1, camera, camera.verticalStep, [_d]);
                break;
    
            default:
                break;
        }
    }

    protected _onKeyUp2(e: Event) {
        const camera = this._camera;
        const timer = this._timer;
        switch (e.key) {
            case 'w':
            case 's':
                timer.remove(camera, camera.forwardStep);
                break;
    
            case 'a':
            case 'd':
                timer.remove(camera, camera.horizontalStep);
                break;
    
            case 'q':
            case 'e':
                timer.remove(camera, camera.verticalStep);
                break;
    
            default:
                break;
        }
    }

    protected _onMouseDown(e: Event) {
        this._sprite.on(Event.MOUSE_MOVE, this, this._cameraRotate);
    }

    protected _onMouseUp(e: Event) {
        this._sprite.off(Event.MOUSE_MOVE, this, this._cameraRotate);
    }

    protected _cameraRotate(e: Event) {
        let del = this.rotateDelta;
        let moveX = e.movementX * del;
        let moveY = e.movementY * del;

        let rot = quatTemp;
        vecTemp.set(0, 0, 1);
        rot.setAxisAngle(vecTemp, -moveX);
        let quat = this._horizontalObj.getRotate();
        // quat.identity();
        quat.multiply(rot);
        vecTemp.set(1, 0, 0);
        rot.setAxisAngle(vecTemp, -moveY);
        quat = this._verticalObj.getRotate();
        // quat.identity();
        quat.multiply(rot);

        this._horizontalObj.update(0, true);

        quatTemp.setFromRotationMatrix(this._verticalObj.getMatrix());

        this._camera.setRotateAt(quatTemp);
        // this._camera.getRotate().multiply(quatTemp);
        this._camera.enableUpdateMat();
        this._camera.update(0, true);

        // this._camera.rotateViewFromForward(moveX, moveY);
    }
}
