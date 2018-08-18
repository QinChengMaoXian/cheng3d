import { Scene } from "../object/Scene";
import { Stage } from "../ui/Stage";
import { WebGLRenderer } from "../renderer/WebGLRenderer";
import { Timer } from "../core/Timer";
import { Object3D } from "../object/Object3D";
import { Platform } from "../platform/Platform";
import { Camera } from "../object/Camera";
import { EventDispatcher } from "../core/EventDispatcher";

export class Application extends EventDispatcher {

    public slow: boolean = false;

    private _stop: boolean = false;

    private _frameCount: number = 0;

    private _lastTime: number;

    private _frameId: number = -1;

    protected _timer: Timer;

    protected _stage: Stage;

    protected _scene: Scene;

    private _obj3d: Object3D;

    protected _renderer: WebGLRenderer;

    protected _camera: Camera;

    protected _listenersMap: Map<string, any>;

    protected _keylist: number[] = [];

    private _loopBindThis;

    constructor() {
        super();
    }

    public init(width: number, height: number) {
        this._timer = new Timer();

        this._stage = new Stage();
        this._stage.setSize(width, height);

        this._scene = new Scene();

        this._obj3d = new Object3D();
        this._obj3d.addChild(this._scene);

        this._camera = new Camera(width, height);

        this._renderer = new WebGLRenderer();
        this._renderer.init(width, height);

        this._listenersMap = new Map();
        this._addEventListeners();

        this._loopBindThis = this._loop.bind(this);
    }

    public setSize(width: number, height: number) {
        this._camera.resize(width, height);
        this._stage.setSize(width, height);
        this._renderer.setSize(width, height);
    }

    public start() {
        this._startLoop();
    }

    public stop() {
        this._stop = true;
        Platform.cancelAnimationFrame(this._frameId);
    }

    private _startLoop() {
        this._lastTime = Platform.now();
        this._loop();
    }

    private _loop() {
        if (this._stop) {
            return;
        }
        this._frameId = Platform.requestAnimationFrame(this._loopBindThis);

        this._frameCount++;     

        if (this.slow) {
            if (this._frameCount % 2 === 1) {
                return;
            }
        }

        let now = Platform.now();
        let delta = now - this._lastTime;
        this._lastTime = now;

        this._update(delta);
        this._render();
    }

    private _update(delta: number) {
        this._timer.preUpdate(delta);
        this._scene.update(delta);
        this._stage.update(delta);
        this._timer.lateUpdate(delta);

        this._keylist.forEach(key => {
            switch (key) {
                case 87:
                    this._camera.forwardStep(0.5);
                    break;
    
                case 83:
                    this._camera.forwardStep(-0.5);
                    break;
    
                case 65:
                    this._camera.horizontalStep(-0.5);
                    break;
    
                case 68:
                    this._camera.horizontalStep(0.5);
                    break;
                    
                default:
                    break;
            }
        })
        
    }

    private _render() {
        this._renderer.renderScene(this._scene, this._scene.getActiveCamera() || this._camera);
    }

    private _addEventListener(key: string, listener: any) {
        let canvas = this._renderer.getCanvas();
        let document = Platform.document();
        if (key.indexOf('key') > -1) {
            document.addEventListener(key, listener);
        } else {
            canvas.addEventListener(key, listener);
        }
        this._listenersMap.set(key, listener);
    }

    private _addEventListeners() {
        this._addEventListener('mousedown', this._onMouseDown.bind(this));
        this._addEventListener('mousemove', this._onMouseMove.bind(this));
        this._addEventListener('mouseup', this._onMouseUp.bind(this));
        this._addEventListener('mouseover', this._onMouseOver.bind(this));
        this._addEventListener('mouseout', this._onMouseOut.bind(this));

        this._addEventListener('touchstart', this._onTouchStart.bind(this));
        this._addEventListener('touchmove', this._onTouchMove.bind(this));
        this._addEventListener('touchend', this._onTouchEnd.bind(this));
        this._addEventListener('touchcancel', this._onTouchCancel.bind(this));

        let document = Platform.document();

        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keypress', this._onKeyPress.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    }

    private _removeEventListeners() {
        let canvas = this._renderer.getCanvas();
        let document = Platform.document();
        this._listenersMap.forEach((listener: any, key: string) => {
            if (key.indexOf('key') > -1) {
                document.removeEventListener(key, listener);
            } else {
                canvas.removeEventListener(key, listener);
            }
        });
        this._listenersMap.clear();
    }

    private _onMouseDown(e: MouseEvent) {
        
    }

    private _onMouseMove(e: MouseEvent) {
        if ((e.buttons & 0x01) > 0) {
            let del = 0.005;
            let moveX = e.movementX * del;
            let moveY = e.movementY * del;
            this._camera.rotateViewFromForward(moveX, moveY);
        }
    }

    private _onMouseUp(e: MouseEvent) {
        
    }

    private _onMouseOver(e: MouseEvent) {
        
    }

    private _onMouseOut(e: MouseEvent) {
        
    }

    private _onKeyDown(e: KeyboardEvent) {
        if (this._keylist.indexOf(e.keyCode) < 0) {
            this._keylist.push(e.keyCode);
        }
    }

    private _onKeyPress(e: KeyboardEvent) {
        
    }

    private _onKeyUp(e: KeyboardEvent) {
        let index = this._keylist.indexOf(e.keyCode);
        if (index > -1) {
            this._keylist.splice(index, 1);
        }
    }

    private _onTouchStart(e: TouchEvent) {
        
    }

    private _onTouchMove(e: TouchEvent) {
        
    }

    private _onTouchEnd(e: TouchEvent) {
        
    }

    private _onTouchCancel(e: TouchEvent) {
        
    }

    getRenderer() {
        return this._renderer;
    }

    getScene() {
        return this._scene;
    }

    getStage() {
        return this._stage;
    }

    getTimer() {
        return this._timer;
    }

    getCamera() {
        return this._camera;
    }

}