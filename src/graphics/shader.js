import * as CGE from './rendererParameter.js';
import { VersionObject } from '../core/versionObject.js'

export class Shader extends VersionObject {
    constructor() {
        super();
        Object.assign(this, {
            _vertexShaderText: '',
            _fragmentShaderText: '',
            _requireAttributeLocations: new Map(),
            _requireMatrixNames: new Map(),
            _requireUniformNames: new Map(),
            _requireRenderLocarions: new Map(),
        });
    }

    setShaderText(vsText, fsText) {
        this._vertexShaderText = vsText;
        this._fragmentShaderText = fsText;
    }

    getVertexShaderText() {
        return this._vertexShaderText;
    }

    getFragmentShaderText() {
        return this._fragmentShaderText;
    }

    addAttribName(attribType, name) {
        this._requireAttributeLocations.set(attribType, name);
    }

    addAttribNames(array) {
        array.forEach(function(object){
            this._requireAttributeLocations.set(object.type, object.name);
        });
    }

    getAttribName(attribType) {
        return this._requireAttributeLocations.get(attribType);
    }

    getAttribNameMap() {
        return this._requireAttributeLocations;
    }

    _createUniformObject(name, type) {
        return {
            name: name,
            type: type || CGE.FLOAT_MAT4,
        };
    }

    addMatrixName(matrixType, name, dataType) {
        this._requireMatrixNames.set(matrixType, this._createUniformObject(name, dataType || CGE.FLOAT_MAT4));
    }

    getMatrixNameMap(uniformType) {
        return this._requireMatrixNames;
    }

    addUniformName(uniformType, name, dataType) {
        this._requireUniformNames.set(uniformType, this._createUniformObject(name, dataType));
    }

    addUniformNames(array) {
        array.forEach(function(object){
            this.addUniformName(object.type, object.name, object.type);
        });
    }

    getUniformName(uniformType) {
        return this._requireUniformNames.get(uniformType);
    }

    getUniformNameMap() {
        return this._requireUniformNames;
    }

    addTextureName(mapType, name) {
        this.addUniformName(mapType, name, CGE.UNSIGNED_INT);
    }

    addTextureNames(array) {
        array.forEach(function(object){
            this.addTextureName(object.type, object.name);
        });
    }

    getTextureName(mapType) {
        return this.getUniformName(mapType);
    }

    addRenderLocation(renderType, location) {
        this._requireRenderLocarions.set(renderType, location);
    }

    addRenderLocations(array) {
        array.forEach(function(object){
            this._requireRenderLocarions.set(object.type, object.location);
        });
    }

    getRenderLocation(renderType) {
        return this._requireRenderLocarions.get(renderType);
    }

    getRenderLocationMap() {
        return this._requireRenderLocarions;
    }
}
