import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject';
import { GraphicsConst } from './GraphicsConst';
import { Attribute, Buffer } from './Buffer';
import { Bounding } from '../bounding/Bounding';

export class Geometry extends GraphicsObject {
    protected _drawParameter = undefined;
    protected _display: boolean = true;
    protected _bounding: Bounding;
    protected _buffers: Buffer[] = []; 
    protected _position: Attribute;
    protected _indexBuffer: Buffer;

    constructor() {
        super();
    }

    public addSingleAttribute(name, attribute, num, type, data, usage = CGE.STATIC_DRAW) {
        let buffer = new Buffer();
        let attrib = new Attribute(attribute, num, 0, type);
        buffer.addAttribute(attrib);
        buffer.setData(data);
        buffer.setParameter(0, usage, type);
        this._buffers.push(buffer);

        if (attribute === GraphicsConst.position) {
            this._position = attrib;
            this._position.data = data;
        }
    }

    public addMultiAttribute(attributeParameters, type, stride, data, usage = CGE.STATIC_DRAW) {
        let buffer = new Buffer();
        
        buffer.setData(data);
        this._buffers.push(buffer);
        buffer.setParameter(stride, usage, type);

        attributeParameters.forEach(param => {
            let attrib = new Attribute(param.attribute, param.num, param.offset, param.type);
            buffer.addAttribute(attrib);
        });
    }

    public setIndexData(data, type: number = CGE.UNSIGNED_SHORT, usage: number = CGE.STATIC_DRAW) {
        let buffer = new Buffer();
        buffer.setData(data);
        buffer.setParameter(0, usage, type);
        this._indexBuffer = buffer;
    }

    public getIndexBuffer() {
        return this._indexBuffer;
    }

    public setDrawParameter(count, mode?, offset?) {
        this._drawParameter = {
            mode: mode || CGE.TRIANGLES,
            count: count || 0,
            offset: offset || 0,
        };
    }

    public getBuffers() {
        return this._buffers;
    }

    public getDrawParameter() {
        return this._drawParameter;
    }

    public buildBounding() {

    }
}
