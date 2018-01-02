import * as CGE from './RendererParameter'
import { GraphicsObject } from './GraphicsObject'

class Attribute {
    constructor(
        public attribType: number,
        public num: number,
        public offset: number,
        public type: number) {

    }
}

export class Buffer extends GraphicsObject  {
    protected _data: number[] | Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Int8Array;
    protected _type: number = CGE.FLOAT;
    protected _attribute: Attribute[];
    
    constructor() {
        super();
    }

    public setData(data: number[] | Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Int8Array, type?: number) {
        if (data instanceof Array) {
            data = new Float32Array(data);
        }
        this._data = data;

        this._type = type;
    }

    public addAttribute(attribType: number, num: number, offset: number = 0, type?: number) {
        let attribute = new Attribute(attribType, num, offset, type ? type : this._type);
        this._attribute.push(attribute);
    }
}