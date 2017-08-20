import * as CGE from './RendererParameter'
import { GraphicsObject } from './GraphicsObject'

export class Geometry extends GraphicsObject {
    _attributeDatas = [];
    _indexData = undefined;
    _drawParameter = undefined;

    constructor() {
        super();
    }
    
    createAttributeParam() {
        return {
            data: undefined,
            size: 0,
            type: undefined,
            stride: 0,
            attribPointers: [],
            usage: undefined,
        };
    }

    addSingleAttribute(name, attribute, num, type, data, usage?) {
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

    addMultiAttribute(attributeParameters, type, stride, data, usage = CGE.STATIC_DRAW) {
        let attributeData = {
            usage: usage,
            data: data,
            size: attributeParameters.length,
            type: type,
            stride: stride,
            attribPointers: [],
        };
        attributeParameters.forEach(function(param) {
            attributeData.attribPointers.push({
                name: param.name,
                attribute: param.attribute,
                num: param.num,
                offset: param.offset,
            });
        });
        this._attributeDatas.push(attributeData);
    }

    getAttributeDatas() {
        return this._attributeDatas;
    }

    setIndexData(data, type?, usage?) {
        this._indexData = {
            data: data,
            type: type || CGE.UNSIGNED_SHORT,
            usage: usage || CGE.STATIC_DRAW,
        };
    }

    getIndexData() {
        return this._indexData;
    }

    setDrawParameter(count, mode?, offset?) {
        this._drawParameter = {
            mode: mode || CGE.TRIANGLES,
            count: count || 0,
            offset: offset || 0,
        };
    }

    getDrawParameter() {
        return this._drawParameter;
    }
}
