import * as CGE from './src/CGE.js'
import { Material } from './src/material/material.js'

export const createTexture2DFromImage = function(imgSrc, mipmap) {
    let texture2d = new CGE.Texture2D();
    texture2d.setImageSrc(imgSrc);
    if (mipmap === true) {
        texture2d.setMipmap(true);
        texture2d.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
    }
    return texture2d;
};

let DeferredMaterialShader = undefined;

export class DeferredMaterial extends Material {
    constructor() {
        super();
        Object.assign(this, {
            _diffuseMap: undefined,
            _normalMap: undefined,
            _specularMap: undefined,
            _roughness: 0,
        });
        let shader = DeferredMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });
    }

    setDiffuseMap(map) {
        this._diffuseMap = map;
    }

    setNormalMap(map) {
        this._normalMap = map;
    }

    setSpecularMap(map) {
        this._specularMap = map;
    }

    getMapProvide() {
        return [
            {
                map: this._diffuseMap,
                type: CGE.MapType.DIFFUSE,
            },
            {
                map: this._normalMap,
                type: CGE.MapType.NORMAL,
            },
            {
                map: this._specularMap,
                type: CGE.MapType.SPECULAR,
            },
        ];
    }

    getPropertyProvide() {
        return [
            {
            }
        ];
    }

    static getShader() {
        if (DeferredMaterialShader === undefined) {
            let vertexShaderText = `#version 100
            attribute vec4 Position;
            attribute vec3 Normal;
            attribute vec3 Tangent;
            attribute vec2 UV;
            varying vec2 uv;
            varying vec3 tangentToView0;
            varying vec3 tangentToView1;
            varying vec3 tangentToView2;
            uniform mat4 MVMatrix;
            uniform mat4 MVPMatrix;
            void main()
            {
                vec3 Binormal = normalize(cross(Tangent, Normal));
                mat3 normalMatrix = mat3(Tangent, Binormal, Normal);
                mat3 MVMatrix3 = mat3(
                    MVMatrix[0].xyz, 
                    MVMatrix[1].xyz, 
                    MVMatrix[2].xyz
                );
                mat3 tangentToView = MVMatrix3 * normalMatrix;
                tangentToView0 = tangentToView[0];
                tangentToView1 = tangentToView[1];
                tangentToView2 = tangentToView[2];
                uv = UV;
                gl_Position = MVPMatrix * Position;
            }`;

            let fragmentShaderText = `#version 100
            #extension GL_EXT_draw_buffers : require
            precision mediump float;
            varying vec2 uv;
            varying vec3 tangentToView0;
            varying vec3 tangentToView1;
            varying vec3 tangentToView2;
            uniform sampler2D diffuseMap;
            uniform sampler2D normalMap;
            uniform sampler2D specularMap;

            vec3 encodeNormal(vec3 normal)
            {
                vec2 enc_spheremap = normalize(normal.xy) * sqrt(normal.z * 0.5 + 0.5);
                enc_spheremap = enc_spheremap * 0.5 + vec2(0.5);
                vec2 enc255 = enc_spheremap * 255.0;
                vec2 residual = floor(fract(enc255) * 16.0);
                vec3 enc = vec3(floor(enc255), residual.x * 16.0 + residual.y) / 255.0;
                return enc;
            }

            void main()
            {
                vec3 normalTex = texture2D(normalMap, uv).xyz;
                vec3 normal = (normalTex - vec3(0.5)) * 2.0;
                mat3 normalMatrix = mat3(
                    normalize(tangentToView0), 
                    normalize(tangentToView1), 
                    normalize(tangentToView2)
                );
                normal = normalize(normalMatrix * normal);
                vec3 encodeNorm = normal;// encodeNormal(normal);
                vec3 color = texture2D(diffuseMap, uv).xyz;
                float spec = texture2D(specularMap, uv).r;
                gl_FragData[0] = vec4(color, spec);
                gl_FragData[1] = vec4(encodeNorm, 0.0);
            }`;
            let shader = new CGE.Shader();
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            shader.addAttribName(CGE.AttribType.POSITION, 'Position');
            shader.addAttribName(CGE.AttribType.NORMAL, 'Normal');
            shader.addAttribName(CGE.AttribType.TANGENT, 'Tangent');
            shader.addAttribName(CGE.AttribType.UV0, 'UV');
            shader.addTextureName(CGE.MapType.DIFFUSE, 'diffuseMap');
            shader.addTextureName(CGE.MapType.NORMAL, 'normalMap');
            shader.addTextureName(CGE.MapType.SPECULAR, 'specularMap');
            shader.addMatrixName(CGE.MatrixType.MVPMatrix, 'MVPMatrix');
            shader.addMatrixName(CGE.MatrixType.MVMatrix, 'MVMatrix');
            shader.addMatrixName(CGE.MatrixType.NormalMVMatrix, 'NormalMVMatrix');
            DeferredMaterialShader = shader;
        }
        return DeferredMaterialShader;
    }
}

let FullScreenTextureMaterialShader = undefined;

export class FullScreenTextureMaterial extends Material {
    constructor(diffuse) {
        super();
        Object.assign(this, {
            _diffuseMap: diffuse,
        });
        let shader = FullScreenTextureMaterial.getShader();
        Object.defineProperty(this, "_shader", { value:shader, writable:false });
    }

    setDiffuseMap(map) {
        this._diffuseMap = map;
    }

    getMapProvide() {
        return [
            {
                map: this._diffuseMap,
                type: CGE.MapType.DIFFUSE,
            },
        ];
    }

    static getShader() {
        if (FullScreenTextureMaterialShader === undefined) {
            let vertexShaderText = "#version 100\n\
            attribute vec4 Position;\n\
            attribute vec2 UV;\n\
            varying vec2 o_uv; \n\
            uniform mat4 WMatrix; \n\
            void main()\n\
            {\n\
                o_uv = UV;\n\
                gl_Position = WMatrix * Position;\n\
            }";

            let fragmentShaderText = "#version 100\n\
            precision mediump float;\n\
            varying vec2 o_uv; \n\
            uniform sampler2D diffuse;\n\
            \n\
            void main()\n\
            {\n\
                vec4 color = texture2D(diffuse, o_uv); \n\
                gl_FragColor = vec4(color.xyz, 1.0);\n\
            }";
            let shader = new CGE.Shader();
            shader.setShaderText(vertexShaderText, fragmentShaderText);
            shader.addAttribName(CGE.AttribType.POSITION, 'Position');
            shader.addAttribName(CGE.AttribType.UV0, 'UV');
            shader.addTextureName(CGE.MapType.DIFFUSE, 'diffuse');
            shader.addMatrixName(CGE.MatrixType.WMatrix, 'WMatrix');
            FullScreenTextureMaterialShader = shader
        }
        return FullScreenTextureMaterialShader;
    };
}


