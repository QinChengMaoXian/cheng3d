import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject';
import { ShaderConst } from './ShaderConst';
import { Attribute, Buffer } from './Buffer';
import { Bounding } from '../bounding/Bounding';
import { AABB } from '../bounding/AABB'
import { Vector3 } from '../math/Vector3';

export class Geometry extends GraphicsObject {
    protected _drawParameter = undefined;
    protected _display: boolean = true;
    protected _bounding: Bounding;
    protected _buffers: Buffer[] = []; 
    protected _indexBuffer: Buffer;

    protected _posAttrib: Attribute;
    protected _posBuffer: Buffer;

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

        if (attribute === ShaderConst.position) {
            this._posAttrib = attrib;
            this._posBuffer = buffer;
            this.buildBounding();
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

            if (param.attribute === ShaderConst.position) {
                this._posAttrib = attrib;
                this._posBuffer = buffer;
                this.buildBounding();
            }
        });
    }

    public setIndexData(data, type: number = CGE.UNSIGNED_SHORT, usage: number = CGE.STATIC_DRAW) {
        let buffer = new Buffer();
        buffer.setData(data);
        buffer.setParameter(0, usage, type);
        this._indexBuffer = buffer;
        this.buildBounding();
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

    public getPosAttrib() {
        return this._posAttrib;
    }

    public getPosBuffer() {
        return this._posBuffer;
    }

    public getBuffers() {
        return this._buffers;
    }

    public getDrawParameter() {
        return this._drawParameter;
    }

    public getBounding() {
        if (!this._bounding) {
            this.buildBounding();
        }
        return this._bounding;
    }

    public buildBounding() {
        if (!this._posAttrib || !this._posBuffer) {
            return;
        }

        const buffer = this._posBuffer;
        const posAtt = this._posAttrib;
        const posData = buffer.getData();
        const stride = buffer.getStride() === 0 ? posAtt.num : (buffer.getStride() / posData.BYTES_PER_ELEMENT );
        const offset = posAtt.offset;
        const num = posAtt.num;

        let min: Vector3 = new Vector3();
        let max: Vector3 = new Vector3();
        min.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        max.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE)

        let temp: Vector3 = new Vector3();

        if (this._indexBuffer) {
            const idxData = this._indexBuffer.getData();
            const l = idxData.length;
            let index;
            for (let i = 0; i < l; i++) {
                index = idxData[i] * stride + offset;
                temp.set(posData[index], posData[index + 1], num === 2 ? 0 : posData[index + 2]);
                min.min(temp);
                max.max(temp);
            }
        } else {
            const l = posData.length / stride;
            let index;
            for (let i = 0; i < l; i++) {
                index = i * stride + offset;
                temp.set(posData[index], posData[index+1], num === 2 ? 0 : posData[index+2]);
                min.min(temp);
                max.max(temp);
            }
        }

        let aabb = new AABB()
        aabb.setMinAt(min);
        aabb.setMaxAt(max);

        this._bounding = aabb;
    }
}
