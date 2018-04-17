import * as CGE from './RendererParameter'
import { GraphicsObject } from './GraphicsObject'

export class Attribute {
    constructor(
        public attribType: number,
        public num: number,
        public offset: number,
        public type: number,
        public data?: any) {
    }
}

export class Buffer extends GraphicsObject  {
    private static TypeMap = {
        'Float32Array': CGE.FLOAT,
        'Uint32Array': CGE.UNSIGNED_INT,
        'Int32Array': CGE.INT,
        'Uint16Array': CGE.UNSIGNED_SHORT,
        'Int16Array': CGE.SHORT,
        'Uint8Array': CGE.UNSIGNED_BYTE,
        'Int8Array': CGE.BYTE,
    }

    protected _data: Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Int8Array;
    protected _type: number = CGE.FLOAT;
    protected _attributes: Attribute[];
    
    constructor() {
        super();
    }

    public setData(data: number[] | Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Int8Array, type: number = CGE.FLOAT) {
        this._data = data instanceof Array ? new Float32Array(data): data;
        this._type = type ? type: Buffer.TypeMap[data.constructor.name];
    }

    public getData(): Float32Array | Uint32Array | Int32Array | Uint16Array | Int16Array | Uint8Array | Int8Array {
        return this._data;
    }

    public addAttribute(attribute: Attribute) {
        this._attributes.push(attribute);
    }

    public addAttributeData(attribType: number, num: number, offset: number = 0, type?: number) {
        let attribute = new Attribute(attribType, num, offset, type ? type : this._type);
        this._attributes.push(attribute);
    }

    public setType(type: number) {
        this._type = type ? type : this._type;
    }

    public getType(): number {
        return this._type;
    }

    public getLength(): number {
        return this._data.length;
    }

    public getByteLength(): number {
        return this._data.byteLength;
    }

    public findAttribute(type: number): Attribute {
        let atts = this._attributes;
        let l = atts.length;

        for (let i = 0; i < l; i++) {
            let att = atts[i];
            if (att.attribType === type) {
                return att;
            }
        }
        return null;
    }
}
