import { Handler } from "../util/Handler";
import { ObjectPool } from "../util/ObjectPool";

export class TimerHandler {
    public static pool = new ObjectPool<TimerHandler>(TimerHandler, 10);

    public handler: Handler = new Handler(null, null);
    public time: number;
    public curTime: number;
    public once: boolean = false;
    public frame: boolean = false;

    protected clearUp() {
        this.handler.clear();
    }
    
    static create() {
        return TimerHandler.pool.create();
    }

    static recovery(handler: TimerHandler) {
        handler.clearUp();
        TimerHandler.pool.recovery(handler);
    }
}

export class Timer {

    public frameTime: number = 0;

    protected _preMap: Map<any, Map<any, TimerHandler>>;
    protected _lateMap: Map<any, Map<any, TimerHandler>>;

    constructor() {
        this._preMap = new Map();
        this._lateMap = new Map();
    }

    public once(time: number, celler: any, method: any, args?: any[]) {
        this._loop(true, false, time, celler, method, args);
    }

    public loop(time: number, celler: any, method: any, args?: any[]) {
        this._loop(false, false, time, celler, method, args);
    }

    public frameOnce(time: number, celler: any, method: any, args?: any[]) {
        this._loop(true, true, time, celler, method, args);
    }

    public frameLoop(time: number, celler: any, method: any, args?: any[]) {
        this._loop(false, true, time, celler, method, args);
    }

    public lateOnce(time: number, celler: any, method: any, args?: any[]) {
        this._loop(true, false, time, celler, method, args, true);
    }

    public lateLoop(time: number, celler: any, method: any, args?: any[]) {
        this._loop(false, false, time, celler, method, args, true);
    }

    public lateFrameOnce(time: number, celler: any, method: any, args?: any[]) {
        this._loop(true, true, time, celler, method, args, true);
    }

    public lateFrameLoop(time: number, celler: any, method: any, args?: any[]) {
        this._loop(false, true, time, celler, method, args, true);
    }

    protected _remove(celler: any, method: any, map: Map<any, Map<any, TimerHandler>>) {
        let handlerMap = map.get(celler);
        if (!handlerMap) return;
        let handler = handlerMap.get(method);
        if (!handler) return;
        TimerHandler.recovery(handler);
        handlerMap.delete(method);
        if (handlerMap.size <= 0) {
            map.delete(handlerMap);
        }
    }

    public remove(celler: any, method: any) {
        this._remove(celler, method, this._preMap);
        this._remove(celler, method, this._lateMap);
    }

    protected _clearCeller(celler: any, map: Map<any, Map<any, TimerHandler>>) {
        let handlerMap = map.get(celler);
        if (!handlerMap) return;
        handlerMap.forEach((handler: TimerHandler, method: any) => {
            TimerHandler.recovery(handler);
            handlerMap.delete(method);
        });
        map.delete(celler);
    }

    public clearCeller(celler: any) {
        this._clearCeller(celler, this._preMap);
        this._clearCeller(celler, this._lateMap);
    }

    protected _clearAll(map: Map<any, Map<any, TimerHandler>>) {
        map.forEach((handlerMap: Map<any, TimerHandler>, celler: any) => {
            handlerMap.forEach((handler: TimerHandler, method: any) => {
                TimerHandler.recovery(handler);
                handlerMap.delete(method);
            });
            map.delete(celler);
        });
    }

    public clearAll() {
        this._clearAll(this._preMap);
        this._clearAll(this._lateMap);
    }

    protected _loop(once: boolean, frame: boolean, time: number, celler: any, method: any, args?: any[], late: boolean = false) {
        let handler = TimerHandler.create();
        handler.handler.setTo(celler, method, args, false);
        handler.once = once;
        handler.frame = frame;
        handler.time = time;
        handler.curTime = time;

        let map = late ? this._lateMap: this._preMap;
        let handlerMap = map.get(celler);
        if (!handlerMap) {
            handlerMap = new Map();
            map.set(celler, handlerMap);
        }
        handlerMap.set(method, handler);
    }

    protected _update(delta:number, map: Map<any, Map<any, TimerHandler>>) {
        map.forEach((handlerMap: Map<any, TimerHandler>, celler: any) => {
            handlerMap.forEach((handler: TimerHandler, method: any) => {
                handler.curTime -= handler.frame ? 1 : delta;
                if (handler.curTime > 0) return;
                handler.handler.run();
                if (handler.once) {
                    TimerHandler.recovery(handler);
                    handlerMap.delete(method);
                } else {
                    handler.curTime = handler.time + handler.curTime;
                }
            });
            if (handlerMap.size === 0) {
                map.delete(celler);
            }
        });
    }

    public preUpdate(delta: number) {
        this.frameTime = delta;
        this._update(delta, this._preMap);
    }

    public lateUpdate(delta: number) {
        this._update(delta, this._lateMap);
    }
}
