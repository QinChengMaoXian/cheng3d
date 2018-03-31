import { 
    UNSIGNED_INT,
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    FLOAT_MAT3,
    FLOAT_MAT4
} from '../../graphics/RendererParameter'
import { Logger } from '../../core/Base'
import { glObject } from './glObject'
import { GraphicsConst } from '../../graphics/GraphicsConst';

export class glProgram extends glObject {
    protected _program = undefined;
    protected _attributeLocations = new Map();
    protected _matrixLocations = new Map();
    protected _uniformLocations = new Map();
    protected _textureLocations = [];

    protected _textures = new Map();
    protected _uniforms = new Map();
    protected _attributes = new Map();

    protected _Macros = [];

    constructor() {
        super();
    }

    private _createShaderFromeText(gl, type, text) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, text);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0) {
            Logger.error(text);
            Logger.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return undefined;
        }
        return shader;
    }

    private _build(gl: WebGLRenderingContext) {
        let program = this._program;
        gl.useProgram(program);
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
                let texMap = GraphicsConst._getTextures();
                this._textures.set(texMap[data.name], tCount++);
            } else {
                let uniMap = GraphicsConst._getUniforms();
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
            let attribMap = GraphicsConst._getAttributes();
            this._attributes.set(attribMap[data.name], loc);
        }
    }

    private _createProgram(gl, vs, fs) {
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
        let vs = this._createShaderFromeText(gl, gl.VERTEX_SHADER, vsText);              
        let fs = this._createShaderFromeText(gl, gl.FRAGMENT_SHADER, fsText); 

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

    private _createGLUniformObject(location, type) {
        return {
            location: location,
            type: type
        };
    }

    private _createUniformLocationMap(gl, srcMap, dstMap) {
        srcMap.forEach(function(value, key) {
            let location = gl.getUniformLocation(this._program, value.name);
            dstMap.set(key, this._createGLUniformObject(location, value.type));
        }.bind(this));
    }

    private _createAttributeLocationMap(gl, locationNameMap) {
        locationNameMap.forEach(function(name, attribType){
            let location = gl.getAttribLocation(this._program, name);
            this._attributeLocations.set(attribType, location);
        }.bind(this));
    }

    protected _createTextureLocations() {

    }

    generateFromShader(gl, shader) {
        // let version = shader.getUpdateVersion();
        let program = this._createProgramFromText(gl, shader.getVertexShaderText(), shader.getFragmentShaderText());

        if (program === undefined) {
            return undefined;
        }

        this._createAttributeLocationMap(gl, shader.getAttribNameMap());
        this._createUniformLocationMap(gl, shader.getMatrixNameMap(), this._matrixLocations);
        this._createUniformLocationMap(gl, shader.getUniformNameMap(), this._uniformLocations);
        this._update = false;
        // this.setLocalVersion(version);
        return this;
    }

    apply(gl) {
        gl.useProgram(this._program);
    }

    setUniformData(gl, type, location, data) {
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

    applyUniformData(gl, uniformType, data) {
        let uniform = this.getUniformLocation(uniformType);
        if (uniform === undefined) {
            return;
        }

        this.setUniformData(gl, uniform.type, uniform.location, data);
    }

    applyMatrixData(gl, uniformType, data) {
        let uniform = this.getMatrixLocation(uniformType);
        if (uniform === undefined) {
            return;
        }

        let location = uniform.location;
        this.setUniformData(gl, uniform.type, location, data);
    }

    getUniformLocation(uniformType) {
        return this._uniformLocations.get(uniformType);
    }

    getMatrixLocation(matrixType) {
        return this._matrixLocations.get(matrixType);
    }

    // getUniformLocationMap() {
    //     return this._uniformLocations;
    // }

    getMatrixLocationMap() {
        return this._matrixLocations;
    }

    public getTextureIndex(type) {
        return this._textures.get(type);
    }

    getAttribLocation(attribType) {
        return this._attributes.get(attribType);// this._attributeLocations.get(attribType);
    }
}
