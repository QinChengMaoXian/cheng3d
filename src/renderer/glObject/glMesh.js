import { MatrixType } from '../../graphics/graphicsTypes.js'
import { Matrix4 } from '../../math/matrix4.js'
import { glObject } from './glObject.js'

export class glMesh extends glObject {
    constructor() {
        super();
        Object.assign(this, {
            _vao: undefined,
            _textures: new Map(),
            _uniforms: undefined,
            _glBuffer: undefined,
            _glProgram: undefined,
            _2ndLocalVersion: -1,
        });
    }

    get2ndLocalVersion() {
        return this._2ndLocalVersion;
    }

    set2ndLocalVersion(version) {
        this._2ndLocalVersion = version;
    }

    _initGLObject(renderer, geometry, shader, images) {
        this._glBuffer = renderer.initGeometry(geometry);
        if (!this._glBuffer) {
            return undefined;
        }
        this._glProgram = renderer.initShader(shader);
        if (!this._glProgram) {
            return undefined;
        }

        for (let i = 0; i < images.length; i++) {
            let image = images[i];
            let glTexture = renderer.initTexture(image.map);
            if (glTexture !== undefined) {
                this._textures.set(image.type, glTexture);
            } else {
                this._textures.clear();
                return undefined;
            }
        }

        return this;
    }

    _createVao(gl, glProgram) {
        let glBuffer = this._glBuffer;
        let vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        let geometry = glBuffer.getGeometry();
        let vbos = glBuffer.getVbos();
        let attributeDatas = geometry.getAttributeDatas();
        for (let i = 0; i < vbos.length; i++) {
            let attribute = attributeDatas[i];
            let vbo = vbos[i];
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            attribute.attribPointers.forEach(function(param){
                let location = glProgram.getAttribLocation(param.attribute);
                if (location === undefined || location === -1) 
                    return; 
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, param.num, attribute.type, false, attribute.stride, param.offset);
            }.bind(this));
        }

        let ibo = glBuffer.getIbo();
        if (ibo) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        }
        gl.bindVertexArray(null);
        this._vao = vao;
        return this;
    }

    _applyVao(gl) {
        gl.bindVertexArray(this._vao);
    }

    _applyTextures(gl) {
        let count = 0;
        this._textures.forEach(function(glTexture, type) {
            glTexture.apply(gl, count);
            this._glProgram.applyUniformData(gl, type, new Int32Array([count]));
            count++;
        }.bind(this));
    }

    _applyMatrices(gl, entity, cameraMatrices) {
        let glProgram = this._glProgram;
        let matrixLocaionMap = glProgram.getMatrixLocationMap();
        let transform = entity.transform;
        let worldMatrix = transform === undefined ? new Matrix4() : transform.getMatrix();

        let getMVMatrix = function() {
            let MVMatrix = undefined;
            return function getMVMatrix() {
                MVMatrix = MVMatrix || cameraMatrices.viewMatirx.clone().applyMatrix4(worldMatrix);
                return MVMatrix;
            }
        }();

        let getMVPMatrix = function() {
            let MVPMatrix = undefined;
            return function getMVPMatrix() {
                MVPMatrix = MVPMatrix || cameraMatrices.viewProjectionMatirx.clone().applyMatrix4(worldMatrix);
                return MVPMatrix;
            }
        }();

        matrixLocaionMap.forEach(function(uniformObject, matrixType) {
            let location = uniformObject.location;
            let type = uniformObject.type;
            let matrix = undefined;
            // TODO: need re-build;
            switch (matrixType) {
                case MatrixType.WMatrix:
                    matrix = worldMatrix;
                    break;
                case MatrixType.VMatrix:
                    matrix = cameraMatrices.viewMatirx;
                    break;
                case MatrixType.PMatrix:
                    matrix = cameraMatrices.projectionMatirx;
                    break;
                case MatrixType.MVMatrix:
                    matrix = getMVMatrix();
                    break;
                case MatrixType.MVPMatrix:
                    matrix = getMVPMatrix();
                    break;
                case MatrixType.NormalWMatrix:
                    matrix = worldMatrix.clone().invertTranspose();
                    break;
                case MatrixType.NormalMVMatrix:
                    matrix = getMVMatrix().clone().invertTranspose();
                    break;
                case MatrixType.NormalMVPMatrix:
                    matrix = getMVPMatrix().clone().invertTranspose();
                    break;
                case MatrixType.InverseWMatrix:
                    matrix = worldMatrix.clone().invert();
                    break;
                case MatrixType.InverseVMatrix:
                    matrix = VMatrix.clone().invert();
                    break;
                case MatrixType.InversePMatrix:
                    matrix = cameraMatrices.projectionMatirx.clone().invert();
                    break;
                default:
                    return undefined;
            }
            glProgram.setUniformData(gl, type, location, matrix.data);
        });
    }

    _applyUniforms(gl, entity) {
        let material = entity.material;
        let properties = material.getPropertyProvide();
        let glProgram = this._glProgram;
        properties.forEach(function(property) {
            let type = property.type;
            let data = property.data;
            glProgram.applyUniformData(gl, type, data);
        });
    }

    _applyStates() {

    }

    _applyMaterial(gl, entity, cameraMatrices) {
        this._glProgram.apply(gl);
        
        this._applyTextures(gl);
        this._applyUniforms(gl, entity);
        this._applyMatrices(gl, entity, cameraMatrices);

        //TODO: apply state;
    }

    generate(gl, renderer, entity) {
        let check = this.checkGLObject(renderer, entity);
        if (check === undefined) {
            return undefined;
        }

        if (this._createVao(gl, this._glProgram) === undefined) {
            return undefined;
        }

        let geometryVersion = entity.geometry.getUpdateVersion();
        let shaderVersion = entity.geometry.getUpdateVersion();
        this.setLocalVersion(geometryVersion);
        this.set2ndLocalVersion(shaderVersion);
        return this;
    }

    checkGLObject(renderer, entity) {
        let geometry = entity.geometry;
        let material = entity.material;
        let shader = material.getShader();
        let images = material.getMapProvide();

        if (this._initGLObject(renderer, geometry, shader, images) === undefined) {
            return undefined;
        }
        return this;
    }

    apply(gl, entity, cameraMatrices) {
        this._applyMaterial(gl, entity, cameraMatrices);
        this._applyVao(gl);
    }

    draw(gl) {
        this._glBuffer.draw(gl);
    }
}
