import { Shadow } from "./Shadow";
import { Texture2D } from "../graphics/Texture2D";

export class DirectionShadow extends Shadow {

    protected _depthTex: Texture2D;
    protected _size: number = 512;
    public range: number = 800;

    constructor() {
        super();
    }

    public init(size: number = 512) {
        this._size = size;
        let tex = this._depthTex;
        if (!tex) {
            tex = new Texture2D();
            tex.setSize(size, size);
        }
    }

    public get depthTex(): Texture2D {
        return this._depthTex;
    }

    public set size(n: number) {
        this._size = n;
        this._depthTex && this._depthTex.setSize(n, n);
    }

    public get size(): number {
        return this._size;
    }


}
