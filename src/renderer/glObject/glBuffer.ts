import { glObject } from './glObject'
import { glDraw, glDrawWithIndex } from './glDraw'

export class glBuffer extends glObject {
    _vbos = [];
    _ibo = undefined;
    _draw = undefined;
    // TODO: remove this;
    _geometry = undefined;

    constructor() {
        super();
    }

    _createBufferFromData(gl, target, data, usage) {
        let buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, usage);
        gl.bindBuffer(target, null);
        return buffer;
    }

    generateFromGeometry(gl, geometry) {
        // TODO: make this function more simple;
        // let version = geometry.getUpdateVersion();
        let attributeDatas = geometry.getAttributeDatas();
        let indexData = geometry.getIndexData();
        let drawParameter = geometry.getDrawParameter();

        if (attributeDatas.length === 0) {
            return undefined;
        }

        this._geometry = geometry;
        
        attributeDatas.forEach(function(attribute){
            let vbo = this._createBufferFromData(gl, gl.ARRAY_BUFFER, attribute.data, attribute.usage);
            this._vbos.push(vbo);
        }.bind(this));

        if (geometry._indexData) {
            this._ibo = this._createBufferFromData(gl, gl.ELEMENT_ARRAY_BUFFER, indexData.data, indexData.usage);
            this._draw = new glDrawWithIndex(drawParameter.mode, drawParameter.offset, drawParameter.count, indexData.type, this._ibo);
        } else {
            this._draw = new glDraw(drawParameter.mode, drawParameter.offset, drawParameter.count, 0);
        }
        
        // this.setLocalVersion(version);
        return this;
    }

    getGeometry() {
        return this._geometry;
    }

    getVbos() {
        return this._vbos;
    }

    getIbo() {
        return this._ibo;
    }

    getDraw() {
        return this._draw;
    }

    draw(gl) {
        this._draw.apply(gl);
    }
}
