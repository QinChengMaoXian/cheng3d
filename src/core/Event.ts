import { Base } from './Base';
import { Point2 } from '../math/Point2';
import { Sprite } from '../ui/Sprite';


export class Event extends Base {

    static readonly TypeMap = {
        'mousedown': 'mouse_down',
        'mousemove': 'mouse_move',
        'mouseup': 'mouse_up',
        'mouseover' : 'mouse_over',
        'mouseout' : 'mouse_out',
        'keydown': 'key_down',
        'keyup': 'key_up',
        'keypress': 'key_press',
        'blur': 'on_blur',
    }

    /** 鼠标点击事件 */
    static readonly CLICK = "click";
    /** 鼠标按键按下 */
    static readonly MOUSE_DOWN = "mouse_down";
    /** 鼠标移动 */
    static readonly MOUSE_MOVE = "mouse_move";
    /** 鼠标按键抬起 */
    static readonly MOUSE_UP = "mouse_up";
    /** 鼠标物体 */
    static readonly MOUSE_OVER = "mouse_over";
    /** 鼠标离开物体 */
    static readonly MOUSE_OUT = "mouse_out";

    /** 键盘按下 */
    static readonly KEY_DOWN = "key_down";
    /** 键盘抬起 */
    static readonly KEY_UP = "key_up";
    /** 键盘保持 */
    static readonly KEY_PRESS = "key_press";

    /** 重置界面大小 */
    static readonly CLIENT_RESIZE = "client_resize";

    /** 渲染器重置大小 */
    static readonly RENDERER_RESIZE = "renderer_resize";

    static readonly DESTROTY = "destroy";

    /**  */
    static readonly LOOP_FRAME = "loop_frame";

    static readonly ON_BLUR = "on_blur";

    protected _type: string;

    protected _x: number;
    protected _y: number;

    protected _movementX: number;
    protected _movementY: number;

    protected _touchId: number;
    protected _touchs: Point2[];
    
    protected _currectSprite: Sprite;
    protected _baseSprite: Sprite;

    protected _ismousedown: boolean;

    public key: string;
    public keyCode: number;

    public path: Sprite[] = [];

    public native: any;

    public stopPropagation: boolean;

    public altKey: boolean;
    public ctrlKey: boolean;
    public shiftKey: boolean;
    public metaKey: boolean;

    constructor(e?: MouseEvent | KeyboardEvent) {
        super();

        if (e instanceof MouseEvent) {
            this._x = e.offsetX;
            this._y = e.offsetY;
            this._movementX = e.movementX;
            this._movementY = e.movementY;
            this._setType(e.type);
        } else if (e instanceof KeyboardEvent) {
            this.key = e.key;
            this.keyCode = e.keyCode;
            this._setType(e.type);
        }

        this.altKey = e.altKey;
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.metaKey = e.metaKey;

        this.native = e;
    }

    private _setType(type: string) {
       this._type = Event.TypeMap[type];
    }

    set type(t: string) {
        this._type = t;
    }

    get type(): string {
        return this._type;
    }

    get stageX(): number {
        return this._x;
    }

    get stageY(): number {
        return this._y;
    }

    get movementX(): number {
        return this._movementX;
    }

    get movementY(): number {
        return this._movementY;
    }
}
