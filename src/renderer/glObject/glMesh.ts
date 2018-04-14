import { MatrixType } from '../../graphics/GraphicsTypes';
import { Vector3 } from '../../math/Vector3';
import { Vector4 } from '../../math/Vector4';
import { Matrix4 } from '../../math/Matrix4';
import { glObject } from './glObject';
import { GraphicsConst } from '../../graphics/GraphicsConst';
import { Texture } from '../../graphics/Texture';
import { Mesh } from '../../object/Mesh';


export class glMesh extends glObject {
    private static _matrix = new Matrix4();
    private static _vpmatrix = new Matrix4();
    private static _mvmatrix = new Matrix4();
    private static _mvpmatrix = new Matrix4();

    private _uniforms = undefined;
    private _glBuffer = undefined;
    private _glProgram = undefined;
    constructor() {
        super();
    }

    private _checkGLObject(gl, renderer, geometry, shader, images: Map<string|number, Texture>) {
        let glBuffer = renderer.initGeometry(geometry);
        if (!glBuffer) {
            return undefined;
        }
        this._glBuffer = glBuffer;

        let glProgram = renderer.initShader(shader);
        if (!glProgram) {
            return undefined;
        }
        this._glProgram = glProgram;

        //TODO: 加载的纹理还没加载好怎么办？
        images.forEach((texture, type) => {
            let glTexture = renderer.initTexture(texture);
            if (glTexture) {
                let texIndex = glProgram.getTextureIndex(type);
                if (texIndex !== undefined) {
                    glTexture.apply(gl, texIndex);
                }
            }
        });

        return this;
    }

    private _bindVbo(gl, glProgram, geometry) {
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

    private _applyUniforms(gl, mesh: Mesh, cameraMatrices) {
        let glProgram = this._glProgram;
        let material = mesh.getMaterial();
        let properties = material.getProperties();
        let uniforms = glProgram.getUniforms();
        if (uniforms.length === 0) {
            return;
        }
        let tempMatrix = glMesh._matrix;

        let worldMatrix = mesh.getMatrix();

        let MVMatrix = undefined;
        let getMVMatrix = function() {
            MVMatrix = MVMatrix || glMesh._mvmatrix.copy(cameraMatrices.viewMatirx).applyMatrix4(worldMatrix);
            return MVMatrix;
        };

        let VPMatrix = undefined;
        let getVPMatrix = function() {
            VPMatrix = VPMatrix || glMesh._vpmatrix.copy(cameraMatrices.projectionMatirx).applyMatrix4(cameraMatrices.viewMatirx);
            return VPMatrix;
        };

        let MVPMatrix = undefined;
        let getMVPMatrix = function() {
            MVPMatrix = MVPMatrix || glMesh._mvpmatrix.copy(cameraMatrices.viewProjectionMatirx).applyMatrix4(worldMatrix);
            return MVPMatrix;
        };

        uniforms.forEach(function(uniformObject, uniformType) {
            let location = uniformObject.location;
            let type = uniformObject.type;
            let data: Matrix4 | Vector3 | Vector4; //matrix = glMesh._matrix;
            // TODO: maybe need re-build? but looks like good for used;
            switch (uniformType) {
                case GraphicsConst.mMat:            data = worldMatrix; break;
                case GraphicsConst.vMat:            data = cameraMatrices.viewMatirx; break;
                case GraphicsConst.pMat:            data = cameraMatrices.projectionMatirx; break;
                case GraphicsConst.vpMat:           data = getVPMatrix(); break;
                case MatrixType.MVMatrix:           data = getMVMatrix(); break;
                case GraphicsConst.mvpMat:          data = getMVPMatrix(); break;
                case MatrixType.NormalWMatrix:      data = tempMatrix.copy(worldMatrix).invertTranspose(); break;
                case MatrixType.NormalMVMatrix:     data = tempMatrix.copy(getMVMatrix()).invertTranspose(); break;
                case MatrixType.NormalMVPMatrix:    data = tempMatrix.copy(getMVPMatrix()).invertTranspose(); break;
                case MatrixType.InverseWMatrix:     data = tempMatrix.copy(worldMatrix).invert(); break;
                case MatrixType.InverseVMatrix:     data = tempMatrix.copy(cameraMatrices.viewMatirx).invert(); break;
                case MatrixType.InversePMatrix:     data = tempMatrix.copy(cameraMatrices.projectionMatirx).invert(); break;
                default:                            data = properties.get(uniformType); break;
            }
            if (data) {
                glProgram.setUniformData(gl, type, location, data.data);
            }
        });
    }

    private _applyMaterial(gl, entity, cameraMatrices) {
        this._glProgram.apply(gl);
        
        // this._applyUniforms(gl, entity);
        this._applyUniforms(gl, entity, cameraMatrices);
    }

    public draw(renderer, gl, mesh, shader, images, cameraMatrices) {
        let geo = mesh.getGeometry();
        if (!this._checkGLObject(gl, renderer, mesh.getGeometry(), shader, images)) return false;
        this._applyMaterial(gl, mesh, cameraMatrices);
        this._bindVbo(gl, this._glProgram, mesh.getGeometry());
        this._glBuffer.draw(gl);
        return true;
    }
}
