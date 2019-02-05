import { Base } from './Base';
import { Point2 } from '../math/Point2';
import { Sprite } from '../ui/Sprite';

export class Event extends Base {
    static readonly CLICK = "click";
    
    static readonly MOUSE_DOWN = "mouse_on";
    static readonly MOUSE_MOVE = "mouse_move";
    static readonly MOUSE_UP = "mouse_end";
    static readonly MOUSE_OVER = "mouse_over";
    static readonly MOUSE_OUT = "mouse_out";

    static readonly KEY_DOWN = "key_down";
    static readonly KEY_UP = "key_up";
    static readonly KEY_CLICK = "key_click";

    static readonly CLIENT_RESIZE = "client_resize";

    static readonly LOOP_FRAME = "loop_frame";

    protected _type: string;

    protected _x: number;
    protected _y: number;

    protected _touchId: number;
    protected _touchs: Point2[];
    
    protected _currectSprite: Sprite;
    protected _baseSprite: Sprite;

    protected _native: any;

    constructor() {
        super();
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
}
