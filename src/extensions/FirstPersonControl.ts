import { Camera } from "../object/Camera";
import { Sprite } from "../ui/Sprite";
import { Timer } from "../core/Timer";
import { Event } from "../core/Event";

/**
 * 第一人称相机控制
 */
export class FirstPersonControl {
    protected _camera: Camera;
    protected _sprite: Sprite;
    protected _timer: Timer;

    protected _moveDelta: number = 2;

    protected _enable: boolean = true;

    constructor(camera: Camera, sprite: Sprite, timer: Timer) {
        this._camera = camera;
        this._sprite = sprite;
        this._timer = timer;
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

    /**
     * TODO: 
     */
    public resetCamera() {

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
        const _d = this._moveDelta;
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

    protected _onMouseDown(e: Event) {
        this._sprite.on(Event.MOUSE_MOVE, this, this._cameraRotate);
    }

    protected _onMouseUp(e: Event) {
        this._sprite.off(Event.MOUSE_MOVE, this, this._cameraRotate);
    }

    protected _cameraRotate(e: Event) {
        let del = 0.005;
        let moveX = e.movementX * del;
        let moveY = e.movementY * del;
        this._camera.rotateViewFromForward(moveX, moveY);
    }
}
