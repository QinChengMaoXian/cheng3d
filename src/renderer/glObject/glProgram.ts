import { 
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    FLOAT_MAT3,
    FLOAT_MAT4
} from '../../graphics/RendererParameter'
import { Logger } from '../../core/Logger'
import { glObject } from './glObject'
import { ShaderConst } from '../../graphics/ShaderConst';

import { MatrixType } from '../../graphics/GraphicsTypes';
import { Vector3 } from '../../math/Vector3';
import { Vector4 } from '../../math/Vector4';
import { Matrix4 } from '../../math/Matrix4';

import { Mesh } from '../../object/Mesh';

import { Camera } from '../../object/Camera';

const _matrix = new Matrix4();
const _vpmatrix = new Matrix4();
const _mvmatrix = new Matrix4();
const _mvpmatrix = new Matrix4();
const _f32 = new Float32Array(16);

const lightColor: Vector4 = new Vector4();
const lightDir: Vector3 = new Vector3();

interface IUniform {
    location: WebGLUniformLocation,
    type: number,
    name: string,
    size: number
}

export class glProgram extends glObject {

    public static vMatrix  = new Matrix4();
    public static pMatrix  = new Matrix4();
    public static vpMatrix = new Matrix4();

    protected _program: WebGLProgram;

    protected _textures: Map<string | number, number> = new Map();
    protected _attributes: Map<string | number, number> = new Map();
    protected _uniforms: Map<string | number, IUniform> = new Map();

    protected _macros = [];
    protected _shaderKey: string;

    constructor() {
        super();
    }

    private _createShaderFromText(gl: WebGLRenderingContext, type: number, text: string) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, text);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0) {
            Logger.warn(text);
            Logger.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return undefined;
        }
        return shader;
    }

    private _build(gl: WebGLRenderingContext) {
        let program = this._program;
        this.apply(gl);
        let uCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        let tCount = 0;
        for (let i = 0; i < uCount; i++) {
            let data = gl.getActiveUniform(program, i);
            if (!data) {
                return;
            }
            let loc = gl.getUniformLocation(program, data.name);
            if (data.type === gl.SAMPLER_2D || data.type === gl.SAMPLER_CUBE) {
                gl.uniform1i(loc, tCount);
                let texMap = ShaderConst._getTextures();
                this._textures.set(texMap[data.name], tCount++);
            } else {
                let uniMap = ShaderConst._getUniforms();
                this._uniforms.set(uniMap[data.name], {
                    location: loc,
                    type: data.type,
                    name: data.name,
                    size: data.size
                });
            }
        }

        let aCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < aCount; i++) {
            let data = gl.getActiveAttrib(program, i);
            let loc = gl.getAttribLocation(program, data.name);
            gl.enableVertexAttribArray(loc);
            let attribMap = ShaderConst._getAttributes();
            this._attributes.set(attribMap[data.name], loc);
        }
    }

    private _createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            Logger.error("Could not initialise shaders shader " + gl.getProgramInfoLog(program));
            return undefined;
        }
        this._program = program;
        this._build(gl);
        return program;
    }

    private _createProgramFromText(gl, vsText, fsText) {
        let vs = this._createShaderFromText(gl, gl.VERTEX_SHADER, vsText);              
        let fs = this._createShaderFromText(gl, gl.FRAGMENT_SHADER, fsText); 

        if (vs === undefined || fs === undefined) {
            return undefined;
        }

        let program = this._createProgram(gl, vs, fs);
        if (program === undefined) {
            return undefined;
        }

        gl.deleteShader(vs);
        gl.deleteShader(fs);

        return program;
    }

    public generateFromText(gl, vertText, fragText) {
        let program = this._createProgramFromText(gl, vertText, fragText);

        if (!program) {
            return null;
        }

        this._update = false;

        return this;
    }

    public apply(gl) {
        gl.useProgram(this._program);
    }

    public setUniformData(gl: WebGLRenderingContext, type: number, location: WebGLUniformLocation, data) {
        // TODO: 写的是个毛; 但是没办法
        switch(type) {
            case FLOAT_VEC2:
                gl.uniform2fv(location, data);
                break;
            case FLOAT_VEC3:
                gl.uniform3fv(location, data);
                break;
            case FLOAT_VEC4:
                gl.uniform4fv(location, data);
                break;
            case FLOAT_MAT3:
                gl.uniformMatrix3fv(location, false, data);
                break;
            case FLOAT_MAT4:
                gl.uniformMatrix4fv(location, false, data);
                break;
            default:
                break;
        }
    }

    public applyUniforms(gl: WebGLRenderingContext, mesh: Mesh, camera: Camera) {
        let glprog = this;
        let material = mesh.getMaterial();
        let properties = material.getProperties();
        let uniforms = glprog.getUniforms();
        
        if (uniforms.size === 0) {
            return;
        }
        let tempMatrix = _matrix;

        let worldMatrix = mesh.getMatrix();

        let vMat = glProgram.vMatrix;
        let pMat = glProgram.pMatrix;
        let vpMat = glProgram.vpMatrix;

        let MVMatrix = undefined;
        let getMVMatrix = function() {
            MVMatrix = MVMatrix || _mvmatrix.copy(vMat).applyMatrix4(worldMatrix);
            return MVMatrix;
        };

        let VPMatrix = undefined;
        let getVPMatrix = function() {
            VPMatrix = VPMatrix || _vpmatrix.copy(pMat).applyMatrix4(vMat);
            return VPMatrix;
        };

        let MVPMatrix = undefined;
        let getMVPMatrix = function() {
            MVPMatrix = MVPMatrix || _mvpmatrix.copy(vpMat).applyMatrix4(worldMatrix);
            return MVPMatrix;
        };

        let f32 = _f32;

        uniforms.forEach((uniformObject, uniformType) => {
            let location = uniformObject.location;
            let type = uniformObject.type;
            let data: Matrix4 | Vector3 | Vector4; //matrix = glMesh._matrix;
            // TODO: maybe need re-build? but looks good for use;
            switch (uniformType) {
                case ShaderConst.mMat:              data = worldMatrix; break;
                case ShaderConst.mIMat:             data = tempMatrix.copy(worldMatrix).invertTranspose(); break;
                case ShaderConst.vMat:              data = vMat; break;
                case ShaderConst.pMat:              data = pMat; break;
                case ShaderConst.vpMat:             data = getVPMatrix(); break;
                case ShaderConst.mvpMat:            data = getMVPMatrix(); break;
                case ShaderConst.mvMat:             data = getMVMatrix(); break;
                case ShaderConst.cameraPos:         data = camera.getPosition(); break;
                case ShaderConst.lightColor:        data = lightColor; break;
                case ShaderConst.lightDir:          data = lightDir; break;
                case MatrixType.NormalWMatrix:      data = tempMatrix.copy(worldMatrix).invertTranspose(); break;
                case MatrixType.NormalMVMatrix:     data = tempMatrix.copy(getMVMatrix()).invertTranspose(); break;
                case MatrixType.NormalMVPMatrix:    data = tempMatrix.copy(getMVPMatrix()).invertTranspose(); break;
                case MatrixType.InverseWMatrix:     data = tempMatrix.copy(worldMatrix).invert(); break;
                case MatrixType.InverseVMatrix:     data = tempMatrix.copy(vMat).invert(); break;
                default:                            data = properties.get(uniformType); break;
            }
            if (data.data.length === 16) {
                f32.set(data.data);
                glprog.setUniformData(gl, type, location, f32);
            } else {
                glprog.setUniformData(gl, type, location, data.data);
            }
        });
    }

    public getTextureIndex(type) {
        return this._textures.get(type);
    }

    public getAttribLocation(attribType) {
        return this._attributes.get(attribType);
    }

    public getUniforms() {
        return this._uniforms;
    }

    public set shaderKey(key: string) {
        this._shaderKey = key;
    }

    public get shaderKey() {
        return this._shaderKey;
    }
}
