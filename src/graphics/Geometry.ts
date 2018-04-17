import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject';
import { GraphicsConst } from './GraphicsConst';
import { Attribute, Buffer } from './Buffer';
import { Bounding } from '../bounding/Bounding';

export class Geometry extends GraphicsObject {
    protected _attributeDatas = [];
    protected _indexData = undefined;
    protected _drawParameter = undefined;
    protected _display: boolean = true;
    protected _bounding: Bounding;
    protected _buffers: Buffer[] = []; 
    protected _position: Attribute;

    constructor() {
        super();
    }

    public addSingleAttribute(name, attribute, num, type, data, usage?) {
        let buffer = new Buffer();
        let attrib = new Attribute(attribute, num, 0, type);
        buffer.addAttribute(attrib);
        buffer.setData(data);
        this._buffers.push(buffer);

        if (attribute === GraphicsConst.position) {
            this._position = attrib;
            this._position.data = data;
        }

        let attributeData = {
            data: data,
            size: 1,
            type: type,
            stride: 0,
            attribPointers: [],
            usage: usage || CGE.STATIC_DRAW,
        };
        attributeData.attribPointers.push({
            name: name,
            attribute: attribute,
            num: num,
            offset: 0,
        });
        this._attributeDatas.push(attributeData);
    }

    public addMultiAttribute(attributeParameters, type, stride, data, usage = CGE.STATIC_DRAW) {
        let buffer = new Buffer();
        
        buffer.setData(data);
        this._buffers.push(buffer);

        let attributeData = {
            usage: usage,
            data: data,
            size: attributeParameters.length,
            type: type,
            stride: stride,
            attribPointers: [],
        };
        attributeParameters.forEach(function(param) {
            let attrib = new Attribute(param.attribute, param.num, param.offset, param.type);
            buffer.addAttribute(attrib);

            if (param.attribute === GraphicsConst.position) {
                if (this._position) {
                    delete this._position.data;
                }
                this._position = attrib;
                this._position.data = data;
            }

            attributeData.attribPointers.push({
                name: param.name,
                attribute: param.attribute,
                num: param.num,
                offset: param.offset,
            });
        });
        this._attributeDatas.push(attributeData);
    }

    public getAttributeDatas() {
        return this._attributeDatas;
    }

    public setIndexData(data, type?, usage?) {
        this._indexData = {
            data: data,
            type: type || CGE.UNSIGNED_SHORT,
            usage: usage || CGE.STATIC_DRAW,
        };
    }

    public getIndexData() {
        return this._indexData;
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
