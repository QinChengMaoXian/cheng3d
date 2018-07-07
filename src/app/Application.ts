
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

    get renderer() {
        return this._renderer;
    }

    get scene() {
        return this._scene;
    }

    get stage() {
        return this._stage;
    }

    get timer() {
        return this._stage;
    }

    get camera() {
        return this._camera;
    }

}