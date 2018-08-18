import { Handler } from "../util/Handler";

export class TimerHandler {
    public handler: Handler;
    public time: number;
    public curTime: number;
    public once: boolean = false;
    public frame: boolean = false;

    public clearUp() {
        if (this.handler) {
            this.handler.clear();
        }
    }
    
    static create() {
        return new TimerHandler();
    }
}

export class Timer {

    public frameTime: number = 0;

    protected _loops: Map<any, Map<any, TimerHandler>>;

    constructor() {
        this._loops = new Map();
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

    public remove(celler: any, method: any) {
        let handlerMap = this._loops.get(celler);
        if (!handlerMap) return;

        let handler = handlerMap.get(method);
        if (handler) {
            handler.clearUp();
        }
        handlerMap.delete(method);
    }

    protected _loop(once: boolean, frame: boolean, time: number, celler: any, method: any, args?: any[]) {
        let handler = TimerHandler.create();
        handler.handler = new Handler(celler, method, args, false);
        handler.once = once;
        handler.frame = frame;
        handler.time = time;
        handler.curTime = time;

        let loops = this._loops;

        let handlerMap = loops.get(celler);
        if (!handlerMap) {
            handlerMap = new Map();
            loops.set(celler, handlerMap);
        }

        handlerMap.set(method, handler);
    }

    public update(delta: number) {
        this.frameTime = delta;
        const loops = this._loops;
        loops.forEach((handlerMap: Map<any, TimerHandler>, celler: any) => {
            handlerMap.forEach((handler: TimerHandler, method: any) => {
                if (handler.frame) {
                    handler.curTime -= 1;
                } else {
                    handler.curTime -= delta;
                }
                if (handler.curTime <= 0) {
                    handler.handler.run();
                    if (handler.once) {
                        handlerMap.delete(method);
                        handler.clearUp();
                    } else {
                        handler.curTime = handler.time;
                    }
                }
            });
            if (handlerMap.size === 0) {
                loops.delete(celler);
            }
        });
    }

}
