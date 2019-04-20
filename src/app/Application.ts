import { Scene } from "../object/Scene";
import { Stage } from "../ui/Stage";
import { WebGLRenderer } from "../renderer/WebGLRenderer";
import { Timer } from "../core/Timer";
import { Object3D } from "../object/Object3D";
import { Platform } from "../platform/Platform";
import { Camera } from "../object/Camera";
import { Event } from "../core/Event";
import { EventDispatcher } from "../core/EventDispatcher";
import { Sprite } from "../ui/Sprite";

/**
 * 中心控制类
 * 控制renderer,scene,uistage初始化。
 * 所有输入事件的入口。
 * 控制渲染循环开始与结束。
 */
export class Application extends EventDispatcher {

    /** 是否为慢速渲染默认60帧，当这个设置为true时，降低为30帧 */
    public slow: boolean = false;
    /** 停止标签，为true时，下一帧将停止循环 */
    private _stop: boolean = false;
    /** 帧数计数，并非为渲染帧数，逻辑帧数 */
    private _frameCount: number = 0;
    /** 帧间隔时间 */
    private _lastTime: number;
    /** requestAnimationFrame返回的id */
    private _frameId: number = -1;
    /** 定时刷新器对象 */
    protected _timer: Timer;
    /** 2d stage对象 */
    protected _stage: Stage;
    /** 3d scene对象 */
    protected _scene: Scene;
    /** 一个特殊的obj3d对象 */
    private _obj3d: Object3D;
    /** 渲染器对象 */
    protected _renderer: WebGLRenderer;
    /** 默认相机对象 */
    protected _camera: Camera;
    /** 监听系统环境事件的缓存 */
    protected _listenersMap: Map<string, any>;
    /** 动画循环的引用 */
    private _loopBindThis;

    /** 当前指针划过的spr队列 */
    private _cacheUIs: Sprite[] = [];
    /** 指针按下的队列 */
    private _preClickUIs: Sprite[] = [];

    constructor() {
        super();
    }

    /**
     * 通过长宽初始化全部
     * @param width 
     * @param height 
     */
    public init(width: number, height: number) {
        this._timer = new Timer();

        this._stage = new Stage();
        this._stage.setSize(width, height);

        this._scene = new Scene();

        this._obj3d = new Object3D();
        this._obj3d.addChild(this._scene);

        this._camera = new Camera(width, height);
        // let w = Math.floor(width / 2.0);
        // let h = Math.floor(height / 2.0);
        // this._camera.enableOrthographicMode(-w, w, -h, h, 1, 2000);

        this._renderer = new WebGLRenderer();
        this._renderer.init(width, height);

        this._listenersMap = new Map();
        this._addEventListeners();

        this._loopBindThis = this._loop.bind(this);
    }

    /**
     * 重新设置长宽
     * @param width
     * @param height 
     */
    public setSize(width: number, height: number) {
        this._camera.resize(width, height);
        this._stage.setSize(width, height);
        this._renderer.setSize(width, height);
    }

    /**
     * app启动
     */
    public start() {
        this._stop = false;
        this._startLoop();
    }

    /**
     * app停止
     */
    public stop() {
        this._stop = true;
        Platform.cancelAnimationFrame(this._frameId);
    }

    /**
     * 启动循环
     */
    private _startLoop() {
        this._lastTime = Platform.now();
        this._loop();
    }

    /**
     * 主循环
     */
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

    /**
     * 每帧更新
     * @param delta 间隔毫秒
     */
    private _update(delta: number) {
        // 场景更新前。
        this._timer.preUpdate(delta);
        this._scene.update(delta);
        this._stage.update(delta);
        // 当前相机可以不在场景节点中。
        this._camera.update(delta);
        // 场景更新后。
        this._timer.lateUpdate(delta);
    }

    /**
     * 渲染场景
     */
    private _render() {
        // 渲染3d场景
        this._renderer.renderScene(this._scene, this._scene.getActiveCamera() || this._camera);
        // todo 渲染2dUI
    }

    /**
     * 添加系统监听的方法
     * @param key 
     * @param listener 
     */
    private _addEventListener(key: string, listener: any) {
        let canvas = this._renderer.getCanvas();
        let document = Platform.document();
        // document.addEventListener(key, listener);
        if (key.indexOf('key') > -1) {
            document.addEventListener(key, listener);
        } else {
            canvas.addEventListener(key, listener);
        }
        this._listenersMap.set(key, listener);
    }

    /**
     * 添加所有的系统监听
     * 其中mouse与touch相关的添加在canvas上，key相关的只能添加在document上。
     */
    private _addEventListeners() {
        this._addEventListener('mousedown', this._onMouseEvent.bind(this));
        this._addEventListener('mousemove', this._onMouseEvent.bind(this));
        this._addEventListener('mouseup', this._onMouseEvent.bind(this));
        this._addEventListener('mouseover', this._onMouseEvent.bind(this));
        this._addEventListener('mouseout', this._onMouseEvent.bind(this));

        this._addEventListener('touchstart', this._onTouchStart.bind(this));
        this._addEventListener('touchmove', this._onTouchMove.bind(this));
        this._addEventListener('touchend', this._onTouchEnd.bind(this));
        this._addEventListener('touchcancel', this._onTouchCancel.bind(this));

        this._addEventListener('blur', this._onBlur.bind(this));

        let document = Platform.document();

        document.addEventListener('keydown', this._onKeyboardEvent.bind(this));
        document.addEventListener('keypress', this._onKeyboardEvent.bind(this));
        document.addEventListener('keyup', this._onKeyboardEvent.bind(this));
    }

    /**
     * 移除所有的系统监听
     */
    private _removeEventListeners() {
        let canvas = this._renderer.getCanvas();
        let document = Platform.document();
        this._listenersMap.forEach((listener: any, key: string) => {
            // document.removeEventListener(key, listener);
            if (key.indexOf('key') > -1) {
                document.removeEventListener(key, listener);
            } else {
                canvas.removeEventListener(key, listener);
            }
        });
        this._listenersMap.clear();
    }

    /**
     * 全局丢失焦点
     */
    private _onBlur() {
        console.log('全局丢失焦点');
    }

    /**
     * 鼠标事件解析
     * @param e 
     */
    private _onMouseEvent(e: MouseEvent) {
        let event = new Event(e);
        this._checkStagePick(event);
        this._postMouseEvent(event);
    }

    private _onTouchStart(e: TouchEvent) {
        
    }

    private _onTouchMove(e: TouchEvent) {
        
    }

    private _onTouchEnd(e: TouchEvent) {
        
    }

    private _onTouchCancel(e: TouchEvent) {
        
    }

    private _onKeyboardEvent(e: KeyboardEvent) {
        let event = new Event(e);

        this._cacheUIs.forEach(sp => {
            let type = Event.TypeMap[e.type];
            sp.event(type, [event]);
        })
    }

    /**
     * 鼠标事件后处理
     * 判定click、mouse out以及mouse over等;
     * @param e 
     */
    protected _postMouseEvent(e: Event) {
        let type = e.type;
        let path = e.path;

        let caches = this._cacheUIs;
        
        e.type = Event.MOUSE_OUT;
        caches.forEach(sp => {
            let idx = path.indexOf(sp);
            if (idx < 0) {
                sp.event(Event.MOUSE_OUT, [e]);
            }
        });

        e.type = Event.MOUSE_OVER;
        let newCache = [];
        path.forEach(sp => {
            let idx = caches.indexOf(sp);
            if (idx < 0) {
                sp.event(Event.MOUSE_OVER, [e]);
            }
            newCache.push(sp);
        });
        this._cacheUIs = newCache;

        if (type === Event.MOUSE_DOWN) {
            let newUIs = [];
            path.forEach(sp => {
                newUIs.push(sp);
            });
            this._preClickUIs = newUIs;
        } else {
            let preClicks = this._preClickUIs;
            let newUIs = [];
            preClicks.forEach(sp => {
                let idx = path.indexOf(sp);
                if (idx > -1) {
                    newUIs.push(sp);
                }
            })
            this._preClickUIs = newUIs;
        }

        e.type = Event.CLICK;
        if (type === Event.MOUSE_UP) {
            let preClicks = this._preClickUIs;
            preClicks.forEach(sp => {
                sp.event(Event.CLICK, [e]);
            });
            this._preClickUIs = [];
        }

        e.type = type;
    }

    protected _checkStagePick(e: Event) {
        let stage = this._stage;
        let x = e.stageX;
        let y = e.stageY;
        stage.checkChildPick(x, y, e);
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

    /**
     * 销毁app
     */
    destroy() {
        this._removeEventListeners();
    }
}