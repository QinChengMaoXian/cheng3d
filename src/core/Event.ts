import { Base } from './Base';
import { Point2D } from '../math/Point2D';
import { Sprite } from '../ui/Sprite';

export class Event extends Base {
    static readonly CLICK = "click";
    
    static readonly MOUSE_ON = "mouse_on";
    static readonly MOUSE_MOVE = "mouse_move";
    static readonly MOUSE_END = "mouse_end";

    static readonly KEY_DOWN = "key_down";
    static readonly KEY_UP = "key_up";

    static readonly CLIENT_RESIZE = "client_resize";

    static readonly LOOP_FRAME = "loop_frame";

    protected _type: string;

    protected _x: number;
    protected _y: number;

    protected _touchId: number;
    protected _touchs: Point2D[];
    
    protected _currectSprite: Sprite;
    protected _baseSprite: Sprite;

    protected _native: any;

    _func;
    constructor() {
        super();
        this._func = undefined;
    }

    setFunc(func) {
        this._func = func;
    }

    update(delta) {
        if (!this._func) 
            return;
        this._func(delta);
    }

    get type(): string {
        return this.type;
    }

    get stageX(): number {
        return this._x;
    }

    get stageY(): number {
        return this._y;
    }

    static createFromFunc(func) {
        let event = new Event();
        event.setFunc(func);
        return event;
    }
}
