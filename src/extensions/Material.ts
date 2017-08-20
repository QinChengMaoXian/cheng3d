// CGE.CubeMaterial = function() {
//     CGE.Material.call(this);
//     Object.assign(this, {
//        _cubeMap: undefined,
//        _normalMap: undefined,
//     });
//     let shader = CGE.CubeMaterial.getShader();
//     Object.defineProperty(this, "_shader", { value:shader, writable:false });
// };

// Object.assign(CGE.CubeMaterial, {
//     getShader: function() {
//         let shader = undefined;
//         return function getShader() {
//             if (shader === undefined) {
//                 let vertexShaderText = `#version 100
//                 attribute vec4 Position;
//                 attribute vec3 Normal;
//                 attribute vec2 UV;
//                 attribute vec3 Tangent;
//                 varying vec2 o_uv;
//                 varying vec3 tangentToView0;
//                 varying vec3 tangentToView1;
//                 varying vec3 tangentToView2;
//                 varying vec4 o_position;
//                 uniform mat4 MVPMatrix;
//                 uniform mat4 MVMatrix;
//                 void main()
//                 {
//                     vec3 Binormal = normalize(cross(Tangent, Normal));
//                     mat3 normalMatrix = mat3(Tangent, Binormal, Normal);
//                     mat3 MVMatrix3 = mat3(
//                         MVMatrix[0].xyz, 
//                         MVMatrix[1].xyz, 
//                         MVMatrix[2].xyz
//                     );
//                     mat3 tangentToView = MVMatrix3 * normalMatrix;
//                     tangentToView0 = tangentToView[0];
//                     tangentToView1 = tangentToView[1];
//                     tangentToView2 = tangentToView[2];
//                     o_uv = UV;
//                     o_position = MVMatrix * Position;
//                     vec4 position = MVPMatrix * Position;
//                     gl_Position = position;
//                     // gl_Position.z = gl_Position.w;
//                 }`;

//                 let fragmentShaderText = `#version 100
//                 #extension GL_EXT_draw_buffers : require
//                 precision highp float;
//                 varying vec2 o_uv; 
//                 varying vec3 tangentToView0;
//                 varying vec3 tangentToView1;
//                 varying vec3 tangentToView2;
//                 varying vec4 o_position;
//                 uniform samplerCube cube;
//                 uniform sampler2D normalMap;
//                 uniform mat4 VMatrix;
//                 uniform mat4 InverseVMatrix;
//                 vec4 DIR_LIGHT = vec4(1.0, -1.0, 1.0, 0.0);
//                 vec3 CAMERA = vec3(100.0, 100.0, 100.0);

//                 void main()
//                 {
//                     vec3 normalTex = texture2D(normalMap, o_uv).xyz;
//                     vec3 normal = (normalTex - vec3(0.5)) * 2.0;
//                     mat3 normalMatrix = mat3(
//                         normalize(tangentToView0), 
//                         normalize(tangentToView1), 
//                         normalize(tangentToView2)
//                     );
//                     normal = normalize(normalMatrix * normal);
//                     vec3 light = normalize((VMatrix * DIR_LIGHT).xyz);
//                     vec3 viewDir = normalize(o_position.xyz);
//                     vec3 outDir =  2.0 * dot(viewDir, normal) * normal - viewDir;
//                     vec3 o_dir = (InverseVMatrix * vec4(outDir, 0.0)).xyz;
//                     vec3 texcoord = vec3(o_dir.x, -o_dir.z, o_dir.y);
//                     vec4 color = textureCube(cube, texcoord);
//                     gl_FragData[0] = max(dot(light, normal)*0.5 + 0.5, 0.0) * color;
//                     normal = normal * 0.5 + vec3(0.5);
//                     gl_FragData[1] = vec4(normal, 0.0);
//                     // gl_FragColor = color; //vec4(normalTex, 1.0); //color;
//                     // gl_FragColor.w = 1.0;
//                 }`;

//                 shader = new CGE.Shader();
//                 shader.setShaderText(vertexShaderText, fragmentShaderText);
//                 shader.addAttribName(CGE.AttribType.POSITION, 'Position');
//                 shader.addAttribName(CGE.AttribType.NORMAL, 'Normal');
//                 shader.addAttribName(CGE.AttribType.TANGENT, 'Tangent');
//                 shader.addAttribName(CGE.AttribType.UV0, 'UV');
//                 shader.addTextureName(CGE.MapType.AMBIENT, 'cube');
//                 shader.addTextureName(CGE.MapType.NORMAL, 'normalMap');
//                 shader.addMatrixName(CGE.MatrixType.VMatrix, 'VMatrix');
//                 shader.addMatrixName(CGE.MatrixType.MVMatrix, 'MVMatrix');
//                 shader.addMatrixName(CGE.MatrixType.InverseVMatrix, 'InverseVMatrix');
//                 shader.addMatrixName(CGE.MatrixType.MVPMatrix, 'MVPMatrix');
//                 shader.addMatrixName(CGE.MatrixType.NormalWMatrix, 'NormalWMatrix');
//                 shader.addMatrixName(CGE.MatrixType.NormalMVMatrix, 'NormalMVMatrix');
//             }
//             return shader;
//         };
//     }(),
// });

// CGE.CubeMaterial.prototype = Object.assign(Object.create(CGE.Material.prototype), {
//     constructor: CGE.CubeMaterial,

//     setCubeMap: function(cubeTexture) {
//         this._cubeMap = cubeTexture;
//     },

//     setNormalMap: function(normalTexture) {
//         this._normalMap = normalTexture;
//     },

//     getMapProvide: function() {
//          return [
//             {
//                 map: this._cubeMap,
//                 type: CGE.MapType.AMBIENT,
//             },
//             {
//                 map: this._normalMap,
//                 type: CGE.MapType.NORMAL,
//             },
//         ];
//     },
// });

// // ================================ DeferredMaterial ======================================
