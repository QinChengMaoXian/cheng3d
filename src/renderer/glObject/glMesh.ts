import { MatrixType } from '../../graphics/GraphicsTypes';
import { Vector3 } from '../../math/Vector3';
import { Vector4 } from '../../math/Vector4';
import { Matrix4 } from '../../math/Matrix4';
import { glObject } from './glObject';
import { ShaderConst } from '../../graphics/ShaderConst';
import { Texture } from '../../graphics/Texture';
import { Geometry } from '../../graphics/Geometry';
import { Mesh } from '../../object/Mesh';
import { glProgram } from './glProgram';
import { glBuffer } from './glBuffer';
import { Camera } from '../../object/Camera';



export class glMesh extends glObject {
    private static _matrix = new Matrix4();
    private static _vpmatrix = new Matrix4();
    private static _mvmatrix = new Matrix4();
    private static _mvpmatrix = new Matrix4();

    private _uniforms = undefined;
    private _glBuffer: glBuffer = undefined;
    private _glProgram: glProgram = undefined;
    constructor() {
        super();
    }

    private _checkGLObject(gl: WebGLRenderingContext, renderer, geometry, shader, images: Map<string|number, Texture>) {
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

    private _bindVbo(gl: WebGLRenderingContext, glProgram: glProgram, geometry: Geometry) {
        let glBuffer: glBuffer = this._glBuffer;
        let vbos = glBuffer.getVbos();
        let buffers = geometry.getBuffers();
        let indexBuffer = geometry.getIndexBuffer();

        let length = buffers.length;
        for (let i = 0; i < length; i++) {
            let buffer = buffers[i];
            let binded = false
            let attributes = buffer.getAttributes();
            attributes.forEach( attribute => {
                let location = glProgram.getAttribLocation(attribute.attribType);
                if (location === undefined || location === -1) {
                    return;
                } else {
                    if (!binded) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, vbos[i]);
                        binded = true;
                    }
                }
                gl.vertexAttribPointer(location, attribute.num, buffer.getType(), false, buffer.getStride(), attribute.offset);
            })
        }

        glBuffer.bindIbo(gl);

        return this;
    }

    private _applyUniforms(gl: WebGLRenderingContext, mesh: Mesh, cameraMatrices, camera: Camera) {
        let glProgram = this._glProgram;
        let material = mesh.getMaterial();
        let properties = material.getProperties();
        let uniforms = glProgram.getUniforms();
        
        if (uniforms.size === 0) {
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
            // TODO: maybe need re-build? but looks good for use;
            switch (uniformType) {
                case ShaderConst.mMat:              data = worldMatrix; break;
                case ShaderConst.vMat:              data = cameraMatrices.viewMatirx; break;
                case ShaderConst.pMat:              data = cameraMatrices.projectionMatirx; break;
                case ShaderConst.vpMat:             data = getVPMatrix(); break;
                case MatrixType.MVMatrix:           data = getMVMatrix(); break;
                case ShaderConst.mvpMat:            data = getMVPMatrix(); break;
                case ShaderConst.mvMat:             data = getMVMatrix(); break;
                case ShaderConst.cameraPos:         data = camera.getPosition(); break;
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

    private _applyMaterial(gl: WebGLRenderingContext, entity, cameraMatrices, camera) {
        this._glProgram.apply(gl);
        
        // this._applyUniforms(gl, entity);
        this._applyUniforms(gl, entity, cameraMatrices, camera);
    }

    public draw(renderer, gl: WebGLRenderingContext, mesh, shader, images, cameraMatrices, camera) {
        let geo = mesh.getGeometry();
        if (!this._checkGLObject(gl, renderer, mesh.getGeometry(), shader, images)) return false;
        this._applyMaterial(gl, mesh, cameraMatrices, camera);
        this._bindVbo(gl, this._glProgram, mesh.getGeometry());
        this._glBuffer.draw(gl);
        return true;
    }
}
