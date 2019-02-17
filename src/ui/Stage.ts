import { Sprite } from "./Sprite";
import { Event } from "../core/Event";

export interface IRenderResult {
    img: string;
    start: number;
    length: number;
}

export interface IResultObj {
    data: Float32Array;
    indices: Uint16Array;
    dataCount: number;
    indexCount: number;
    result: IRenderResult[];
}

export class Stage extends Sprite {

    private _data: Float32Array = new Float32Array(65535);
    private _indices: Uint16Array = new Uint16Array(65535 * 2);

    

    constructor() {
        super();
        this._isThrough = true;
    }

    public createRenderMesh() {

        let resultObj: IResultObj = {
            data: this._data,
            indices: this._indices,
            dataCount: 0,
            indexCount: 0,
            result: [],
        }
        
        this._createRenderMesh(this, resultObj);

        return resultObj;
    }

    protected _createRenderMesh(sprite: Sprite, resultObj: IResultObj) {
        if (sprite.isRender()) {
            let data = sprite.getStageData();
        }
        
        let children = sprite.getChildren();
        let l = children.length;

        for (let i = 0; i < l; i++) {
            let child = <Sprite>children[i];

            this._createRenderMesh(child, resultObj);
        }
    }
}

