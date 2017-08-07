import { Texture2D } from '../graphics/texture2D'
import { TextureCube } from '../graphics/textureCube'
import { Geometry } from '../graphics/geometry'

import { Entity } from '../object/entity'
import { Transform } from '../object/transform'
import { Component } from '../object/component'
import { AttribType } from '../graphics/graphicsTypes'
import { FLOAT, POINTS, LINES, LINE_LOOP, LINE_STRIP, TRIANGLES, TRIANGLE_STRIP, TRIANGLE_FAN } from '../graphics/rendererParameter'

import { Loader } from '../io/loader'

import { Logger } from '../core/base'



export class GltfLoader {
    constructor(url, callback) {
        if (url) {
            load(url, callback);
        }
    }

    load(url, callback) {
        this.url = url;
        let loader = new Loader();
        loader.loadUrl(url, this._loadFromResponseText.bind(this)).then(gltf => {
            callback('entity', gltf);
            return gltf;
        });
    }

    _loadFromResponseText(xmlHttp) {
        const glTF =  eval("(" + xmlHttp.responseText + ")");
        const urlDir = this.url.substring(0, this.url.lastIndexOf('/') + 1);
        // result.set(GltfLoader.PROMISE, new Map());
        // result.set(GltfLoader.URL_DIR, urlDir);
        glTF.urlDir = urlDir;
        glTF.promising = {};

        Object.keys(glTF).forEach(key => {
            const func = GltfLoader['pre_' + key];
            if (!func) {
                return;
            }
            func(glTF);
        });
        
        return Promise.all(Object.values(glTF.promising)).then(() => {
            Logger.info('glTF.promising load complete');
            Logger.info(glTF);
            return this._loadGltfJson(glTF);
        });
        // return glTF;
    }

    _loadGltfJson(glTF) {
        const order = [
            // 'extensionsUsed',
            // geometry
            'bufferViews',
            'accessors',

            // materials

            // meshes
            'meshes',
            'nodes',
            // scenes
            'scenes',
            // default scene
            'scene'
        ];
        order.forEach(key => {
            const func = GltfLoader[key];
            if (!func) {
                return;
            }
            func(glTF);
        });
        return glTF.cge_geometries;
    }

}

Object.assign(GltfLoader, {
    'meshes': (glTF) => {
        const objects = glTF['meshes'];
        const accessors = glTF['accessors'];
        const geometries = [];
        const createGeometry = (primitive) => {
            let cge_geometry = new Geometry();
            const attributes = primitive.attributes;
            Object.keys(attributes).forEach(key => {
                let attribute_in = undefined;
                const attributeId = attributes[key];
                const attribute = accessors[attributeId];
                switch(key) {
                    case 'POSITION':
                        attribute_in = AttribType.POSITION;
                        break;

                    case 'NORMAL':
                        attribute_in = AttribType.NORMAL;
                        break;

                    case 'TEXCOORD':
                    case 'TEXCOORD_0':
                        attribute_in = AttribType.TEXCOORD0;
                        break;

                    case 'JOINT':
                        attribute_in = AttribType.JOINT;
                        break;

                    case 'WEIGHT':
                        attribute_in = AttribType.WEIGHT;
                        break;
                
                    default:
                        break;
                }

                if (attribute_in === undefined || attribute_in === null) {
                    return;
                }
                // Logger.info(attribute.data);
                cge_geometry.addSingleAttribute(key, attribute_in, attribute.strideCount, attribute.componentType, attribute.data);
            });

            let drawMode = undefined;
            switch (primitive.mode) {
                case 0:
                    drawMode = POINTS;
                    break;
                case 1:
                    drawMode = LINES;
                    break;
                case 2:
                    drawMode = LINE_LOOP;
                    break;
                case 3:
                    drawMode = LINE_STRIP;
                    break;
                case 4:
                    drawMode = TRIANGLES;
                    break;
                case 5:
                    drawMode = TRIANGLE_STRIP;
                    break;
                case 6:
                    drawMode = TRIANGLE_FAN;
                    break;
            
                default:
                    break;
            }

            if (primitive.indices) {
                const attribute = accessors[primitive.indices];
                cge_geometry.setIndexData(attribute.data);
                cge_geometry.setDrawParameter(attribute.data.length, drawMode);
            } else {
                const position = primitive.attributes.POSITION || primitive.attributes.TEXCOORD || primitive.attributes.TEXCOORD_0;
                cge_geometry.setDrawParameter(position.count / position.strideCount, drawMode);
            }

            return cge_geometry;
        };

        Object.keys(objects).forEach(key => {
            const mesh = objects[key];
            const name = mesh.name || '';

            if (mesh.primitives) {
                mesh.primitives.forEach(primitive => {
                    if (!primitive.attributes) {
                        return;
                    }
                    let geometry = createGeometry(primitive);
                    if (geometry) {
                        geometries.push(geometry);
                    }
                });
            }

            if (mesh.extensions) {
                // TODO
            }
        });
        glTF.cge_geometries = geometries;
    },

    'accessors': (glTF) => {
        const typeMap = {
            "SCALAR" : 1, 
            "VEC2" : 2, 
            "VEC3" : 3, 
            "VEC4" : 4, 
            "MAT2" : 4, 
            "MAT3" : 9, 
            "MAT4" : 16
        };

        const createArrayBuffer = (componentType, data, byteOffset, count, strideCount) => {
            switch (componentType) {
                case 5120: //BYTE
                    data = new Int8Array(data, byteOffset, count * strideCount);
                    break;

                case 5121: //UNSIGNED_BYTE
                    data = new Uint8Array(data, byteOffset, count * strideCount);
                    break;

                case 5122: //SHORT
                    data = new Int16Array(data, byteOffset, count * strideCount);
                    break;

                case 5123: //UNSIGNED_SHORT
                    data = new Uint16Array(data, byteOffset, count * strideCount);
                    break;

                case 5126: //FLOAT
                    data = new Float32Array(data, byteOffset, count * strideCount);
                    break;
            
                default:
                    break;
            }
            return data;
        }

        const objects = glTF['accessors'];
        Object.keys(objects).forEach(key => {
            const accessor = objects[key];
            const bufferView = glTF['bufferViews'][accessor.bufferView];
            const data = bufferView.data;
            const offset = accessor.byteOffset;
            const count = accessor.count;
            accessor.strideCount = typeMap[accessor.type];
            accessor.data = createArrayBuffer(accessor.componentType, data, offset, count, accessor.strideCount);
            if (accessor.extensions) {
                // TODO
            }
        });
    },
    'bufferViews': (glTF) => {
        const objects = glTF['bufferViews'];
        Object.keys(objects).forEach(key => {
            const bufferView = objects[key];
            const buffer = glTF['buffers'][bufferView.buffer];
            if (!buffer) {
                return;
            }
            bufferView.data = buffer.data.slice(bufferView.byteOffset, bufferView.byteOffset + (bufferView.byteLength || 0));
            // bufferView.data = new ArrayBuffer(buffer.data, bufferView.byteOffset, bufferView.byteLength || 0);
            if (bufferView.extensions) {
                // TODO
            }
        });
    },
    'pre_buffers': (glTF) => {
        const objects = glTF['buffers'];
        Object.keys(objects).forEach(key => {
            const buffer = objects[key];
            const loader = new Loader();
            glTF.promising[key] = loader.loadUrl(
                glTF.urlDir + buffer.uri, 
                xmlHttp => {
                    buffer.data = xmlHttp.response;
                }, 
                buffer.type || 'text'
            );
        });
    },

    'pre_images': (glTF) => {
        const objects = glTF['images'];
        Object.keys(objects).forEach(key => {
            const imgObj = objects[key];
            const loader = new Loader();
            glTF.promising[key] = loader.loadImg(
                glTF.urlDir + imgObj.uri, 
                image => {
                    imgObj.data = image;
                }
            );
        });
    },
})

const property = {
    'accessors': [],
    'animations': [],
    'asset': [],
    'buffers': [],
    'bufferViews': [],
    'extensionsUsed': [],
    'extensions': [],
    'cameras': [],
    'images': [],
    'materials': [],
    'meshes': [],
    'nodes': [],
    'programs': [],
    'samplers': [],
    'scenes': [],
    'shaders': [],
    'skins': [],
    'techniques': [],
    'textures': []
};
