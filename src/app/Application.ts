
import { Scene } from "../object/Scene";
import { Stage } from "../ui/Stage";
import { WebGLRenderer } from "../renderer/WebGLRenderer";
import { Timer } from "../core/Timer";
import { Object3D } from "../object/Object3D";
import { Platform } from "../platform/Platform";
import { Camera } from "../object/Camera";

export class Application {

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

    constructor() {
        
    }

    public init(width: number, height: number) {
        this._timer = new Timer();

        this._stage = new Stage();
        this._stage.setSize(width, height);

        this._scene = new Scene();

        this._obj3d = new Object3D();
        this._obj3d.addChild(this._scene);

        this._camera = new Camera(width, height);
        this._scene.addChild(this._camera);

        this._renderer = new WebGLRenderer();
        this._renderer.init(width, height);

        this._addEventListener();
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
        this._frameId = Platform.requestAnimationFrame(this._loop.bind(this));

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
        this._render(delta);
    }

    private _update(delta: number) {
        this._timer.update(delta);
        this._scene.update(delta);
        this._stage.update(delta);
    }

    private _render(delta: number) {
        this._renderer.renderScene(this._obj3d, this._camera);
    }

    private _addEventListener() {
        let canvas = this._renderer.getCanvas();

        canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
        canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
        canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
        canvas.addEventListener('mouseover', this._onMouseOver.bind(this));
        canvas.addEventListener('mouseout', this._onMouseOut.bind(this));

        canvas.addEventListener('keydown', this._onKeyDown.bind(this));
        canvas.addEventListener('keypress', this._onKeyPress.bind(this));
        canvas.addEventListener('keyup', this._onKeyUp.bind(this));

        canvas.addEventListener('touchstart', this._onTouchStart.bind(this));
        canvas.addEventListener('touchmove', this._onTouchMove.bind(this));
        canvas.addEventListener('touchend', this._onTouchEnd.bind(this));
        canvas.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    }

    private _removeEventListener() {
        let canvas = this._renderer.getCanvas();

        canvas.removeEventListener('mousedown', this._onMouseDown.bind(this));
        canvas.removeEventListener('mousemove', this._onMouseMove.bind(this));
        canvas.removeEventListener('mouseup', this._onMouseUp.bind(this));
        canvas.removeEventListener('mouseover', this._onMouseOver.bind(this));
        canvas.removeEventListener('mouseout', this._onMouseOut.bind(this));

        canvas.removeEventListener('keydown', this._onKeyDown.bind(this));
        canvas.removeEventListener('keypress', this._onKeyPress.bind(this));
        canvas.removeEventListener('keyup', this._onKeyUp.bind(this));

        canvas.removeEventListener('touchstart', this._onTouchStart.bind(this));
        canvas.removeEventListener('touchmove', this._onTouchMove.bind(this));
        canvas.removeEventListener('touchend', this._onTouchEnd.bind(this));
        canvas.removeEventListener('touchcancel', this._onTouchCancel.bind(this));
    }

    private _onMouseDown(e: MouseEvent) {
        
    }

    private _onMouseMove(e: MouseEvent) {
        
    }

    private _onMouseUp(e: MouseEvent) {
        
    }

    private _onMouseOver(e: MouseEvent) {
        
    }

    private _onMouseOut(e: MouseEvent) {
        
    }

    private _onKeyDown(e: KeyboardEvent) {

    }

    private _onKeyPress(e: KeyboardEvent) {

    }

    private _onKeyUp(e: KeyboardEvent) {

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
        return this._stage;
    }

    getCamera() {
        return this._camera;
    }

}