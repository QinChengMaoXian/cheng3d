import { MatrixType } from '../../graphics/GraphicsTypes'
import { Matrix4 } from '../../math/Matrix4'
import { glObject } from './glObject'
import { GraphicsConst } from '../../graphics/GraphicsConst';

export class glMesh extends glObject {
    private static _matrix = new Matrix4();
    private static _mvmatrix = new Matrix4();
    private static _mvpmatrix = new Matrix4();

    _uniforms = undefined;
    _glBuffer = undefined;
    _glProgram = undefined;
    constructor() {
        super();
    }

    private _checkGLObject(gl, renderer, geometry, shader, images) {
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
            if (glTexture) {
                let texIndex = this._glProgram.getTextureIndex(image.type);
                glTexture.apply(gl, texIndex);
            } else {
                return;
            }
        }

        return this;
    }

    _bindVbo(gl, glProgram, geometry) {
        let glBuffer = this._glBuffer;
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
                gl.vertexAttribPointer(location, param.num, attribute.type, false, attribute.stride, param.offset);
            }.bind(this));
        }
        return this;
    }

    private _applyTextures(gl) {

    }

    private _applyMatrices(gl, mesh, cameraMatrices) {
        let glProgram = this._glProgram;
        let matrixLocaionMap = glProgram.getMatrixLocationMap();
        if (matrixLocaionMap.length === 0) {
            return;
        }
        let tempMatrix = glMesh._matrix;

        let worldMatrix = mesh.getMatrix()  // transform === undefined ? new Matrix4() : transform.getMatrix();

        let MVMatrix = undefined;
        let getMVMatrix = function() {
            MVMatrix = MVMatrix || glMesh._mvmatrix.copy(cameraMatrices.viewMatirx).applyMatrix4(worldMatrix);
            return MVMatrix;
        };

        let MVPMatrix = undefined;
        let getMVPMatrix = function() {
            MVPMatrix = MVPMatrix || glMesh._mvpmatrix.copy(cameraMatrices.viewProjectionMatirx).applyMatrix4(worldMatrix);
            return MVPMatrix;
        };

        matrixLocaionMap.forEach(function(uniformObject, matrixType) {
            let location = uniformObject.location;
            let type = uniformObject.type;
            let matrix = glMesh._matrix;
            // TODO: need re-build; 也许不用了。
            switch (matrixType) {
                case MatrixType.WMatrix:            matrix = worldMatrix; break;
                case MatrixType.VMatrix:            matrix = cameraMatrices.viewMatirx; break;
                case MatrixType.PMatrix:            matrix = cameraMatrices.projectionMatirx; break;
                case MatrixType.MVMatrix:           matrix = getMVMatrix(); break;
                case MatrixType.MVPMatrix:          matrix = getMVPMatrix(); break;
                case MatrixType.NormalWMatrix:      matrix = tempMatrix.copy(worldMatrix).invertTranspose(); break;
                case MatrixType.NormalMVMatrix:     matrix = tempMatrix.copy(getMVMatrix()).invertTranspose(); break;
                case MatrixType.NormalMVPMatrix:    matrix = tempMatrix.copy(getMVPMatrix()).invertTranspose(); break;
                case MatrixType.InverseWMatrix:     matrix = tempMatrix.copy(worldMatrix).invert(); break;
                case MatrixType.InverseVMatrix:     matrix = tempMatrix.copy(cameraMatrices.viewMatirx).invert(); break;
                case MatrixType.InversePMatrix:     matrix = tempMatrix.copy(cameraMatrices.projectionMatirx).invert(); break;
                default: return;
            }
            glProgram.setUniformData(gl, type, location, matrix.data);
        });
    }

    private _applyUniforms(gl, mesh) {
        let material = mesh.getMaterial();
        let properties = material.getPropertyProvide();
        let glProgram = this._glProgram;
        properties.forEach(function(property) {
            let type = property.type;
            let data = property.data;
            glProgram.applyUniformData(gl, type, data);
        });
    }

    // _applyStates() {

    // }

    private _applyMaterial(gl, entity, cameraMatrices) {
        this._glProgram.apply(gl);
        
        // this._applyTextures(gl);
        this._applyUniforms(gl, entity);
        this._applyMatrices(gl, entity, cameraMatrices);

        //TODO: apply state;
    }

    // generate(gl, renderer, entity) {
    //     let check = this.checkGLObject(renderer, entity);
    //     if (check === undefined) {
    //         return undefined;
    //     }

        // if (this._createVao(gl, this._glProgram) === undefined) {
        //     return undefined;
        // }

        // let geometryVersion = entity.geometry.getUpdateVersion();
        // let shaderVersion = entity.geometry.getUpdateVersion();
        // this.setLocalVersion(geometryVersion);
        // this.set2ndLocalVersion(shaderVersion);
    //     return this;
    // }

    // checkGLObject(renderer, mesh) {
    //     let geometry = mesh.geometry;
    //     let material = mesh.material;
    //     let shader = material.getShader();
    //     let images = material.getMapProvide();

    //     if (this._initGLObject(renderer, geometry, shader, images) === undefined) {
    //         return undefined;
    //     }
    //     return this;
    // }

    public draw(renderer, gl, mesh, shader, images, cameraMatrices) {
        let geo = mesh.getGeometry();
        if (!this._checkGLObject(gl, renderer, mesh.getGeometry(), shader, images)) return false;
        this._applyMaterial(gl, mesh, cameraMatrices);
        this._bindVbo(gl, this._glProgram, mesh.getGeometry());
        this._glBuffer.draw(gl);
        return true;
        // this._applyVao(gl);
    }

    // draw(gl) {
    //     this._glBuffer.draw(gl);
    // }
}
