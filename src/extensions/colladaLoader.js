import { Texture2D } from '../graphics/texture2D.js'
import { TextureCube } from '../graphics/textureCube.js'
import { Geometry } from '../graphics/geometry.js'

import { Entity } from '../object/entity.js'
import { Transform } from '../object/transform.js'
import { Component } from '../object/component.js'
import { AttribType } from '../graphics/graphicsTypes'
import { FLOAT } from '../graphics/rendererParameter'

import { Logger } from '../core/base'

export class ColladaLoader {
    constructor() {
        this._loadState = ColladaLoader.State.NONE;
        this._entity = undefined;
    }

    getLoadState() {
        return this.loadState;
    }

    getEntity() {
        return this.loadState === ColladaLoader.State.LOAD_COMPLETE ? this.entity : undefined;
    }

    load(url, callback) {
        this._changeState(ColladaLoader.State.LOADING_FILE);
        new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        let document = xmlHttp.responseXML;
                        // this._changeState(ColladaLoader.State.CREATE_ENTITY);
                        // callback('document', document);
                        // this._entity = this._loadVertices(document);
                        // if (!this._entity) {
                        //     this._changeState(ColladaLoader.State.LOAD_ERROR);
                        //     callback('error', 'file error');
                        // }
                        // this._changeState(ColladaLoader.State.LOAD_COMPLETE);
                        // resolve(this._entity);
                        resolve(xmlHttp.responseXML);
                    } else {
                        reject(new Error(this.statusText));
                    }
                }
            }
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        }).then((document) => {
            this._changeState(ColladaLoader.State.CREATE_ENTITY);
            callback('document', document);
            this._entity = this._loadVertices(document);
            if (!this._entity) {
                this._changeState(ColladaLoader.State.LOAD_ERROR);
                callback('error', 'file error');
            }
            this._changeState(ColladaLoader.State.LOAD_COMPLETE);
            callback('entity', this._entity);
        }).catch((error) => {
            this._changeState(ColladaLoader.State.LOAD_ERROR);
            callback('error', error);
        });
    }

    _changeState(state) {
        this.loadState = state;
    }

    _loadFromDoc(doc) {

    }

    _loadVertices(doc) {
        let sourceCheck = (srcDoc) => {
            if (!srcDoc) {
                return undefined;
            }

            let id = srcDoc.id;
            let float_array = srcDoc.getElementsByTagName('float_array')[0];
            let accessor = srcDoc.getElementsByTagName('accessor')[0];

            if (!float_array || !accessor) {
                return undefined;
            }

            let count = accessor.getAttribute('count');
            let stride = accessor.getAttribute('stride');

            if (!count || !stride) {
                return undefined;
            }

            // todo: check data type;
            let dataArray = float_array.textContent.split(' ');
            // let floatArray = new Float32Array(dataArray);

            return {
                id: id,
                count: count,
                stride: parseInt(stride),
                array: dataArray,
                type: FLOAT, //todo:
            }
        };

        let verticesCheck = (vertDoc) => {
            if (!vertDoc) {
                return undefined;
            }

            let input = vertDoc.getElementsByTagName('input')[0];
            if (!input) {
                return undefined;
            }
            let semantic = input.getAttribute('semantic');
            let sourceId = input.getAttribute('source');

            if (!semantic || !sourceId) {
                return undefined;
            }

            sourceId = sourceId[0] === '#' ? sourceId.substr(1) : sourceId;

            let source = doc.getElementById(sourceId);

            return sourceCheck(source);
        };

        let inputCheck = (srcInput) => {
            let sourceId = srcInput.getAttribute('source');
            let semantic = srcInput.getAttribute('semantic');
            let offset = srcInput.getAttribute('offset');

            if (!sourceId || !semantic) {
                return undefined;
            }

            let srcData = undefined;

            sourceId = sourceId[0] === '#' ? sourceId.substr(1) : sourceId;
            let element = doc.getElementById(sourceId);
            switch (element.tagName) {
                case 'source':
                    srcData = sourceCheck(element);
                    break;

                case 'vertices':
                    srcData = verticesCheck(element);
                    break;
            
                default:
                    break;
            }

            if (!srcData) {
                return undefined;
            }

            return {
                semantic: semantic,
                offset: parseInt(offset),
                data: srcData,
            }
        };

        let library_geometries = doc.getElementsByTagName('library_geometries')[0];
        if (!library_geometries) {
            return undefined;
        }

        let geometries = library_geometries.children;
        if (geometries.length === 0) {
            return undefined;
        }

        // todo: check mult geometry
        let meshData = geometries[0].children[0];
        if (!meshData) {
            return undefined;
        }

        let triangles = meshData.getElementsByTagName('triangles')[0];
        if (!triangles) {
            return undefined;
        }

        let trianglesCount = triangles.getAttribute('count');

        let inputs = triangles.getElementsByTagName('input');
        let srcDataMap = [];
        let resultDataMap = [];
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let result = inputCheck(input);
            if (!result) {
                return undefined;
            }
            srcDataMap.push(result);
            resultDataMap.push([]);
        }
        let inputsLength = inputs.length;

        let indicesElement = triangles.getElementsByTagName('p')[0];
        if (!indicesElement) {
            return undefined;
        }
        let indicesSrc = indicesElement.textContent.split(' ');
        let indicesMap = new Map();
        let resultIndices = [];
        let dataAmount = 0;
        for (let i = 0; i < trianglesCount * 3; i++) {
            let n_i = i * 3;
            let name = '';
            for (let j = 0; j < inputsLength; j++) {
                name += '' + indicesSrc[n_i + j] + ' ';
            }
            let result_index = indicesMap.get(name);
            if (result_index) {
                resultIndices.push(result_index);
                continue;
            }
            for (let j = 0; j < inputsLength; j++) {
                let offset = srcDataMap[j].offset;
                let srcData = srcDataMap[j].data;
                let index = indicesSrc[n_i + offset];
                let srcDataArray = srcData.array;
                let values = [];
                let resultData = resultDataMap[j];
                for (let k = 0; k < srcData.stride; k++) {
                    let value = srcDataArray[index * 3 + k];
                    resultData.push(value);
                }
            }
            indicesMap.set(name, dataAmount);
            resultIndices.push(dataAmount);
            dataAmount++;
        }

        if (resultIndices.length > 65535) {
            return undefined;
        }

        let cge_geometry = new Geometry();

        for (let i = 0; i < inputsLength; i++) {
            let srcDatas = srcDataMap[i];
            let resultData = resultDataMap[i];
            let semantic = srcDatas.semantic;
            let data = srcDatas.data;

            let webgl_data = undefined;
            switch (data.type) {
                case FLOAT:
                    webgl_data = new Float32Array(resultData);
                    break;
            
                default:
                    break;
            }

            let attribute_in = undefined;
            switch (semantic) {
                case 'POSITION':
                case 'VERTEX':
                    attribute_in = AttribType.POSITION;
                    break;

                case 'NORMAL':
                    attribute_in = AttribType.NORMAL;
                    break;

                case 'TEXCOORD':
                    attribute_in = AttribType.TEXCOORD0;
                    for (let j = 0; j < (webgl_data.length / data.stride); j++) {
                        let v = webgl_data[j * data.stride + 1];
                        webgl_data[j * data.stride + 1] = 1.0 - v;
                    }
                    break;
            
                default:
                    break;
            }

            cge_geometry.addSingleAttribute(semantic, attribute_in, data.stride, data.type, webgl_data);
        }

        cge_geometry.setIndexData(new Uint16Array(resultIndices));
        cge_geometry.setDrawParameter(resultIndices.length);

        return cge_geometry;
    }// _loadVertices
}// class;

// static structure
ColladaLoader.State = {
    NONE: 'none',
    LOADING_FILE: 'loading',
    CREATE_ENTITY: 'createEntity',
    LOAD_COMPLETE: 'loadComplete',
    LOAD_ERROR: 'loadError',
}
