import * as CGE from './RendererParameter';
import { GraphicsObject } from './GraphicsObject'

export class Shader extends GraphicsObject {
    _vertexShaderText = '';
    _fragmentShaderText = '';
    _requireAttributeLocations = new Map();
    _requireMatrixNames = new Map();
    _requireUniformNames = new Map();
    _requireRenderLocarions = new Map();

    constructor() {
        super();
    }

    setShaderText(vsText, fsText) {
        this._vertexShaderText = Shader.replaceCode(vsText);
        this._fragmentShaderText = Shader.replaceCode(fsText);
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

    addMatrixName(matrixType, name, dataType?) {
        this._requireMatrixNames.set(matrixType, this._createUniformObject(name, dataType || CGE.FLOAT_MAT4));
    }

    getMatrixNameMap(uniformType) {
        return this._requireMatrixNames;
    }

    addUniformName(uniformType, name, dataType?) {
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

    addTextureName(TextureType, name) {
        this.addUniformName(TextureType, name, CGE.UNSIGNED_INT);
    }

    addTextureNames(array) {
        array.forEach(function(object){
            this.addTextureName(object.type, object.name);
        });
    }

    getTextureName(textureType) {
        return this.getUniformName(textureType);
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

    private static readonly func = {
        '#include[OBMapDecl]' : 
            `#ifdef OB_MAP
            uniform sampler2D u_ODMap;
            uniform vec2 u_ODSizeInv;
            bool OBMap(float alpha) {
                return alpha < texture2d(u_ODMap, gl_FragCoord.xy * u_ODSizeInv).a;
            }
            #endif
        `,
        '#include[OBMap]' : `
            #ifdef OB_MAP
                if (OBMap(baseColor.a)) {
                    discard;
                }
            #endif
        `,
        'TEXTURE2D' : 'texture2D',
        'TEXTURECUBE' : 'textureCube'
    }

    private static replaceCode(code: string): string {
        const keys = Object.keys(Shader.func);
        let result = code;
        keys.forEach(key => {
            let temp;
            while (temp !== result) {
                temp = result;
                result = temp.replace(key, Shader.func[key]);
            }
        })
        return result;
    }
}
