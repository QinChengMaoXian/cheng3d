import { 
    UNSIGNED_INT,
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    FLOAT_MAT3,
    FLOAT_MAT4
} from '../../graphics/rendererParameter.js'
import { Logger } from '../../core/base.js'
import { glObject } from './glObject.js'

export class glProgram extends glObject {
    constructor() {
        super();
        Object.assign(this, {
            _program: undefined,
            _attributeLocations: new Map(),
            _matrixLocations: new Map(),
            _uniformLocations: new Map(),
        });
    }

    _createShaderFromeText(gl, type, text) {
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

    _createProgram(gl, vs, fs) {
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            Logger.error("Could not initialise shaders shader " + gl.getProgramInfoLog(shader));
            return undefined;
        }
        return program;
    }

    _createProgramFromText(gl, vsText, fsText) {
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

    _createGLUniformObject(location, type) {
        return {
            location: location,
            type: type
        };
    }

    _createUniformLocationMap(gl, srcMap, dstMap) {
        srcMap.forEach(function(value, key) {
            let location = gl.getUniformLocation(this._program, value.name);
            dstMap.set(key, this._createGLUniformObject(location, value.type));
        }.bind(this));
    }

    _createAttributeLocationMap(gl, locationNameMap) {
        locationNameMap.forEach(function(name, attribType){
            let location = gl.getAttribLocation(this._program, name);
            this._attributeLocations.set(attribType, location);
        }.bind(this));
    }

    generateFromShader(gl, shader) {
        let version = shader.getUpdateVersion();
        let program = this._createProgramFromText(gl, shader.getVertexShaderText(), shader.getFragmentShaderText());

        if (program === undefined) {
            return undefined;
        }

        this._program = program;
        this._createAttributeLocationMap(gl, shader.getAttribNameMap());
        this._createUniformLocationMap(gl, shader.getMatrixNameMap(), this._matrixLocations);
        this._createUniformLocationMap(gl, shader.getUniformNameMap(), this._uniformLocations);
        
        this.setLocalVersion(version);
        return this;
    }

    apply(gl) {
        gl.useProgram(this._program);
    }

    setUniformData(gl, type, location, data) {
        // TODO: need re-build;
        switch(type) {
            case UNSIGNED_INT:
                gl.uniform1i(location, data[0]);
                break;
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

        let location = uniform.location;
        this.setUniformData(gl, uniform.type, location, data);
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

    getUniformLocationMap() {
        return this._uniformLocations;
    }

    getMatrixLocationMap() {
        return this._matrixLocations;
    }

    getAttribLocation(attribType) {
        return this._attributeLocations.get(attribType);
    }
}
