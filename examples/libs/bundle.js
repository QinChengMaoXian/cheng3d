(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CGE"] = factory();
	else
		root["CGE"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CGE.ts":
/*!********************!*\
  !*** ./src/CGE.ts ***!
  \********************/
/*! exports provided: Logger, Vector3, Vector4, Quaternion, Matrix4, Plane, Ray, Transform, Triangle, Base, Event, EventDispatcher, Timer, Bounding, AABB, OBB, SphereBounding, Material, DiffuseMaterial, ColorMaterial, StandardMaterial, CartoonMaterial, SkyboxMaterial, ReferMaterial, Light, DirectionLight, PointLight, SpotLight, Geometry, Shader, Texture2D, TextureCube, Frame, FrameState, ShaderConst, Object3D, Camera, Component, Entity, Mesh, ComponentType, Scene, ColladaLoader, GltfLoader, OBJLoader, Loader, triangleIntersect, Renderer, WebGLRenderer, PEType, PEBase, FXAA, Application, Platform, Sprite, SphereGeometry, BoxGeometry, generateUUID, GLMAT_EPSILON, USE_MULTI_RENDERER, VERSION, GetTypeCount, GetObjectCount, init, AlphaType, FaceType, ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, DST_COLOR, ONE_MINUS_DST_COLOR, SRC_ALPHA_SATURATE, FUNC_ADD, BLEND_EQUATION, BLEND_EQUATION_RGB, BLEND_EQUATION_ALPHA, FUNC_SUBTRACT, FUNC_REVERSE_SUBTRACT, BLEND_DST_RGB, BLEND_SRC_RGB, BLEND_DST_ALPHA, BLEND_SRC_ALPHA, ONE_MINUS_CONSTANT_COLOR, CONSTANT_ALPHA, ONE_MINUS_CONSTANT_ALPHA, BLEND_COLOR, BYTE, UNSIGNED_BYTE, SHORT, UNSIGNED_SHORT, INT, UNSIGNED_INT, FLOAT, UNSIGNED_INT_24_8, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_SHORT_5_6_5, DEPTH_ATTACHMENT, STENCIL_ATTACHMENT, DEPTH_STENCIL_ATTACHMENT, COLOR_ATTACHMENT0, COLOR_ATTACHMENT1, COLOR_ATTACHMENT2, COLOR_ATTACHMENT3, COLOR_ATTACHMENT4, COLOR_ATTACHMENT5, COLOR_ATTACHMENT6, COLOR_ATTACHMENT7, COLOR_ATTACHMENT8, COLOR_ATTACHMENT9, COLOR_ATTACHMENT10, COLOR_ATTACHMENT11, COLOR_ATTACHMENT12, COLOR_ATTACHMENT13, COLOR_ATTACHMENT14, COLOR_ATTACHMENT15, POINTS, LINES, LINE_LOOP, LINE_STRIP, TRIANGLES, TRIANGLE_STRIP, TRIANGLE_FAN, STREAM_DRAW, STATIC_DRAW, DYNAMIC_DRAW, FLOAT_VEC2, FLOAT_VEC3, FLOAT_VEC4, INT_VEC2, INT_VEC3, INT_VEC4, BOOL, BOOL_VEC2, BOOL_VEC3, BOOL_VEC4, FLOAT_MAT2, FLOAT_MAT3, FLOAT_MAT4, FLOAT_MAT2x3, FLOAT_MAT2x4, FLOAT_MAT3x2, FLOAT_MAT3x4, FLOAT_MAT4x2, FLOAT_MAT4x3, SAMPLER_2D, SAMPLER_3D, SAMPLER_CUBE, SAMPLER_2D_SHADOW, DEPTH_COMPONENT, ALPHA, RGB, RGBA, RGB565, DEPTH_STENCIL, NEAREST, LINEAR, NEAREST_MIPMAP_NEAREST, LINEAR_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_LINEAR, REPEAT, CLAMP_TO_EDGE, MIRRORED_REPEAT, FRONT, BACK, FRONT_AND_BACK, NEVER, LESS, EQUAL, LEQUAL, GREATER, NOTEQUAL, GEQUAL, ALWAYS, KEEP, REPLACE, INCR, DECR, INCR_WRAP, DECR_WRAP, INVERT, CW, CCW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Base */ "./src/core/Base.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return _core_Base__WEBPACK_IMPORTED_MODULE_0__["generateUUID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLMAT_EPSILON", function() { return _core_Base__WEBPACK_IMPORTED_MODULE_0__["GLMAT_EPSILON"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "USE_MULTI_RENDERER", function() { return _core_Base__WEBPACK_IMPORTED_MODULE_0__["USE_MULTI_RENDERER"]; });

/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Logger */ "./src/core/Logger.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _core_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"]; });

/* harmony import */ var _core_Static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Static */ "./src/core/Static.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return _core_Static__WEBPACK_IMPORTED_MODULE_2__["VERSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GetTypeCount", function() { return _core_Static__WEBPACK_IMPORTED_MODULE_2__["GetTypeCount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GetObjectCount", function() { return _core_Static__WEBPACK_IMPORTED_MODULE_2__["GetObjectCount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _core_Static__WEBPACK_IMPORTED_MODULE_2__["init"]; });

/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math/Vector3 */ "./src/math/Vector3.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector3", function() { return _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"]; });

/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math/Vector4 */ "./src/math/Vector4.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector4", function() { return _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"]; });

/* harmony import */ var _math_Quaternion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math/Quaternion */ "./src/math/Quaternion.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quaternion", function() { return _math_Quaternion__WEBPACK_IMPORTED_MODULE_5__["Quaternion"]; });

/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix4", function() { return _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]; });

/* harmony import */ var _math_Plane__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math/Plane */ "./src/math/Plane.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return _math_Plane__WEBPACK_IMPORTED_MODULE_7__["Plane"]; });

/* harmony import */ var _math_Ray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/Ray */ "./src/math/Ray.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return _math_Ray__WEBPACK_IMPORTED_MODULE_8__["Ray"]; });

/* harmony import */ var _math_Transform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./math/Transform */ "./src/math/Transform.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return _math_Transform__WEBPACK_IMPORTED_MODULE_9__["Transform"]; });

/* harmony import */ var _math_Triangle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./math/Triangle */ "./src/math/Triangle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return _math_Triangle__WEBPACK_IMPORTED_MODULE_10__["Triangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"]; });

/* harmony import */ var _core_Event__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/Event */ "./src/core/Event.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return _core_Event__WEBPACK_IMPORTED_MODULE_11__["Event"]; });

/* harmony import */ var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/EventDispatcher */ "./src/core/EventDispatcher.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_12__["EventDispatcher"]; });

/* harmony import */ var _core_Timer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/Timer */ "./src/core/Timer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return _core_Timer__WEBPACK_IMPORTED_MODULE_13__["Timer"]; });

/* harmony import */ var _bounding_Bounding__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bounding/Bounding */ "./src/bounding/Bounding.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounding", function() { return _bounding_Bounding__WEBPACK_IMPORTED_MODULE_14__["Bounding"]; });

/* harmony import */ var _bounding_AABB__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./bounding/AABB */ "./src/bounding/AABB.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AABB", function() { return _bounding_AABB__WEBPACK_IMPORTED_MODULE_15__["AABB"]; });

/* harmony import */ var _bounding_OBB__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./bounding/OBB */ "./src/bounding/OBB.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OBB", function() { return _bounding_OBB__WEBPACK_IMPORTED_MODULE_16__["OBB"]; });

/* harmony import */ var _bounding_SphereBounding__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./bounding/SphereBounding */ "./src/bounding/SphereBounding.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SphereBounding", function() { return _bounding_SphereBounding__WEBPACK_IMPORTED_MODULE_17__["SphereBounding"]; });

/* harmony import */ var _material_Material__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./material/Material */ "./src/material/Material.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return _material_Material__WEBPACK_IMPORTED_MODULE_18__["Material"]; });

/* harmony import */ var _material_DiffuseMaterial__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./material/DiffuseMaterial */ "./src/material/DiffuseMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiffuseMaterial", function() { return _material_DiffuseMaterial__WEBPACK_IMPORTED_MODULE_19__["DiffuseMaterial"]; });

/* harmony import */ var _material_ColorMaterial__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./material/ColorMaterial */ "./src/material/ColorMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorMaterial", function() { return _material_ColorMaterial__WEBPACK_IMPORTED_MODULE_20__["ColorMaterial"]; });

/* harmony import */ var _material_StandardMaterial__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./material/StandardMaterial */ "./src/material/StandardMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardMaterial", function() { return _material_StandardMaterial__WEBPACK_IMPORTED_MODULE_21__["StandardMaterial"]; });

/* harmony import */ var _material_CartoonMaterial__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./material/CartoonMaterial */ "./src/material/CartoonMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CartoonMaterial", function() { return _material_CartoonMaterial__WEBPACK_IMPORTED_MODULE_22__["CartoonMaterial"]; });

/* harmony import */ var _material_SkyboxMaterial__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./material/SkyboxMaterial */ "./src/material/SkyboxMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxMaterial", function() { return _material_SkyboxMaterial__WEBPACK_IMPORTED_MODULE_23__["SkyboxMaterial"]; });

/* harmony import */ var _material_ReferMaterial__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./material/ReferMaterial */ "./src/material/ReferMaterial.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReferMaterial", function() { return _material_ReferMaterial__WEBPACK_IMPORTED_MODULE_24__["ReferMaterial"]; });

/* harmony import */ var _light_Light__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./light/Light */ "./src/light/Light.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Light", function() { return _light_Light__WEBPACK_IMPORTED_MODULE_25__["Light"]; });

/* harmony import */ var _light_DirectionLight__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./light/DirectionLight */ "./src/light/DirectionLight.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectionLight", function() { return _light_DirectionLight__WEBPACK_IMPORTED_MODULE_26__["DirectionLight"]; });

/* harmony import */ var _light_PointLight__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./light/PointLight */ "./src/light/PointLight.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointLight", function() { return _light_PointLight__WEBPACK_IMPORTED_MODULE_27__["PointLight"]; });

/* harmony import */ var _light_SpotLight__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./light/SpotLight */ "./src/light/SpotLight.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpotLight", function() { return _light_SpotLight__WEBPACK_IMPORTED_MODULE_28__["SpotLight"]; });

/* harmony import */ var _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./graphics/GraphicsTypes */ "./src/graphics/GraphicsTypes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlphaType", function() { return _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_29__["AlphaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FaceType", function() { return _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_29__["FaceType"]; });

/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZERO", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ZERO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SRC_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SRC_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_SRC_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SRC_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_SRC_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DST_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DST_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_DST_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DST_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DST_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_DST_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA_SATURATE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SRC_ALPHA_SATURATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FUNC_ADD", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FUNC_ADD"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_EQUATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_RGB", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_EQUATION_RGB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_EQUATION_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FUNC_SUBTRACT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FUNC_SUBTRACT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FUNC_REVERSE_SUBTRACT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FUNC_REVERSE_SUBTRACT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_RGB", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_DST_RGB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_RGB", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_SRC_RGB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_DST_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_SRC_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_CONSTANT_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONSTANT_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["CONSTANT_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ONE_MINUS_CONSTANT_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BLEND_COLOR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BLEND_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BYTE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BYTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_BYTE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_BYTE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHORT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SHORT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_SHORT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_INT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_24_8", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_INT_24_8"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_4_4_4_4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_SHORT_4_4_4_4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_5_5_1", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_SHORT_5_5_5_1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_6_5", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["UNSIGNED_SHORT_5_6_5"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEPTH_ATTACHMENT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DEPTH_ATTACHMENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STENCIL_ATTACHMENT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["STENCIL_ATTACHMENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL_ATTACHMENT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DEPTH_STENCIL_ATTACHMENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT0", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT1", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT5", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT5"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT6", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT6"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT7", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT7"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT8", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT8"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT9", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT9"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT10", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT10"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT11", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT11"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT12", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT12"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT13", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT13"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT14", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT14"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT15", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["COLOR_ATTACHMENT15"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "POINTS", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["POINTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINES", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINE_LOOP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINE_LOOP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINE_STRIP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINE_STRIP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRIANGLES", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["TRIANGLES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_STRIP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["TRIANGLE_STRIP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_FAN", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["TRIANGLE_FAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STREAM_DRAW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["STREAM_DRAW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATIC_DRAW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["STATIC_DRAW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DYNAMIC_DRAW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DYNAMIC_DRAW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_VEC2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_VEC3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_VEC4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT_VEC2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INT_VEC2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT_VEC3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INT_VEC3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INT_VEC4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INT_VEC4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BOOL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BOOL_VEC2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BOOL_VEC3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BOOL_VEC4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT2x3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT2x4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT3x2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x4", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT3x4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x2", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT4x2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x3", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FLOAT_MAT4x3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SAMPLER_2D"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_3D", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SAMPLER_3D"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_CUBE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SAMPLER_CUBE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D_SHADOW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["SAMPLER_2D_SHADOW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DEPTH_COMPONENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALPHA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RGB", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["RGB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["RGBA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RGB565", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["RGB565"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DEPTH_STENCIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEAREST", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["NEAREST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINEAR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINEAR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_NEAREST", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["NEAREST_MIPMAP_NEAREST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_NEAREST", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINEAR_MIPMAP_NEAREST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_LINEAR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["NEAREST_MIPMAP_LINEAR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_LINEAR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LINEAR_MIPMAP_LINEAR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REPEAT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["REPEAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLAMP_TO_EDGE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["CLAMP_TO_EDGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MIRRORED_REPEAT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["MIRRORED_REPEAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FRONT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FRONT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BACK", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["BACK"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FRONT_AND_BACK", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["FRONT_AND_BACK"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEVER", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["NEVER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LESS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EQUAL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LEQUAL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["LEQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["GREATER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOTEQUAL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["NOTEQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GEQUAL", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["GEQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALWAYS", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["ALWAYS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KEEP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["KEEP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REPLACE", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["REPLACE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INCR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INCR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECR", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DECR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INCR_WRAP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INCR_WRAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECR_WRAP", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["DECR_WRAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INVERT", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["INVERT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["CW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CCW", function() { return _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_30__["CCW"]; });

/* harmony import */ var _graphics_Geometry__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./graphics/Geometry */ "./src/graphics/Geometry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return _graphics_Geometry__WEBPACK_IMPORTED_MODULE_31__["Geometry"]; });

/* harmony import */ var _graphics_Shader__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./graphics/Shader */ "./src/graphics/Shader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return _graphics_Shader__WEBPACK_IMPORTED_MODULE_32__["Shader"]; });

/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Texture2D", function() { return _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_33__["Texture2D"]; });

/* harmony import */ var _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./graphics/TextureCube */ "./src/graphics/TextureCube.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextureCube", function() { return _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_34__["TextureCube"]; });

/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Frame", function() { return _graphics_Frame__WEBPACK_IMPORTED_MODULE_35__["Frame"]; });

/* harmony import */ var _graphics_FrameState__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./graphics/FrameState */ "./src/graphics/FrameState.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameState", function() { return _graphics_FrameState__WEBPACK_IMPORTED_MODULE_36__["FrameState"]; });

/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShaderConst", function() { return _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_37__["ShaderConst"]; });

/* harmony import */ var _object_Object3D__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./object/Object3D */ "./src/object/Object3D.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Object3D", function() { return _object_Object3D__WEBPACK_IMPORTED_MODULE_38__["Object3D"]; });

/* harmony import */ var _object_Camera__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./object/Camera */ "./src/object/Camera.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _object_Camera__WEBPACK_IMPORTED_MODULE_39__["Camera"]; });

/* harmony import */ var _object_Component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./object/Component */ "./src/object/Component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _object_Component__WEBPACK_IMPORTED_MODULE_40__["Component"]; });

/* harmony import */ var _object_Entity__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./object/Entity */ "./src/object/Entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _object_Entity__WEBPACK_IMPORTED_MODULE_41__["Entity"]; });

/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./object/Mesh */ "./src/object/Mesh.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _object_Mesh__WEBPACK_IMPORTED_MODULE_42__["Mesh"]; });

/* harmony import */ var _object_ObjectType__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./object/ObjectType */ "./src/object/ObjectType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentType", function() { return _object_ObjectType__WEBPACK_IMPORTED_MODULE_43__["ComponentType"]; });

/* harmony import */ var _object_Scene__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./object/Scene */ "./src/object/Scene.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _object_Scene__WEBPACK_IMPORTED_MODULE_44__["Scene"]; });

/* harmony import */ var _extensions_ColladaLoader__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./extensions/ColladaLoader */ "./src/extensions/ColladaLoader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColladaLoader", function() { return _extensions_ColladaLoader__WEBPACK_IMPORTED_MODULE_45__["ColladaLoader"]; });

/* harmony import */ var _extensions_GltfLoader__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./extensions/GltfLoader */ "./src/extensions/GltfLoader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GltfLoader", function() { return _extensions_GltfLoader__WEBPACK_IMPORTED_MODULE_46__["GltfLoader"]; });

/* harmony import */ var _extensions_ObjLoader__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./extensions/ObjLoader */ "./src/extensions/ObjLoader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OBJLoader", function() { return _extensions_ObjLoader__WEBPACK_IMPORTED_MODULE_47__["OBJLoader"]; });

/* harmony import */ var _io_Loader__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./io/Loader */ "./src/io/Loader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return _io_Loader__WEBPACK_IMPORTED_MODULE_48__["Loader"]; });

/* harmony import */ var _util_TriangleIntersect__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./util/TriangleIntersect */ "./src/util/TriangleIntersect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "triangleIntersect", function() { return _util_TriangleIntersect__WEBPACK_IMPORTED_MODULE_49__["triangleIntersect"]; });

/* harmony import */ var _renderer_Renderer__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./renderer/Renderer */ "./src/renderer/Renderer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _renderer_Renderer__WEBPACK_IMPORTED_MODULE_50__["Renderer"]; });

/* harmony import */ var _renderer_WebGLRenderer__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./renderer/WebGLRenderer */ "./src/renderer/WebGLRenderer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLRenderer", function() { return _renderer_WebGLRenderer__WEBPACK_IMPORTED_MODULE_51__["WebGLRenderer"]; });

/* harmony import */ var _renderer_postEffect_PEBase__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./renderer/postEffect/PEBase */ "./src/renderer/postEffect/PEBase.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PEType", function() { return _renderer_postEffect_PEBase__WEBPACK_IMPORTED_MODULE_52__["PEType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PEBase", function() { return _renderer_postEffect_PEBase__WEBPACK_IMPORTED_MODULE_52__["PEBase"]; });

/* harmony import */ var _renderer_postEffect_FXAA__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./renderer/postEffect/FXAA */ "./src/renderer/postEffect/FXAA.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FXAA", function() { return _renderer_postEffect_FXAA__WEBPACK_IMPORTED_MODULE_53__["FXAA"]; });

/* harmony import */ var _app_Application__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./app/Application */ "./src/app/Application.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _app_Application__WEBPACK_IMPORTED_MODULE_54__["Application"]; });

/* harmony import */ var _platform_Platform__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./platform/Platform */ "./src/platform/Platform.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return _platform_Platform__WEBPACK_IMPORTED_MODULE_55__["Platform"]; });

/* harmony import */ var _ui_Sprite__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./ui/Sprite */ "./src/ui/Sprite.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return _ui_Sprite__WEBPACK_IMPORTED_MODULE_56__["Sprite"]; });

/* harmony import */ var _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./util/GeometryUtil */ "./src/util/GeometryUtil.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SphereGeometry", function() { return _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_57__["SphereGeometry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoxGeometry", function() { return _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_57__["BoxGeometry"]; });






























































/***/ }),

/***/ "./src/app/Application.ts":
/*!********************************!*\
  !*** ./src/app/Application.ts ***!
  \********************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _object_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/Scene */ "./src/object/Scene.ts");
/* harmony import */ var _ui_Stage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/Stage */ "./src/ui/Stage.ts");
/* harmony import */ var _renderer_WebGLRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderer/WebGLRenderer */ "./src/renderer/WebGLRenderer.ts");
/* harmony import */ var _core_Timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Timer */ "./src/core/Timer.ts");
/* harmony import */ var _object_Object3D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../object/Object3D */ "./src/object/Object3D.ts");
/* harmony import */ var _platform_Platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../platform/Platform */ "./src/platform/Platform.ts");
/* harmony import */ var _object_Camera__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../object/Camera */ "./src/object/Camera.ts");
/* harmony import */ var _core_Event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/Event */ "./src/core/Event.ts");
/* harmony import */ var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/EventDispatcher */ "./src/core/EventDispatcher.ts");









/**
 * 中心控制类
 * 控制renderer,scene,uistage初始化。
 * 所有输入事件的入口。
 * 控制渲染循环开始与结束。
 */
class Application extends _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_8__["EventDispatcher"] {
    constructor() {
        super();
        /** 是否为慢速渲染默认60帧，当这个设置为true时，降低为30帧 */
        this.slow = false;
        /** 停止标签，为true时，下一帧将停止循环 */
        this._stop = false;
        /** 帧数计数，并非为渲染帧数，逻辑帧数 */
        this._frameCount = 0;
        /** requestAnimationFrame返回的id */
        this._frameId = -1;
        /** 当前指针划过的spr队列 */
        this._cacheUIs = [];
        /** 指针按下的队列 */
        this._preClickUIs = [];
    }
    /**
     * 通过长宽初始化全部
     * @param width
     * @param height
     */
    init(width, height) {
        this._timer = new _core_Timer__WEBPACK_IMPORTED_MODULE_3__["Timer"]();
        this._stage = new _ui_Stage__WEBPACK_IMPORTED_MODULE_1__["Stage"]();
        this._stage.setSize(width, height);
        this._scene = new _object_Scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        this._obj3d = new _object_Object3D__WEBPACK_IMPORTED_MODULE_4__["Object3D"]();
        this._obj3d.addChild(this._scene);
        this._camera = new _object_Camera__WEBPACK_IMPORTED_MODULE_6__["Camera"](width, height);
        // let w = Math.floor(width / 2.0);
        // let h = Math.floor(height / 2.0);
        // this._camera.enableOrthographicMode(-w, w, -h, h, 1, 2000);
        this._renderer = new _renderer_WebGLRenderer__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]();
        this._renderer.init(width, height);
        this._listenersMap = new Map();
        this._addEventListeners();
        this._loopBindThis = this._loop.bind(this);
    }
    /**
     * 重新设置长宽
     * @param width
     * @param height
     */
    setSize(width, height) {
        this._camera.resize(width, height);
        this._stage.setSize(width, height);
        this._renderer.setSize(width, height);
    }
    /**
     * app启动
     */
    start() {
        this._stop = false;
        this._startLoop();
    }
    /**
     * app停止
     */
    stop() {
        this._stop = true;
        _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].cancelAnimationFrame(this._frameId);
    }
    /**
     * 启动循环
     */
    _startLoop() {
        this._lastTime = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].now();
        this._loop();
    }
    /**
     * 主循环
     */
    _loop() {
        if (this._stop) {
            return;
        }
        this._frameId = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].requestAnimationFrame(this._loopBindThis);
        this._frameCount++;
        if (this.slow) {
            if (this._frameCount % 2 === 1) {
                return;
            }
        }
        let now = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].now();
        let delta = now - this._lastTime;
        this._lastTime = now;
        this._update(delta);
        this._render();
    }
    /**
     * 每帧更新
     * @param delta 间隔毫秒
     */
    _update(delta) {
        // 场景更新前。
        this._timer.preUpdate(delta);
        this._scene.update(delta);
        this._stage.update(delta);
        // 当前相机可以不在场景节点中。
        this._camera.update(delta);
        // 场景更新后。
        this._timer.lateUpdate(delta);
    }
    /**
     * 渲染场景
     */
    _render() {
        // 渲染3d场景
        this._renderer.renderScene(this._scene, this._scene.getActiveCamera() || this._camera);
        // todo 渲染2dUI
    }
    /**
     * 添加系统监听的方法
     * @param key
     * @param listener
     */
    _addEventListener(key, listener) {
        let canvas = this._renderer.getCanvas();
        let document = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].document();
        document.addEventListener(key, listener);
        // if (key.indexOf('key') > -1) {
        //     document.addEventListener(key, listener);
        // } else {
        //     canvas.addEventListener(key, listener);
        // }
        this._listenersMap.set(key, listener);
    }
    /**
     * 添加所有的系统监听
     * 其中mouse与touch相关的添加在canvas上，key相关的只能添加在document上。
     */
    _addEventListeners() {
        this._addEventListener('mousedown', this._onMouseEvent.bind(this));
        this._addEventListener('mousemove', this._onMouseEvent.bind(this));
        this._addEventListener('mouseup', this._onMouseEvent.bind(this));
        this._addEventListener('mouseover', this._onMouseEvent.bind(this));
        this._addEventListener('mouseout', this._onMouseEvent.bind(this));
        this._addEventListener('touchstart', this._onTouchStart.bind(this));
        this._addEventListener('touchmove', this._onTouchMove.bind(this));
        this._addEventListener('touchend', this._onTouchEnd.bind(this));
        this._addEventListener('touchcancel', this._onTouchCancel.bind(this));
        let document = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].document();
        document.addEventListener('keydown', this._onKeyboardEvent.bind(this));
        document.addEventListener('keypress', this._onKeyboardEvent.bind(this));
        document.addEventListener('keyup', this._onKeyboardEvent.bind(this));
    }
    /**
     * 移除所有的系统监听
     */
    _removeEventListeners() {
        let canvas = this._renderer.getCanvas();
        let document = _platform_Platform__WEBPACK_IMPORTED_MODULE_5__["Platform"].document();
        this._listenersMap.forEach((listener, key) => {
            if (key.indexOf('key') > -1) {
                document.removeEventListener(key, listener);
            }
            else {
                canvas.removeEventListener(key, listener);
            }
        });
        this._listenersMap.clear();
    }
    /**
     * 鼠标事件解析
     * @param e
     */
    _onMouseEvent(e) {
        let event = new _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"](e);
        this._checkStagePick(event);
        this._postMouseEvent(event);
    }
    _onTouchStart(e) {
    }
    _onTouchMove(e) {
    }
    _onTouchEnd(e) {
    }
    _onTouchCancel(e) {
    }
    _onKeyboardEvent(e) {
        let event = new _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"](e);
        this._cacheUIs.forEach(sp => {
            let type = _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].TypeMap[e.type];
            sp.event(type, [event]);
        });
    }
    /**
     * 鼠标事件后处理
     * 判定click、mouse out以及mouse over等;
     * @param e
     */
    _postMouseEvent(e) {
        let type = e.type;
        let path = e.path;
        let caches = this._cacheUIs;
        e.type = _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_OUT;
        caches.forEach(sp => {
            let idx = path.indexOf(sp);
            if (idx < 0) {
                sp.event(_core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_OUT, [e]);
            }
        });
        e.type = _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_OVER;
        let newCache = [];
        path.forEach(sp => {
            let idx = caches.indexOf(sp);
            if (idx < 0) {
                sp.event(_core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_OVER, [e]);
            }
            newCache.push(sp);
        });
        this._cacheUIs = newCache;
        if (type === _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_DOWN) {
            let newUIs = [];
            path.forEach(sp => {
                newUIs.push(sp);
            });
            this._preClickUIs = newUIs;
        }
        else {
            let preClicks = this._preClickUIs;
            let newUIs = [];
            preClicks.forEach(sp => {
                let idx = path.indexOf(sp);
                if (idx > -1) {
                    newUIs.push(sp);
                }
            });
            this._preClickUIs = newUIs;
        }
        e.type = _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].CLICK;
        if (type === _core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].MOUSE_UP) {
            let preClicks = this._preClickUIs;
            preClicks.forEach(sp => {
                sp.event(_core_Event__WEBPACK_IMPORTED_MODULE_7__["Event"].CLICK, [e]);
            });
            this._preClickUIs = [];
        }
        e.type = type;
    }
    _checkStagePick(e) {
        let stage = this._stage;
        let x = e.stageX;
        let y = e.stageY;
        stage.checkChildPick(x, y, e);
    }
    getRenderer() {
        return this._renderer;
    }
    getScene() {
        return this._scene;
    }
    getStage() {
        return this._stage;
    }
    getTimer() {
        return this._timer;
    }
    getCamera() {
        return this._camera;
    }
    /**
     * 销毁app
     */
    destroy() {
        this._removeEventListeners();
    }
}


/***/ }),

/***/ "./src/bounding/AABB.ts":
/*!******************************!*\
  !*** ./src/bounding/AABB.ts ***!
  \******************************/
/*! exports provided: AABB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AABB", function() { return AABB; });
/* harmony import */ var _Bounding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bounding */ "./src/bounding/Bounding.ts");
/* harmony import */ var _math_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Box */ "./src/math/Box.ts");


class AABB extends _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"] {
    constructor() {
        super();
        this._box = new _math_Box__WEBPACK_IMPORTED_MODULE_1__["Box"]();
    }
    applyMatrix(mat) {
        this._box.applyMatrix(mat);
    }
    intersect(bounding) {
        const type = bounding.getType();
        switch (type) {
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_SPHERE:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectSphereToAABB(bounding, this);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_AABB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectAABB(bounding, this);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_OBB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectOBBToAABB(bounding, this);
            default:
                return false;
        }
    }
    setMin(x, y, z) {
        this._box.min.set(x, y, z);
    }
    setMinAt(vec) {
        this._box.min.setAt(vec);
    }
    setMax(x, y, z) {
        this._box.max.set(x, y, z);
    }
    setMaxAt(vec) {
        this._box.max.setAt(vec);
    }
    getMin() {
        return this._box.min;
    }
    getMax() {
        return this._box.max;
    }
    getType() {
        return _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_AABB;
    }
    copy(aabb) {
        this._box.copy(aabb._box);
    }
    get box() {
        return this._box;
    }
    clone() {
        const aabb = new AABB();
        aabb.copy(this);
        return aabb;
    }
}


/***/ }),

/***/ "./src/bounding/Bounding.ts":
/*!**********************************!*\
  !*** ./src/bounding/Bounding.ts ***!
  \**********************************/
/*! exports provided: BoundingType, Bounding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoundingType", function() { return BoundingType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounding", function() { return Bounding; });
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");

var BoundingType;
(function (BoundingType) {
    BoundingType[BoundingType["TYPE_SPHERE"] = 0] = "TYPE_SPHERE";
    BoundingType[BoundingType["TYPE_AABB"] = 1] = "TYPE_AABB";
    BoundingType[BoundingType["TYPE_OBB"] = 2] = "TYPE_OBB";
})(BoundingType || (BoundingType = {}));
/**
 * 包围盒基类
 */
class Bounding {
    constructor() {
    }
    applyMatrix(mat) {
    }
    getType() {
        return -1;
    }
    intersect(bounding) {
        return false;
    }
    copy(bounding) {
    }
    clone() {
        return null;
    }
    static _buildObbVecs(obb, dirs, poses) {
        const center = obb.getPosition();
        const rot = obb.getRoatation();
        const size = obb.getSize();
        const aux = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp;
        dirs[0].set(1, 0, 0);
        dirs[0].applyQuaternion(rot);
        dirs[1].set(0, 1, 0);
        dirs[1].applyQuaternion(rot);
        dirs[2].set(0, 0, 1);
        dirs[2].applyQuaternion(rot);
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                    let pos = poses[k * 4 + j * 2 + i];
                    pos.setAt(center);
                    aux.copy(dirs[0]);
                    pos.addAt(i === 1 ? aux.negate().mul(size.x) : aux.mul(size.x));
                    aux.copy(dirs[1]);
                    pos.addAt(j === 1 ? aux.negate().mul(size.y) : aux.mul(size.y));
                    aux.copy(dirs[2]);
                    pos.addAt(k === 1 ? aux.negate().mul(size.z) : aux.mul(size.z));
                }
            }
        }
    }
    static _intersectCheck(asix, poses1, poses2) {
        let min1 = Infinity;
        let max1 = -Infinity;
        let min2 = Infinity;
        let max2 = -Infinity;
        let l = poses1.length;
        let temp;
        for (let i = 0; i < l; i++) {
            temp = asix.dot(poses1[i]);
            min1 = Math.min(min1, temp);
            max1 = Math.max(max1, temp);
        }
        l = poses2.length;
        for (let i = 0; i < l; i++) {
            temp = asix.dot(poses2[i]);
            min2 = Math.min(min2, temp);
            max2 = Math.max(max2, temp);
        }
        if (min1 > max2 || min2 > max1) {
            return true;
        }
        else {
            return false;
        }
    }
    static intersectOBB(obb1, obb2) {
        const obb1Dir = Bounding._obb1Dir;
        const obb2Dir = Bounding._obb2Dir;
        const obb1Pos = Bounding._obb1Pos;
        const obb2Pos = Bounding._obb2Pos;
        Bounding._buildObbVecs(obb1, obb1Dir, obb1Pos);
        Bounding._buildObbVecs(obb2, obb2Dir, obb2Pos);
        const dir1length = obb1Dir.length;
        const dir2length = obb2Dir.length;
        const aux = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp;
        for (let i = 0; i < dir1length; i++) {
            if (Bounding._intersectCheck(obb1Dir[i], obb1Pos, obb2Pos)) {
                return false;
            }
        }
        for (let i = 0; i < dir2length; i++) {
            if (Bounding._intersectCheck(obb2Dir[i], obb1Pos, obb2Pos)) {
                return false;
            }
        }
        for (let i = 0; i < dir1length; i++) {
            for (let j = 0; j < dir2length; j++) {
                if (Bounding._intersectCheck(aux.crossBy(obb1Dir[i], obb2Dir[j]), obb1Pos, obb2Pos)) {
                    return false;
                }
            }
        }
        return true;
    }
    static intersectAABB(aabb1, aabb2) {
        const min1 = aabb1.getMin();
        const max1 = aabb1.getMax();
        const min2 = aabb2.getMin();
        const max2 = aabb2.getMax();
        if (min1.x > max2.x || max1.x < min2.x) {
            return false;
        }
        if (min1.y > max2.y || max1.y < min2.y) {
            return false;
        }
        if (min1.z > max2.z || max1.z < min2.z) {
            return false;
        }
        return true;
    }
    static intersectSphere(sphere1, sphere2) {
        _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp.copy(sphere1.getPosition());
        _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp.subAt(sphere2.getPosition());
        const s1 = sphere1.getRadius();
        const s2 = sphere2.getRadius();
        return _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp.lengthSquare() <= (s1 * s1 + s2 * s2);
    }
    static intersectSphereToOBB(sphere, obb) {
    }
    static intersectSphereToAABB(sphere, aabb) {
    }
    static intersectOBBToAABB(obb, aabb) {
    }
}
Bounding._obb1Pos = [new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]()];
Bounding._obb2Pos = [new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]()];
Bounding._obb1Dir = [new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]()];
Bounding._obb2Dir = [new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]()];


/***/ }),

/***/ "./src/bounding/OBB.ts":
/*!*****************************!*\
  !*** ./src/bounding/OBB.ts ***!
  \*****************************/
/*! exports provided: OBB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBB", function() { return OBB; });
/* harmony import */ var _Bounding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bounding */ "./src/bounding/Bounding.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Quaternion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Quaternion */ "./src/math/Quaternion.ts");



class OBB extends _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"] {
    constructor() {
        super();
        this._pos = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        this._size = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        this._rotation = new _math_Quaternion__WEBPACK_IMPORTED_MODULE_2__["Quaternion"]();
    }
    applyMatrix(mat) {
        // TODO: 这里怎么写？
    }
    intersect(bounding) {
        const type = bounding.getType();
        switch (type) {
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_SPHERE:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectSphereToOBB(bounding, this);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_AABB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectOBBToAABB(this, bounding);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_OBB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectOBB(bounding, this);
            default:
                return false;
        }
    }
    setPosition(x, y, z) {
        this._pos.set(x, y, z);
    }
    setPositionAt(vec) {
        this._pos.setAt(vec);
    }
    setSize(x, y, z) {
        this._size.set(x, y, z);
    }
    setSizeAt(vec) {
        this._size.setAt(vec);
    }
    setRotation(x, y, z, w) {
        this._rotation.set(x, y, z, w);
    }
    setRotationAt(quat) {
        this._rotation.setAt(quat);
    }
    getPosition() {
        return this._pos;
    }
    getSize() {
        return this._size;
    }
    getRoatation() {
        return this._rotation;
    }
    getType() {
        return _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_OBB;
    }
    copy(obb) {
        this._pos.copy(obb._pos);
        this._rotation.copy(obb._rotation);
        this._size.copy(obb._size);
    }
    clone() {
        const obb = new OBB();
        obb.copy(this);
        return obb;
    }
}


/***/ }),

/***/ "./src/bounding/SphereBounding.ts":
/*!****************************************!*\
  !*** ./src/bounding/SphereBounding.ts ***!
  \****************************************/
/*! exports provided: SphereBounding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SphereBounding", function() { return SphereBounding; });
/* harmony import */ var _Bounding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bounding */ "./src/bounding/Bounding.ts");
/* harmony import */ var _math_Sphere__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Sphere */ "./src/math/Sphere.ts");


class SphereBounding extends _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"] {
    constructor() {
        super();
        this._sphere = new _math_Sphere__WEBPACK_IMPORTED_MODULE_1__["Sphere"]();
    }
    setFrom(sb, mat) {
        this._sphere.copy(sb._sphere);
        this._sphere.applyMatrix(mat);
    }
    applyMatrix(mat) {
        this._sphere.applyMatrix(mat);
    }
    intersect(bounding) {
        const type = bounding.getType();
        switch (type) {
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_SPHERE:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectSphere(bounding, this);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_AABB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectSphereToAABB(this, bounding);
            case _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_OBB:
                return _Bounding__WEBPACK_IMPORTED_MODULE_0__["Bounding"].intersectSphereToOBB(this, bounding);
            default:
                return false;
        }
    }
    setPosition(x, y, z) {
        this._sphere.pos.set(x, y, z);
    }
    setPositionAt(vec) {
        this._sphere.pos.setAt(vec);
    }
    setRadius(r) {
        this._sphere.radius = r;
    }
    getPosition() {
        return this._sphere.pos;
    }
    getRadius() {
        return this._sphere.radius;
    }
    getType() {
        return _Bounding__WEBPACK_IMPORTED_MODULE_0__["BoundingType"].TYPE_SPHERE;
    }
    copy(sb) {
        this._sphere.copy(sb._sphere);
    }
    clone() {
        const sphere = new SphereBounding();
        sphere.copy(this);
        return sphere;
    }
    get sphere() {
        return this._sphere;
    }
}


/***/ }),

/***/ "./src/core/Base.ts":
/*!**************************!*\
  !*** ./src/core/Base.ts ***!
  \**************************/
/*! exports provided: Base, generateUUID, GLMAT_EPSILON, USE_MULTI_RENDERER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLMAT_EPSILON", function() { return GLMAT_EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_MULTI_RENDERER", function() { return USE_MULTI_RENDERER; });
/* harmony import */ var _Static__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Static */ "./src/core/Static.ts");
/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventDispatcher */ "./src/core/EventDispatcher.ts");


class Base extends _EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"] {
    constructor() {
        super();
        this._uuid = generateUUID();
        this._id = Object(_Static__WEBPACK_IMPORTED_MODULE_0__["GetObjectCount"])();
        this.name = '';
    }
    get id() {
        return this._id;
    }
    get uuid() {
        return this._uuid;
    }
    update(delta) {
    }
    toJson(obj) {
        const result = obj || {};
        result.uuid = this._uuid;
        result.name = this.name;
        result.type = this.constructor.name;
        return result;
    }
    fromJson(obj) {
        this._uuid = obj.uuid;
        this.name = obj.name;
    }
}
function generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
const GLMAT_EPSILON = 0.000001;
const USE_MULTI_RENDERER = false;


/***/ }),

/***/ "./src/core/Event.ts":
/*!***************************!*\
  !*** ./src/core/Event.ts ***!
  \***************************/
/*! exports provided: Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ "./src/core/Base.ts");

class Event extends _Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(e) {
        super();
        this.path = [];
        if (e instanceof MouseEvent) {
            this._x = e.clientX;
            this._y = e.clientY;
            this._movementX = e.movementX;
            this._movementY = e.movementY;
            this._setType(e.type);
        }
        else if (e instanceof KeyboardEvent) {
            this.key = e.key;
            this.keyCode = e.keyCode;
            this._setType(e.type);
        }
        this.altKey = e.altKey;
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.metaKey = e.metaKey;
        this.native = e;
    }
    _setType(type) {
        this._type = Event.TypeMap[type];
    }
    set type(t) {
        this._type = t;
    }
    get type() {
        return this._type;
    }
    get stageX() {
        return this._x;
    }
    get stageY() {
        return this._y;
    }
    get movementX() {
        return this._movementX;
    }
    get movementY() {
        return this._movementY;
    }
}
Event.TypeMap = {
    'mousedown': 'mouse_down',
    'mousemove': 'mouse_move',
    'mouseup': 'mouse_up',
    'mouseover': 'mouse_over',
    'mouseout': 'mouse_out',
    'keydown': 'key_down',
    'keyup': 'key_up',
    'keypress': 'key_press',
    'blur': 'on_blur',
};
/** 鼠标点击事件 */
Event.CLICK = "click";
/** 鼠标按键按下 */
Event.MOUSE_DOWN = "mouse_down";
/** 鼠标移动 */
Event.MOUSE_MOVE = "mouse_move";
/** 鼠标按键抬起 */
Event.MOUSE_UP = "mouse_up";
/** 鼠标物体 */
Event.MOUSE_OVER = "mouse_over";
/** 鼠标离开物体 */
Event.MOUSE_OUT = "mouse_out";
/** 键盘按下 */
Event.KEY_DOWN = "key_down";
/** 键盘抬起 */
Event.KEY_UP = "key_up";
/** 键盘保持 */
Event.KEY_PRESS = "key_press";
/** 重置界面大小 */
Event.CLIENT_RESIZE = "client_resize";
/** 渲染器重置大小 */
Event.RENDERER_RESIZE = "renderer_resize";
Event.DESTROTY = "destroy";
/**  */
Event.LOOP_FRAME = "loop_frame";
Event.ON_BLUR = "on_blur";


/***/ }),

/***/ "./src/core/EventDispatcher.ts":
/*!*************************************!*\
  !*** ./src/core/EventDispatcher.ts ***!
  \*************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
/* harmony import */ var _util_Handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Handler */ "./src/util/Handler.ts");

/**
 * 事件监听与响应
 */
class EventDispatcher {
    constructor() {
    }
    on(type, celler, method, args) {
        this._addEvent(type, celler, method, args, false);
    }
    once(type, celler, method, args) {
        this._addEvent(type, celler, method, args, true);
    }
    off(type, celler, method) {
        let events = this._events;
        if (!events) {
            return;
        }
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l;) {
                let handler = handlers[i];
                if (handler.caller === celler && handler.method === method) {
                    handlers.splice(i, 1);
                    l = handlers.length;
                }
                else {
                    i++;
                }
                handler.clear();
                handler = null;
            }
            if (handlers.length === 0) {
                events.delete(type);
            }
        }
    }
    removeAll() {
        let events = this._events;
        if (!events) {
            return;
        }
        this._events.forEach((handlers, key) => {
            if (handlers) {
                let l = handlers.length;
                for (let i = 0; i < l; i++) {
                    let handler = handlers[i];
                    handler.clear();
                    handler = null;
                }
                handlers.splice(0, l);
            }
        });
        this._events.clear();
        this._events = null;
    }
    event(type, args) {
        let events = this._events;
        if (!events) {
            return null;
        }
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l; i++) {
                let handler = handlers[i];
                return handler.runWith(args);
            }
        }
    }
    _addEvent(type, celler, method, args, once = false) {
        let events = this._events;
        if (!events) {
            events = new Map();
            this._events = events;
        }
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l; i++) {
                let handler = handlers[i];
                if (handler.caller === celler && handler.method === method) {
                    handler.args = args;
                    handler.once = once;
                    return;
                }
            }
        }
        else {
            handlers = [];
            events.set(type, handlers);
        }
        handlers.push(new _util_Handler__WEBPACK_IMPORTED_MODULE_0__["Handler"](celler, method, args, once));
    }
    findEventType(type) {
        let events = this._events;
        if (!events) {
            return false;
        }
        let handers = events.get(type);
        return handers && handers.length > 0;
    }
}


/***/ }),

/***/ "./src/core/Logger.ts":
/*!****************************!*\
  !*** ./src/core/Logger.ts ***!
  \****************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
const Logger = {
    info: function (...message) {
        console.log(...message);
    },
    warn: function (...message) {
        console.warn(...message);
    },
    error: function (...message) {
        console.error(...message);
        throw message;
    },
};


/***/ }),

/***/ "./src/core/Static.ts":
/*!****************************!*\
  !*** ./src/core/Static.ts ***!
  \****************************/
/*! exports provided: VERSION, GetTypeCount, GetObjectCount, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetTypeCount", function() { return GetTypeCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetObjectCount", function() { return GetObjectCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
const VERSION = '05';
const GetTypeCount = function () {
    let TypeCount = 0;
    return function getTypeCount() {
        return TypeCount++;
    };
}();
const GetObjectCount = function () {
    let ObjectCount = 0;
    return function getObjectCount() {
        return ObjectCount++;
    };
}();
function init() {
}


/***/ }),

/***/ "./src/core/Timer.ts":
/*!***************************!*\
  !*** ./src/core/Timer.ts ***!
  \***************************/
/*! exports provided: TimerHandler, Timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerHandler", function() { return TimerHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony import */ var _util_Handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Handler */ "./src/util/Handler.ts");
/* harmony import */ var _util_ObjectPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ObjectPool */ "./src/util/ObjectPool.ts");


class TimerHandler {
    constructor() {
        this.handler = new _util_Handler__WEBPACK_IMPORTED_MODULE_0__["Handler"](null, null);
        this.once = false;
        this.frame = false;
    }
    clearUp() {
        this.handler.clear();
    }
    static create() {
        return TimerHandler.pool.create();
    }
    static recovery(handler) {
        handler.clearUp();
        TimerHandler.pool.recovery(handler);
    }
}
TimerHandler.pool = new _util_ObjectPool__WEBPACK_IMPORTED_MODULE_1__["ObjectPool"](TimerHandler, 10);
class Timer {
    constructor() {
        this.frameTime = 0;
        this._preMap = new Map();
        this._lateMap = new Map();
    }
    once(time, celler, method, args) {
        this._loop(true, false, time, celler, method, args);
    }
    loop(time, celler, method, args) {
        this._loop(false, false, time, celler, method, args);
    }
    frameOnce(time, celler, method, args) {
        this._loop(true, true, time, celler, method, args);
    }
    frameLoop(time, celler, method, args) {
        this._loop(false, true, time, celler, method, args);
    }
    lateOnce(time, celler, method, args) {
        this._loop(true, false, time, celler, method, args, true);
    }
    lateLoop(time, celler, method, args) {
        this._loop(false, false, time, celler, method, args, true);
    }
    lateFrameOnce(time, celler, method, args) {
        this._loop(true, true, time, celler, method, args, true);
    }
    lateFrameLoop(time, celler, method, args) {
        this._loop(false, true, time, celler, method, args, true);
    }
    _remove(celler, method, map) {
        let handlerMap = map.get(celler);
        if (!handlerMap)
            return;
        let handler = handlerMap.get(method);
        if (!handler)
            return;
        TimerHandler.recovery(handler);
        handlerMap.delete(method);
        if (handlerMap.size <= 0) {
            map.delete(handlerMap);
        }
    }
    remove(celler, method) {
        this._remove(celler, method, this._preMap);
        this._remove(celler, method, this._lateMap);
    }
    _clearCeller(celler, map) {
        let handlerMap = map.get(celler);
        if (!handlerMap)
            return;
        handlerMap.forEach((handler, method) => {
            TimerHandler.recovery(handler);
            handlerMap.delete(method);
        });
        map.delete(celler);
    }
    clearCeller(celler) {
        this._clearCeller(celler, this._preMap);
        this._clearCeller(celler, this._lateMap);
    }
    _clearAll(map) {
        map.forEach((handlerMap, celler) => {
            handlerMap.forEach((handler, method) => {
                TimerHandler.recovery(handler);
                handlerMap.delete(method);
            });
            map.delete(celler);
        });
    }
    clearAll() {
        this._clearAll(this._preMap);
        this._clearAll(this._lateMap);
    }
    _loop(once, frame, time, celler, method, args, late = false) {
        let handler = TimerHandler.create();
        handler.handler.setTo(celler, method, args, false);
        handler.once = once;
        handler.frame = frame;
        handler.time = time;
        handler.curTime = time;
        let map = late ? this._lateMap : this._preMap;
        let handlerMap = map.get(celler);
        if (!handlerMap) {
            handlerMap = new Map();
            map.set(celler, handlerMap);
        }
        handlerMap.set(method, handler);
    }
    _update(delta, map) {
        map.forEach((handlerMap, celler) => {
            handlerMap.forEach((handler, method) => {
                handler.curTime -= handler.frame ? 1 : delta;
                if (handler.curTime > 0)
                    return;
                handler.handler.run();
                if (handler.once) {
                    TimerHandler.recovery(handler);
                    handlerMap.delete(method);
                }
                else {
                    handler.curTime = handler.time + handler.curTime;
                }
            });
            if (handlerMap.size === 0) {
                map.delete(celler);
            }
        });
    }
    preUpdate(delta) {
        this.frameTime = delta;
        this._update(delta, this._preMap);
    }
    lateUpdate(delta) {
        this._update(delta, this._lateMap);
    }
}


/***/ }),

/***/ "./src/extensions/ColladaLoader.ts":
/*!*****************************************!*\
  !*** ./src/extensions/ColladaLoader.ts ***!
  \*****************************************/
/*! exports provided: ColladaLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColladaLoader", function() { return ColladaLoader; });
/* harmony import */ var _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/Geometry */ "./src/graphics/Geometry.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");



class ColladaLoader {
    constructor() {
        this._loadState = ColladaLoader.State.NONE;
        this._entity = undefined;
    }
    getLoadState() {
        return this._loadState;
    }
    getEntity() {
        return this._loadState === ColladaLoader.State.LOAD_COMPLETE ? this._entity : undefined;
    }
    load(url, callback) {
        this._changeState(ColladaLoader.State.LOADING_FILE);
        new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        let document = xmlHttp.responseXML;
                        // this._changeState(ColladaLoader.State.CREATE_ENTITY);
                        // callback('document', document);
                        // this._entity = this._loadVertices(document);
                        // if (!this._entity) {
                        //     this._changeState(ColladaLoader.State.LOAD_ERROR);
                        //     callback('error', 'file error');
                        // }
                        // this._changeState(ColladaLoader.State.LOAD_COMPLETE);
                        // resolve(this._entity);
                        resolve(xmlHttp.responseXML);
                    }
                    else {
                        reject(new Error(xmlHttp.statusText));
                    }
                }
            };
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        }).then((document) => {
            this._changeState(ColladaLoader.State.CREATE_ENTITY);
            callback('document', document);
            this._entity = this._loadVertices(document);
            if (!this._entity) {
                this._changeState(ColladaLoader.State.LOAD_ERROR);
                callback('error', 'file error');
            }
            this._changeState(ColladaLoader.State.LOAD_COMPLETE);
            callback('entity', this._entity);
        }).catch((error) => {
            this._changeState(ColladaLoader.State.LOAD_ERROR);
            callback('error', error);
        });
    }
    _changeState(state) {
        this._loadState = state;
    }
    _loadFromDoc(doc) {
    }
    _loadVertices(doc) {
        let sourceCheck = (srcDoc) => {
            if (!srcDoc) {
                return undefined;
            }
            let id = srcDoc.id;
            let float_array = srcDoc.getElementsByTagName('float_array')[0];
            let accessor = srcDoc.getElementsByTagName('accessor')[0];
            if (!float_array || !accessor) {
                return undefined;
            }
            let count = accessor.getAttribute('count');
            let stride = accessor.getAttribute('stride');
            if (!count || !stride) {
                return undefined;
            }
            // todo: check data type;
            let dataArray = float_array.textContent.split(' ');
            // let floatArray = new Float32Array(dataArray);
            return {
                id: id,
                count: count,
                stride: parseInt(stride),
                array: dataArray,
                type: _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_1__["FLOAT"],
            };
        };
        let verticesCheck = (vertDoc) => {
            if (!vertDoc) {
                return undefined;
            }
            let input = vertDoc.getElementsByTagName('input')[0];
            if (!input) {
                return undefined;
            }
            let semantic = input.getAttribute('semantic');
            let sourceId = input.getAttribute('source');
            if (!semantic || !sourceId) {
                return undefined;
            }
            sourceId = sourceId[0] === '#' ? sourceId.substr(1) : sourceId;
            let source = doc.getElementById(sourceId);
            return sourceCheck(source);
        };
        let inputCheck = (srcInput) => {
            let sourceId = srcInput.getAttribute('source');
            let semantic = srcInput.getAttribute('semantic');
            let offset = srcInput.getAttribute('offset');
            if (!sourceId || !semantic) {
                return undefined;
            }
            let srcData = undefined;
            sourceId = sourceId[0] === '#' ? sourceId.substr(1) : sourceId;
            let element = doc.getElementById(sourceId);
            switch (element.tagName) {
                case 'source':
                    srcData = sourceCheck(element);
                    break;
                case 'vertices':
                    srcData = verticesCheck(element);
                    break;
                default:
                    break;
            }
            if (!srcData) {
                return undefined;
            }
            return {
                semantic: semantic,
                offset: parseInt(offset),
                data: srcData,
            };
        };
        let library_geometries = doc.getElementsByTagName('library_geometries')[0];
        if (!library_geometries) {
            return undefined;
        }
        let geometries = library_geometries.children;
        if (geometries.length === 0) {
            return undefined;
        }
        // todo: check mult geometry
        let meshData = geometries[0].children[0];
        if (!meshData) {
            return undefined;
        }
        let triangles = meshData.getElementsByTagName('triangles')[0];
        if (!triangles) {
            return undefined;
        }
        let trianglesCount = triangles.getAttribute('count');
        let inputs = triangles.getElementsByTagName('input');
        let srcDataMap = [];
        let resultDataMap = [];
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let result = inputCheck(input);
            if (!result) {
                return undefined;
            }
            srcDataMap.push(result);
            resultDataMap.push([]);
        }
        let inputsLength = inputs.length;
        let indicesElement = triangles.getElementsByTagName('p')[0];
        if (!indicesElement) {
            return undefined;
        }
        let indicesSrc = indicesElement.textContent.split(' ');
        let indicesMap = new Map();
        let resultIndices = [];
        let dataAmount = 0;
        for (let i = 0; i < trianglesCount * 3; i++) {
            let n_i = i * 3;
            let name = '';
            for (let j = 0; j < inputsLength; j++) {
                name += '' + indicesSrc[n_i + j] + ' ';
            }
            let result_index = indicesMap.get(name);
            if (result_index) {
                resultIndices.push(result_index);
                continue;
            }
            for (let j = 0; j < inputsLength; j++) {
                let offset = srcDataMap[j].offset;
                let srcData = srcDataMap[j].data;
                let index = indicesSrc[n_i + offset];
                let srcDataArray = srcData.array;
                let values = [];
                let resultData = resultDataMap[j];
                for (let k = 0; k < srcData.stride; k++) {
                    let value = srcDataArray[index * 3 + k];
                    resultData.push(value);
                }
            }
            indicesMap.set(name, dataAmount);
            resultIndices.push(dataAmount);
            dataAmount++;
        }
        if (resultIndices.length > 65535) {
            return undefined;
        }
        let cge_geometry = new _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"]();
        for (let i = 0; i < inputsLength; i++) {
            let srcDatas = srcDataMap[i];
            let resultData = resultDataMap[i];
            let semantic = srcDatas.semantic;
            let data = srcDatas.data;
            let webgl_data = undefined;
            switch (data.type) {
                case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_1__["FLOAT"]:
                    webgl_data = new Float32Array(resultData);
                    break;
                default:
                    break;
            }
            let attribute_in = undefined;
            switch (semantic) {
                case 'POSITION':
                case 'VERTEX':
                    attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].position;
                    break;
                case 'NORMAL':
                    attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].normal;
                    break;
                case 'TEXCOORD':
                    attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].texcoord;
                    for (let j = 0; j < (webgl_data.length / data.stride); j++) {
                        let v = webgl_data[j * data.stride + 1];
                        webgl_data[j * data.stride + 1] = 1.0 - v;
                    }
                    break;
                default:
                    break;
            }
            cge_geometry.addSingleAttribute(semantic, attribute_in, data.stride, data.type, webgl_data);
        }
        cge_geometry.setIndexData(new Uint16Array(resultIndices));
        cge_geometry.setDrawParameter(resultIndices.length);
        return cge_geometry;
    } // _loadVertices
} // class;
ColladaLoader.State = {
    NONE: 'none',
    LOADING_FILE: 'loading',
    CREATE_ENTITY: 'createEntity',
    LOAD_COMPLETE: 'loadComplete',
    LOAD_ERROR: 'loadError',
};


/***/ }),

/***/ "./src/extensions/GltfLoader.ts":
/*!**************************************!*\
  !*** ./src/extensions/GltfLoader.ts ***!
  \**************************************/
/*! exports provided: GltfLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GltfLoader", function() { return GltfLoader; });
/* harmony import */ var _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/Geometry */ "./src/graphics/Geometry.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _io_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../io/Loader */ "./src/io/Loader.ts");
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Logger */ "./src/core/Logger.ts");
/* harmony import */ var _util_Base64__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/Base64 */ "./src/util/Base64.ts");






class GltfLoader {
    constructor(url, callback) {
        this.url = url;
        if (url) {
            this.load(url, callback);
        }
    }
    load(url, callback) {
        this.url = url;
        _io_Loader__WEBPACK_IMPORTED_MODULE_3__["Loader"].loadUrl(url).then(text => {
            this._loadFromResponseText(text).then((gltf) => {
                if (callback) {
                    callback('entity', gltf);
                }
                return gltf;
            });
        });
    }
    _loadFromResponseText(jsonText) {
        const glTF = JSON.parse(jsonText);
        const urlDir = this.url.substring(0, this.url.lastIndexOf('/') + 1);
        // result.set(GltfLoader.PROMISE, new Map());
        // result.set(GltfLoader.URL_DIR, urlDir);
        glTF.urlDir = urlDir;
        glTF.promising = {};
        Object.keys(glTF).forEach(key => {
            const func = GltfLoader['pre_' + key];
            if (!func) {
                return;
            }
            func(glTF);
        });
        // TODO Object
        return Promise.all(Object['values'](glTF.promising)).then(() => {
            _core_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].info('glTF.promising load complete');
            _core_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].info(glTF);
            return this._loadGltfJson(glTF);
        });
        // return glTF;
    }
    _loadGltfJson(glTF) {
        const order = [
            // 'extensionsUsed',
            // geometry
            'bufferViews',
            'accessors',
            // materials
            // meshes
            'meshes',
            'nodes',
            // scenes
            'scenes',
            // default scene
            'scene'
        ];
        order.forEach(key => {
            const func = GltfLoader[key];
            if (!func) {
                return;
            }
            func(glTF);
        });
        return glTF.cge_geometries;
    }
}
Object.assign(GltfLoader, {
    'meshes': (glTF) => {
        const objects = glTF['meshes'];
        const accessors = glTF['accessors'];
        const geometries = [];
        const createGeometry = (primitive) => {
            let cge_geometry = new _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"]();
            const attributes = primitive.attributes;
            Object.keys(attributes).forEach(key => {
                let attribute_in = undefined;
                const attributeId = attributes[key];
                const attribute = accessors[attributeId];
                switch (key) {
                    case 'POSITION':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].position;
                        break;
                    case 'NORMAL':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].normal;
                        break;
                    case 'TEXCOORD':
                    case 'TEXCOORD_0':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].texcoord;
                        break;
                    case 'TANGENT':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].tangent;
                        break;
                    case 'JOINT':
                    case 'JOINT_0':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].joints;
                        break;
                    case 'WEIGHT':
                    case 'WEIGHT_0':
                        attribute_in = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].weights;
                        break;
                    default:
                        break;
                }
                if (attribute_in === undefined || attribute_in === null) {
                    return;
                }
                // Logger.info(attribute.data);
                cge_geometry.addSingleAttribute(key, attribute_in, attribute.strideCount, attribute.componentType, attribute.data);
            });
            let drawModeList = [
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["POINTS"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["LINES"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["LINE_LOOP"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["LINE_STRIP"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["TRIANGLES"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["TRIANGLE_STRIP"],
                _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["TRIANGLE_FAN"]
            ];
            let drawMode = primitive.mode ? drawModeList[primitive.mode] : _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["TRIANGLES"];
            if (primitive.indices) {
                const attribute = accessors[primitive.indices];
                cge_geometry.setIndexData(attribute.data);
                cge_geometry.setDrawParameter(attribute.data.length, drawMode);
            }
            else {
                const position = primitive.attributes.POSITION || primitive.attributes.TEXCOORD || primitive.attributes.TEXCOORD_0;
                cge_geometry.setDrawParameter(position.count / position.strideCount, drawMode);
            }
            return cge_geometry;
        };
        Object.keys(objects).forEach(key => {
            const mesh = objects[key];
            const name = mesh.name || '';
            if (mesh.primitives) {
                mesh.primitives.forEach(primitive => {
                    if (!primitive.attributes) {
                        return;
                    }
                    let geometry = createGeometry(primitive);
                    if (geometry) {
                        geometries.push(geometry);
                    }
                });
            }
            if (mesh.extensions) {
                // TODO
            }
        });
        glTF.cge_geometries = geometries;
    },
    'accessors': (glTF) => {
        const typeMap = {
            "SCALAR": 1,
            "VEC2": 2,
            "VEC3": 3,
            "VEC4": 4,
            "MAT2": 4,
            "MAT3": 9,
            "MAT4": 16
        };
        const createArrayBuffer = (componentType, data, byteOffset, count, strideCount) => {
            switch (componentType) {
                case 5120: //BYTE
                    data = new Int8Array(data, byteOffset, count * strideCount);
                    break;
                case 5121: //UNSIGNED_BYTE
                    data = new Uint8Array(data, byteOffset, count * strideCount);
                    break;
                case 5122: //SHORT
                    data = new Int16Array(data, byteOffset, count * strideCount);
                    break;
                case 5123: //UNSIGNED_SHORT
                    data = new Uint16Array(data, byteOffset, count * strideCount);
                    break;
                case 5126: //FLOAT
                    data = new Float32Array(data, byteOffset, count * strideCount);
                    break;
                default:
                    break;
            }
            return data;
        };
        const objects = glTF['accessors'];
        Object.keys(objects).forEach(key => {
            const accessor = objects[key];
            const bufferView = glTF['bufferViews'][accessor.bufferView];
            const data = bufferView.data;
            const offset = accessor.byteOffset;
            const count = accessor.count;
            accessor.strideCount = typeMap[accessor.type];
            accessor.data = createArrayBuffer(accessor.componentType, data, offset, count, accessor.strideCount);
            if (accessor.extensions) {
                // TODO
            }
        });
    },
    'bufferViews': (glTF) => {
        const objects = glTF['bufferViews'];
        Object.keys(objects).forEach(key => {
            const bufferView = objects[key];
            const buffer = glTF['buffers'][bufferView.buffer];
            if (!buffer) {
                return;
            }
            bufferView.data = buffer.data.slice(bufferView.byteOffset, bufferView.byteOffset + (bufferView.byteLength || 0));
            // bufferView.data = new ArrayBuffer(buffer.data, bufferView.byteOffset, bufferView.byteLength || 0);
            if (bufferView.extensions) {
                // TODO
            }
        });
    },
    'pre_buffers': (glTF) => {
        // TODO: 修改这里
        const objects = glTF['buffers'];
        Object.keys(objects).forEach(key => {
            const buffer = objects[key];
            let uri = buffer.uri;
            let reg = new RegExp(`data:[\\S]+;base64,`);
            if (reg.test(uri)) {
                buffer.data = Object(_util_Base64__WEBPACK_IMPORTED_MODULE_5__["base64decode"])(uri.split(',')[1]);
            }
            else {
                const loader = new _io_Loader__WEBPACK_IMPORTED_MODULE_3__["Loader"]();
                glTF.promising[key] = _io_Loader__WEBPACK_IMPORTED_MODULE_3__["Loader"].loadUrl(glTF.urlDir + uri, buffer.type || 'text').then(data => {
                    buffer.data = data;
                });
            }
            ;
        });
    },
    'pre_images': (glTF) => {
        const objects = glTF['images'];
        Object.keys(objects).forEach(key => {
            const imgObj = objects[key];
            // glTF.promising[key] = Loader.loadImg(glTF.urlDir + imgObj.uri);
        });
    },
});
const property = {
    'accessors': [],
    'animations': [],
    'asset': [],
    'buffers': [],
    'bufferViews': [],
    'extensionsUsed': [],
    'extensions': [],
    'cameras': [],
    'images': [],
    'materials': [],
    'meshes': [],
    'nodes': [],
    'programs': [],
    'samplers': [],
    'scenes': [],
    'shaders': [],
    'skins': [],
    'techniques': [],
    'textures': []
};


/***/ }),

/***/ "./src/extensions/ObjLoader.ts":
/*!*************************************!*\
  !*** ./src/extensions/ObjLoader.ts ***!
  \*************************************/
/*! exports provided: OBJLoader, LoadObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBJLoader", function() { return OBJLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadObj", function() { return LoadObj; });
/* harmony import */ var _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/Geometry */ "./src/graphics/Geometry.ts");
/* harmony import */ var _object_Object3D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../object/Object3D */ "./src/object/Object3D.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _io_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../io/Loader */ "./src/io/Loader.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");






class OBJLoader {
    /**
     * 构造函数
     * @param {string} filePath 相对于项目的obj文件路径
     */
    constructor() {
        this._reObj = /^o/;
        this._reGroup = /^g/;
        this._reMtllib = /^mtllib /;
        this._reUsemtl = /^usemtl /;
        this._reSmooth = /^s /;
        // v float float float
        this._reVertexPattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        // vn float float float
        this._reNormalPattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        // vt float float
        this._reUvPattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
        // f vertex vertex vertex ...
        this._reFaceSpaces = /f\s+(([\d]{1,}[\s]?){3,})+/;
        // f vertex/uvs vertex/uvs vertex/uvs ...
        this._reFaceVU = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        // f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal ...
        this._reFaceVUN = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
        // f vertex//normal vertex//normal vertex//normal ...
        this._reFaceVN = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
        //private csTot: number;
        this.posData = [];
        this.uvData = [];
        this.normalData = [];
        this.tangentData = [];
        this.indexData = [];
    }
    load(filePath) {
        return _io_Loader__WEBPACK_IMPORTED_MODULE_3__["Loader"].loadUrl(filePath).then(data => {
            return this.parseData(data);
        });
    }
    /**
     * 开始解析
     *
     * @param {*} data 文件数据
     */
    parseData(data) {
        this._meshes = [];
        this._materialNamesAll = [];
        this._lines = data.split("\n");
        this._lineIdx = 0;
        this._posRawTot = 0;
        this._uvRawTot = 0;
        this._normalTot = 0;
        this._numVertices = 0;
        this._numFaces = 0;
        this._posRawArray = [];
        this._uvRawArray = [];
        this._normalRawArray = [];
        this._mtlPath = null;
        this.createMesh();
        return this._mesh;
        // if (this._mtlPath == null) {
        //     this.end();
        // }
        // else {
        //     this.parseMtl();
        //     // this.end();//cs
        // }
    }
    // /**
    //  * 解析mtl数据块
    //  */
    // private parseMtl(): void {
    //     let paths = this.filePath.split(/[/\\]/);
    //     paths.pop();
    //     let rootUrl = paths.join('/') + '/';
    //     let mtlLoader = new MTLLoader(rootUrl + this._mtlPath, rootUrl);
    //     mtlLoader.addEventListener(ModelEvent.COMPLETE, this.parsedMtl, this);
    //     mtlLoader.start();
    // }
    /**
     * mtl解析完成
     *
     * @param {Event} e 事件对象
     */
    // private parsedMtl(e: Event): void {
    //     // let mtlLoader: MTLLoader = e.target;
    //     // mtlLoader.removeEventListener(ModelEvent.COMPLETE, this.parsedMtl, this);
    //     let materialMap = mtlLoader.materialMap;
    //     for (let i = 0; i < this._meshes.length; ++i) {
    //         let mesh = this._meshes[i];
    //         let names = this._materialNamesAll[i];
    //         for (let j = 0; j < names.length; ++j) {
    //             let material = materialMap[names[j]];
    //             if (material == null) {
    //                 if (mtlLoader.defaultMaterial == null) {
    //                     console.error("OBJLoader.parseMtl:...undefined material.mesh=", mesh.name, names[j]);
    //                     continue;
    //                 }
    //                 material = mtlLoader.defaultMaterial;
    //             }
    //             mesh.materialList[j] = material;
    //         }
    //     }
    //     this.end();
    // }
    /**
     * 重置源数组
     */
    resetRawArray() {
        this._posRawTot += this._posRawArray.length / 3;
        this._uvRawTot += this._uvRawArray.length / 2;
        this._normalTot += this._normalRawArray.length / 3;
        this._posRawArray = [];
        this._uvRawArray = [];
        this._normalRawArray = [];
    }
    /**
     * 开始创建显示模型
     */
    createMesh() {
        let posArray = new Array();
        let uvArray = new Array();
        let normalArray = new Array();
        let indexArray = new Array();
        let posData;
        let uvData;
        let normalData;
        let tangentData;
        let indexData;
        let hashHelper = new Object();
        let hashArray = new Array();
        let hasUV;
        let hasNormal;
        let hasTangent;
        let hasUV2;
        let curIndex = 0;
        let lastIndexCount = 0;
        let curIndexCount = 0;
        let bMeshNext = false;
        let bResetRaw = false;
        let addHashArray = (hashCode) => {
            if (hashHelper[hashCode] == null) {
                hashHelper[hashCode] = curIndex;
                let ids = hashCode.split("/");
                let posID = parseInt(ids[0]) - 1;
                let uvID;
                let normalID;
                if (ids[1] != '')
                    uvID = parseInt(ids[1]) - 1;
                else
                    uvID = null;
                if (ids[2] != null)
                    normalID = parseInt(ids[2]) - 1;
                else
                    normalID = null;
                hashArray.push({ idPos: posID, idUV: uvID, idNormal: normalID });
                curIndex++;
            }
            indexArray.push(hashHelper[hashCode]);
            ++curIndexCount;
        };
        let addVertex = (result) => {
            let faceIndex = result.trim().split(" ");
            for (let j = 0; j < 3; j++) {
                addHashArray(faceIndex[j]);
            }
            if (faceIndex.length == 4) {
                addHashArray(faceIndex[0]);
                addHashArray(faceIndex[2]);
                addHashArray(faceIndex[3]);
            }
        };
        let result;
        let materialName;
        let len = this._lines.length;
        for (let i = this._lineIdx; i < len; i++) {
            let line = this._lines[i];
            line.trim();
            if (line.length === 0 || line.charAt(0) === '#') {
                continue;
            }
            if ((result = this._reVertexPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                this._posRawArray.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            }
            else if ((result = this._reNormalPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                this._normalRawArray.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            }
            else if ((result = this._reUvPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                this._uvRawArray.push(parseFloat(result[1]), parseFloat(result[2]));
            }
            else if ((result = this._reFaceVUN.exec(line)) !== null) {
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                addVertex(result[1]);
                // let faceIndex: string[] = result[1].trim().split(" ");
                // for (let j: number = 0; j < 3; j++) {
                //     addHashArray(faceIndex[j]);
                // }
            }
            else if ((result = this._reFaceVN.exec(line)) !== null) {
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                addVertex(result[1]);
            }
            else if ((result = this._reFaceVU.exec(line)) !== null) {
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                addVertex(result[1]);
            }
            else if ((result = this._reFaceSpaces.exec(line)) !== null) {
                //["f 1 2 3", "1 2 3"...]
                let faceIndex = result[1].trim().split(" ");
                for (let j = 0; j < 3; j++) {
                    let hashCode = faceIndex[j];
                    if (hashHelper[hashCode] == null) {
                        hashHelper[hashCode] = curIndex;
                        let posID = parseInt(hashCode) - 1;
                        let uvID = posID;
                        let normalID = posID;
                        hashArray.push({ idPos: posID, idUV: uvID, idNormal: normalID });
                        curIndex++;
                    }
                    indexArray.push(hashHelper[hashCode]);
                }
                curIndexCount += 3;
                //Define a mesh or an object
                //Each time this keyword is analysed, create a new Object with all data for creating a babylonMesh
            }
            else if (this._reGroup.test(line) || this._reObj.test(line)) {
                //Create a new mesh corresponding to the name of the group.
                //Definition of the mesh
                //TODO: currently use single object
                let name = line.substring(2).trim();
                if (this._mesh == null) {
                    this._mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
                    this._materialNames = [];
                }
                else {
                    if (indexArray.length == 0) {
                        this._mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
                        this._materialNames = [];
                    }
                    else {
                        this._lineIdx = i;
                        bMeshNext = true;
                        break;
                    }
                }
                //console.log('group:....numMeshs=' + this.meshs.length+',mesh.name=' + this.mesh.name);
            }
            else if (this._reUsemtl.test(line)) {
                materialName = line.substring(6).trim();
                //Get the name of the material
                //We just generate a new subMesh currently
                if (lastIndexCount != curIndexCount) {
                    let materialIdx;
                    if (materialName == null || materialName == '') {
                        materialIdx = 0;
                    }
                    else {
                        materialIdx = this._materialNames.length;
                        this._materialNames.push(materialName);
                    }
                    // let subMesh: SubMesh = new SubMesh(materialIdx, lastIndexCount, curIndexCount - lastIndexCount);
                    // this._mesh.addSubMesh(subMesh);
                    lastIndexCount = curIndexCount;
                }
            }
            else if (this._reMtllib.test(line)) {
                //Get the name of mtl file
                this._mtlPath = line.substring(6).trim();
                //Apply smoothing
            }
            else if (this._reSmooth.test(line)) {
                // smooth shading => apply smoothing
                //Toda  y I don't know it work with babylon and with obj.
                //With the obj file  an integer is set
            }
            else {
                //If there is another possibility
                console.log("Unhandled expression at line : " + line);
            }
        }
        if (indexArray.length > 0) {
            //Append the last subMesh
            if (lastIndexCount != curIndexCount) {
                let materialIdx;
                if (materialName == null || materialName == '') {
                    materialIdx = 0;
                }
                else {
                    materialIdx = this._materialNames.length;
                    this._materialNames.push(materialName);
                }
                // let subMesh: SubMesh = new SubMesh(materialIdx, lastIndexCount, curIndexCount - lastIndexCount);
                // this._mesh.addSubMesh(subMesh);
                lastIndexCount = curIndexCount;
            }
            for (let i = 0; i < curIndex; i++) {
                let posID = hashArray[i].idPos;
                let uvID = hashArray[i].idUV;
                let normalID = hashArray[i].idNormal;
                posArray.push(this._posRawArray[(posID - this._posRawTot) * 3], this._posRawArray[(posID - this._posRawTot) * 3 + 1], this._posRawArray[(posID - this._posRawTot) * 3 + 2]);
                if (uvID != null)
                    uvArray.push(this._uvRawArray[(uvID - this._uvRawTot) * 2], this._uvRawArray[(uvID - this._uvRawTot) * 2 + 1]);
                if (normalID != null)
                    normalArray.push(this._normalRawArray[(normalID - this._normalTot) * 3], this._normalRawArray[(normalID - this._normalTot) * 3 + 1], this._normalRawArray[(normalID - this._normalTot) * 3 + 2]);
            }
            posData = new Float32Array(posArray);
            if (normalArray.length != 0) {
                hasNormal = true;
                normalData = new Float32Array(normalArray);
            }
            else {
                hasNormal = false;
            }
            if (uvArray.length != 0) {
                hasUV = true;
                uvData = new Float32Array(uvArray);
            }
            else {
                hasUV = false;
                console.warn("OBJLoader:...unsupport no uv.");
            }
            // indexData = new Uint16Array(indexArray);
            indexData = this.getIndicesByPosition(posArray, indexArray);
            if (hasUV && hasNormal) {
                // tangentData = GeometryUtil.calcTangent(posData, uvData, normalData, indexData);
                hasTangent = true;
            }
            else {
                hasTangent = false;
            }
            if (!hasNormal) {
                // normalData = GeometryUtil.calcNormal(posData, indexData);
                // tangentData = GeometryUtil.calcTangent(posData, uvData, normalData, indexData);
            }
            //2.old
            // let geometry: Geometry = new Geometry([posData, uvData, normalData, tangentData], indexData);
            //this.indexData.push(indexData);
            //this.posData.push(posData);
            //this.uvData.push(uvData);
            //this.normalData.push(normalData);
            //this.tangentData.push(tangentData);
            //3.
            // let cPos: any[] = GeometryUtil.quantizeData(posData, 3);
            // let cUV: any[] = GeometryUtil.quantizeData(uvData, 2);
            // let cTangentQuat: Int16Array = GeometryUtil.calcTangentFrame(normalData, tangentData);
            // let geometry: Geometry = new CompressedGeometry([cPos[0], cUV[0], cTangentQuat], indexData, cPos[1], cPos[2], cUV[1], cUV[2]);
            let geometry = new _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"]();
            geometry.addSingleAttribute('Position', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_4__["ShaderConst"].position, 3, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], posData);
            geometry.addSingleAttribute('UV', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_4__["ShaderConst"].texcoord, 2, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], uvData);
            geometry.addSingleAttribute('Normal', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_4__["ShaderConst"].normal, 3, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], normalData);
            geometry.setIndexData(indexData);
            geometry.setDrawParameter(indexData.length);
            //this.indexData.push(indexData);
            ////indexData = GeometryUtil.shuffleIndices(indexData, indexData.length / 3, posArray.length / 3);
            //4.
            // let result: any = GeometryUtil.shuffleGeomData([posData, uvData, normalData, tangentData], indexData, posArray.length / 3);
            // let shuffledData = result[0];
            // let shuffledPos: Float32Array = shuffledData[0];
            // let shuffledUV: Float32Array = shuffledData[1];
            // let shuffledNormal: Float32Array = shuffledData[2];
            // let shuffledTangent: Float32Array = shuffledData[3];
            // let shuffledIndices = result[1];
            // //Compress position and uv array
            // let cPos: any[] = GeometryUtil.quantizeData(shuffledPos, 3);
            // let cUV: any[] = GeometryUtil.quantizeData(shuffledUV, 2);
            // let cTangentQuat: Int16Array = GeometryUtil.calcTangentFrame(shuffledNormal, shuffledTangent);
            // let geometry: Geometry = new CompressedGeometry([cPos[0], cUV[0], cTangentQuat], shuffledIndices, cPos[1], cPos[2], cUV[1], cUV[2]);
            //this.indexData.push(shuffledIndices);
            //
            //this.posData.push(cPos[0]);
            //this.uvData.push(cUV[0]);
            //this.tangentData.push(cTangentQuat);
            this._mesh.setGeometry(geometry);
            this._numVertices += hashArray.length;
            this._numFaces += indexArray.length / 3;
            // console.log('posData.length=' + posData.length + ',uv=' + uvData.length + ',normal=' + normalData.length, ',tangentData=' + tangentData.length, ',index=' + indexData.length);
            // console.log('cTangentQuat', cTangentQuat.length);
            this._meshes.push(this._mesh);
            this._materialNamesAll.push(this._materialNames);
        } //end if (indexArray.length > 0)
        if (bMeshNext) {
            // if (this.meshs.length < this.csTot) {
            if (bResetRaw)
                this.resetRawArray();
            this.createMesh();
            //}
        }
    }
    /**
     * 动态获取索引数组
     *
     * @param {number[]} posArray 顶点位置数组
     * @param {number[]} indices 源索引数组
     * @returns {*} 类型化索引数组
     */
    getIndicesByPosition(posArray, indices) {
        let count = posArray.length / 3;
        if (count <= 0xff) {
            return new Uint8Array(indices);
        }
        if (count <= 0xffff) {
            return new Uint16Array(indices);
        }
        return new Uint32Array(indices);
    }
    /**
     * 合并类型化数组
     *
     * @param {*} target 目标数组
     * @param {*} source 源数组
     * @returns {*} 新的数组
     */
    merge(target, source) {
        if (target == null)
            return source;
        if (source == null)
            return target;
        //let res = new Float32Array(target.length + source.length);//2.
        let res = new Int16Array(target.length + source.length);
        res.set(target);
        res.set(source, target.length);
        return res;
    }
    get mesh() {
        return this._mesh;
    }
} //end class
class LoadObj {
    constructor() {
    }
    static loadFile(url) {
        let obj = new _object_Object3D__WEBPACK_IMPORTED_MODULE_1__["Object3D"]();
        return obj;
    }
}


/***/ }),

/***/ "./src/graphics/Blend.ts":
/*!*******************************!*\
  !*** ./src/graphics/Blend.ts ***!
  \*******************************/
/*! exports provided: Blend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blend", function() { return Blend; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");

class Blend {
    constructor() {
        this.blendFunc = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ZERO"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ZERO"]];
        this.blendEquation = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FUNC_ADD"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FUNC_ADD"]];
    }
    setBlendFunc(srcRGB, dstRGB, srcAlpha, dstAlpha) {
        this.blendFunc[0] = srcRGB;
        this.blendFunc[1] = dstRGB;
        this.blendFunc[2] = srcAlpha;
        this.blendFunc[3] = dstAlpha;
        return this;
    }
    setBlendEquation(modeRGB, modeAlpha) {
        this.blendEquation[0] = modeRGB;
        this.blendEquation[1] = modeAlpha;
        return this;
    }
    clone() {
        let blend = new Blend();
        Blend.Copy(this, blend);
        return blend;
    }
    copy(blend) {
        Blend.Copy(blend, this);
        return this;
    }
    static Copy(src, dst) {
        dst.setBlendFunc.apply(dst, src.blendFunc);
        dst.setBlendEquation.apply(dst, src.blendEquation);
    }
}
Blend.DefBlend = new Blend();


/***/ }),

/***/ "./src/graphics/Buffer.ts":
/*!********************************!*\
  !*** ./src/graphics/Buffer.ts ***!
  \********************************/
/*! exports provided: Attribute, Buffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Buffer", function() { return Buffer; });
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphicsObject */ "./src/graphics/GraphicsObject.ts");


class Attribute {
    constructor(attribType, num, offset, type = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"]) {
        this.attribType = attribType;
        this.num = num;
        this.offset = offset;
        this.type = type;
    }
}
class Buffer extends _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__["GraphicsObject"] {
    constructor() {
        super();
        this._type = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"];
        this._attributes = [];
        this._stride = 0;
        this._isIndex = false;
    }
    setParameter(stride, usage, type) {
        this._stride = stride;
        this._usage = usage;
        this._type = type;
    }
    setData(data, type = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"]) {
        this._data = data instanceof Array ? new Float32Array(data) : data;
        this._type = type ? type : Buffer.TypeMap[data.constructor.name];
    }
    getData() {
        return this._data;
    }
    addAttribute(attribute) {
        this._attributes.push(attribute);
    }
    addAttributeData(attribType, num, offset = 0, type) {
        let attribute = new Attribute(attribType, num, offset, type ? type : this._type);
        this._attributes.push(attribute);
    }
    setType(type) {
        this._type = type ? type : this._type;
    }
    getType() {
        return this._type;
    }
    getLength() {
        return this._data.length;
    }
    getByteLength() {
        return this._data.byteLength;
    }
    findAttribute(type) {
        let atts = this._attributes;
        let l = atts.length;
        for (let i = 0; i < l; i++) {
            let att = atts[i];
            if (att.attribType === type) {
                return att;
            }
        }
        return null;
    }
    getAttributes() {
        return this._attributes;
    }
    getStride() {
        return this._stride;
    }
    getUsage() {
        return this._usage;
    }
    setIsIndex(value) {
        this._isIndex = value;
    }
    isIndex() {
        return this._isIndex;
    }
}
Buffer.TypeMap = {
    'Float32Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"],
    'Uint32Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_INT"],
    'Int32Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["INT"],
    'Uint16Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_SHORT"],
    'Int16Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["SHORT"],
    'Uint8Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"],
    'Int8Array': _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["BYTE"],
};


/***/ }),

/***/ "./src/graphics/Frame.ts":
/*!*******************************!*\
  !*** ./src/graphics/Frame.ts ***!
  \*******************************/
/*! exports provided: TexTarget, Frame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TexTarget", function() { return TexTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frame", function() { return Frame; });
/* harmony import */ var _GraphicsObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphicsObject */ "./src/graphics/GraphicsObject.ts");
/* harmony import */ var _Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _FrameState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FrameState */ "./src/graphics/FrameState.ts");




/** 渲染目标的贴图类型 */
var TexTarget;
(function (TexTarget) {
    TexTarget[TexTarget["TEXTURE_2D"] = 0] = "TEXTURE_2D";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_POSITIVE_X"] = 1] = "TEXTURE_CUBE_MAP_POSITIVE_X";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 2] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 3] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 4] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 5] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
    TexTarget[TexTarget["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 6] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(TexTarget || (TexTarget = {}));
class Frame extends _GraphicsObject__WEBPACK_IMPORTED_MODULE_0__["GraphicsObject"] {
    constructor() {
        super();
        this._textures = new Map();
        this._width = 64;
        this._height = 64;
        this._isFollowScreen = false;
        this._depthStencilTexture = undefined;
        this._state = new _FrameState__WEBPACK_IMPORTED_MODULE_3__["FrameState"]();
        this._needsUpdateSize = false;
    }
    update() {
        if (this._needsUpdateSize) {
            this._needsUpdateSize = false;
        }
    }
    addTexture(targetType, format, dataType, filterMin, filterMag) {
        let __format = format || _RendererParameter__WEBPACK_IMPORTED_MODULE_2__["RGBA"];
        let __dataType = dataType || _RendererParameter__WEBPACK_IMPORTED_MODULE_2__["UNSIGNED_BYTE"];
        let tex2d = this._createTexture2d(__format, __dataType);
        tex2d.setFilter(filterMin, filterMag);
        this._textures.set(targetType, { tex: tex2d, target: TexTarget.TEXTURE_2D });
        this.needsUpdate();
    }
    setTexture2D(targetType, tex2d) {
        this._textures.set(targetType, { tex: tex2d, target: TexTarget.TEXTURE_2D });
        this.needsUpdate();
    }
    setTextureCube(targetType, texCube, target) {
        this._textures.set(targetType, { tex: texCube, target: target });
    }
    getState() {
        return this._state;
    }
    getDepthStencilTexture() {
        return this._depthStencilTexture;
    }
    // protected _setTexture(targetType: RTLocation, tex: Texture, type: TexTarget) {
    //     let texObj = this._textures.get(targetType);
    //     tex.retain();
    //     if (texObj) {
    //         texObj.tex.release();
    //         texObj.tex = tex;
    //     } else {
    //         this._textures.set(targetType, {tex: tex, target: type});
    //     }
    // }
    _createTexture2d(format, dataType) {
        let texture2d = new _Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
        texture2d.setSize(this._width, this._height);
        texture2d.setFormat(format, format);
        texture2d.setDataType(dataType);
        return texture2d;
    }
    enableDepthStencil() {
        // TODO: check webgl2 why can't used texture to be render target;
        this._state.setClearDepth(true);
        this._state.setClearStencil(true);
        let tex = this._createTexture2d(_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["DEPTH_STENCIL"], _RendererParameter__WEBPACK_IMPORTED_MODULE_2__["UNSIGNED_INT_24_8"]);
        tex.setFilter(_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["LINEAR"], _RendererParameter__WEBPACK_IMPORTED_MODULE_2__["LINEAR"]);
        this._depthStencilTexture = tex;
        this.needsUpdate();
    }
    setDepthStencil(tex) {
        this._depthStencilTexture = tex;
        this._state.setClearDepth(true);
        this._state.setClearStencil(true);
        this.needsUpdate();
    }
    setNeedsDepthStencil(b) {
        this._needsDepthStencil = b === true;
    }
    isNeedsDepthStencil() {
        return this._needsDepthStencil;
    }
    isFollowScreen() {
        return this._isFollowScreen;
    }
    setFollowScreen(b) {
        this._isFollowScreen = b === true;
    }
    _updateTextureSize() {
        const w = this._width;
        const h = this._height;
        if (this._depthStencilTexture) {
            this._depthStencilTexture.setSize(w, h);
        }
        this._textures.forEach(function (texTarget, type) {
            let tex = texTarget.tex;
            if (tex instanceof _Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]) {
                tex.setSize(w, h);
            }
        });
    }
    setSize(width, height) {
        if (this._width === width && this._height === height) {
            return undefined;
        }
        this._width = width;
        this._height = height;
        this._updateTextureSize();
        this._state.setViewports(0, 0, width, height);
        this.needsUpdate();
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
    setOffset(viewport) {
        this._state.setViewportAt(viewport);
    }
    getTextureFromType(targetType) {
        return this._textures.get(targetType);
    }
    getTextureMap() {
        return this._textures;
    }
    setClearColor(color) {
        this._state.setClearColor(true, color);
    }
}


/***/ }),

/***/ "./src/graphics/FrameState.ts":
/*!************************************!*\
  !*** ./src/graphics/FrameState.ts ***!
  \************************************/
/*! exports provided: FrameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameState", function() { return FrameState; });
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");

class FrameState {
    constructor() {
        this.isClearColor = true;
        this.clearColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_0__["Vector4"](1, 1, 1, 1);
        this.isClearDepth = true;
        this.clearDepth = 0.0;
        this.isClearStencil = false;
        this.clearStencil = 0;
        this.viewport = new _math_Vector4__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
        this.needClear = true;
    }
    setClearColor(enable, color) {
        this.isClearColor = enable === true;
        if (color) {
            this.clearColor.copy(color);
        }
    }
    setClearDepth(enable, depth) {
        this.isClearDepth = enable === true;
        if (depth) {
            this.clearDepth = depth;
        }
    }
    setClearStencil(enable, stencil) {
        this.isClearStencil = enable === true;
        if (stencil) {
            this.clearStencil = stencil;
        }
    }
    setViewportAt(offset) {
        this.viewport.copy(offset);
    }
    setViewports(offsetx, offsety, width, height) {
        this.viewport.set(offsetx, offsety, width, height);
    }
}


/***/ }),

/***/ "./src/graphics/Geometry.ts":
/*!**********************************!*\
  !*** ./src/graphics/Geometry.ts ***!
  \**********************************/
/*! exports provided: Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphicsObject */ "./src/graphics/GraphicsObject.ts");
/* harmony import */ var _ShaderConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _Buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Buffer */ "./src/graphics/Buffer.ts");
/* harmony import */ var _bounding_AABB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bounding/AABB */ "./src/bounding/AABB.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");






class Geometry extends _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__["GraphicsObject"] {
    constructor() {
        super();
        this._drawParameter = undefined;
        this._display = true;
        this._buffers = [];
    }
    addSingleAttribute(name, attribute, num, type, data, usage = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["STATIC_DRAW"]) {
        let buffer = new _Buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"]();
        let attrib = new _Buffer__WEBPACK_IMPORTED_MODULE_3__["Attribute"](attribute, num, 0, type);
        buffer.addAttribute(attrib);
        buffer.setData(data);
        buffer.setParameter(0, usage, type);
        this._buffers.push(buffer);
        if (attribute === _ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].position) {
            this._posAttrib = attrib;
            this._posBuffer = buffer;
        }
    }
    addMultiAttribute(attributeParameters, type, stride, data, usage = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["STATIC_DRAW"]) {
        let buffer = new _Buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"]();
        buffer.setData(data);
        this._buffers.push(buffer);
        buffer.setParameter(stride, usage, type);
        attributeParameters.forEach(param => {
            let attrib = new _Buffer__WEBPACK_IMPORTED_MODULE_3__["Attribute"](param.attribute, param.num, param.offset, param.type);
            buffer.addAttribute(attrib);
            if (param.attribute === _ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].position) {
                this._posAttrib = attrib;
                this._posBuffer = buffer;
            }
        });
    }
    setIndexData(data, type = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_SHORT"], usage = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["STATIC_DRAW"]) {
        let buffer = new _Buffer__WEBPACK_IMPORTED_MODULE_3__["Buffer"]();
        buffer.setData(data);
        buffer.setParameter(0, usage, type);
        buffer.setIsIndex(true);
        this._indexBuffer = buffer;
    }
    getIndexBuffer() {
        return this._indexBuffer;
    }
    setDrawParameter(count, mode, offset) {
        this._drawParameter = {
            mode: mode || _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["TRIANGLES"],
            count: count || 0,
            offset: offset || 0,
        };
    }
    getPosAttrib() {
        return this._posAttrib;
    }
    getPosBuffer() {
        return this._posBuffer;
    }
    getBuffers() {
        return this._buffers;
    }
    getDrawParameter() {
        return this._drawParameter;
    }
    getBounding() {
        if (this._bounding === undefined) {
            this.buildBounding();
        }
        return this._bounding;
    }
    removeBounding() {
        this._bounding = null;
    }
    buildBounding() {
        if (!this._posAttrib || !this._posBuffer) {
            return;
        }
        const buffer = this._posBuffer;
        const posAtt = this._posAttrib;
        const posData = buffer.getData();
        const stride = buffer.getStride() === 0 ? posAtt.num : (buffer.getStride() / posData.BYTES_PER_ELEMENT);
        const offset = posAtt.offset;
        const num = posAtt.num;
        let min = new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]();
        let max = new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]();
        min.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        max.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        let temp = new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]();
        if (this._indexBuffer) {
            const idxData = this._indexBuffer.getData();
            const l = idxData.length;
            let index;
            for (let i = 0; i < l; i++) {
                index = idxData[i] * stride + offset;
                temp.set(posData[index], posData[index + 1], num === 2 ? 0 : posData[index + 2]);
                min.min(temp);
                max.max(temp);
            }
        }
        else {
            const l = posData.length / stride;
            let index;
            for (let i = 0; i < l; i++) {
                index = i * stride + offset;
                temp.set(posData[index], posData[index + 1], num === 2 ? 0 : posData[index + 2]);
                min.min(temp);
                max.max(temp);
            }
        }
        let aabb = new _bounding_AABB__WEBPACK_IMPORTED_MODULE_4__["AABB"]();
        aabb.setMinAt(min);
        aabb.setMaxAt(max);
        this._bounding = aabb;
    }
    destroy() {
    }
}


/***/ }),

/***/ "./src/graphics/GraphicsObject.ts":
/*!****************************************!*\
  !*** ./src/graphics/GraphicsObject.ts ***!
  \****************************************/
/*! exports provided: GraphicsObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsObject", function() { return GraphicsObject; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");

class GraphicsObject extends _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this._renderObjectRef = [];
        this._count = 0;
    }
    setRenderObjectRef(renderer, robj) {
        this._renderObjectRef[renderer.getRendererId()] = robj;
    }
    getRenderObjectRef(renderer) {
        return this._renderObjectRef[renderer.getRendererId()];
    }
    _updateRenderObjectRef() {
    }
    retain() {
        this._count++;
    }
    release() {
        this._count--;
        if (this._count === 0) {
            this.destroy();
        }
    }
    destroy() {
        let rbfs = this._renderObjectRef;
        let l = rbfs.length;
        for (let i = 0; i < l; i++) {
            rbfs[i] && rbfs[i].remove(i);
        }
    }
    needsUpdate() {
        let rbfs = this._renderObjectRef;
        let l = rbfs.length;
        for (let i = 0; i < l; i++) {
            rbfs[i] && rbfs[i].needsUpdate();
        }
    }
}


/***/ }),

/***/ "./src/graphics/GraphicsTypes.ts":
/*!***************************************!*\
  !*** ./src/graphics/GraphicsTypes.ts ***!
  \***************************************/
/*! exports provided: AlphaType, FaceType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlphaType", function() { return AlphaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceType", function() { return FaceType; });
var AlphaType;
(function (AlphaType) {
    AlphaType[AlphaType["NONE"] = 0] = "NONE";
    AlphaType[AlphaType["TEST"] = 1] = "TEST";
    AlphaType[AlphaType["BLEND"] = 2] = "BLEND";
})(AlphaType || (AlphaType = {}));
var FaceType;
(function (FaceType) {
    FaceType[FaceType["NONE"] = 0] = "NONE";
    FaceType[FaceType["FRONT"] = 1] = "FRONT";
    FaceType[FaceType["BACK"] = 2] = "BACK";
    FaceType[FaceType["DOUBLE"] = 3] = "DOUBLE";
})(FaceType || (FaceType = {}));


/***/ }),

/***/ "./src/graphics/RenderBase.ts":
/*!************************************!*\
  !*** ./src/graphics/RenderBase.ts ***!
  \************************************/
/*! exports provided: RenderBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderBase", function() { return RenderBase; });
class RenderBase {
    constructor() {
        this._update = true;
    }
    needsUpdate() {
        this._update = true;
    }
    updated() {
        this._update = false;
    }
    getUpdate() {
        return this._update;
    }
    remove(idx) {
    }
}


/***/ }),

/***/ "./src/graphics/RendererParameter.ts":
/*!*******************************************!*\
  !*** ./src/graphics/RendererParameter.ts ***!
  \*******************************************/
/*! exports provided: ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, DST_COLOR, ONE_MINUS_DST_COLOR, SRC_ALPHA_SATURATE, FUNC_ADD, BLEND_EQUATION, BLEND_EQUATION_RGB, BLEND_EQUATION_ALPHA, FUNC_SUBTRACT, FUNC_REVERSE_SUBTRACT, BLEND_DST_RGB, BLEND_SRC_RGB, BLEND_DST_ALPHA, BLEND_SRC_ALPHA, ONE_MINUS_CONSTANT_COLOR, CONSTANT_ALPHA, ONE_MINUS_CONSTANT_ALPHA, BLEND_COLOR, BYTE, UNSIGNED_BYTE, SHORT, UNSIGNED_SHORT, INT, UNSIGNED_INT, FLOAT, UNSIGNED_INT_24_8, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_SHORT_5_6_5, DEPTH_ATTACHMENT, STENCIL_ATTACHMENT, DEPTH_STENCIL_ATTACHMENT, COLOR_ATTACHMENT0, COLOR_ATTACHMENT1, COLOR_ATTACHMENT2, COLOR_ATTACHMENT3, COLOR_ATTACHMENT4, COLOR_ATTACHMENT5, COLOR_ATTACHMENT6, COLOR_ATTACHMENT7, COLOR_ATTACHMENT8, COLOR_ATTACHMENT9, COLOR_ATTACHMENT10, COLOR_ATTACHMENT11, COLOR_ATTACHMENT12, COLOR_ATTACHMENT13, COLOR_ATTACHMENT14, COLOR_ATTACHMENT15, POINTS, LINES, LINE_LOOP, LINE_STRIP, TRIANGLES, TRIANGLE_STRIP, TRIANGLE_FAN, STREAM_DRAW, STATIC_DRAW, DYNAMIC_DRAW, FLOAT_VEC2, FLOAT_VEC3, FLOAT_VEC4, INT_VEC2, INT_VEC3, INT_VEC4, BOOL, BOOL_VEC2, BOOL_VEC3, BOOL_VEC4, FLOAT_MAT2, FLOAT_MAT3, FLOAT_MAT4, FLOAT_MAT2x3, FLOAT_MAT2x4, FLOAT_MAT3x2, FLOAT_MAT3x4, FLOAT_MAT4x2, FLOAT_MAT4x3, SAMPLER_2D, SAMPLER_3D, SAMPLER_CUBE, SAMPLER_2D_SHADOW, DEPTH_COMPONENT, ALPHA, RGB, RGBA, RGB565, DEPTH_STENCIL, NEAREST, LINEAR, NEAREST_MIPMAP_NEAREST, LINEAR_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_LINEAR, REPEAT, CLAMP_TO_EDGE, MIRRORED_REPEAT, FRONT, BACK, FRONT_AND_BACK, NEVER, LESS, EQUAL, LEQUAL, GREATER, NOTEQUAL, GEQUAL, ALWAYS, KEEP, REPLACE, INCR, DECR, INCR_WRAP, DECR_WRAP, INVERT, CW, CCW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZERO", function() { return ZERO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE", function() { return ONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SRC_COLOR", function() { return SRC_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_COLOR", function() { return ONE_MINUS_SRC_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA", function() { return SRC_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_ALPHA", function() { return ONE_MINUS_SRC_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DST_ALPHA", function() { return DST_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_ALPHA", function() { return ONE_MINUS_DST_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DST_COLOR", function() { return DST_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_COLOR", function() { return ONE_MINUS_DST_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA_SATURATE", function() { return SRC_ALPHA_SATURATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNC_ADD", function() { return FUNC_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION", function() { return BLEND_EQUATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_RGB", function() { return BLEND_EQUATION_RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_ALPHA", function() { return BLEND_EQUATION_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNC_SUBTRACT", function() { return FUNC_SUBTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNC_REVERSE_SUBTRACT", function() { return FUNC_REVERSE_SUBTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_RGB", function() { return BLEND_DST_RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_RGB", function() { return BLEND_SRC_RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_ALPHA", function() { return BLEND_DST_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_ALPHA", function() { return BLEND_SRC_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_COLOR", function() { return ONE_MINUS_CONSTANT_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTANT_ALPHA", function() { return CONSTANT_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_ALPHA", function() { return ONE_MINUS_CONSTANT_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_COLOR", function() { return BLEND_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BYTE", function() { return BYTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_BYTE", function() { return UNSIGNED_BYTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHORT", function() { return SHORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT", function() { return UNSIGNED_SHORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT", function() { return INT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT", function() { return UNSIGNED_INT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT", function() { return FLOAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_24_8", function() { return UNSIGNED_INT_24_8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_4_4_4_4", function() { return UNSIGNED_SHORT_4_4_4_4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_5_5_1", function() { return UNSIGNED_SHORT_5_5_5_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_6_5", function() { return UNSIGNED_SHORT_5_6_5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPTH_ATTACHMENT", function() { return DEPTH_ATTACHMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STENCIL_ATTACHMENT", function() { return STENCIL_ATTACHMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL_ATTACHMENT", function() { return DEPTH_STENCIL_ATTACHMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT0", function() { return COLOR_ATTACHMENT0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT1", function() { return COLOR_ATTACHMENT1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT2", function() { return COLOR_ATTACHMENT2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT3", function() { return COLOR_ATTACHMENT3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT4", function() { return COLOR_ATTACHMENT4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT5", function() { return COLOR_ATTACHMENT5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT6", function() { return COLOR_ATTACHMENT6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT7", function() { return COLOR_ATTACHMENT7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT8", function() { return COLOR_ATTACHMENT8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT9", function() { return COLOR_ATTACHMENT9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT10", function() { return COLOR_ATTACHMENT10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT11", function() { return COLOR_ATTACHMENT11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT12", function() { return COLOR_ATTACHMENT12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT13", function() { return COLOR_ATTACHMENT13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT14", function() { return COLOR_ATTACHMENT14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT15", function() { return COLOR_ATTACHMENT15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POINTS", function() { return POINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINES", function() { return LINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINE_LOOP", function() { return LINE_LOOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINE_STRIP", function() { return LINE_STRIP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIANGLES", function() { return TRIANGLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_STRIP", function() { return TRIANGLE_STRIP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_FAN", function() { return TRIANGLE_FAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STREAM_DRAW", function() { return STREAM_DRAW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATIC_DRAW", function() { return STATIC_DRAW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DYNAMIC_DRAW", function() { return DYNAMIC_DRAW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC2", function() { return FLOAT_VEC2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC3", function() { return FLOAT_VEC3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC4", function() { return FLOAT_VEC4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_VEC2", function() { return INT_VEC2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_VEC3", function() { return INT_VEC3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INT_VEC4", function() { return INT_VEC4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOL", function() { return BOOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC2", function() { return BOOL_VEC2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC3", function() { return BOOL_VEC3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC4", function() { return BOOL_VEC4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2", function() { return FLOAT_MAT2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3", function() { return FLOAT_MAT3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4", function() { return FLOAT_MAT4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x3", function() { return FLOAT_MAT2x3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x4", function() { return FLOAT_MAT2x4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x2", function() { return FLOAT_MAT3x2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x4", function() { return FLOAT_MAT3x4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x2", function() { return FLOAT_MAT4x2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x3", function() { return FLOAT_MAT4x3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D", function() { return SAMPLER_2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_3D", function() { return SAMPLER_3D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_CUBE", function() { return SAMPLER_CUBE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D_SHADOW", function() { return SAMPLER_2D_SHADOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT", function() { return DEPTH_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALPHA", function() { return ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB", function() { return RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return RGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB565", function() { return RGB565; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL", function() { return DEPTH_STENCIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEAREST", function() { return NEAREST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINEAR", function() { return LINEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_NEAREST", function() { return NEAREST_MIPMAP_NEAREST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_NEAREST", function() { return LINEAR_MIPMAP_NEAREST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_LINEAR", function() { return NEAREST_MIPMAP_LINEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_LINEAR", function() { return LINEAR_MIPMAP_LINEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPEAT", function() { return REPEAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLAMP_TO_EDGE", function() { return CLAMP_TO_EDGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIRRORED_REPEAT", function() { return MIRRORED_REPEAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FRONT", function() { return FRONT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACK", function() { return BACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FRONT_AND_BACK", function() { return FRONT_AND_BACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEVER", function() { return NEVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LESS", function() { return LESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EQUAL", function() { return EQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEQUAL", function() { return LEQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREATER", function() { return GREATER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTEQUAL", function() { return NOTEQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEQUAL", function() { return GEQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALWAYS", function() { return ALWAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEEP", function() { return KEEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE", function() { return REPLACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCR", function() { return INCR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECR", function() { return DECR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCR_WRAP", function() { return INCR_WRAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECR_WRAP", function() { return DECR_WRAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVERT", function() { return INVERT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CW", function() { return CW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CCW", function() { return CCW; });
const ZERO = 0;
const ONE = 1;
const SRC_COLOR = 0x0300;
const ONE_MINUS_SRC_COLOR = 0x0301;
const SRC_ALPHA = 0x0302;
const ONE_MINUS_SRC_ALPHA = 0x0303;
const DST_ALPHA = 0x0304;
const ONE_MINUS_DST_ALPHA = 0x0305;
const DST_COLOR = 0x0306;
const ONE_MINUS_DST_COLOR = 0x0307;
const SRC_ALPHA_SATURATE = 0x0308;
const FUNC_ADD = 0x8006;
const BLEND_EQUATION = 0x8009;
const BLEND_EQUATION_RGB = 0x8009;
const BLEND_EQUATION_ALPHA = 0x883D;
const FUNC_SUBTRACT = 0x800A;
const FUNC_REVERSE_SUBTRACT = 0x800B;
const BLEND_DST_RGB = 0x80C8;
const BLEND_SRC_RGB = 0x80C9;
const BLEND_DST_ALPHA = 0x80CA;
const BLEND_SRC_ALPHA = 0x80CB;
const ONE_MINUS_CONSTANT_COLOR = 0x8002;
const CONSTANT_ALPHA = 0x8003;
const ONE_MINUS_CONSTANT_ALPHA = 0x8004;
const BLEND_COLOR = 0x8005;
const BYTE = 0x1400;
const UNSIGNED_BYTE = 0x1401;
const SHORT = 0x1402;
const UNSIGNED_SHORT = 0x1403;
const INT = 0x1404;
const UNSIGNED_INT = 0x1405;
const FLOAT = 0x1406;
const UNSIGNED_INT_24_8 = 0x84FA;
const UNSIGNED_SHORT_4_4_4_4 = 0x8033;
const UNSIGNED_SHORT_5_5_5_1 = 0x8034;
const UNSIGNED_SHORT_5_6_5 = 0x8363;
const DEPTH_ATTACHMENT = 0x8D00;
const STENCIL_ATTACHMENT = 0x8D20;
const DEPTH_STENCIL_ATTACHMENT = 0x821A;
const COLOR_ATTACHMENT0 = 0x8CE0;
const COLOR_ATTACHMENT1 = 0x8CE1;
const COLOR_ATTACHMENT2 = 0x8CE2;
const COLOR_ATTACHMENT3 = 0x8CE3;
const COLOR_ATTACHMENT4 = 0x8CE4;
const COLOR_ATTACHMENT5 = 0x8CE5;
const COLOR_ATTACHMENT6 = 0x8CE6;
const COLOR_ATTACHMENT7 = 0x8CE7;
const COLOR_ATTACHMENT8 = 0x8CE8;
const COLOR_ATTACHMENT9 = 0x8CE9;
const COLOR_ATTACHMENT10 = 0x8CEA;
const COLOR_ATTACHMENT11 = 0x8CEB;
const COLOR_ATTACHMENT12 = 0x8CEC;
const COLOR_ATTACHMENT13 = 0x8CED;
const COLOR_ATTACHMENT14 = 0x8CEE;
const COLOR_ATTACHMENT15 = 0x8CEF;
const POINTS = 0x0000;
const LINES = 0x0001;
const LINE_LOOP = 0x0002;
const LINE_STRIP = 0x0003;
const TRIANGLES = 0x0004;
const TRIANGLE_STRIP = 0x0005;
const TRIANGLE_FAN = 0x0006;
const STREAM_DRAW = 0x88E0;
const STATIC_DRAW = 0x88E4;
const DYNAMIC_DRAW = 0x88E8;
const FLOAT_VEC2 = 0x8B50;
const FLOAT_VEC3 = 0x8B51;
const FLOAT_VEC4 = 0x8B52;
const INT_VEC2 = 0x8B53;
const INT_VEC3 = 0x8B54;
const INT_VEC4 = 0x8B55;
const BOOL = 0x8B56;
const BOOL_VEC2 = 0x8B57;
const BOOL_VEC3 = 0x8B58;
const BOOL_VEC4 = 0x8B59;
const FLOAT_MAT2 = 0x8B5A;
const FLOAT_MAT3 = 0x8B5B;
const FLOAT_MAT4 = 0x8B5C;
const FLOAT_MAT2x3 = 0x8B65;
const FLOAT_MAT2x4 = 0x8B66;
const FLOAT_MAT3x2 = 0x8B67;
const FLOAT_MAT3x4 = 0x8B68;
const FLOAT_MAT4x2 = 0x8B69;
const FLOAT_MAT4x3 = 0x8B6A;
const SAMPLER_2D = 0x8B5E;
const SAMPLER_3D = 0x8B5F;
const SAMPLER_CUBE = 0x8B60;
const SAMPLER_2D_SHADOW = 0x8B62;
const DEPTH_COMPONENT = 0x1902;
const ALPHA = 0x1906;
const RGB = 0x1907;
const RGBA = 0x1908;
const RGB565 = 0x8D62;
const DEPTH_STENCIL = 0x84F9;
const NEAREST = 0x2600;
const LINEAR = 0x2601;
const NEAREST_MIPMAP_NEAREST = 0x2700;
const LINEAR_MIPMAP_NEAREST = 0x2701;
const NEAREST_MIPMAP_LINEAR = 0x2702;
const LINEAR_MIPMAP_LINEAR = 0x2703;
const REPEAT = 0x2901;
const CLAMP_TO_EDGE = 0x812F;
const MIRRORED_REPEAT = 0x8370;
const FRONT = 0x0404;
const BACK = 0x0405;
const FRONT_AND_BACK = 0x0408;
const NEVER = 0x0200;
const LESS = 0x0201;
const EQUAL = 0x0202;
const LEQUAL = 0x0203;
const GREATER = 0x0204;
const NOTEQUAL = 0x0205;
const GEQUAL = 0x0206;
const ALWAYS = 0x0207;
const KEEP = 0x1E00;
const REPLACE = 0x1E01;
const INCR = 0x1E02;
const DECR = 0x1E03;
const INCR_WRAP = 0x8507;
const DECR_WRAP = 0x8508;
const INVERT = 0x150A;
const CW = 0x0900;
const CCW = 0x0901;
/* webgl中反解出来的值
export const POINTS = 0x0000
export const ZERO = 0x0000
export const NO_ERROR = 0x0000
export const NONE = 0x0000
export const LINES = 0x0001
export const ONE = 0x0001
export const LINE_LOOP = 0x0002
export const LINE_STRIP = 0x0003
export const TRIANGLES = 0x0004
export const TRIANGLE_STRIP = 0x0005
export const TRIANGLE_FAN = 0x0006
export const DEPTH_BUFFER_BIT = 0x0100
export const NEVER = 0x0200
export const LESS = 0x0201
export const EQUAL = 0x0202
export const LEQUAL = 0x0203
export const GREATER = 0x0204
export const NOTEQUAL = 0x0205
export const GEQUAL = 0x0206
export const ALWAYS = 0x0207
export const SRC_COLOR = 0x0300
export const ONE_MINUS_SRC_COLOR = 0x0301
export const SRC_ALPHA = 0x0302
export const ONE_MINUS_SRC_ALPHA = 0x0303
export const DST_ALPHA = 0x0304
export const ONE_MINUS_DST_ALPHA = 0x0305
export const DST_COLOR = 0x0306
export const ONE_MINUS_DST_COLOR = 0x0307
export const SRC_ALPHA_SATURATE = 0x0308
export const STENCIL_BUFFER_BIT = 0x0400
export const FRONT = 0x0404
export const BACK = 0x0405
export const FRONT_AND_BACK = 0x0408
export const INVALID_ENUM = 0x0500
export const INVALID_VALUE = 0x0501
export const INVALID_OPERATION = 0x0502
export const OUT_OF_MEMORY = 0x0505
export const INVALID_FRAMEBUFFER_OPERATION = 0x0506
export const CW = 0x0900
export const CCW = 0x0901
export const LINE_WIDTH = 0x0B21
export const CULL_FACE = 0x0B44
export const CULL_FACE_MODE = 0x0B45
export const FRONT_FACE = 0x0B46
export const DEPTH_RANGE = 0x0B70
export const DEPTH_TEST = 0x0B71
export const DEPTH_WRITEMASK = 0x0B72
export const DEPTH_CLEAR_VALUE = 0x0B73
export const DEPTH_FUNC = 0x0B74
export const STENCIL_TEST = 0x0B90
export const STENCIL_CLEAR_VALUE = 0x0B91
export const STENCIL_FUNC = 0x0B92
export const STENCIL_VALUE_MASK = 0x0B93
export const STENCIL_FAIL = 0x0B94
export const STENCIL_PASS_DEPTH_FAIL = 0x0B95
export const STENCIL_PASS_DEPTH_PASS = 0x0B96
export const STENCIL_REF = 0x0B97
export const STENCIL_WRITEMASK = 0x0B98
export const VIEWPORT = 0x0BA2
export const DITHER = 0x0Bd0
export const BLEND = 0x0Be2
export const SCISSOR_BOX = 0x0c10
export const SCISSOR_TEST = 0x0c11
export const COLOR_CLEAR_VALUE = 0x0c22
export const COLOR_WRITEMASK = 0x0c23
export const UNPACK_ALIGNMENT = 0x0cf5
export const PACK_ALIGNMENT = 0x0d05
export const MAX_TEXTURE_SIZE = 0x0d33
export const MAX_VIEWPORT_DIMS = 0x0d3A
export const SUBPIXEL_BITS = 0x0d50
export const RED_BITS = 0x0d52
export const GREEN_BITS = 0x0d53
export const BLUE_BITS = 0x0d54
export const ALPHA_BITS = 0x0d55
export const DEPTH_BITS = 0x0d56
export const STENCIL_BITS = 0x0d57
export const TEXTURE_2D = 0x0de1
export const DONT_CARE = 0x1100
export const FASTEST = 0x1101
export const NICEST = 0x1102
export const BYTE = 0x1400
export const UNSIGNED_BYTE = 0x1401
export const SHORT = 0x1402
export const UNSIGNED_SHORT = 0x1403
export const INT = 0x1404
export const UNSIGNED_INT = 0x1405
export const FLOAT = 0x1406
export const INVERT = 0x150A
export const TEXTURE = 0x1702
export const DEPTH_COMPONENT = 0x1902
export const ALPHA = 0x1906
export const RGB = 0x1907
export const RGBA = 0x1908
export const LUMINANCE = 0x1909
export const LUMINANCE_ALPHA = 0x190A
export const KEEP = 0x1e00
export const REPLACE = 0x1e01
export const INCR = 0x1e02
export const DECR = 0x1e03
export const VENDOR = 0x1f00
export const RENDERER = 0x1f01
export const VERSION = 0x1f02
export const NEAREST = 0x2600
export const LINEAR = 0x2601
export const NEAREST_MIPMAP_NEAREST = 0x2700
export const LINEAR_MIPMAP_NEAREST = 0x2701
export const NEAREST_MIPMAP_LINEAR = 0x2702
export const LINEAR_MIPMAP_LINEAR = 0x2703
export const TEXTURE_MAG_FILTER = 0x2800
export const TEXTURE_MIN_FILTER = 0x2801
export const TEXTURE_WRAP_S = 0x2802
export const TEXTURE_WRAP_T = 0x2803
export const REPEAT = 0x2901
export const POLYGON_OFFSET_UNITS = 0x2A00
export const COLOR_BUFFER_BIT = 0x4000
export const CONSTANT_COLOR = 0x8001
export const ONE_MINUS_CONSTANT_COLOR = 0x8002
export const CONSTANT_ALPHA = 0x8003
export const ONE_MINUS_CONSTANT_ALPHA = 0x8004
export const BLEND_COLOR = 0x8005
export const FUNC_ADD = 0x8006
export const BLEND_EQUATION = 0x8009
export const BLEND_EQUATION_RGB = 0x8009
export const FUNC_SUBTRACT = 0x800A
export const FUNC_REVERSE_SUBTRACT = 0x800B
export const UNSIGNED_SHORT_4_4_4_4 = 0x8033
export const UNSIGNED_SHORT_5_5_5_1 = 0x8034
export const POLYGON_OFFSET_FILL = 0x8037
export const POLYGON_OFFSET_FACTOR = 0x8038
export const RGBA4 = 0x8056
export const RGB5_A1 = 0x8057
export const TEXTURE_BINDING_2D = 0x8069
export const SAMPLE_ALPHA_TO_COVERAGE = 0x809e
export const SAMPLE_COVERAGE = 0x80A0
export const SAMPLE_BUFFERS = 0x80A8
export const SAMPLES = 0x80A9
export const SAMPLE_COVERAGE_VALUE = 0x80AA
export const SAMPLE_COVERAGE_INVERT = 0x80AB
export const BLEND_DST_RGB = 0x80c8
export const BLEND_SRC_RGB = 0x80c9
export const BLEND_DST_ALPHA = 0x80cA
export const BLEND_SRC_ALPHA = 0x80cB
export const CLAMP_TO_EDGE = 0x812f
export const GENERATE_MIPMAP_HINT = 0x8192
export const DEPTH_COMPONENT16 = 0x81A5
export const DEPTH_STENCIL_ATTACHMENT = 0x821A
export const UNSIGNED_SHORT_5_6_5 = 0x8363
export const MIRRORED_REPEAT = 0x8370
export const ALIASED_POINT_SIZE_RANGE = 0x846d
export const ALIASED_LINE_WIDTH_RANGE = 0x846e
export const TEXTURE0 = 0x84c0
export const TEXTURE1 = 0x84c1
export const TEXTURE2 = 0x84c2
export const TEXTURE3 = 0x84c3
export const TEXTURE4 = 0x84c4
export const TEXTURE5 = 0x84c5
export const TEXTURE6 = 0x84c6
export const TEXTURE7 = 0x84c7
export const TEXTURE8 = 0x84c8
export const TEXTURE9 = 0x84c9
export const TEXTURE10 = 0x84cA
export const TEXTURE11 = 0x84cB
export const TEXTURE12 = 0x84cc
export const TEXTURE13 = 0x84cd
export const TEXTURE14 = 0x84ce
export const TEXTURE15 = 0x84cf
export const TEXTURE16 = 0x84d0
export const TEXTURE17 = 0x84d1
export const TEXTURE18 = 0x84d2
export const TEXTURE19 = 0x84d3
export const TEXTURE20 = 0x84d4
export const TEXTURE21 = 0x84d5
export const TEXTURE22 = 0x84d6
export const TEXTURE23 = 0x84d7
export const TEXTURE24 = 0x84d8
export const TEXTURE25 = 0x84d9
export const TEXTURE26 = 0x84dA
export const TEXTURE27 = 0x84dB
export const TEXTURE28 = 0x84dc
export const TEXTURE29 = 0x84dd
export const TEXTURE30 = 0x84de
export const TEXTURE31 = 0x84df
export const ACTIVE_TEXTURE = 0x84e0
export const MAX_RENDERBUFFER_SIZE = 0x84e8
export const DEPTH_STENCIL = 0x84f9
export const INCR_WRAP = 0x8507
export const DECR_WRAP = 0x8508
export const TEXTURE_CUBE_MAP = 0x8513
export const TEXTURE_BINDING_CUBE_MAP = 0x8514
export const TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515
export const TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516
export const TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517
export const TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518
export const TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519
export const TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A
export const MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c
export const VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622
export const VERTEX_ATTRIB_ARRAY_SIZE = 0x8623
export const VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624
export const VERTEX_ATTRIB_ARRAY_TYPE = 0x8625
export const CURRENT_VERTEX_ATTRIB = 0x8626
export const VERTEX_ATTRIB_ARRAY_POINTER = 0x8645
export const COMPRESSED_TEXTURE_FORMATS = 0x86A3
export const BUFFER_SIZE = 0x8764
export const BUFFER_USAGE = 0x8765
export const STENCIL_BACK_FUNC = 0x8800
export const STENCIL_BACK_FAIL = 0x8801
export const STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802
export const STENCIL_BACK_PASS_DEPTH_PASS = 0x8803
export const BLEND_EQUATION_ALPHA = 0x883d
export const MAX_VERTEX_ATTRIBS = 0x8869
export const VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A
export const MAX_TEXTURE_IMAGE_UNITS = 0x8872
export const ARRAY_BUFFER = 0x8892
export const ELEMENT_ARRAY_BUFFER = 0x8893
export const ARRAY_BUFFER_BINDING = 0x8894
export const ELEMENT_ARRAY_BUFFER_BINDING = 0x8895
export const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889f
export const STREAM_DRAW = 0x88e0
export const STATIC_DRAW = 0x88e4
export const DYNAMIC_DRAW = 0x88e8
export const FRAGMENT_SHADER = 0x8B30
export const VERTEX_SHADER = 0x8B31
export const MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4c
export const MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4d
export const SHADER_TYPE = 0x8B4f
export const FLOAT_VEC2 = 0x8B50
export const FLOAT_VEC3 = 0x8B51
export const FLOAT_VEC4 = 0x8B52
export const INT_VEC2 = 0x8B53
export const INT_VEC3 = 0x8B54
export const INT_VEC4 = 0x8B55
export const BOOL = 0x8B56
export const BOOL_VEC2 = 0x8B57
export const BOOL_VEC3 = 0x8B58
export const BOOL_VEC4 = 0x8B59
export const FLOAT_MAT2 = 0x8B5A
export const FLOAT_MAT3 = 0x8B5B
export const FLOAT_MAT4 = 0x8B5c
export const SAMPLER_2D = 0x8B5e
export const SAMPLER_CUBE = 0x8B60
export const DELETE_STATUS = 0x8B80
export const COMPILE_STATUS = 0x8B81
export const LINK_STATUS = 0x8B82
export const VALIDATE_STATUS = 0x8B83
export const ATTACHED_SHADERS = 0x8B85
export const ACTIVE_UNIFORMS = 0x8B86
export const ACTIVE_ATTRIBUTES = 0x8B89
export const SHADING_LANGUAGE_VERSION = 0x8B8c
export const CURRENT_PROGRAM = 0x8B8d
export const IMPLEMENTATION_COLOR_READ_TYPE = 0x8B9A
export const IMPLEMENTATION_COLOR_READ_FORMAT = 0x8B9B
export const STENCIL_BACK_REF = 0x8cA3
export const STENCIL_BACK_VALUE_MASK = 0x8cA4
export const STENCIL_BACK_WRITEMASK = 0x8cA5
export const FRAMEBUFFER_BINDING = 0x8cA6
export const RENDERBUFFER_BINDING = 0x8cA7
export const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8cd0
export const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8cd1
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8cd2
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8cd3
export const FRAMEBUFFER_COMPLETE = 0x8cd5
export const FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8cd6
export const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8cd7
export const FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8cd9
export const FRAMEBUFFER_UNSUPPORTED = 0x8cdd
export const COLOR_ATTACHMENT0 = 0x8ce0
export const DEPTH_ATTACHMENT = 0x8d00
export const STENCIL_ATTACHMENT = 0x8d20
export const FRAMEBUFFER = 0x8d40
export const RENDERBUFFER = 0x8d41
export const RENDERBUFFER_WIDTH = 0x8d42
export const RENDERBUFFER_HEIGHT = 0x8d43
export const RENDERBUFFER_INTERNAL_FORMAT = 0x8d44
export const STENCIL_INDEX8 = 0x8d48
export const RENDERBUFFER_RED_SIZE = 0x8d50
export const RENDERBUFFER_GREEN_SIZE = 0x8d51
export const RENDERBUFFER_BLUE_SIZE = 0x8d52
export const RENDERBUFFER_ALPHA_SIZE = 0x8d53
export const RENDERBUFFER_DEPTH_SIZE = 0x8d54
export const RENDERBUFFER_STENCIL_SIZE = 0x8d55
export const RGB565 = 0x8d62
export const LOW_FLOAT = 0x8df0
export const MEDIUM_FLOAT = 0x8df1
export const HIGH_FLOAT = 0x8df2
export const LOW_INT = 0x8df3
export const MEDIUM_INT = 0x8df4
export const HIGH_INT = 0x8df5
export const MAX_VERTEX_UNIFORM_VECTORS = 0x8dfB
export const MAX_VARYING_VECTORS = 0x8dfc
export const MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd
export const UNPACK_FLIP_Y_WEBGL = 0x9240
export const UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241
export const CONTEXT_LOST_WEBGL = 0x9242
export const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243
export const BROWSER_DEFAULT_WEBGL = 0x9244

*/


/***/ }),

/***/ "./src/graphics/Shader.ts":
/*!********************************!*\
  !*** ./src/graphics/Shader.ts ***!
  \********************************/
/*! exports provided: Shader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony import */ var _GraphicsObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphicsObject */ "./src/graphics/GraphicsObject.ts");

class Shader extends _GraphicsObject__WEBPACK_IMPORTED_MODULE_0__["GraphicsObject"] {
    /** do NOT altar this value */
    constructor() {
        super();
        this._count = 1;
    }
}


/***/ }),

/***/ "./src/graphics/ShaderConst.ts":
/*!*************************************!*\
  !*** ./src/graphics/ShaderConst.ts ***!
  \*************************************/
/*! exports provided: ShaderConst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderConst", function() { return ShaderConst; });
class ShaderConst {
    constructor() { }
    /**
     * get texture map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    static _getTextures() {
        return ShaderConst._textures;
    }
    /**
     * Get unifrom map
     * Do NOT call this function, this ONLY be used for renderer
     */
    static _getUniforms() {
        return ShaderConst._uniforms;
    }
    /**
     * Get attribute map;
     * Do NOT call this function, this ONLY be used for renderer
     */
    static _getAttributes() {
        return ShaderConst._attributes;
    }
    static _inTex(name) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._tid++;
        r._textures[name] = value;
        return value;
    }
    static _inUni(name) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._uid++;
        r._uniforms[name] = value;
        return value;
    }
    static _inAtt(name) {
        const r = ShaderConst;
        const value = r._dbg ? name : r._aid++;
        r._attributes[name] = value;
        return value;
    }
}
ShaderConst._tid = 0;
ShaderConst._textures = {};
ShaderConst._uid = 0;
ShaderConst._uniforms = {};
ShaderConst._aid = 0;
ShaderConst._attributes = {};
ShaderConst._dbg = true;
// supported attribute name;
ShaderConst.position = ShaderConst._inAtt('a_position');
ShaderConst.texcoord = ShaderConst._inAtt('a_texcoord');
ShaderConst.texcoord1 = ShaderConst._inAtt('a_texcoord1');
ShaderConst.normal = ShaderConst._inAtt('a_normal');
ShaderConst.tangent = ShaderConst._inAtt('a_tangent');
ShaderConst.binomial = ShaderConst._inAtt('a_binomial');
ShaderConst.color = ShaderConst._inAtt('a_color');
ShaderConst.joints = ShaderConst._inAtt('a_joints');
ShaderConst.weights = ShaderConst._inAtt('a_weights');
ShaderConst.texcoord2 = ShaderConst._inAtt('a_texcoord2');
ShaderConst.texcoord3 = ShaderConst._inAtt('a_texcoord3');
// supported texture name;
ShaderConst.baseColorMap = ShaderConst._inTex('u_baseColorMap');
ShaderConst.depthMap = ShaderConst._inTex('u_depthMap');
ShaderConst.diffuseMap = ShaderConst._inTex('u_diffuseMap');
ShaderConst.normalMap = ShaderConst._inTex('u_normalMap');
ShaderConst.specularMap = ShaderConst._inTex('u_specularMap');
ShaderConst.roughnessMap = ShaderConst._inTex('u_roughnessMap');
ShaderConst.metallicMap = ShaderConst._inTex('u_metallicMap');
ShaderConst.aoMap = ShaderConst._inTex('u_aoMap');
ShaderConst.emissiveMap = ShaderConst._inTex('u_emissiveMap');
ShaderConst.cartoonLUTMap = ShaderConst._inTex('u_cartoonLUTMap');
ShaderConst.brdfLUTMap = ShaderConst._inTex('u_brdfLUTMap');
ShaderConst.lumMap = ShaderConst._inTex('u_lumMap');
ShaderConst.bloomMap = ShaderConst._inTex('u_bloomMap');
ShaderConst.randomMap = ShaderConst._inTex('u_randomMap');
/**
 * Ordered Dithering Map used for alpha test
 */
ShaderConst.ODMap = ShaderConst._inTex('u_ODMap');
/** cube map */
ShaderConst.irradianceMap = ShaderConst._inTex('u_irradianceMap');
ShaderConst.prefilterMap = ShaderConst._inTex('u_prefilterMap');
// supported uniform name;
/**
 * Ordered Dithering size' inverse;
 */
ShaderConst.ODSizeInv = ShaderConst._inUni('u_ODSizeInv');
ShaderConst.uvOffset = ShaderConst._inUni('u_uvOffset');
ShaderConst.baseColor = ShaderConst._inUni('u_baseColor');
ShaderConst.pixelSize = ShaderConst._inUni('u_pixelSize');
ShaderConst.pixelDir = ShaderConst._inUni('u_pixelDir');
ShaderConst.cameraPos = ShaderConst._inUni('u_cameraPos');
ShaderConst.lightColor = ShaderConst._inUni('u_lightColor');
ShaderConst.lightPos = ShaderConst._inUni('u_lightPos');
ShaderConst.lightDir = ShaderConst._inUni('u_lightDir');
ShaderConst.aoScale = ShaderConst._inUni('u_aoScale');
ShaderConst.glossiness = ShaderConst._inUni('u_glossiness');
ShaderConst.reflectance = ShaderConst._inUni('u_reflectance');
ShaderConst.merged = ShaderConst._inUni('u_merged');
ShaderConst.merged1 = ShaderConst._inUni('u_merged1');
ShaderConst.merged2 = ShaderConst._inUni('u_merged2');
ShaderConst.merged3 = ShaderConst._inUni('u_merged3');
ShaderConst.specular = ShaderConst._inUni('u_specular');
ShaderConst.lumPCT = ShaderConst._inUni('u_lumPCT');
ShaderConst.multiUsing = ShaderConst._inUni('u_multiUsing');
ShaderConst.aoParam = ShaderConst._inUni('u_aoParam');
ShaderConst.matType = ShaderConst._inUni('u_matType');
ShaderConst.cameraRange = ShaderConst._inUni('u_cameraRange');
/** world(model) matrix */
ShaderConst.mMat = ShaderConst._inUni('u_mMat');
/** inv world(model) matrix */
ShaderConst.mITMat = ShaderConst._inUni('u_mITMat');
/** view matrix */
ShaderConst.vMat = ShaderConst._inUni('u_vMat');
/** view matrix */
ShaderConst.vIMat = ShaderConst._inUni('u_vIMat');
/** inv t view matrix */
ShaderConst.vITMat = ShaderConst._inUni('u_vITMat');
/** projection matrix */
ShaderConst.pMat = ShaderConst._inUni('u_pMat');
/** inv projection matrix */
ShaderConst.pIMat = ShaderConst._inUni('u_pIMat');
/** view projection matrix */
ShaderConst.mvMat = ShaderConst._inUni('u_mvMat');
/** view projection matrix */
ShaderConst.vpMat = ShaderConst._inUni('u_vpMat');
/** inv view projection matrix */
ShaderConst.vpIMat = ShaderConst._inUni('u_vpIMat');
/** model view projection matrix */
ShaderConst.mvpMat = ShaderConst._inUni('u_mvpMat');
/** shadow map matrix */
ShaderConst.depthMat = ShaderConst._inUni('u_depthMat');


/***/ }),

/***/ "./src/graphics/Stencil.ts":
/*!*********************************!*\
  !*** ./src/graphics/Stencil.ts ***!
  \*********************************/
/*! exports provided: Stencil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stencil", function() { return Stencil; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphicsTypes */ "./src/graphics/GraphicsTypes.ts");


class Stencil {
    constructor() {
        this.stencilMask = 0xFF;
        this.stencilBackMask = 0xFF;
        this.stencilFunc = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FRONT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ALWAYS"], 0, 1];
        this.stencilBackFunc = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["BACK"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ALWAYS"], 0, 1];
        this.stencilOp = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FRONT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"]];
        this.stencilBackOp = [_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["BACK"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"]];
    }
    setStencilMask(value, face = _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE) {
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].FRONT) {
            this.stencilMask = value;
        }
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].BACK) {
            this.stencilBackMask = value;
        }
    }
    setStencilFunc(func, ref, mask, face = _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE) {
        let front = this.stencilFunc;
        let back = this.stencilBackFunc;
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].FRONT) {
            front[1] = func;
            front[2] = ref;
            front[3] = mask;
        }
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].BACK) {
            back[1] = func;
            back[2] = ref;
            back[3] = mask;
        }
    }
    setStencilOp(fail, zfail, zpass, face = _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE) {
        let front = this.stencilOp;
        let back = this.stencilBackOp;
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].FRONT) {
            front[1] = fail;
            front[2] = zfail;
            front[3] = zpass;
        }
        if (face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].DOUBLE || face === _GraphicsTypes__WEBPACK_IMPORTED_MODULE_1__["FaceType"].BACK) {
            back[1] = fail;
            back[2] = zfail;
            back[3] = zpass;
        }
    }
    clone() {
        let stencil = new Stencil();
        Stencil.Copy(this, stencil);
        return stencil;
    }
    copy(stencil) {
        Stencil.Copy(stencil, this);
        return this;
    }
    static Copy(src, dst) {
        dst.stencilMask = src.stencilMask;
        dst.stencilBackMask = src.stencilBackMask;
        for (let i = 1; i < 4; i++) {
            dst.stencilFunc[i] = src.stencilFunc[i];
            dst.stencilBackFunc[i] = src.stencilBackFunc[i];
            dst.stencilOp[i] = src.stencilOp[i];
            dst.stencilBackOp[i] = src.stencilBackOp[i];
        }
    }
}
Stencil.DefStencil = new Stencil();


/***/ }),

/***/ "./src/graphics/Texture.ts":
/*!*********************************!*\
  !*** ./src/graphics/Texture.ts ***!
  \*********************************/
/*! exports provided: Texture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return Texture; });
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphicsObject */ "./src/graphics/GraphicsObject.ts");


class Texture extends _GraphicsObject__WEBPACK_IMPORTED_MODULE_1__["GraphicsObject"] {
    constructor() {
        super();
        this._minFilter = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LINEAR"];
        this._magFilter = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LINEAR"];
        this._format = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"];
        this._internalformat = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"];
        this._dataType = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"];
        this._mipmap = false;
        this._needMipmap = false;
    }
    setFilter(min, mag) {
        this._minFilter = min || _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LINEAR"];
        this._magFilter = mag || _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LINEAR"];
    }
    getMinFilter() {
        return this._minFilter;
    }
    getMagFilter() {
        return this._magFilter;
    }
    setFormat(src, internal) {
        this._format = src || _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"];
        this._internalformat = internal || src || _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"];
    }
    getFormat() {
        return this._format;
    }
    getInternalformat() {
        return this._internalformat;
    }
    setDataType(type) {
        this._dataType = type;
    }
    getDataType() {
        return this._dataType;
    }
    setMipmap(value) {
        this._needMipmap = value;
        this.needsUpdate();
    }
    getMipmap() {
        return this._needMipmap;
    }
    getType() {
        return -1;
    }
    get isUrl() {
        return false;
    }
}
Texture.TEXTURE2D = 0;
Texture.TEXTURECUBE = 1;


/***/ }),

/***/ "./src/graphics/Texture2D.ts":
/*!***********************************!*\
  !*** ./src/graphics/Texture2D.ts ***!
  \***********************************/
/*! exports provided: Texture2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Texture2D", function() { return Texture2D; });
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _Texture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Texture */ "./src/graphics/Texture.ts");
/* harmony import */ var _io_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../io/Loader */ "./src/io/Loader.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Util */ "./src/util/Util.ts");




class Texture2D extends _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"] {
    constructor() {
        super();
        this._wrapS = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CLAMP_TO_EDGE"];
        this._wrapT = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CLAMP_TO_EDGE"];
        this._width = 0;
        this._height = 0;
    }
    static _gen1pxColorTexture2D(color) {
        let tex = new Texture2D();
        tex.setFormat(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"]);
        tex.setDataType(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"]);
        tex.setData(1, 1, new Uint8Array(color));
        return tex;
    }
    static get White() {
        if (!Texture2D._White) {
            Texture2D._White = this._gen1pxColorTexture2D([255, 255, 255, 255]);
        }
        return Texture2D._White;
    }
    static get Normal() {
        if (!Texture2D._Normal) {
            Texture2D._Normal = this._gen1pxColorTexture2D([127, 127, 255, 255]);
        }
        return Texture2D._Normal;
    }
    static get Black() {
        if (!Texture2D._Black) {
            Texture2D._Black = this._gen1pxColorTexture2D([0, 0, 0, 255]);
        }
        return Texture2D._Black;
    }
    static get BrdfLUT() {
        if (!Texture2D._BrdfLUT) {
            let tex = new Texture2D;
            tex.setUrl('envLUT.png');
            Texture2D._BrdfLUT = tex;
        }
        return Texture2D._BrdfLUT;
    }
    static get ODTex() {
        if (!Texture2D._ODTex) {
            let tex = new Texture2D();
            tex.setFormat(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ALPHA"], _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ALPHA"]);
            tex.setDataType(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"]);
            // tex.setFilter(CGE.REPEAT, CGE.REPEAT);
            tex.setData(16, 16, new Uint8Array(Object(_util_Util__WEBPACK_IMPORTED_MODULE_3__["BuildOrderedDitheringData"])(4)));
            Texture2D._ODTex = tex;
        }
        return Texture2D._ODTex;
    }
    setUrl(url, def = Texture2D.White, func) {
        if (this.isUrl) {
            _io_Loader__WEBPACK_IMPORTED_MODULE_2__["Loader"].removeImage(this._url);
            this._url = null;
        }
        if (url && url !== '') {
            this._data = _io_Loader__WEBPACK_IMPORTED_MODULE_2__["Loader"].loadImage(url, func);
            this._def = def;
            this._url = url;
        }
        this.needsUpdate();
    }
    setData(width, height, data) {
        if (this.isUrl) {
            _io_Loader__WEBPACK_IMPORTED_MODULE_2__["Loader"].removeImage(this._url);
            this._url = null;
        }
        this._width = width;
        this._height = height;
        this._data = data;
        this.needsUpdate();
    }
    getImage() {
        return this._data;
    }
    getData() {
        return this._data;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
        this.needsUpdate();
    }
    getWrapS() {
        return this._wrapS;
    }
    getWrapT() {
        return this._wrapT;
    }
    setSize(width, height) {
        this._width = width;
        this._height = height;
        this.needsUpdate();
    }
    get loaded() {
        return this._url ? this._data.complete : true;
    }
    getUrl() {
        return this._url;
    }
    get isUrl() {
        return this._url && this._url !== '';
    }
    getType() {
        return _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"].TEXTURE2D;
    }
    destroy() {
        super.destroy();
        if (this._url) {
            _io_Loader__WEBPACK_IMPORTED_MODULE_2__["Loader"].removeImage(this._url);
        }
    }
}


/***/ }),

/***/ "./src/graphics/TextureCube.ts":
/*!*************************************!*\
  !*** ./src/graphics/TextureCube.ts ***!
  \*************************************/
/*! exports provided: CubeVectors, TextureCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeVectors", function() { return CubeVectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureCube", function() { return TextureCube; });
/* harmony import */ var _RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _Texture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Texture */ "./src/graphics/Texture.ts");
/* harmony import */ var _Texture2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");




const CubeVectors = [
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](1.0, 0.0, 0.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, -1.0) },
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](-1.0, 0.0, 0.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, -1.0) },
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, 1.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, -1.0, 0.0) },
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, -1.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 1.0, 0.0) },
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, -1.0, 0.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, -1.0) },
    { target: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 1.0, 0.0), up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0.0, 0.0, -1.0) },
];
// Y-UP
// export const CubeVectors = [
//     { target: new Vector3(1.0,0.0,0.0), up: new Vector3(0.0,-1.0,0.0) },
//     { target: new Vector3(-1.0,0.0,0.0), up: new Vector3(0.0,-1.0,0.0) },
//     { target: new Vector3(0.0,1.0,0.0), up: new Vector3(0.0,0.0,1.0) },
//     { target: new Vector3(0.0,-1.0,0.0), up: new Vector3(0.0,0.0,-1.0) },
//     { target: new Vector3(0.0,0.0,1.0), up: new Vector3(0.0,-1.0,0.0) },
//     { target: new Vector3(0.0,0.0,-1.0), up: new Vector3(0.0,-1.0,0.0) },
// ];
class TextureCube extends _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"] {
    constructor() {
        super();
        this._wrapS = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CLAMP_TO_EDGE"];
        this._wrapT = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CLAMP_TO_EDGE"];
        this._wrapR = _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CLAMP_TO_EDGE"];
        this._texture2ds = [undefined, undefined, undefined, undefined, undefined, undefined];
    }
    static _gen1pxColorTextureCube(tex2d) {
        let tex = new TextureCube();
        tex.setFormat(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"]);
        tex.setDataType(_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"]);
        tex.setTexture2ds(tex2d, tex2d, tex2d, tex2d, tex2d, tex2d);
        return tex;
    }
    static get White() {
        if (!TextureCube._White) {
            TextureCube._White = TextureCube._gen1pxColorTextureCube(_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White);
        }
        return TextureCube._White;
    }
    static get Black() {
        if (!TextureCube._Black) {
            TextureCube._Black = TextureCube._gen1pxColorTextureCube(_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].Black);
        }
        return TextureCube._Black;
    }
    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
        this.needsUpdate();
    }
    setTexture2ds(positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ) {
        this._texture2ds[0] = positiveX || this._texture2ds[0];
        this._texture2ds[1] = negativeX || this._texture2ds[1];
        this._texture2ds[2] = positiveY || this._texture2ds[2];
        this._texture2ds[3] = negativeY || this._texture2ds[3];
        this._texture2ds[4] = positiveZ || this._texture2ds[4];
        this._texture2ds[5] = negativeZ || this._texture2ds[5];
        this.needsUpdate();
    }
    getTexture2ds() {
        return this._texture2ds;
    }
    getWrapS() {
        return this._wrapS;
    }
    getWrapT() {
        return this._wrapT;
    }
    getWrapR() {
        return this._wrapR;
    }
    getType() {
        return _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"].TEXTURECUBE;
    }
    setAllSize(w, h) {
        this._texture2ds.forEach(tex => {
            tex.setSize(w, h);
        });
    }
    destroy() {
        super.destroy();
        this._texture2ds.forEach(tex => {
            if (tex) {
                tex.destroy();
            }
        });
    }
}


/***/ }),

/***/ "./src/io/Loader.ts":
/*!**************************!*\
  !*** ./src/io/Loader.ts ***!
  \**************************/
/*! exports provided: Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Logger */ "./src/core/Logger.ts");
/* harmony import */ var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/EventDispatcher */ "./src/core/EventDispatcher.ts");


const events = new _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]();
class Loader {
    static setBaseUrl(url) {
        Loader._baseUrl = url;
    }
    static join(url) {
        if (url.indexOf(Loader._baseUrl) === 0) {
            return url;
        }
        return Loader._baseUrl + url;
    }
    static loadImage(url, func) {
        let path = Loader.join(url);
        let obj = this._imgsMap.get(url);
        if (obj) {
            obj.count++;
            func && func();
            return obj.image;
        }
        let img = new Image();
        this._imgsMap.set(path, { count: 1, image: img });
        img.onload = () => {
            func && func();
        };
        img.onerror = () => {
            _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error(img.baseURI, 'can not loaded');
        };
        img.src = path;
        return img;
    }
    static removeImage(url) {
        let path = Loader.join(url);
        let obj = this._imgsMap.get(path);
        if (obj) {
            obj.count--;
            if (obj.count === 0) {
                this._imgsMap.delete(path);
            }
        }
    }
    static loadUrl(url, type = 'text') {
        return this._XMLHttpRequest(Loader.join(url), type)
            .then(xmlHttpResponse => {
            return xmlHttpResponse;
        })
            .catch(errMsg => _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error(errMsg));
    }
    static loadUrls(urls, callback) {
        const promises = urls.map(({ url, type }) => {
            return this._XMLHttpRequest(Loader.join(url), type)
                .then(xmlHttpResponse => {
                return xmlHttpResponse;
            })
                .catch(errMsg => _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error(errMsg));
        });
        return Promise.all(promises)
            .then(result => {
            return callback ? callback(result) : result;
        })
            .catch(errMsg => _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error(errMsg));
    }
    static _disposeLoad() {
        let itr = this._loadList.entries().next();
        if (itr.done || this._xmlRequests.length === 0) {
            return;
        }
        this._loadList.delete(itr.value[0]);
        const url = itr.value[0];
        const type = itr.value[1];
        const xmlHttp = this._xmlRequests.pop();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                this._xmlRequests.push(xmlHttp);
                this._disposeLoad();
                if (xmlHttp.status == 200) {
                    this._loadedMap.set(url, xmlHttp.response);
                    events.event(url, [xmlHttp.response]);
                }
                else {
                    _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error(xmlHttp);
                }
            }
        };
        xmlHttp.open('GET', url, true);
        xmlHttp.responseType = !type ? '' : type;
        xmlHttp.send(null);
    }
    static _XMLHttpRequest(url, type) {
        let path = Loader.join(url);
        let data = this._loadedMap.get(path);
        if (data) {
            return Promise.resolve(data);
        }
        this._loadList.set(path, type);
        return new Promise((resolve, reject) => {
            events.once(path, this, resolve);
            this._disposeLoad();
        });
    }
}
Loader._baseUrl = '';
Loader._imgsMap = new Map();
Loader._loadedMap = new Map();
Loader._loadList = new Map();
Loader._xmlRequests = [new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest()];


/***/ }),

/***/ "./src/light/DirectionLight.ts":
/*!*************************************!*\
  !*** ./src/light/DirectionLight.ts ***!
  \*************************************/
/*! exports provided: DirectionLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectionLight", function() { return DirectionLight; });
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _DirectionShadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectionShadow */ "./src/light/DirectionShadow.ts");



class DirectionLight extends _Light__WEBPACK_IMPORTED_MODULE_0__["Light"] {
    constructor() {
        super();
        this._dir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().normalize();
        this.setPosition(150, 200, 200);
        let vec = _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pubTemp.set(1, 1, 1.5).normalize();
        this.setDirection(vec);
    }
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
    }
    setDir(x, y, z) {
        let vec = _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pubTemp.set(x, y, z).normalize();
        this.setDirection(vec);
    }
    setDirection(dir) {
        this._rotate.rotationTo(_Light__WEBPACK_IMPORTED_MODULE_0__["Light"].DefDir, dir);
        this._dir.set(0, 0, 1);
        this._dir.applyQuaternion(this._rotate).normalize();
    }
    get dir() {
        return this._dir;
    }
    enableShadow() {
        if (!this._shadow) {
            this._shadow = new _DirectionShadow__WEBPACK_IMPORTED_MODULE_2__["DirectionShadow"]();
            this._shadow.init();
        }
        this._shadow.enalbed = true;
    }
    disableShadow() {
        if (!this._shadow) {
            return;
        }
        this._shadow.enalbed = false;
    }
    clearShadow() {
        if (this._shadow) {
            this._shadow.destroy();
            this._shadow = null;
        }
    }
    get shadow() {
        return this._shadow;
    }
    get type() {
        return 1; //LightType.Direction;
    }
    get isDirectionLight() {
        return true;
    }
}


/***/ }),

/***/ "./src/light/DirectionShadow.ts":
/*!**************************************!*\
  !*** ./src/light/DirectionShadow.ts ***!
  \**************************************/
/*! exports provided: DirectionShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectionShadow", function() { return DirectionShadow; });
/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shadow */ "./src/light/Shadow.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/Frame */ "./src/graphics/Frame.ts");






class DirectionShadow extends _Shadow__WEBPACK_IMPORTED_MODULE_0__["Shadow"] {
    constructor() {
        super();
        this._size = 512;
        this.range = 200;
        this.far = 2000;
        this.autoRange = false;
        this.matrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    }
    init(size = 512) {
        this._size = size;
        let tex = this._depthTex;
        if (!tex) {
            tex = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
            tex.setDataType(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["UNSIGNED_BYTE"]);
            tex.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["LINEAR"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["LINEAR"]);
            this._depthTex = tex;
        }
        tex.setSize(size, size);
        let frame = this.frame;
        if (!frame) {
            frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__["Frame"]();
            frame.setTexture2D(0 /* COLOR */, tex);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(1, 1, 1, 1);
            this.frame = frame;
        }
        frame.setSize(size, size);
    }
    get depthTex() {
        return this._depthTex;
    }
    set size(n) {
        this._size = n;
        this._depthTex && this._depthTex.setSize(n, n);
    }
    get size() {
        return this._size;
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Direction;
    }
}


/***/ }),

/***/ "./src/light/Light.ts":
/*!****************************!*\
  !*** ./src/light/Light.ts ***!
  \****************************/
/*! exports provided: LightType, Light */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightType", function() { return LightType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Light", function() { return Light; });
/* harmony import */ var _object_Object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/Object3D */ "./src/object/Object3D.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");



var LightType;
(function (LightType) {
    LightType[LightType["None"] = 0] = "None";
    LightType[LightType["Direction"] = 1] = "Direction";
    LightType[LightType["Point"] = 2] = "Point";
    LightType[LightType["Spot"] = 3] = "Spot";
})(LightType || (LightType = {}));
class Light extends _object_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"] {
    constructor() {
        super();
        this._color = new _math_Vector4__WEBPACK_IMPORTED_MODULE_1__["Vector4"](1.0, 1.0, 1.0, 1.0);
    }
    setColor(r, g, b) {
        const color = this._color;
        color.set(r, g, b, color.w);
    }
    enableShadow() {
    }
    disableShadow() {
    }
    clearShadow() {
    }
    get shadow() {
        return null;
    }
    setScale(x, y, z) { }
    setScaleAt(vec) { }
    getScale() {
        return _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"].One;
    }
    get pos() {
        return this._position;
    }
    get isLight() {
        return true;
    }
    get color() {
        return this._color;
    }
    get type() {
        return 0; //LightType.None;
    }
}
Light.DefDir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 0, 1);
Light.LumFactor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_1__["Vector4"](0.27, 0.67, 0.06, 0.0);


/***/ }),

/***/ "./src/light/PointLight.ts":
/*!*********************************!*\
  !*** ./src/light/PointLight.ts ***!
  \*********************************/
/*! exports provided: PointLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointLight", function() { return PointLight; });
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _bounding_SphereBounding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bounding/SphereBounding */ "./src/bounding/SphereBounding.ts");
/* harmony import */ var _PointShadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PointShadow */ "./src/light/PointShadow.ts");



class PointLight extends _Light__WEBPACK_IMPORTED_MODULE_0__["Light"] {
    constructor() {
        super();
        this._bounding = new _bounding_SphereBounding__WEBPACK_IMPORTED_MODULE_1__["SphereBounding"]();
        this.setFactor(0.9375);
    }
    _updateBounding() {
        let bounding = this._bounding;
        bounding.setPositionAt(this._position);
        bounding.setRadius(this._radius);
    }
    setColor(r, g, b) {
        super.setColor(r, g, b);
        // let lum = Light.LumFactor.dot(this._color);
        // 这里计算亮度衰减到1 / 255的时的半径;
        // this._radius = Math.sqrt(lum) * 4.0;
    }
    setFactor(v) {
        this._color.w = Math.min(v, 1.0);
        this._radius = Math.sqrt(1.0 / (1.0 - v));
    }
    enableShadow() {
        if (!this._shadow) {
            this._shadow = new _PointShadow__WEBPACK_IMPORTED_MODULE_2__["PointShadow"]();
            this._shadow.init();
        }
        this._shadow.enalbed = true;
    }
    disableShadow() {
        if (!this._shadow) {
            return;
        }
        this._shadow.enalbed = false;
    }
    clearShadow() {
        if (this._shadow) {
            this._shadow.destroy();
            this._shadow = null;
        }
    }
    get shadow() {
        return this._shadow;
    }
    get radius() {
        return this._radius;
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_0__["LightType"].Point;
    }
    get isPointLight() {
        return true;
    }
}


/***/ }),

/***/ "./src/light/PointShadow.ts":
/*!**********************************!*\
  !*** ./src/light/PointShadow.ts ***!
  \**********************************/
/*! exports provided: PointShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointShadow", function() { return PointShadow; });
/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shadow */ "./src/light/Shadow.ts");
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/TextureCube */ "./src/graphics/TextureCube.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/Frame */ "./src/graphics/Frame.ts");






class PointShadow extends _Shadow__WEBPACK_IMPORTED_MODULE_0__["Shadow"] {
    constructor() {
        super();
        this.pcf = false;
    }
    _createTex2D() {
        let tex = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_4__["Texture2D"]();
        tex.setDataType(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["UNSIGNED_BYTE"]);
        tex.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"]);
        return tex;
    }
    init(size = 128) {
        this._size = size;
        let tex = this._depthTex;
        if (!tex) {
            tex = new _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_2__["TextureCube"]();
            tex.setDataType(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["UNSIGNED_BYTE"]);
            tex.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"]);
            tex.setTexture2ds(this._createTex2D(), this._createTex2D(), this._createTex2D(), this._createTex2D(), this._createTex2D(), this._createTex2D());
            this._depthTex = tex;
        }
        tex.setAllSize(size, size);
        let frames = this._frames;
        if (!frames) {
            frames = [];
            // let depth = new Texture2D();
            // depth.setSize(size, size);
            // depth.setFormat(CGE.DEPTH_STENCIL, CGE.DEPTH_STENCIL);
            // depth.setDataType(CGE.UNSIGNED_INT_24_8);
            // depth.setFilter(CGE.NEAREST, CGE.NEAREST);
            for (let i = 0; i < 6; i++) {
                let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__["Frame"]();
                frame.setSize(size, size);
                frame.setTextureCube(0 /* COLOR */, tex, _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__["TexTarget"].TEXTURE_CUBE_MAP_POSITIVE_X + i);
                // frame.setDepthStencil(depth);
                frame.enableDepthStencil();
                frame.getState().clearColor.set(1, 1, 1, 1);
                frames.push(frame);
            }
            this._frames = frames;
        }
    }
    get depthTex() {
        return this._depthTex;
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_1__["LightType"].Point;
    }
    get frames() {
        return this._frames;
    }
}


/***/ }),

/***/ "./src/light/Shadow.ts":
/*!*****************************!*\
  !*** ./src/light/Shadow.ts ***!
  \*****************************/
/*! exports provided: Shadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");

class Shadow {
    constructor() {
        this.enalbed = true;
    }
    get depthTex() {
        return null;
    }
    init() {
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_0__["LightType"].None;
    }
    destroy() {
    }
}


/***/ }),

/***/ "./src/light/SpotLight.ts":
/*!********************************!*\
  !*** ./src/light/SpotLight.ts ***!
  \********************************/
/*! exports provided: SpotLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpotLight", function() { return SpotLight; });
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _bounding_AABB__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bounding/AABB */ "./src/bounding/AABB.ts");
/* harmony import */ var _SpotShadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SpotShadow */ "./src/light/SpotShadow.ts");




class SpotLight extends _Light__WEBPACK_IMPORTED_MODULE_0__["Light"] {
    constructor() {
        super();
        this._dir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        this._angle = 0.0;
        this._bounding = new _bounding_AABB__WEBPACK_IMPORTED_MODULE_2__["AABB"]();
        this.setFactor(0.9375);
    }
    setDir(x, y, z) {
        let vec = _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pubTemp.set(x, y, z).normalize();
        this.setDirection(vec);
    }
    setDirection(dir) {
        this._rotate.rotationTo(_Light__WEBPACK_IMPORTED_MODULE_0__["Light"].DefDir, dir);
        this._dir.set(0, 0, 1);
        this._dir.applyQuaternion(this._rotate).normalize();
    }
    setRotate(x, y, z, w) {
        super.setRotate(x, y, z, w);
        this._dir.set(0, 0, -1).applyQuaternion(this._rotate);
    }
    setRotateAt(q) {
        super.setRotateAt(q);
        this._dir.set(0, 0, -1).applyQuaternion(this._rotate);
    }
    setColor(r, g, b) {
        super.setColor(r, g, b);
        // let lum = Light.LumFactor.dot(this._color);
        // 这里计算亮度衰减到1 / 256的时的半径;
        // this._radius = Math.sqrt(lum) * 16.0;
    }
    setFactor(v) {
        this.color.w = Math.min(v, 1.0);
        this._radius = Math.sqrt(1.0 / (1.0 - v));
    }
    _updateBounding() {
        let angle = this._angle;
        let bounding = this._bounding;
        let radius = this._radius;
        if (angle <= Math.PI * 0.5) {
            let sin = Math.sin(angle);
            let r = sin * radius;
            bounding.setMax(r, r, 0);
            bounding.setMin(-r, -r, -radius);
        }
        else {
            let cos = Math.cos(angle);
            bounding.setMax(radius, radius, -cos * radius);
            bounding.setMax(-radius, -radius, -radius);
        }
        this._bounding.applyMatrix(this._matrix);
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_0__["LightType"].Spot;
    }
    enableShadow() {
        if (!this._shadow) {
            this._shadow = new _SpotShadow__WEBPACK_IMPORTED_MODULE_3__["SpotShadow"]();
            this._shadow.init();
        }
        this._shadow.enalbed = true;
    }
    disableShadow() {
        if (!this._shadow) {
            return;
        }
        this._shadow.enalbed = false;
    }
    clearShadow() {
        if (this._shadow) {
            this._shadow.destroy();
            this._shadow = null;
        }
    }
    get shadow() {
        return this._shadow;
    }
    set angle(v) {
        this._angle = v;
    }
    get angle() {
        return this._angle;
    }
    get dir() {
        return this._dir;
    }
    get radius() {
        return this._radius;
    }
    get isSpotLight() {
        return false;
    }
}


/***/ }),

/***/ "./src/light/SpotShadow.ts":
/*!*********************************!*\
  !*** ./src/light/SpotShadow.ts ***!
  \*********************************/
/*! exports provided: SpotShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpotShadow", function() { return SpotShadow; });
/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shadow */ "./src/light/Shadow.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _Light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Light */ "./src/light/Light.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/Frame */ "./src/graphics/Frame.ts");






class SpotShadow extends _Shadow__WEBPACK_IMPORTED_MODULE_0__["Shadow"] {
    constructor() {
        super();
        this._size = 512;
        this.matrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    }
    init(size = 256) {
        this._size = size;
        let tex = this._depthTex;
        if (!tex) {
            tex = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
            tex.setDataType(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["UNSIGNED_BYTE"]);
            tex.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["NEAREST"]);
            this._depthTex = tex;
        }
        tex.setSize(size, size);
        let frame = this.frame;
        if (!frame) {
            frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__["Frame"]();
            frame.setTexture2D(0 /* COLOR */, tex);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(1, 1, 1, 1);
            this.frame = frame;
        }
        frame.setSize(size, size);
    }
    get depthTex() {
        return this._depthTex;
    }
    set size(n) {
        this._size = n;
        this._depthTex && this._depthTex.setSize(n, n);
    }
    get size() {
        return this._size;
    }
    get type() {
        return _Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Spot;
    }
}


/***/ }),

/***/ "./src/material/BlendAOMaterial.ts":
/*!*****************************************!*\
  !*** ./src/material/BlendAOMaterial.ts ***!
  \*****************************************/
/*! exports provided: BlendAOMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlendAOMaterial", function() { return BlendAOMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");


class BlendAOMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].aoMap, texture);
    }
    setDstTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    get type() {
        return 'blendAO';
    }
}


/***/ }),

/***/ "./src/material/BloomMaterial.ts":
/*!***************************************!*\
  !*** ./src/material/BloomMaterial.ts ***!
  \***************************************/
/*! exports provided: BloomMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BloomMaterial", function() { return BloomMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");



class BloomMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._lumPCT = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"];
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].lumPCT, this._lumPCT);
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setLumTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].lumMap, texture);
    }
    setLumPCT(p) {
        this._lumPCT.x = p;
    }
    get type() {
        return 'bloom';
    }
}


/***/ }),

/***/ "./src/material/CartoonMaterial.ts":
/*!*****************************************!*\
  !*** ./src/material/CartoonMaterial.ts ***!
  \*****************************************/
/*! exports provided: CartoonMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartoonMaterial", function() { return CartoonMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");





class CartoonMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(baseColor, specular, emissive) {
        super();
        this.param = new _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"]();
        this.setTexture2DFromUrl(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].baseColorMap, baseColor);
        this.setTexture2DFromUrl(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].specularMap, specular);
        this.setTexture2DFromUrl(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].emissiveMap, emissive);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].cartoonLUTMap, CartoonMaterial.getCartoonStyleLUT());
        this.reflectance = 1.0;
        this.aoScale = 1.0;
        this.glossiness = 1.0;
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].merged, this.param);
    }
    get glossiness() {
        return this.param.v[0];
    }
    set glossiness(value) {
        this.param.v[0] = value;
    }
    get aoScale() {
        return this.param.v[1];
    }
    set aoScale(value) {
        this.param.v[1] = value;
    }
    get reflectance() {
        return this.param.v[2];
    }
    set reflectance(value) {
        this.param.v[2] = value;
    }
    get type() {
        return 'cartoon';
    }
    static getCartoonStyleLUT() {
        if (!this._cartoonLUTMap) {
            let numStyle = 1;
            //第一行存暗面色调, 第一行存过度色调，第二行存亮面色调，第三行存threshold（注意色调不同于光源颜色，是要乘上光源颜色的）
            let styleData = new Uint8Array(4 * 4 * 4);
            //临时测试，未来这个表可由美术绘制并加载
            for (let i = 0; i < 2; i++) {
                if (i == 0) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                }
                else if (i == 1) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                }
            }
            let texture = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
            texture.setData(4, 4, styleData);
            texture.setFormat(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["RGBA"]);
            this._cartoonLUTMap = texture;
        }
        return this._cartoonLUTMap;
    }
}


/***/ }),

/***/ "./src/material/ColorMaterial.ts":
/*!***************************************!*\
  !*** ./src/material/ColorMaterial.ts ***!
  \***************************************/
/*! exports provided: ColorMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorMaterial", function() { return ColorMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");



class ColorMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(diffuse) {
        super();
        this._baseColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_2__["Vector4"]();
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }
    setBaseColor(r, g, b, a) {
        this._baseColor.set(r, g, b, a);
    }
    get type() {
        return 'color';
    }
}


/***/ }),

/***/ "./src/material/DeferredShadingMaterial.ts":
/*!*************************************************!*\
  !*** ./src/material/DeferredShadingMaterial.ts ***!
  \*************************************************/
/*! exports provided: DeferredShadingMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredShadingMaterial", function() { return DeferredShadingMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/TextureCube */ "./src/graphics/TextureCube.ts");
/* harmony import */ var _light_Light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../light/Light */ "./src/light/Light.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");







class DeferredShadingMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._lightType = _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Direction;
        this._pixelSize = new _math_Vector2__WEBPACK_IMPORTED_MODULE_6__["Vector2"]();
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelSize, this._pixelSize);
        this._lightPos = new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]();
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].lightPos, this._lightPos);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].irradianceMap, _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_3__["TextureCube"].Black);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].prefilterMap, _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_3__["TextureCube"].Black);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].brdfLUTMap, _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].BrdfLUT);
    }
    setDiffuseMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, tex);
    }
    setNormalMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].normalMap, tex);
    }
    setSpecularMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].specularMap, tex);
    }
    setDepthMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].depthMap, tex);
    }
    setBrdfLUT(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].brdfLUTMap, tex);
    }
    setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }
    setLightPos(v) {
        this._lightPos.copy(v);
    }
    useForDirectionLight() {
        if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Point) {
            this._removeMacro('POINT_LIGHT');
        }
        else if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Spot) {
            this._removeMacro('SPOT_LIGHT');
        }
    }
    useForPointLight() {
        if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Point) {
            return;
        }
        else if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Spot) {
            this._removeMacro('SPOT_LIGHT');
        }
        this._addMacro('POINT_LIGHT');
    }
    uesForSpotLight() {
        if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Spot) {
            return;
        }
        else if (this._lightType === _light_Light__WEBPACK_IMPORTED_MODULE_4__["LightType"].Point) {
            this._removeMacro('POINT_LIGHT');
        }
        this._addMacro('SPOT_LIGHT');
    }
    get type() {
        return 'deferred_shading';
    }
}


/***/ }),

/***/ "./src/material/DepthMaterial.ts":
/*!***************************************!*\
  !*** ./src/material/DepthMaterial.ts ***!
  \***************************************/
/*! exports provided: DepthMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthMaterial", function() { return DepthMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");



class DepthMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._baseColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_2__["Vector4"]();
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }
    setDiffuseMap(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setBaseColor(r, g, b, a) {
        this._baseColor.set(r, g, b, a);
    }
    setRange(x, y) {
    }
    enablePointShadow() {
        this._addMacro('POINT_SHADOW');
    }
    disablePointShadow() {
        this._removeMacro('POINT_SHADOW');
    }
    get type() {
        return 'depth';
    }
}


/***/ }),

/***/ "./src/material/DiffuseMaterial.ts":
/*!*****************************************!*\
  !*** ./src/material/DiffuseMaterial.ts ***!
  \*****************************************/
/*! exports provided: DiffuseMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiffuseMaterial", function() { return DiffuseMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");



class DiffuseMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(diffuse) {
        super();
        this._baseColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_2__["Vector4"]();
        this.setTexture2DFromUrl(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, diffuse);
        // this.setTexture(ShaderConst.ODMap, Texture2D.ODTex);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
    }
    setDiffuseMap(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setBaseColor(r, g, b, a) {
        this._baseColor.set(r, g, b, a);
    }
    clone() {
    }
    get type() {
        return 'diffuse';
    }
}


/***/ }),

/***/ "./src/material/DownSample4Material.ts":
/*!*********************************************!*\
  !*** ./src/material/DownSample4Material.ts ***!
  \*********************************************/
/*! exports provided: DownSample4Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownSample4Material", function() { return DownSample4Material; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");



class DownSample4Material extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._pixelSize = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelSize, this._pixelSize);
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }
    get type() {
        return 'down_sample4';
    }
}


/***/ }),

/***/ "./src/material/DownSampleTo1Material.ts":
/*!***********************************************!*\
  !*** ./src/material/DownSampleTo1Material.ts ***!
  \***********************************************/
/*! exports provided: DownSampleTo1Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownSampleTo1Material", function() { return DownSampleTo1Material; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");



class DownSampleTo1Material extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._pixelSize = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelSize, this._pixelSize);
        this._lumPCT = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].lumPCT, this._lumPCT);
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setLumTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].lumMap, texture);
    }
    setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }
    setLumPCT(p) {
        this._lumPCT.x = p;
    }
    get type() {
        return 'down_sample_to1';
    }
}


/***/ }),

/***/ "./src/material/FXAAMaterial.ts":
/*!**************************************!*\
  !*** ./src/material/FXAAMaterial.ts ***!
  \**************************************/
/*! exports provided: FXAAMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FXAAMaterial", function() { return FXAAMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");



class FXAAMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(texture) {
        super();
        this._data = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1.0, 1.0);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelSize, this._data);
        if (texture) {
            this.setSrcTexture(texture);
        }
        this.enableDepth = false;
    }
    setSrcTexture(texture) {
        if (!texture) {
            return;
        }
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
        let w = texture.getWidth();
        let h = texture.getHeight();
        if (!!w && !!h) {
            this.setPixelSize(1.0 / w, 1.0 / h);
        }
    }
    setPixelSize(x, y) {
        this._data.set(x, y);
    }
    get type() {
        return 'fxaa';
    }
}


/***/ }),

/***/ "./src/material/FullScreenMaterial.ts":
/*!********************************************!*\
  !*** ./src/material/FullScreenMaterial.ts ***!
  \********************************************/
/*! exports provided: FullScreenMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullScreenMaterial", function() { return FullScreenMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");




class FullScreenMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(diffuse) {
        super();
        this._baseColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_3__["Vector4"]();
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].baseColor, this._baseColor);
        this._baseColor.set(1.0, 1.0, 1.0, 1.0);
        if (diffuse) {
            this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, diffuse);
        }
        else {
            this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White);
        }
    }
    setDiffuseMap(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setBaseColor(r, g, b, a) {
        this._baseColor.set(r, g, b, a);
    }
    get type() {
        return 'fullscreen';
    }
}


/***/ }),

/***/ "./src/material/GaussianBlurMaterial.ts":
/*!**********************************************!*\
  !*** ./src/material/GaussianBlurMaterial.ts ***!
  \**********************************************/
/*! exports provided: GaussianBlurMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GaussianBlurMaterial", function() { return GaussianBlurMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");



class GaussianBlurMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._size = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelSize, this._size);
        this._dir = new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1, 0);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].pixelDir, this._dir);
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setPixelSize(x, y) {
        this._size.set(x, y);
    }
    setPiexlDir(x, y) {
        this._dir.set(x, y);
    }
    get type() {
        return 'gaussian_blur';
    }
}


/***/ }),

/***/ "./src/material/LogBlurMaterial.ts":
/*!*****************************************!*\
  !*** ./src/material/LogBlurMaterial.ts ***!
  \*****************************************/
/*! exports provided: LogBlurMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogBlurMaterial", function() { return LogBlurMaterial; });
/* harmony import */ var _GaussianBlurMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GaussianBlurMaterial */ "./src/material/GaussianBlurMaterial.ts");

class LogBlurMaterial extends _GaussianBlurMaterial__WEBPACK_IMPORTED_MODULE_0__["GaussianBlurMaterial"] {
    get type() {
        return 'log_blur';
    }
}


/***/ }),

/***/ "./src/material/LumSampleMaterial.ts":
/*!*******************************************!*\
  !*** ./src/material/LumSampleMaterial.ts ***!
  \*******************************************/
/*! exports provided: LumSampleMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LumSampleMaterial", function() { return LumSampleMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");


class LumSampleMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    get type() {
        return 'lum_sample';
    }
}


/***/ }),

/***/ "./src/material/Material.ts":
/*!**********************************!*\
  !*** ./src/material/Material.ts ***!
  \**********************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_Shader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/Shader */ "./src/graphics/Shader.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_Blend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/Blend */ "./src/graphics/Blend.ts");
/* harmony import */ var _graphics_Stencil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/Stencil */ "./src/graphics/Stencil.ts");
/* harmony import */ var _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../graphics/GraphicsTypes */ "./src/graphics/GraphicsTypes.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");








/**
 * 材质基类
 */
class Material extends _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this._shader = new _graphics_Shader__WEBPACK_IMPORTED_MODULE_2__["Shader"];
        this.enableDepth = true;
        this.depthMask = true;
        this.enablePolygonOffset = false;
        this.polygonOffset = [0, 0];
        this._textures = new Map();
        this._properties = new Map();
    }
    setTexture2DFromUrl(type, url, defTexture) {
        if (!url || url === '') {
            this._textures.set(type, defTexture || _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].White);
        }
        let tex = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
        tex.setUrl(url, defTexture);
        this.setTexture(type, tex);
    }
    setTexture(type, texture = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].White) {
        if (!texture) {
            return;
        }
        let tex = this._textures.get(type);
        if (tex && tex.isUrl) {
            tex.release();
        }
        if (texture.isUrl) {
            texture.retain();
        }
        this._textures.set(type, texture);
    }
    removeTexture(type) {
        let tex = this._textures.get(type);
        if (tex && tex.isUrl) {
            tex.release();
            this._textures.delete(type);
        }
    }
    removeClassTexture(type) {
    }
    setProperty(type, data) {
        this._properties.set(type, data);
    }
    removeProperty(type) {
        this._properties.delete(type);
    }
    getProperty(type) {
        return this._properties.get(type);
    }
    getTexture(type) {
        return this._textures.get(type);
    }
    set alphaType(v) {
        this._alphaType = v;
    }
    disalbeAlpha() {
        this.removeTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].ODMap);
        this._removeMacro('ALPHA_TEST');
        this._alphaType = _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].NONE;
    }
    enableAlphaTest() {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].ODMap, _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].ODTex);
        this._addMacro('ALPHA_TEST');
        this._alphaType = _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].TEST;
    }
    enableAlphaBlend() {
        this.removeTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].ODMap);
        this._removeMacro('ALPHA_TEST');
        this._alphaType = _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].BLEND;
    }
    get alphaTest() {
        return this._alphaType === _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].TEST;
    }
    get alphaBlend() {
        return this._alphaType === _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].BLEND;
    }
    get alphaType() {
        return this._alphaType || _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["AlphaType"].NONE;
    }
    setCullFaceMode(v) {
        this._faceMode = v;
    }
    get faceMode() {
        return this._faceMode || _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["BACK"];
    }
    setFlipFace(v) {
        this._flipFace = v;
    }
    get filpFace() {
        return this._flipFace || false;
    }
    setBlend(blend, deepCopy = false) {
        if (!deepCopy) {
            this._blend = blend;
        }
        else {
            if (!this._blend) {
                this._blend = blend.clone();
            }
            else {
                this._blend.copy(blend);
            }
        }
    }
    get blend() {
        return this._blend || _graphics_Blend__WEBPACK_IMPORTED_MODULE_4__["Blend"].DefBlend;
    }
    _checkCreateBlend() {
        let blend = this._blend;
        if (!blend) {
            blend = new _graphics_Blend__WEBPACK_IMPORTED_MODULE_4__["Blend"]();
            this._blend = blend;
        }
        return blend;
    }
    setBlendFunc(srcRGB, dstRGB, srcAlpha, dstAlpha) {
        let blend = this._checkCreateBlend();
        blend.setBlendFunc.apply(blend, arguments);
    }
    get blendFunc() {
        return this._blend ? this._blend.blendFunc : _graphics_Blend__WEBPACK_IMPORTED_MODULE_4__["Blend"].DefBlend.blendFunc;
    }
    setBlendEquation(modeRGB, modeAlpha) {
        let blend = this._checkCreateBlend();
        blend.setBlendEquation.apply(blend, arguments);
    }
    get blendEquation() {
        return this._blend ? this._blend.blendEquation : _graphics_Blend__WEBPACK_IMPORTED_MODULE_4__["Blend"].DefBlend.blendEquation;
    }
    /** enable表现不一致 */
    set enableStencil(v) {
        this._enableStencil = v;
    }
    get enableStencil() {
        return this._enableStencil;
    }
    setStencil(stencil, deepCopy = false) {
        if (!deepCopy) {
            this._stencil = stencil;
        }
        else {
            if (!this._stencil) {
                this._stencil = stencil.clone();
            }
            else {
                this._stencil.copy(stencil);
            }
        }
    }
    get stencil() {
        return this._stencil || _graphics_Stencil__WEBPACK_IMPORTED_MODULE_5__["Stencil"].DefStencil;
    }
    _checkCreateStencil() {
        let stencil = this._stencil;
        if (!stencil) {
            stencil = new _graphics_Stencil__WEBPACK_IMPORTED_MODULE_5__["Stencil"]();
            this._stencil = stencil;
        }
        return stencil;
    }
    setStencilFunc(func, ref, mask, face = _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["FaceType"].DOUBLE) {
        let stencil = this._checkCreateStencil();
        stencil.setStencilFunc.apply(stencil, arguments);
    }
    setStencilOp(fail, zfail, zpass, face = _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_6__["FaceType"].DOUBLE) {
        let stencil = this._checkCreateStencil();
        stencil.setStencilOp.apply(stencil, arguments);
    }
    set depthFunc(v) {
        this._depthFunc = v;
    }
    get depthFunc() {
        return this._depthFunc || _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_3__["LESS"];
    }
    clearProperties() {
        this._properties.clear();
    }
    clearTextures() {
        this._textures.forEach(tex => {
            tex.release();
        });
        this._textures.clear();
    }
    _addMacro(macro, value) {
        let macros = this._macros;
        if (!macros) {
            macros = {};
            this._macros = macros;
        }
        macros[macro] = value;
        this._computeKey();
    }
    _removeMacro(macro) {
        let macros = this._macros;
        if (!macros) {
            return;
        }
        delete macros[macro];
        if (Object.keys(macros).length === 0) {
            delete this._macros;
        }
        this._computeKey();
    }
    _computeKey() {
        let macros = this._macros;
        if (!macros) {
            this._key = null;
            return;
        }
        let result = '' + this.type;
        for (let key in macros) {
            let value = macros[key];
            result += value !== undefined ? `_${key} ${value}` : `_${key}`;
        }
        this._key = result;
    }
    get key() {
        return this._key || this.type;
    }
    get type() {
        return '';
    }
    get shader() {
        return this._shader;
    }
    clone() {
    }
    getMacros() {
        return this._macros;
    }
    setDepthMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].depthMap, tex);
    }
    setDepthMatData(mat) {
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].depthMat, mat);
    }
    setNormalMap(texture) {
        if (!this.supportNormalMap)
            return;
        if (texture && texture !== _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].Normal) {
            this._addMacro('NORMAL_MAP');
            this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].normalMap, texture);
        }
    }
    removeNormalMap() {
        if (!this.supportNormalMap)
            return;
        this._removeMacro('NORMAL_MAP');
        this.removeTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_7__["ShaderConst"].normalMap);
    }
    setPointLights(num, pos, colors) {
        if (!this.supportLighting)
            return;
        if (num <= 0) {
            this._removeMacro('POINT_LIGHT');
            this.removeProperty('u_pointPos');
            this.removeProperty('u_pointColors');
            return;
        }
        this._addMacro('POINT_LIGHT', num);
        this.setProperty('u_pointPos', pos);
        this.setProperty('u_pointColors', colors);
    }
    setDirLights(num, dir, colors) {
        if (!this.supportLighting)
            return;
        if (num <= 0) {
            this._removeMacro('DIRECTION_LIGHT');
            this.removeProperty('u_directionDirs');
            this.removeProperty('u_directionColors');
            return;
        }
        this._addMacro('DIRECTION_LIGHT', num);
        this.setProperty('u_directionDirs', dir);
        this.setProperty('u_directionColors', colors);
    }
    setSpotLights(num, pos, dir, colors) {
        if (!this.supportLighting)
            return;
        if (num <= 0) {
            this._removeMacro('SPOT_LIGHT');
            this.removeProperty('u_spotPos');
            this.removeProperty('u_spotDirs');
            this.removeProperty('u_spotColors');
            return;
        }
        this._addMacro('SPOT_LIGHT', num);
        this.setProperty('u_spotPos', pos);
        this.setProperty('u_spotDirs', dir);
        this.setProperty('u_spotColors', colors);
    }
    setDirShadowLights(num, dir, colors, mats, texs) {
        if (!this.supportShadow)
            return;
        if (num <= 0) {
            this._removeMacro('DIRECTION_SHADOW_LIGHT');
            this.removeProperty('u_directionShadowDirs');
            this.removeProperty('u_directionShadowColors');
            this.removeProperty('u_directionMats');
            return;
        }
        this._addMacro('DIRECTION_SHADOW_LIGHT', num);
        this.setProperty('u_directionShadowDirs', dir);
        this.setProperty('u_directionShadowColors', colors);
        this.setProperty('u_directionMats', mats);
        // TODO: 移除时如何移除贴图；
        for (let i = 0; i < num; i++) {
            this.setTexture(`u_directionShadowMaps_${i}`, texs[i]);
        }
    }
    setSpotShadowLights(num, pos, dir, colors, ranges, mats, texs) {
        if (!this.supportShadow)
            return;
        if (num <= 0) {
            this._removeMacro('SPOT_SHADOW_LIGHT');
            this.removeProperty('u_spotShadowPos');
            this.removeProperty('u_spotShadowDirs');
            this.removeProperty('u_spotShadowColors');
            this.removeProperty('u_spotRanges');
            this.removeProperty('u_spotMats');
            return;
        }
        this._addMacro('SPOT_SHADOW_LIGHT', num);
        this.setProperty('u_spotShadowPos', pos);
        this.setProperty('u_spotShadowDirs', dir);
        this.setProperty('u_spotShadowColors', colors);
        this.setProperty('u_spotRanges', ranges);
        this.setProperty('u_spotMats', mats);
        for (let i = 0; i < num; i++) {
            this.setTexture(`u_spotShadowMaps_${i}`, texs[i]);
        }
    }
    setPointShadowPCF(b) {
        if (!this.supportShadow)
            return;
        if (b) {
            for (let i = 0, l = b.length; i < l; i++) {
                if (b[i]) {
                    this._addMacro(`POINT_SHADOW_PCF_${i}`);
                }
                else {
                    this._removeMacro(`POINT_SHADOW_PCF_${i}`);
                }
            }
        }
    }
    setPointShadowLights(num, pos, colors, ranges, texs) {
        if (!this.supportShadow)
            return;
        if (num <= 0) {
            this._removeMacro('POINT_SHADOW_LIGHT');
            this.removeProperty('u_pointShadowPos');
            this.removeProperty('u_pointShadowColors');
            this.removeProperty('u_pointRanges');
            return;
        }
        this._addMacro('POINT_SHADOW_LIGHT', num);
        this.setProperty('u_pointShadowPos', pos);
        this.setProperty('u_pointShadowColors', colors);
        this.setProperty('u_pointRanges', ranges);
        for (let i = 0; i < num; i++) {
            this.setTexture(`u_pointShadowMaps_${i}`, texs[i]);
        }
    }
    // 材质是否支持法线贴图
    get supportNormalMap() {
        return false;
    }
    // 材质是否支持阴影
    get supportShadow() {
        return false;
    }
    // 材质是否支持光照
    get supportLighting() {
        return false;
    }
    // 材质是否支持延迟渲染
    get supportDeferred() {
        return false;
    }
    destroy() {
        this._shader.release();
        this._textures.forEach(tex => {
            tex.release();
        });
    }
}


/***/ }),

/***/ "./src/material/ReferMaterial.ts":
/*!***************************************!*\
  !*** ./src/material/ReferMaterial.ts ***!
  \***************************************/
/*! exports provided: ReferMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferMaterial", function() { return ReferMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");



/**
 * 一个可以引用其他材质并覆盖修改其他材质属性的材质。
 * 开发中懒省事的方法，不建议直接使用
 */
class ReferMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(mat) {
        super();
        this._referMat = mat;
    }
    setReferMaterial(mat) {
        this._referMat = mat;
        this.clearTextures();
        this.clearProperties();
    }
    overrideProperty(type, data) {
        // if (this._referMat.getProperty(type)) {
        super.setProperty(type, data);
        // }
    }
    overrideTexture(type, tex) {
        // if (this._referMat.getTexture(type)) {
        super.setTexture(type, tex);
        // }
    }
    getProperty(type) {
        let prop = super.getProperty(type);
        if (!prop) {
            prop = this._referMat.getProperty(type);
        }
        return prop;
    }
    getTexture(type) {
        let tex = super.getTexture(type);
        if (!tex) {
            tex = this._referMat.getTexture(type);
        }
        return tex;
    }
    setUVOffset(sx, sy, ox, oy) {
        let v = super.getProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].uvOffset);
        if (v) {
            v.v.set([arguments]);
        }
        else {
            this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].uvOffset, new _math_Vector4__WEBPACK_IMPORTED_MODULE_2__["Vector4"](sx, sy, ox, oy));
        }
    }
    get depthFunc() {
        return this._depthFunc || this._referMat.depthFunc;
    }
    get alphaType() {
        return this._alphaType === undefined ? this._referMat.alphaType : this._alphaType;
    }
    get blend() {
        return this._blend || this._referMat.blend;
    }
    get enableStencil() {
        return this._enableStencil === undefined ? this._referMat.enableStencil : this._enableStencil;
    }
    getMacros() {
        return this._referMat.getMacros();
    }
    enableShadow() {
        this._referMat['_addMacro']('SHADOW_MAP');
    }
    disableShadow() {
        this._referMat['_removeMacro']('SHADOW_MAP');
    }
    get stencil() {
        return this._stencil || this._referMat.stencil;
    }
    get type() {
        return this._referMat.type;
    }
    get supportDeferred() {
        return this._referMat.supportDeferred;
    }
}


/***/ }),

/***/ "./src/material/SSAOMaterial.ts":
/*!**************************************!*\
  !*** ./src/material/SSAOMaterial.ts ***!
  \**************************************/
/*! exports provided: SSAOMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSAOMaterial", function() { return SSAOMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");







class SSAOMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._sampleNum = 64;
        this._pixelSize = new _math_Vector2__WEBPACK_IMPORTED_MODULE_6__["Vector2"](1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].pixelSize, this._pixelSize);
        this._multiUsing = new _math_Vector4__WEBPACK_IMPORTED_MODULE_5__["Vector4"](1, 1, 1, 1);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].multiUsing, this._multiUsing);
        this.createSampleData(16);
        let randomMap = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"]();
        randomMap.setUrl('./resources/randomMap.gif', _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].Normal);
        randomMap.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["NEAREST"]);
        randomMap.setWarp(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["REPEAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["REPEAT"]);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].randomMap, randomMap);
    }
    createSampleData(sampleNum = 64) {
        if (!this._samples || this._sampleNum !== sampleNum) {
            this._addMacro(`SAMPLE_NUM`, sampleNum);
            this._sampleNum = sampleNum;
            this._samples = { data: new Float32Array(sampleNum * 3) };
            this.setProperty('u_samples', this._samples);
        }
        let result = [];
        let vec3 = new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        for (let i = 0; i < sampleNum; i++) {
            var scale = i / sampleNum;
            vec3.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vec3.normalize().mul(scale * scale * 0.9 + 0.1);
            result.push(vec3.x, vec3.y, vec3.z);
        }
        this._samples.data.set(result);
    }
    setDiffuseTexture(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].diffuseMap, tex);
    }
    setDepthTexture(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].depthMap, tex);
    }
    setAsptRtoTanHfFov(x, y, z, w) {
        this._multiUsing.set(x, y, z, w);
    }
    setNormalTexture(tex) {
        if (tex) {
            this._addMacro('NORMAL_MAP');
            this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].normalMap, tex);
        }
        else {
            this._removeMacro('NORMAL_MAP');
            this.removeTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].normalMap);
        }
    }
    setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }
    get type() {
        return 'ssao';
    }
}


/***/ }),

/***/ "./src/material/SkyboxMaterial.ts":
/*!****************************************!*\
  !*** ./src/material/SkyboxMaterial.ts ***!
  \****************************************/
/*! exports provided: SkyboxMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkyboxMaterial", function() { return SkyboxMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");


class SkyboxMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
    }
    setDiffuseMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, tex);
    }
    clone() {
    }
    get type() {
        return 'skybox';
    }
}


/***/ }),

/***/ "./src/material/StandardMaterial.ts":
/*!******************************************!*\
  !*** ./src/material/StandardMaterial.ts ***!
  \******************************************/
/*! exports provided: StandardMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardMaterial", function() { return StandardMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphics/TextureCube */ "./src/graphics/TextureCube.ts");






class StandardMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor(diffuse = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White, normal = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].Normal, roughness = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White, metallic = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White, ao = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White, irradiance = _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_5__["TextureCube"].Black, prefilter = _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_5__["TextureCube"].Black) {
        super();
        this._baseColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_3__["Vector4"](1, 1, 1, 1);
        this._specular = new _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"](0.01, 1, 1);
        this._uvOffset = new _math_Vector4__WEBPACK_IMPORTED_MODULE_3__["Vector4"](1, 1, 0, 0);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, diffuse);
        this.setNormalMap(normal);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].roughnessMap, roughness);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].metallicMap, metallic);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].aoMap, ao);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].irradianceMap, irradiance);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].prefilterMap, prefilter);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].brdfLUTMap, _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].BrdfLUT);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].baseColor, this._baseColor);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].specular, this._specular);
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].uvOffset, this._uvOffset);
    }
    setDiffuseMap(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].diffuseMap, texture);
    }
    setIrradianceMap(texCube) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].irradianceMap, texCube);
    }
    setPrefilterMap(texCube) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].prefilterMap, texCube);
    }
    setBrdfLUTMap(tex) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].brdfLUTMap, tex);
    }
    setBaseColor(r, g, b, a) {
        this._baseColor.set(r, g, b, a);
    }
    clone() {
    }
    setSpecular(roughness, metallic, ao) {
        this._specular.set(roughness, metallic, ao);
    }
    setUVOffset(sx, sy, ox, oy) {
        this._uvOffset.set(sx, sy, ox, oy);
    }
    get supportNormalMap() {
        return true;
    }
    get supportShadow() {
        return true;
    }
    get supportLighting() {
        return true;
    }
    get type() {
        return 'standard';
    }
    get supportDeferred() {
        return true;
    }
}


/***/ }),

/***/ "./src/material/ToneMappingMaterial.ts":
/*!*********************************************!*\
  !*** ./src/material/ToneMappingMaterial.ts ***!
  \*********************************************/
/*! exports provided: ToneMappingMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToneMappingMaterial", function() { return ToneMappingMaterial; });
/* harmony import */ var _Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material */ "./src/material/Material.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector2 */ "./src/math/Vector2.ts");




class ToneMappingMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"] {
    constructor() {
        super();
        this._pixelSize = new _math_Vector2__WEBPACK_IMPORTED_MODULE_3__["Vector2"];
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].pixelSize, this._pixelSize);
        this._lumPCT = new _math_Vector2__WEBPACK_IMPORTED_MODULE_3__["Vector2"];
        this.setProperty(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].lumPCT, this._lumPCT);
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].aoMap, _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_1__["Texture2D"].White);
    }
    setSrcTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].diffuseMap, texture);
    }
    setLumTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].lumMap, texture);
    }
    setBloomTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].bloomMap, texture);
    }
    setAoTexture(texture) {
        this.setTexture(_graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_2__["ShaderConst"].aoMap, texture);
    }
    setPixelSize(x, y) {
        this._pixelSize.set(x, y);
    }
    setLumPCT(p) {
        this._lumPCT.x = p;
    }
    get type() {
        return 'tone_mapping';
    }
}


/***/ }),

/***/ "./src/math/Box.ts":
/*!*************************!*\
  !*** ./src/math/Box.ts ***!
  \*************************/
/*! exports provided: Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");

class Box {
    constructor(min, max) {
        this.min = min ? min.clone() : new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](Infinity, Infinity, Infinity);
        this.max = min ? max.clone() : new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-Infinity, -Infinity, -Infinity);
    }
    reset() {
        this.min.set(Infinity, Infinity, Infinity);
        this.max.set(-Infinity, -Infinity, -Infinity);
        return this;
    }
    setAt(min = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero, max = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }
    expandAtPoint(vec) {
        this.min.min(vec);
        this.max.max(vec);
    }
    expandAtBox(box) {
        this.expandAtPoint(box.min);
        this.expandAtPoint(box.max);
    }
    expandAtSphere(sphere) {
        let r = sphere.radius;
        let vec = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp.copy(sphere.pos).add(r, r, r);
        this.expandAtPoint(vec);
        vec.copy(sphere.pos).sub(r, r, r);
        this.expandAtPoint(vec);
    }
    applyMatrix(mat) {
        const min = this.min, max = this.max;
        const minx = min.x, miny = min.y, minz = min.z;
        const maxx = max.x, maxy = max.y, maxz = max.z;
        const vec3pool = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool;
        const new_min = vec3pool.create().set(Infinity, Infinity, Infinity);
        const new_max = vec3pool.create().set(-Infinity, -Infinity, -Infinity);
        let aux = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp;
        for (let k = 0; k < 2; k++) {
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                    aux.set(i === 1 ? maxx : minx, j === 1 ? maxy : miny, k === 1 ? maxz : minz);
                    aux.applyMatrix4(mat);
                    new_max.max(aux);
                    new_min.min(aux);
                }
            }
        }
        min.copy(new_min);
        max.copy(new_max);
        vec3pool.recovery(new_min);
        vec3pool.recovery(new_max);
        return this;
    }
    isEmpty() {
        return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);
    }
    cross(box) {
        this.min.max(box.min);
        this.max.min(box.max);
        if (this.isEmpty()) {
            this.reset;
        }
    }
    union(box) {
        this.min.min(box.min);
        this.max.max(box.max);
    }
    intersectBox(box) {
        const min1 = box.min;
        const max1 = box.max;
        const min2 = this.min;
        const max2 = this.max;
        if (min1.x > max2.x || max1.x < min2.x) {
            return false;
        }
        if (min1.y > max2.y || max1.y < min2.y) {
            return false;
        }
        if (min1.z > max2.z || max1.z < min2.z) {
            return false;
        }
        return true;
    }
    containBox(box) {
        return this.min.lequal(box.min) || this.max.gequal(box.max);
    }
    intersectSphere(sphere) {
        let vec = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp.copy(sphere.pos);
        vec.clamp(this.min, this.max);
        return vec.subAt(sphere.pos).lengthSquare() <= sphere.radius * sphere.radius;
    }
    containSphere(sphere) {
        let vec = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pubTemp;
        let pos = sphere.pos;
        let r = sphere.radius;
        vec.copy(pos).sub(r, r, r);
        if (!this.min.lequal(vec)) {
            return false;
        }
        vec.copy(pos).add(r, r, r);
        if (!this.max.gequal(vec)) {
            return false;
        }
        return true;
    }
    containBounding(bounding) {
        return false;
    }
    setFromMatrix(mat) {
    }
    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }
    clone() {
        let box = new Box();
        box.copy(this);
        return box;
    }
}
Box.pubTemp = new Box();


/***/ }),

/***/ "./src/math/Frustum.ts":
/*!*****************************!*\
  !*** ./src/math/Frustum.ts ***!
  \*****************************/
/*! exports provided: Frustum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frustum", function() { return Frustum; });
/* harmony import */ var _Plane__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Plane */ "./src/math/Plane.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");


/**
 * 平头截体
 */
class Frustum {
    constructor() {
        this._planes = [
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
            new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"](),
        ];
    }
    set(p0, p1, p2, p3, p4, p5) {
        const planes = this._planes;
        for (let i = 0; i < 6; i++) {
            arguments[i] && planes[i].copy(arguments[i]);
        }
        return this;
    }
    setFromMatrix(mat) {
        const planes = this._planes;
        const m = mat.m;
        const me0 = m[0], me1 = m[1], me2 = m[2], me3 = m[3];
        const me4 = m[4], me5 = m[5], me6 = m[6], me7 = m[7];
        const me8 = m[8], me9 = m[9], me10 = m[10], me11 = m[11];
        const me12 = m[12], me13 = m[13], me14 = m[14], me15 = m[15];
        planes[0].set(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].set(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].set(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].set(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].set(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].set(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
        return this;
    }
    intersectBox(box) {
        const p = _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pubTemp;
        const planes = this._planes;
        const max = box.max;
        const min = box.min;
        for (let i = 0; i < 6; i++) {
            let plane = planes[i];
            let normal = plane.normal;
            p.x = normal.x > 0 ? max.x : min.x;
            p.y = normal.y > 0 ? max.y : min.y;
            p.z = normal.z > 0 ? max.z : min.z;
            if (plane.distanceToPoint(p) < 0) {
                return false;
            }
        }
        return true;
    }
    intersectSphere(sphere) {
        const planes = this._planes;
        const pos = sphere.pos;
        const negRadius = -sphere.radius;
        for (var i = 0; i < 6; i++) {
            var distance = planes[i].distanceToPoint(pos);
            if (distance < negRadius) {
                return false;
            }
        }
        return true;
    }
    containsPoint(p) {
        const planes = this._planes;
        for (var i = 0; i < 6; i++) {
            if (planes[i].distanceToPoint(p) < 0) {
                return false;
            }
        }
        return true;
    }
    getPlane(idx) {
        return this._planes[idx];
    }
    copy(frustum) {
        let selfPlanes = this._planes;
        let orderPlanes = frustum._planes;
        for (let i = 0; i < 6; i++) {
            selfPlanes[i].copy(orderPlanes[i]);
        }
        return this;
    }
}


/***/ }),

/***/ "./src/math/Matrix4.ts":
/*!*****************************!*\
  !*** ./src/math/Matrix4.ts ***!
  \*****************************/
/*! exports provided: Matrix4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix4", function() { return Matrix4; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");


class Matrix4 {
    // public _data: Float32Array;
    constructor() {
        // this._data = new Float32Array(16);
        this.m = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }
    identity() {
        let m = this.m;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    }
    translate(position) {
        let m = this.m;
        let x = position.x, y = position.y, z = position.z;
        m[12] += m[0] * x + m[4] * y + m[8] * z;
        m[13] += m[1] * x + m[5] * y + m[9] * z;
        m[14] += m[2] * x + m[6] * y + m[10] * z;
        m[15] += m[3] * x + m[7] * y + m[11] * z;
        return this;
    }
    setPosition(position) {
        let m = this.m;
        let x = position.x, y = position.y, z = position.z;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        return this;
    }
    rotate(axis, rad) {
        let m = this.m;
        let x = axis.x, y = axis.y, z = axis.z, len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
        if (Math.abs(len) < _core_Base__WEBPACK_IMPORTED_MODULE_0__["GLMAT_EPSILON"]) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
        m[0] = a00 * b00 + a10 * b01 + a20 * b02;
        m[1] = a01 * b00 + a11 * b01 + a21 * b02;
        m[2] = a02 * b00 + a12 * b01 + a22 * b02;
        m[3] = a03 * b00 + a13 * b01 + a23 * b02;
        m[4] = a00 * b10 + a10 * b11 + a20 * b12;
        m[5] = a01 * b10 + a11 * b11 + a21 * b12;
        m[6] = a02 * b10 + a12 * b11 + a22 * b12;
        m[7] = a03 * b10 + a13 * b11 + a23 * b12;
        m[8] = a00 * b20 + a10 * b21 + a20 * b22;
        m[9] = a01 * b20 + a11 * b21 + a21 * b22;
        m[10] = a02 * b20 + a12 * b21 + a22 * b22;
        m[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return this;
    }
    scale(v) {
        let m = this.m;
        m[0] *= v.x;
        m[1] *= v.x;
        m[2] *= v.x;
        m[3] *= v.x;
        m[4] *= v.y;
        m[5] *= v.y;
        m[6] *= v.y;
        m[7] *= v.y;
        m[8] *= v.z;
        m[9] *= v.z;
        m[10] *= v.z;
        m[11] *= v.z;
        return this;
    }
    transpose() {
        let m = this.m;
        this.m.set([
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15],
        ]);
        return this;
    }
    invert() {
        let m = this.m;
        let a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return this;
    }
    invertTranspose() {
        return this.transpose().invert();
    }
    multiply(matrix) {
        return Matrix4.multiply(this, matrix, this);
    }
    premultiply(matrix) {
        return Matrix4.multiply(matrix, this, this);
    }
    applyMatrix4(matrix) {
        return this.multiply(matrix);
    }
    lookAt(eye, center, up) {
        let vec_z = eye.clone().subAt(center);
        vec_z.normalize();
        let vec_x = up.cross(vec_z);
        vec_x.normalize();
        let vec_y = vec_z.cross(vec_x);
        vec_y.normalize();
        let m = this.m;
        m[0] = vec_x.x;
        m[1] = vec_y.x;
        m[2] = vec_z.x;
        m[3] = 0;
        m[4] = vec_x.y;
        m[5] = vec_y.y;
        m[6] = vec_z.y;
        m[7] = 0;
        m[8] = vec_x.z;
        m[9] = vec_y.z;
        m[10] = vec_z.z;
        m[11] = 0;
        m[12] = 0; //-(x0 * eyex + x1 * eyey + x2 * eyez);
        m[13] = 0; //-(y0 * eyex + y1 * eyey + y2 * eyez);
        m[14] = 0; //-(z0 * eyex + z1 * eyey + z2 * eyez);
        m[15] = 1;
        let vec3 = _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pubTemp.copy(eye).applyMatrix4(this);
        m[12] = -vec3.x;
        m[13] = -vec3.y;
        m[14] = -vec3.z;
        return this;
    }
    perspective(fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(fovy / 2), nf = 1.0 / (near - far);
        let m = this.m;
        m[0] = f / aspect;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = f;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = (far + near) * nf;
        m[11] = -1;
        m[12] = 0;
        m[13] = 0;
        m[14] = (2 * far * near) * nf;
        m[15] = 0;
        return this;
    }
    frustum(left, right, bottom, top, near, far) {
        let rl = 1 / (right - left), tb = 1 / (top - bottom), nf = 1 / (near - far);
        this.m[0] = (near * 2) * rl;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = (near * 2) * tb;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = (right + left) * rl;
        this.m[9] = (top + bottom) * tb;
        this.m[10] = (far + near) * nf;
        this.m[11] = -1;
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = (2 * far * near) * nf;
        this.m[15] = 0;
        return this;
    }
    orthographic(left, right, bottom, top, near, far) {
        let lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
        this.m[0] = -2 * lr;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        this.m[4] = 0;
        this.m[5] = -2 * bt;
        this.m[6] = 0;
        this.m[7] = 0;
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = 2 * nf;
        this.m[11] = 0;
        this.m[12] = (left + right) * lr;
        this.m[13] = (top + bottom) * bt;
        this.m[14] = (far + near) * nf;
        this.m[15] = 1;
        return this;
    }
    makeForQuaternion(quat) {
        let m = this.m;
        let x = quat.x, y = quat.y, z = quat.z, w = quat.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
        m[0] = 1 - yy - zz;
        m[1] = yx + wz;
        m[2] = zx - wy;
        m[3] = 0;
        m[4] = yx - wz;
        m[5] = 1 - xx - zz;
        m[6] = zy + wx;
        m[7] = 0;
        m[8] = zx + wy;
        m[9] = zy - wx;
        m[10] = 1 - xx - yy;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    }
    determinant() {
        var te = this.m;
        var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        //TODO: make this more efficient
        // copy from THREE.js;
        //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
        return (n41 * (+n14 * n23 * n32
            - n13 * n24 * n32
            - n14 * n22 * n33
            + n12 * n24 * n33
            + n13 * n22 * n34
            - n12 * n23 * n34) +
            n42 * (+n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31) +
            n43 * (+n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31) +
            n44 * (-n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31));
    }
    compose(position, quaternion, scale) {
        this.makeForQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this;
    }
    decompose(position, quaternion, scale) {
        let vector = new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
        let matrix = new Matrix4();
        let te = this.m;
        let sx = vector.set(te[0], te[1], te[2]).length();
        let sy = vector.set(te[4], te[5], te[6]).length();
        let sz = vector.set(te[8], te[9], te[10]).length();
        // if determine is negative, we need to invert one scale
        var det = this.determinant();
        if (det < 0) {
            sx = -sx;
        }
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        // scale the rotation part
        matrix.m.set(this.m);
        // at this point matrix is incomplete so we can't use .copy()
        var invSX = 1 / sx;
        var invSY = 1 / sy;
        var invSZ = 1 / sz;
        matrix.m[0] *= invSX;
        matrix.m[1] *= invSX;
        matrix.m[2] *= invSX;
        matrix.m[4] *= invSY;
        matrix.m[5] *= invSY;
        matrix.m[6] *= invSY;
        matrix.m[8] *= invSZ;
        matrix.m[9] *= invSZ;
        matrix.m[10] *= invSZ;
        quaternion.setFromRotationMatrix(matrix);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    }
    makeBasis(xAxis, yAxis, zAxis) {
        this.m.set([
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            0, 0, 0, 1
        ]);
        return this;
    }
    clone() {
        let mat4 = new Matrix4();
        mat4.m.set(this.m);
        return mat4;
    }
    copy(matrix) {
        this.m.set(matrix.m);
        return this;
    }
    /**
     * 请勿对通过data获取的float32Array赋值。
     * 修改数值请使用mat.m。
     */
    get data() {
        // this._data.set(this.m);
        // this._data.set(this.m);
        return this.m;
        // return this.m;
    }
    static multiply(l, r, out) {
        //l, r, out 可以为相同的矩阵
        let a = l.m, b = r.m, o = out.m;
        let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        o[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        o[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        o[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        o[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        o[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        o[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        o[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        o[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        o[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        o[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        o[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        o[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        o[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        o[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        o[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        o[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }
}
Matrix4._float32Data = new Float32Array(16);
Matrix4.pubTemp = new Matrix4;
Matrix4.unitMat4 = new Matrix4;


/***/ }),

/***/ "./src/math/Plane.ts":
/*!***************************!*\
  !*** ./src/math/Plane.ts ***!
  \***************************/
/*! exports provided: Plane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return Plane; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");

class Plane {
    constructor(normal = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].ZUp, distance = 0) {
        this._normal = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this.setAt(normal, distance);
    }
    set(x, y, z, d) {
        this._normal.set(x, y, z);
        this._distance = d;
        return this;
    }
    setAt(normal, distance) {
        this._normal.copy(normal);
        this._distance = distance;
        return this;
    }
    setFromNormalAndCoplanarPoint(normal, point) {
        this._normal.copy(normal);
        this._distance = -point.dot(normal);
        return this;
    }
    distanceToPoint(p) {
        return this._normal.dot(p) + this._distance;
    }
    normalize() {
        let length = 1.0 / this._normal.length();
        this._normal.mul(length);
        this._distance *= length;
        return this;
    }
    copy(plane) {
        this._normal.copy(plane._normal);
        this._distance = plane._distance;
        return this;
    }
    intersectBox(box) {
    }
    get distance() {
        return this._distance;
    }
    get normal() {
        return this._normal;
    }
}


/***/ }),

/***/ "./src/math/Point2.ts":
/*!****************************!*\
  !*** ./src/math/Point2.ts ***!
  \****************************/
/*! exports provided: Point2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point2", function() { return Point2; });
class Point2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
    }
}


/***/ }),

/***/ "./src/math/Quaternion.ts":
/*!********************************!*\
  !*** ./src/math/Quaternion.ts ***!
  \********************************/
/*! exports provided: Quaternion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quaternion", function() { return Quaternion; });
/* harmony import */ var _Vector4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");


class Quaternion extends _Vector4__WEBPACK_IMPORTED_MODULE_0__["Vector4"] {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z, w);
    }
    identity() {
        this.v[0] = 0;
        this.v[1] = 0;
        this.v[2] = 0;
        this.v[3] = 1;
        return this;
    }
    multiply(quat) {
        let ax = this.v[0], ay = this.v[1], az = this.v[2], aw = this.v[3], bx = quat.x, by = quat.y, bz = quat.z, bw = quat.w;
        this.v[0] = ax * bw + aw * bx + ay * bz - az * by;
        this.v[1] = ay * bw + aw * by + az * bx - ax * bz;
        this.v[2] = az * bw + aw * bz + ax * by - ay * bx;
        this.v[3] = aw * bw - ax * bx - ay * by - az * bz;
        return this;
    }
    setAxisAngle(axis, rad) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        this.v[0] = s * axis.x;
        this.v[1] = s * axis.y;
        this.v[2] = s * axis.z;
        this.v[3] = Math.cos(rad);
        return this;
    }
    rotationTo(vec1, vec2) {
        let v1 = vec1.clone().normalize();
        let v2 = vec2.clone().normalize();
        let dot = v1.dot(v2);
        if (dot < -0.999999) {
            let tmpvec3 = _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pool.create();
            tmpvec3.set(1, 0, 0).crossAt(v1);
            if (tmpvec3.lengthSquare() < 0.000000001) {
                tmpvec3.set(0, 1, 0).crossAt(v2);
            }
            tmpvec3.normalize();
            this.setAxisAngle(tmpvec3, Math.PI);
            _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"].pool.recovery(tmpvec3);
            return this;
        }
        else if (dot > 0.999999) {
            this.v[0] = 0;
            this.v[1] = 0;
            this.v[2] = 0;
            this.v[3] = 1;
            return this;
        }
        else {
            let tmpvec3 = v1.clone().cross(v2);
            this.v[0] = tmpvec3.x;
            this.v[1] = tmpvec3.y;
            this.v[2] = tmpvec3.z;
            this.v[3] = 1 + dot;
            this.normalize();
            return this;
        }
    }
    invert() {
        let a0 = this.v[0], a1 = this.v[1], a2 = this.v[2], a3 = this.v[3], dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3, invDot = dot ? 1.0 / dot : 0;
        // TODO: Would be waiting for glMatrix.js lib update;
        this.v[0] = -a0 * invDot;
        this.v[1] = -a1 * invDot;
        this.v[2] = -a2 * invDot;
        this.v[3] = a3 * invDot;
        return this;
    }
    setFromRotationMatrix(mat4) {
        // copy for THREE.js same function;
        let te = mat4.m, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33, s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            this.v[3] = 0.25 / s;
            this.v[0] = (m32 - m23) * s;
            this.v[1] = (m13 - m31) * s;
            this.v[2] = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this.v[3] = (m32 - m23) / s;
            this.v[0] = 0.25 * s;
            this.v[1] = (m12 + m21) / s;
            this.v[2] = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this.v[3] = (m13 - m31) / s;
            this.v[0] = (m12 + m21) / s;
            this.v[1] = 0.25 * s;
            this.v[2] = (m23 + m32) / s;
        }
        else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this.v[3] = (m21 - m12) / s;
            this.v[0] = (m13 + m31) / s;
            this.v[1] = (m23 + m32) / s;
            this.v[2] = 0.25 * s;
        }
        return this;
    }
    clone() {
        let vec4 = new Quaternion();
        vec4.x = this.v[0];
        vec4.y = this.v[1];
        vec4.z = this.v[2];
        vec4.w = this.v[3];
        return vec4;
    }
}
Quaternion.Zero = new Quaternion();


/***/ }),

/***/ "./src/math/Ray.ts":
/*!*************************!*\
  !*** ./src/math/Ray.ts ***!
  \*************************/
/*! exports provided: Ray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return Ray; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");

class Ray {
    constructor() {
        this._origin = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this._dir = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }
    at(t, target) {
        if (target === undefined) {
            console.warn('CGE.Ray: .at() target is now required');
            target = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        }
        return target.copy(this._dir).mul(t).addAt(this._origin);
    }
    /**
     * intersect triangle
     * http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
     * @param a
     * @param b
     * @param c
     * @param backfaceCulling
     * @param target
     */
    intersectTriangle(a, b, c, backfaceCulling, target) {
        let diff = Ray._diff;
        let edge1 = Ray._edge1;
        let edge2 = Ray._edge2;
        let normal = Ray._normal;
        edge1.copy(b).subAt(a);
        edge2.copy(c).subAt(a);
        normal.crossBy(edge1, edge2);
        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
        //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
        let DdN = this._dir.dot(normal);
        let sign;
        if (DdN > 0) {
            if (backfaceCulling)
                return false;
            sign = 1;
        }
        else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        }
        else {
            return false;
        }
        diff.subBy(this._origin, a);
        let DdQxE2 = sign * this._dir.dot(edge2.crossBy(diff, edge2));
        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return false;
        }
        let DdE1xQ = sign * this._dir.dot(edge1.cross(diff));
        // b2 < 0, no intersection
        if (DdE1xQ < 0) {
            return false;
        }
        // b1+b2 > 1, no intersection TODO: what is 1 ?
        if (DdQxE2 + DdE1xQ > DdN) {
            return false;
        }
        // Line intersects triangle, check whether ray does.
        let QdN = -sign * diff.dot(normal);
        // t < 0, no intersection
        if (QdN < 0) {
            return false;
        }
        this.at(QdN / DdN, target);
        return true;
    }
    toJson() {
        return {
            origin: this._origin.toJson(),
            dir: this._dir.toJson
        };
    }
    fromJson(obj) {
        this._origin.fromJson(obj.origin);
        this._dir.fromJson(obj.dir);
    }
}
Ray._diff = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
Ray._edge1 = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
Ray._edge2 = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
Ray._normal = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();


/***/ }),

/***/ "./src/math/Sphere.ts":
/*!****************************!*\
  !*** ./src/math/Sphere.ts ***!
  \****************************/
/*! exports provided: Sphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return Sphere; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");

class Sphere {
    constructor(pos = _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].ZUp, r = 0) {
        this.pos = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this.radius = 0;
        this.setAt(pos, r);
    }
    set(x, y, z, r) {
        this.pos.set(x, y, z);
        this.radius = r;
    }
    setAt(pos, r) {
        this.pos.copy(pos);
        this.radius = r;
    }
    applyMatrix(mat) {
    }
    copy(s) {
        this.pos.copy(s.pos);
        this.radius = s.radius;
    }
}


/***/ }),

/***/ "./src/math/Transform.ts":
/*!*******************************!*\
  !*** ./src/math/Transform.ts ***!
  \*******************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _Quaternion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Quaternion */ "./src/math/Quaternion.ts");
/* harmony import */ var _Matrix4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matrix4 */ "./src/math/Matrix4.ts");



class Transform {
    constructor(position = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), rotate = new _Quaternion__WEBPACK_IMPORTED_MODULE_1__["Quaternion"](), scale = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 1, 1)) {
        this._matrix = new _Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
        this._needsUpdate = true;
        this._position = position;
        this._rotate = rotate;
        this._scale = scale;
        this.makeMatrix();
    }
    setNeedUpdateMatrix() {
        this._needsUpdate = true;
    }
    update(delta) {
        this.makeMatrix();
    }
    setPosition(position) {
        this._position.set(position.x, position.y, position.z);
        this.setNeedUpdateMatrix();
    }
    setPositionValue(x, y, z) {
        this._position.set(x, y, z);
        this.setNeedUpdateMatrix();
    }
    getPosition() {
        return this._position;
    }
    setRotate(rotate) {
        this._rotate.set(rotate.x, rotate.y, rotate.z, rotate.w);
        this.setNeedUpdateMatrix();
    }
    getRotate() {
        return this._rotate;
    }
    setScale(scale) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.setNeedUpdateMatrix();
    }
    getScale() {
        return this._scale;
    }
    getMatrix() {
        this.makeMatrix();
        return this._matrix;
    }
    makeMatrix() {
        if (this._needsUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            this._needsUpdate = false;
        }
    }
    decompose() {
        this._matrix.decompose(this._position, this._rotate, this._scale);
    }
    applyMatrix4(mat4) {
        this._matrix.applyMatrix4(mat4);
        this.decompose();
    }
    makeLookAtFromThis(initEye, initCenter, initUp) {
        let e = initEye === undefined ? new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0) : initEye.clone();
        let c = initCenter === undefined ? new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 0, 0) : initCenter.clone();
        let u = initUp === undefined ? new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 1) : initUp.clone();
        e.applyMatrix4(this._matrix);
        c.applyMatrix4(this._matrix);
        u.applyMatrix4(this._matrix);
        let mat = new _Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
        mat.lookAt(e, c, u);
        return mat;
    }
    lookAt(center, up) {
        let c = center.clone();
        let u = up === undefined ? new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 1) : up.clone();
        this._matrix.lookAt(this._position, c, u);
        this._matrix.invert();
        this.decompose();
    }
}


/***/ }),

/***/ "./src/math/Triangle.ts":
/*!******************************!*\
  !*** ./src/math/Triangle.ts ***!
  \******************************/
/*! exports provided: Triangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Triangle", function() { return Triangle; });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _util_TriangleIntersect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/TriangleIntersect */ "./src/util/TriangleIntersect.ts");


class Triangle {
    constructor(p1, p2, p3) {
        this.point1 = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this.point2 = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this.point3 = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        if (p1) {
            this.point1.copy(p1);
        }
        if (p2) {
            this.point2.copy(p2);
        }
        if (p3) {
            this.point3.copy(p3);
        }
    }
    intersectTriangle(triangle) {
        return Object(_util_TriangleIntersect__WEBPACK_IMPORTED_MODULE_1__["triangleIntersect"])(this, triangle);
    }
}


/***/ }),

/***/ "./src/math/Vector2.ts":
/*!*****************************!*\
  !*** ./src/math/Vector2.ts ***!
  \*****************************/
/*! exports provided: Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
class Vector2 {
    constructor(x = 0, y = 0) {
        this.v = new Float32Array([x, y]);
    }
    set(x, y) {
        this.v[0] = x;
        this.v[1] = y;
        return this;
    }
    setAt(v) {
        this.v.set(v.v);
        return this;
    }
    add(x, y) {
        this.v[0] += x;
        this.v[1] += y;
        return this;
    }
    addAt(vec) {
        this.v[0] += vec.x;
        this.v[1] += vec.y;
        return this;
    }
    sub(x, y) {
        this.v[0] -= x;
        this.v[1] -= y;
        return this;
    }
    subAt(vec) {
        this.v[0] -= vec.x;
        this.v[1] -= vec.y;
        return this;
    }
    subBy(a, b) {
        this.v[0] = a.x - b.x;
        this.v[1] = a.y - b.y;
        return this;
    }
    negate() {
        this.v[0] = -this.v[0];
        this.v[1] = -this.v[1];
        return this;
    }
    mul(d) {
        this.v[0] *= d;
        this.v[1] *= d;
        return this;
    }
    mulAt(v) {
        this.v[0] *= v.x;
        this.v[1] *= v.y;
        return this;
    }
    dot(vec) {
        return this.v[0] * vec.x + this.v[1] * vec.y;
    }
    // /**
    //  * Will change this;
    //  */
    // public crossBy(a: Vector2, b: Vector2) {
    //     let ax = a.x, ay = a.y, az = a.z,
    //         bx = b.x, by = b.y, bz = b.z;
    //     this.x = ay * bz - az * by;
    //     this.y = az * bx - ax * bz;
    //     this.z = ax * by - ay * bx;
    //     return this;
    // }
    /**
     * Will new a Vector2, not change this;
     * @param vec
     */
    // public cross(vec: Vector2): Vector2 {
    //     return Vector2.pool.create().crossBy(this, vec);
    // }
    /**
     * Will change this;
     */
    // public crossAt(vec: Vector2): Vector2 {
    //     return this.crossBy(this, vec);
    // }
    length() {
        return Math.sqrt(this.lengthSquare());
    }
    lengthSquare() {
        let v = this.v;
        return v[0] * v[0] + v[1] * v[1];
    }
    normalize() {
        let length = this.length();
        if (length == 0)
            return this;
        let length_inverse = 1.0 / length;
        this.v[0] *= length_inverse;
        this.v[1] *= length_inverse;
        return this;
    }
    // public applyMatrix4(matrix: Matrix4): Vector2 {
    //     let x = this.v[0], y = this.v[1], z = this.v[2];
    //     let m = matrix.m;
    //     let nx = m[0] * x + m[4] * y + m[8] * z + m[12];
    //     let ny = m[1] * x + m[5] * y + m[9] * z + m[13];
    //     let nz = m[2] * x + m[6] * y + m[10] * z + m[14];
    //     let nw = m[3] * x + m[7] * y + m[11] * z + m[15];
    //     nw = nw === 1.0 ? 1.0 : 1.0 / nw;
    //     this.v[0] = nx * nw;
    //     this.v[1] = ny * nw;
    //     this.v[2] = nz * nw;
    //     return this;
    // }
    // public applyQuaternion(quat: Quaternion): Vector2 {
    //     let x = this.v[0], y = this.v[1], z = this.v[2],
    //         qx = quat.x, qy = quat.y, qz = quat.z, qw = quat.w;
    //     let ix = qw * x + qy * z - qz * y,
    //         iy = qw * y + qz * x - qx * z,
    //         iz = qw * z + qx * y - qy * x,
    //         iw = -qx * x - qy * y - qz * z;
    //     this.v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    //     this.v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    //     this.v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    //     return this;
    // }
    clone() {
        let vec = new Vector2();
        vec.v.set(this.v);
        return vec;
    }
    copy(vec) {
        this.v.set(vec.v);
        return this;
    }
    equal(vec) {
        return this.v[0] === vec.x && this.v[1] === vec.y;
    }
    lequal(vec) {
        return this.v[0] <= vec.x && this.v[1] <= vec.y;
    }
    gequal(vec) {
        return this.v[0] >= vec.x && this.v[1] >= vec.y;
    }
    set x(value) {
        this.v[0] = value;
    }
    get x() {
        return this.v[0];
    }
    set y(value) {
        this.v[1] = value;
    }
    get y() {
        return this.v[1];
    }
    get data() {
        // Vector2._float32Data.set(this.v);
        return this.v; //Vector2._float32Data;
    }
    min(vec) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.min(sv[0], mv[0]);
        sv[1] = Math.min(sv[1], mv[1]);
        return this;
    }
    max(vec) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.max(sv[0], mv[0]);
        sv[1] = Math.max(sv[1], mv[1]);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        return this;
    }
    toJson() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
    }
}
// private static _float32Data = new Float32Array(2);
Vector2.Zero = new Vector2(0, 0);
Vector2.ZUp = new Vector2(0, 0);
Vector2.One = new Vector2(1, 1);
Vector2.pubTemp = new Vector2();


/***/ }),

/***/ "./src/math/Vector3.ts":
/*!*****************************!*\
  !*** ./src/math/Vector3.ts ***!
  \*****************************/
/*! exports provided: Vector3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3", function() { return Vector3; });
/* harmony import */ var _util_ObjectPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ObjectPool */ "./src/util/ObjectPool.ts");

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.v = new Float32Array([x, y, z]);
    }
    set(x, y, z) {
        this.v[0] = x;
        this.v[1] = y;
        this.v[2] = z;
        return this;
    }
    setAt(v) {
        this.v.set(v.v);
        return this;
    }
    add(x, y, z) {
        this.v[0] += x;
        this.v[1] += y;
        this.v[2] += z;
        return this;
    }
    addAt(vec) {
        this.v[0] += vec.x;
        this.v[1] += vec.y;
        this.v[2] += vec.z;
        return this;
    }
    sub(x, y, z) {
        this.v[0] -= x;
        this.v[1] -= y;
        this.v[2] -= z;
        return this;
    }
    subAt(vec) {
        this.v[0] -= vec.x;
        this.v[1] -= vec.y;
        this.v[2] -= vec.z;
        return this;
    }
    subBy(a, b) {
        this.v[0] = a.x - b.x;
        this.v[1] = a.y - b.y;
        this.v[2] = a.z - b.z;
        return this;
    }
    negate() {
        this.v[0] = -this.v[0];
        this.v[1] = -this.v[1];
        this.v[2] = -this.v[2];
        return this;
    }
    mul(d) {
        this.v[0] *= d;
        this.v[1] *= d;
        this.v[2] *= d;
        return this;
    }
    mulAt(v) {
        this.v[0] *= v.x;
        this.v[1] *= v.y;
        this.v[2] *= v.z;
        return this;
    }
    dot(vec) {
        return this.v[0] * vec.x + this.v[1] * vec.y + this.v[2] * vec.z;
    }
    /**
     * Will change this;
     */
    crossBy(a, b) {
        let ax = a.x, ay = a.y, az = a.z, bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }
    /**
     * Will new a Vector3, not change this;
     * @param vec3
     */
    cross(vec3) {
        return Vector3.pool.create().crossBy(this, vec3);
    }
    /**
     * Will change this;
     */
    crossAt(vec3) {
        return this.crossBy(this, vec3);
    }
    length() {
        return Math.sqrt(this.lengthSquare());
    }
    lengthSquare() {
        let v = this.v;
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    }
    normalize() {
        let length = this.length();
        if (length == 0)
            return this;
        let length_inverse = 1.0 / length;
        this.v[0] *= length_inverse;
        this.v[1] *= length_inverse;
        this.v[2] *= length_inverse;
        return this;
    }
    applyMatrix4(matrix) {
        let x = this.v[0], y = this.v[1], z = this.v[2];
        let m = matrix.m;
        let nx = m[0] * x + m[4] * y + m[8] * z + m[12];
        let ny = m[1] * x + m[5] * y + m[9] * z + m[13];
        let nz = m[2] * x + m[6] * y + m[10] * z + m[14];
        let nw = m[3] * x + m[7] * y + m[11] * z + m[15];
        nw = nw === 1.0 ? 1.0 : 1.0 / nw;
        this.v[0] = nx * nw;
        this.v[1] = ny * nw;
        this.v[2] = nz * nw;
        return this;
    }
    applyQuaternion(quat) {
        let x = this.v[0], y = this.v[1], z = this.v[2], qx = quat.x, qy = quat.y, qz = quat.z, qw = quat.w;
        let ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        this.v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }
    clone() {
        let vec = new Vector3();
        vec.v.set(this.v);
        return vec;
    }
    copy(vec3) {
        this.v.set(vec3.v);
        return this;
    }
    equal(vec3) {
        return this.v[0] === vec3.x && this.v[1] === vec3.y && this.v[2] === vec3.z;
    }
    lequal(vec3) {
        return this.v[0] <= vec3.x && this.v[1] <= vec3.y && this.v[2] <= vec3.z;
    }
    gequal(vec3) {
        return this.v[0] >= vec3.x && this.v[1] >= vec3.y && this.v[2] >= vec3.z;
    }
    set x(value) {
        this.v[0] = value;
    }
    get x() {
        return this.v[0];
    }
    set y(value) {
        this.v[1] = value;
    }
    get y() {
        return this.v[1];
    }
    set z(value) {
        this.v[2] = value;
    }
    get z() {
        return this.v[2];
    }
    get data() {
        return this.v;
    }
    min(vec) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.min(sv[0], mv[0]);
        sv[1] = Math.min(sv[1], mv[1]);
        sv[2] = Math.min(sv[2], mv[2]);
        return this;
    }
    max(vec) {
        let sv = this.v;
        let mv = vec.v;
        sv[0] = Math.max(sv[0], mv[0]);
        sv[1] = Math.max(sv[1], mv[1]);
        sv[2] = Math.max(sv[2], mv[2]);
        return this;
    }
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    }
    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
        };
    }
    fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
    }
}
// private static _float32Data = new Float32Array(3);
Vector3.Zero = new Vector3(0, 0, 0);
Vector3.ZUp = new Vector3(0, 0, 1);
Vector3.One = new Vector3(1, 1, 1);
Vector3.pubTemp = new Vector3();
Vector3.pool = new _util_ObjectPool__WEBPACK_IMPORTED_MODULE_0__["ObjectPool"](Vector3, 6);


/***/ }),

/***/ "./src/math/Vector4.ts":
/*!*****************************!*\
  !*** ./src/math/Vector4.ts ***!
  \*****************************/
/*! exports provided: Vector4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4", function() { return Vector4; });
class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.v = new Float32Array([x, y, z, w]);
    }
    set(x, y, z, w) {
        this.v[0] = x;
        this.v[1] = y;
        this.v[2] = z;
        this.v[3] = w;
        return this;
    }
    setAt(v) {
        this.v.set(v.v);
    }
    normalize() {
        let x = this.v[0], y = this.v[1], z = this.v[2], w = this.v[3];
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.v[0] = x * len;
            this.v[1] = y * len;
            this.v[2] = z * len;
            this.v[3] = w * len;
        }
        return this;
    }
    applyMatrix4(mat4) {
        let x = this.v[0], y = this.v[1], z = this.v[2], w = this.v[3], m = mat4.m;
        this.v[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        this.v[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        this.v[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        this.v[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return this;
    }
    dot(vec4) {
        let vs = this.v;
        let vd = vec4.v;
        return vs[0] * vd[0] + vs[1] * vd[1] + vs[2] * vd[2] + vs[3] * vd[3];
    }
    clone() {
        let vec4 = new Vector4();
        vec4.x = this.v[0];
        vec4.y = this.v[1];
        vec4.z = this.v[2];
        vec4.w = this.v[3];
        return vec4;
    }
    copy(v) {
        this.v[0] = v.v[0];
        this.v[1] = v.v[1];
        this.v[2] = v.v[2];
        this.v[3] = v.v[3];
    }
    equal(vec4) {
        let s = this.v;
        let d = vec4.v;
        return s[0] === d[0] && s[1] === d[1] && s[2] === d[2] && s[3] === d[3];
    }
    set x(value) {
        this.v[0] = value;
    }
    get x() {
        return this.v[0];
    }
    set y(value) {
        this.v[1] = value;
    }
    get y() {
        return this.v[1];
    }
    set z(value) {
        this.v[2] = value;
    }
    get z() {
        return this.v[2];
    }
    set w(value) {
        this.v[3] = value;
    }
    get w() {
        return this.v[3];
    }
    get data() {
        // Vector4._float32Data.set(this.v);
        // return Vector4._float32Data;
        return this.v;
    }
    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        };
    }
    fromJson(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        this.w = obj.w;
    }
}
// private static _float32Data = new Float32Array(4);
Vector4.Zero = new Vector4();
Vector4.One = new Vector4(1, 1, 1, 1);


/***/ }),

/***/ "./src/object/Camera.ts":
/*!******************************!*\
  !*** ./src/object/Camera.ts ***!
  \******************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _math_Quaternion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Quaternion */ "./src/math/Quaternion.ts");
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Object3D */ "./src/object/Object3D.ts");




class Camera extends _Object3D__WEBPACK_IMPORTED_MODULE_3__["Object3D"] {
    constructor(width, height, _fovy, _near, _far) {
        super();
        this._mode = Camera.Perspective;
        this._projection = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
        this._viewProjection = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
        this._center = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this._up = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 1);
        let w = (width || 800) * 0.5;
        let h = (height || 600) * 0.5;
        Object.assign(this, {
            _far: _far || 2000.0,
            _near: _near || 1.0,
            _left: -w,
            _right: w,
            _bottom: h,
            _top: -h,
            _fovy: _fovy || Math.PI / 3,
            _aspect: w / h,
            _mode: Camera.Perspective,
            _projection: new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"](),
            _center: new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](),
            _up: new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 1),
            _projectionFunc: this._makePerspectiveMatrix.bind(this)
        });
        this._resetUp();
    }
    _resetUp() {
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        if (forward.equal(rightAxis))
            return;
        this._up = rightAxis.cross(forward).normalize();
    }
    update(delta) {
        this._update();
    }
    _update() {
        if (this._needsUpdate) {
            this._updateMatrix();
            this.makeProjectionMatrix();
            this.makeViewProjectionMatrix();
            this._needsUpdate = false;
        }
    }
    _makeMatrix() {
        this._update();
        return this._matrix;
    }
    enableOrthographicMode(_left, _right, _bottom, _top, _near, _far) {
        this._projectionFunc = this._makeOrthographicMatrix;
        this._mode = Camera.Orthographic;
        this._left = _left || this._left;
        this._right = _right || this._right;
        this._bottom = _bottom || this._bottom;
        this._top = _top || this._top;
        this._near = _near || this._near;
        this._far = _far || this._far;
        this.resize(_right - _left, _bottom - _top);
    }
    enablePerspectiveMode(_fovy, _aspect, _near, _far) {
        this._projectionFunc = this._makePerspectiveMatrix;
        this._mode = Camera.Perspective;
        this._fovy = _fovy || this._fovy;
        this._aspect = _aspect || this._aspect;
        let height = Math.abs(this._bottom - this._top);
        let width = height * _aspect;
        this._near = _near;
        this._far = _far;
        this.resize(width, height);
    }
    get mode() {
        return this._mode;
    }
    makeProjectionMatrix() {
        this._projectionFunc();
    }
    _makeOrthographicMatrix() {
        this._projection.orthographic(this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
    _makePerspectiveMatrix() {
        this._projection.perspective(this._fovy, this._aspect, this._near, this._far);
    }
    getProjectionMatrix() {
        return this._projection;
    }
    makeViewProjectionMatrix() {
        let mat4 = this._viewProjection;
        mat4.copy(this._projection);
        mat4.applyMatrix4(this._matrix);
    }
    getViewProjectionMatrix() {
        return this._viewProjection;
    }
    makeMatrix() {
        this.lookAt(this._center);
    }
    applyMatrix4(mat4) {
        this._position.applyMatrix4(mat4);
        this._center.applyMatrix4(mat4);
        this._up.applyMatrix4(mat4);
    }
    setUp(_up) {
        this._up.copy(_up);
        this.enableUpdateMat();
    }
    lookAt(center) {
        if (center) {
            this._center.copy(center);
            this._resetUp();
            this.enableUpdateMat();
        }
    }
    _updateMatrix() {
        this._matrix.lookAt(this._position, this._center, this._up);
    }
    resize(width, height) {
        let xCenter = (this._right - this._left) * 0.5 + this._left;
        let yCenter = (this._bottom - this._top) * 0.5 + this._top;
        let halfWidth = width * 0.5;
        let halfHeight = height * 0.5;
        this._left = xCenter - halfWidth;
        this._right = xCenter + halfWidth;
        this._top = yCenter - halfHeight;
        this._bottom = yCenter + halfHeight;
        this._aspect = width / height;
        this._needsUpdate = true;
        this._update();
    }
    forwardStep(delta) {
        let dir = this._center.clone().subAt(this._position).normalize().mul(delta);
        this._addPosCenter(dir);
    }
    horizontalStep(delta) {
        let dir = this._center.clone().subAt(this._position).cross(this._up).normalize().mul(delta);
        this._addPosCenter(dir);
    }
    verticalStep(delta) {
        this._center.z += delta;
        this._position.z += delta;
        this.enableUpdateMat();
    }
    _addPosCenter(dir) {
        this._position.addAt(dir);
        this._center.addAt(dir);
        this.enableUpdateMat();
    }
    _rotateView(axis, rad) {
        let quat = new _math_Quaternion__WEBPACK_IMPORTED_MODULE_2__["Quaternion"]();
        quat.setAxisAngle(axis, -rad);
        let temp = this._center.clone().subAt(this._position);
        let length = temp.length();
        let dir = temp.normalize();
        dir.applyQuaternion(quat);
        this._center = this._position.clone().addAt(dir.mul(length));
        this._up.applyQuaternion(quat);
    }
    rotateViewFromForward(movementX, movementY) {
        // enhance this.
        this._rotateView(new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 1), movementX);
        let forward = this._center.clone().subAt(this._position).normalize();
        let rightAxis = forward.cross(this._up.clone().normalize());
        this._rotateView(rightAxis, movementY);
        this.enableUpdateMat();
    }
    get fovy() {
        return this._fovy;
    }
    get aspect() {
        return this._aspect;
    }
    get far() {
        return this._far;
    }
    get near() {
        return this._near;
    }
}
Camera.Orthographic = 0;
Camera.Perspective = 1;


/***/ }),

/***/ "./src/object/Component.ts":
/*!*********************************!*\
  !*** ./src/object/Component.ts ***!
  \*********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _ObjectType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObjectType */ "./src/object/ObjectType.ts");


class Component extends _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(object, componentType) {
        super();
        this._object = object;
        this._type = componentType;
    }
    update(delta) {
        this._object.update(delta);
    }
    getObject() {
        return this._object;
    }
    getType() {
        return this._type;
    }
    setEntity(entity) {
        this._entity = entity;
    }
    getEntity() {
        return this._entity;
    }
    static CreateTransfromComponent(transform) {
        return new Component(transform, _ObjectType__WEBPACK_IMPORTED_MODULE_1__["ComponentType"].Transform);
    }
    static CreateGeometryComponent(geometry) {
        return new Component(geometry, _ObjectType__WEBPACK_IMPORTED_MODULE_1__["ComponentType"].Geometry);
    }
    static CreateMaterialComponent(material) {
        return new Component(material, _ObjectType__WEBPACK_IMPORTED_MODULE_1__["ComponentType"].Material);
    }
    static CreateCameraComponent(camera) {
        // TODO: Remove this;
        return new Component(camera, _ObjectType__WEBPACK_IMPORTED_MODULE_1__["ComponentType"].Camera);
    }
    static CreateLightComponent(light) {
        return new Component(light, _ObjectType__WEBPACK_IMPORTED_MODULE_1__["ComponentType"].Light);
    }
}


/***/ }),

/***/ "./src/object/Entity.ts":
/*!******************************!*\
  !*** ./src/object/Entity.ts ***!
  \******************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "./src/object/Component.ts");
/* harmony import */ var _ObjectType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectType */ "./src/object/ObjectType.ts");



class Entity extends _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this._parent = undefined;
        this._children = [];
        this._components = new Map();
    }
    update(delta) {
        this._components.forEach(function (component, type) {
            component.update(delta);
        });
    }
    addComponent(component) {
        if (component instanceof _Component__WEBPACK_IMPORTED_MODULE_1__["Component"]) {
            if (component.getEntity() !== undefined) {
                return undefined;
            }
            switch (component.getType()) {
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Transform:
                    this.transform = component.getObject();
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Geometry:
                    this.geometry = component.getObject();
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Material:
                    this.material = component.getObject();
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Camera:
                    this.camera = component.getObject();
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Light:
                    this.light = component.getObject();
                    break;
                default:
                    break;
            }
            component.setEntity(this);
            this._components.set(component.getType(), component);
        }
    }
    getComponent(componentType) {
        return this._components.get(componentType);
    }
    getComponentObject(componentType) {
        let component = this._components.get(componentType);
        return component !== undefined ? component.getObject() : undefined;
    }
    removeComponent(component) {
        if (component instanceof _Component__WEBPACK_IMPORTED_MODULE_1__["Component"]) {
            this.removeFromType(component.getType());
        }
    }
    removeFromType(type) {
        let component = this.getComponent(type);
        if (component instanceof _Component__WEBPACK_IMPORTED_MODULE_1__["Component"]) {
            switch (type) {
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Transform:
                    this.transform = undefined;
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Geometry:
                    this.geometry = undefined;
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Material:
                    this.material = undefined;
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Camera:
                    this.camera = undefined;
                    break;
                case _ObjectType__WEBPACK_IMPORTED_MODULE_2__["ComponentType"].Light:
                    this.light = undefined;
                    break;
                default:
                    break;
            }
            component.setEntity(undefined);
            this._components.delete(type);
        }
    }
    // TODO: re-name this function;
    canBeRendering() {
        return (this.geometry !== undefined) && (this.material !== undefined);
    }
    addChild(entity) {
        this._children.push(entity);
    }
    setParent(entity) {
        this._parent = entity;
    }
    getParent(entity) {
        return this._parent;
    }
    static createRenderableEntity(geometry, material, transform) {
        let entity = new Entity();
        entity.addComponent(_Component__WEBPACK_IMPORTED_MODULE_1__["Component"].CreateGeometryComponent(geometry));
        entity.addComponent(_Component__WEBPACK_IMPORTED_MODULE_1__["Component"].CreateMaterialComponent(material));
        entity.addComponent(_Component__WEBPACK_IMPORTED_MODULE_1__["Component"].CreateTransfromComponent(transform));
        return entity;
    }
}


/***/ }),

/***/ "./src/object/Mesh.ts":
/*!****************************!*\
  !*** ./src/object/Mesh.ts ***!
  \****************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Object3D */ "./src/object/Object3D.ts");

class Mesh extends _Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"] {
    constructor() {
        super();
        this.castShadow = true;
        this.receiveShadow = true;
    }
    setGeometry(geo) {
        if (this._geometry) {
            this._geometry.destroy();
        }
        this._geometry = geo;
    }
    getGeometry() {
        return this._geometry;
    }
    setMaterial(mat) {
        if (this._material) {
            this._material.destroy();
        }
        this._material = mat;
    }
    getMaterial() {
        return this._material;
    }
    beRendering() {
        return !(!this._geometry || !this._material);
    }
    _updateBounding() {
        let bounding = this._geometry.getBounding();
        if (!bounding) {
            return;
        }
        if (this._bounding && this._bounding.getType() === bounding.getType()) {
            this._bounding.copy(bounding);
            this._bounding.applyMatrix(this._matrix);
        }
        else {
            this._bounding = bounding.clone();
            this._bounding.applyMatrix(this._matrix);
        }
    }
    get isMesh() {
        return true;
    }
    _destroy() {
        if (this._material) {
            this._material.destroy();
        }
        if (this._geometry) {
            this._geometry.destroy();
        }
    }
}


/***/ }),

/***/ "./src/object/Object3D.ts":
/*!********************************!*\
  !*** ./src/object/Object3D.ts ***!
  \********************************/
/*! exports provided: Object3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Object3D", function() { return Object3D; });
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Quaternion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Quaternion */ "./src/math/Quaternion.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _core_Event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Event */ "./src/core/Event.ts");





class Object3D extends _core_Base__WEBPACK_IMPORTED_MODULE_3__["Base"] {
    constructor() {
        super();
        this._position = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        this._rotate = new _math_Quaternion__WEBPACK_IMPORTED_MODULE_1__["Quaternion"]();
        this._scale = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 1, 1);
        this._matrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
        this._visible = true;
        this._parent = null;
        this._children = [];
        this._needsUpdate = true;
    }
    addChild(child) {
        if (child && child._parent !== this)
            child.setParent(this);
    }
    removeChild(child) {
        if (child && child._parent === this)
            child.setParent(null);
    }
    getChildren() {
        return this._children;
    }
    enableUpdateMat() {
        this._needsUpdate = true;
    }
    _update(delta) {
    }
    update(delta, parentUpdate = false) {
        let isUpdate = this._needsUpdate || parentUpdate;
        this._update(delta);
        this._makeMatrix(parentUpdate);
        let l = this._children.length;
        let children = this._children;
        for (let i = 0; i < l; i++) {
            children[i].update(delta, isUpdate);
        }
        if (isUpdate) {
            this._updateBounding();
        }
    }
    setPositionAt(position) {
        this._position.set(position.x, position.y, position.z);
        this.enableUpdateMat();
    }
    setPosition(x, y, z) {
        this._position.set(x, y, z);
        this.enableUpdateMat();
    }
    getPosition() {
        return this._position;
    }
    setRotateAt(rotate) {
        this._rotate.setAt(rotate);
        this.enableUpdateMat();
    }
    setRotate(x, y, z, w) {
        this._rotate.set(x, y, z, w);
        this.enableUpdateMat();
    }
    getRotate() {
        return this._rotate;
    }
    setScaleAt(scale) {
        this._scale.set(scale.x, scale.y, scale.z);
        this.enableUpdateMat();
    }
    setScale(x, y, z) {
        this._scale.set(x, y, z);
        this.enableUpdateMat();
    }
    getScale() {
        return this._scale;
    }
    getMatrix() {
        this._makeMatrix();
        return this._matrix;
    }
    _makeMatrix(parentUpdate = false) {
        if (this._needsUpdate || parentUpdate) {
            this._matrix.compose(this._position, this._rotate, this._scale);
            if (this._parent) {
                this._matrix.premultiply(this._parent.getMatrix());
            }
            this._needsUpdate = false;
        }
    }
    _updateBounding() {
        if (this._bounding) {
            // this._bounding
        }
    }
    set visible(v) {
        this._visible = v;
    }
    get visible() {
        return this._visible;
    }
    setParent(parent) {
        if (this._parent === parent)
            return;
        if (this._parent) {
            let children = this._parent._children;
            children.splice(1, children.indexOf(this));
        }
        if (parent) {
            parent._children.push(this);
        }
        else {
            this._preCleanup();
        }
        this._parent = parent;
    }
    getParent() {
        return this._parent;
    }
    beRendering() {
        return false;
    }
    getBounding() {
        return this._bounding;
    }
    _preCleanup() {
        this._destroy();
    }
    _destroy() {
        this.event(_core_Event__WEBPACK_IMPORTED_MODULE_4__["Event"].DESTROTY, [this]);
    }
    set x(v) {
        if (this._position.x !== v) {
            this.enableUpdateMat();
            this._position.x = v;
        }
    }
    get x() {
        return this._position.x;
    }
    set y(v) {
        if (this._position.y !== v) {
            this.enableUpdateMat();
            this._position.y = v;
        }
    }
    get y() {
        return this._position.y;
    }
    set z(v) {
        if (this._position.z !== v) {
            this.enableUpdateMat();
            this._position.z = v;
        }
    }
    get z() {
        return this._position.z;
    }
    set rotateZ(v) {
    }
    get rotateZ() {
        return;
    }
    get isLight() {
        return false;
    }
    get isMesh() {
        return false;
    }
    get isScene() {
        return false;
    }
    // TODO
    toJson(obj) {
        let result = super.toJson(obj);
        result.position = this._position.toJson();
        result.rotate = this._rotate.toJson();
        result.scale = this._scale.toJson();
        result.visible = this.visible;
        const children = [];
        this._children.forEach(child => {
            children.push(child.toJson());
        });
        result.children = children;
        return result;
    }
    // TODO
    fromJson(obj) {
    }
}


/***/ }),

/***/ "./src/object/ObjectType.ts":
/*!**********************************!*\
  !*** ./src/object/ObjectType.ts ***!
  \**********************************/
/*! exports provided: ComponentType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentType", function() { return ComponentType; });
/* harmony import */ var _core_Static__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Static */ "./src/core/Static.ts");

const _g = _core_Static__WEBPACK_IMPORTED_MODULE_0__["GetTypeCount"];
const ComponentType = {
    Transform: _g(),
    Geometry: _g(),
    Material: _g(),
    Camera: _g(),
    Light: _g(),
    Skeleton: _g(),
};


/***/ }),

/***/ "./src/object/Scene.ts":
/*!*****************************!*\
  !*** ./src/object/Scene.ts ***!
  \*****************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Object3D */ "./src/object/Object3D.ts");
/* harmony import */ var _light_DirectionLight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../light/DirectionLight */ "./src/light/DirectionLight.ts");


class Scene extends _Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"] {
    constructor() {
        super();
        this._mainLight = new _light_DirectionLight__WEBPACK_IMPORTED_MODULE_1__["DirectionLight"];
        this.addChild(this._mainLight);
        this._mainLight.name = 'mainLight';
        // this._mainLight.enableShadow();
    }
    getMainLight() {
        return this._mainLight;
    }
    setActiveCamera(camera) {
        this._activeCamera = camera;
    }
    getActiveCamera() {
        return this._activeCamera;
    }
    get isScene() {
        return true;
    }
}


/***/ }),

/***/ "./src/platform/Platform.ts":
/*!**********************************!*\
  !*** ./src/platform/Platform.ts ***!
  \**********************************/
/*! exports provided: Platform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
class Platform {
    static init() {
    }
    static now() {
        return performance.now() || Date.now();
    }
    static document() {
        return document;
    }
    static window() {
        return window;
    }
    static createCanvas() {
        return document.createElement('canvas');
    }
    static get requestAnimationFrame() {
        return this.reqAniBindWin;
    }
    static get cancelAnimationFrame() {
        return this.celAniBindWin;
    }
    static get width() {
        return window.innerWidth;
    }
    static get height() {
        return window.innerHeight;
    }
}
Platform.reqAniBindWin = window.requestAnimationFrame.bind(window);
Platform.celAniBindWin = window.cancelAnimationFrame.bind(window);


/***/ }),

/***/ "./src/renderer/Renderer.ts":
/*!**********************************!*\
  !*** ./src/renderer/Renderer.ts ***!
  \**********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _core_Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base */ "./src/core/Base.ts");
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ "./src/core/Logger.ts");


class Renderer extends _core_Base__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        /** 当前渲染器的id */
        this.rendererId = Renderer.RendererNum++;
        if (Renderer.Renderers.length < 1) {
            Renderer.Renderers.push(this);
        }
        else {
            _core_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].error('Too many renderer instance');
        }
    }
    static getRenderer(id) {
        return Renderer.Renderers[id];
    }
    removeShader(obj) { }
}
/** CGE的结构计划支持多个Renderer共存，但是不会允许超过一定的数量 */
Renderer.Renderers = [];
/** 渲染器计数 */
Renderer.RendererNum = 0;


/***/ }),

/***/ "./src/renderer/WebGLRenderer.ts":
/*!***************************************!*\
  !*** ./src/renderer/WebGLRenderer.ts ***!
  \***************************************/
/*! exports provided: WebGLRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLRenderer", function() { return WebGLRenderer; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_FrameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/FrameState */ "./src/graphics/FrameState.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Renderer */ "./src/renderer/Renderer.ts");
/* harmony import */ var _graphics_Texture__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../graphics/Texture */ "./src/graphics/Texture.ts");
/* harmony import */ var _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/GeometryUtil */ "./src/util/GeometryUtil.ts");
/* harmony import */ var _material_FullScreenMaterial__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../material/FullScreenMaterial */ "./src/material/FullScreenMaterial.ts");
/* harmony import */ var _glObject_glGeometry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./glObject/glGeometry */ "./src/renderer/glObject/glGeometry.ts");
/* harmony import */ var _glObject_glFrame__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./glObject/glFrame */ "./src/renderer/glObject/glFrame.ts");
/* harmony import */ var _glObject_glTexture2D__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./glObject/glTexture2D */ "./src/renderer/glObject/glTexture2D.ts");
/* harmony import */ var _glObject_glTextureCube__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./glObject/glTextureCube */ "./src/renderer/glObject/glTextureCube.ts");
/* harmony import */ var _platform_Platform__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../platform/Platform */ "./src/platform/Platform.ts");
/* harmony import */ var _shaders_ShaderCaches__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shaders/ShaderCaches */ "./src/renderer/shaders/ShaderCaches.ts");
/* harmony import */ var _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./glObject/glProgram */ "./src/renderer/glObject/glProgram.ts");
/* harmony import */ var _core_Event__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/Event */ "./src/core/Event.ts");
/* harmony import */ var _pipeline_PostEffectsPipeline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pipeline/PostEffectsPipeline */ "./src/renderer/pipeline/PostEffectsPipeline.ts");
/* harmony import */ var _WebGLSupports__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./WebGLSupports */ "./src/renderer/WebGLSupports.ts");
/* harmony import */ var _glObject_glTexture__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./glObject/glTexture */ "./src/renderer/glObject/glTexture.ts");
/* harmony import */ var _WebGLStateCache__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./WebGLStateCache */ "./src/renderer/WebGLStateCache.ts");
/* harmony import */ var _util_RenderCulling__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../util/RenderCulling */ "./src/util/RenderCulling.ts");
/* harmony import */ var _pipeline_ShadowMapPipeline__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pipeline/ShadowMapPipeline */ "./src/renderer/pipeline/ShadowMapPipeline.ts");
/* harmony import */ var _pipeline_DeferredPipeline__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pipeline/DeferredPipeline */ "./src/renderer/pipeline/DeferredPipeline.ts");
/* harmony import */ var _util_LightDatasCache__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../util/LightDatasCache */ "./src/util/LightDatasCache.ts");

























/**
 * webgl 1.0 渲染器；
 * TODO: 思考 renderer 如何增加分类的释放，比如材质，纹理，几何等;
 */
class WebGLRenderer extends _Renderer__WEBPACK_IMPORTED_MODULE_5__["Renderer"] {
    constructor() {
        super();
        /** 默认帧缓冲状态 */
        this._defFrameState = new _graphics_FrameState__WEBPACK_IMPORTED_MODULE_1__["FrameState"]();
        /** 着色器缓存 */
        this._shaderCache = new _shaders_ShaderCaches__WEBPACK_IMPORTED_MODULE_14__["ShaderCaches"](this);
        /** 窗口宽度 */
        this._screenWidth = -1;
        /** 窗口高度 */
        this._screenHeight = -1;
        /** 渲染器宽度 */
        this._width = -1;
        /** 渲染器高度 */
        this._height = -1;
        /** 宽度缩放比例 */
        this._scaleW = 1;
        /** 高度缩放比例 */
        this._scaleH = 1;
        /** 渲染帧数计数 */
        this._renderCount = 0;
        /** 是否是延迟渲染 */
        this._deferredRendering = false;
        /** 可见裁剪对象 */
        this._renderCulling = new _util_RenderCulling__WEBPACK_IMPORTED_MODULE_21__["RenderCulling"]();
        /** 临时的灯光属性缓存 */
        this._lightDatasCache = new _util_LightDatasCache__WEBPACK_IMPORTED_MODULE_24__["LightDatasCache"]();
    }
    /**
     * 通过长宽初始化
     * 其中包括生成canvas
     * TODO：canvas是否需要外部传入
     * @param width
     * @param height
     */
    init(width, height) {
        this._canvas = _platform_Platform__WEBPACK_IMPORTED_MODULE_13__["Platform"].createCanvas();
        const _canvas = this._canvas;
        this._gl = _canvas.getContext('webgl');
        this._initExtensions();
        this._initDefFrame(width, height);
        this._initDefMesh();
        this._postEffectPipeline = new _pipeline_PostEffectsPipeline__WEBPACK_IMPORTED_MODULE_17__["PostEffectsPipeline"](this);
        this._postEffectPipeline.init(this._defGeo);
        this.setSize(width, height);
        this._stateCache = new _WebGLStateCache__WEBPACK_IMPORTED_MODULE_20__["WebGLStateCache"]();
        this._stateCache.init(this._gl);
        this._timeNow = Date.now();
    }
    /**
     * 设置渲染器大小，
     * 注意，这个会更改掉canvas大小
     */
    setSize(w, h) {
        const _canvas = this._canvas;
        _canvas.width = w;
        _canvas.height = h;
        this._screenWidth = w;
        this._screenHeight = h;
        this._defFrameState.setViewports(0, 0, w, h);
        this._defFrameState.setClearStencil(true);
        this._cacheFrames.forEach(frame => {
            frame.setSize(w, h);
            this.initFrame(frame);
        });
        this._defFrame.setSize(w, h);
        this._postEffectPipeline.resize(w, h);
        if (this._deferredPipeling) {
            this._deferredPipeling.setSize(w, h);
        }
        if (this._shadowMapPipeline) {
            this._shadowMapPipeline.setSize(w, h);
        }
        this.event(_core_Event__WEBPACK_IMPORTED_MODULE_16__["Event"].RENDERER_RESIZE, [w, h]);
    }
    ;
    /**
     * 初始化默认Mesh
     */
    _initDefMesh() {
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_3__["Mesh"]();
        let geo = new _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_7__["ScreenGeometry"]();
        this._defGeo = geo;
        let mat = new _material_FullScreenMaterial__WEBPACK_IMPORTED_MODULE_8__["FullScreenMaterial"]();
        this._defMat = mat;
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._defMesh = mesh;
    }
    /**
     * 初始化渲染器默认离屏帧缓冲；
     * @param width
     * @param height
     */
    _initDefFrame(width, height) {
        let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_4__["Frame"]();
        frame.setSize(width, height);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
        frame.enableDepthStencil();
        frame.getState().clearColor.set(0, 0, 0, 0.0);
        this._defFrame = frame;
        let frames = [];
        for (let i = 0; i < 2; i++) {
            let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_4__["Frame"]();
            frame.setSize(width, height);
            frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(0, 0, 0, 0.0);
            this.initFrame(frame);
            frames.push(frame);
        }
        this._cacheFrames = frames;
        this._frameIndex = 0;
    }
    /**
     * 检查webgl扩展支持
     */
    _initExtensions() {
        const gl = this._gl;
        let ext = new _WebGLSupports__WEBPACK_IMPORTED_MODULE_18__["WebGLSupports"]();
        ext.init(gl, true);
        this._ext = ext;
    }
    /**
     * 启用深度测试
     */
    enableDepthTest() {
        this._defFrameState.setClearDepth(true);
    }
    /**
     * 关闭深度测试
     */
    disableDepthTest() {
        this._defFrameState.setClearDepth(false);
    }
    /**
     *  窗口显示尺寸设置
     */
    setViewports(x, y, w, h) {
        this._defFrameState.setViewports(x, y, w, h);
    }
    /**
     * 设置清理颜色
     */
    setClearColor(r, g, b, a) {
        this._defFrameState.setClearColor(true, new _math_Vector4__WEBPACK_IMPORTED_MODULE_2__["Vector4"](r, g, b, a));
    }
    /**
     * 初始化与更新几何对象
     */
    initGeometry(geometry) {
        let glgeo = geometry.getRenderObjectRef(this);
        if (!glgeo) {
            glgeo = new _glObject_glGeometry__WEBPACK_IMPORTED_MODULE_9__["glGeometry"]();
            geometry.setRenderObjectRef(this, glgeo);
        }
        if (!glgeo.getUpdate()) {
            return glgeo;
        }
        if (!glgeo.generateFromGeometry(this._gl, geometry)) {
            glgeo = null;
            geometry.setRenderObjectRef(this, null);
        }
        return glgeo;
    }
    /**
     * 初始化与更新纹理对象
     */
    initTexture(texture) {
        let _gl = this._gl;
        let gltexture = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
            gltexture.updated();
            return gltexture;
        }
        if (texture.getType() === _graphics_Texture__WEBPACK_IMPORTED_MODULE_6__["Texture"].TEXTURE2D) {
            let tex2D = texture;
            if (tex2D.isUrl) {
                if (!tex2D.loaded) {
                    return this.initTexture(tex2D._def);
                }
                let imgMap = _glObject_glTexture2D__WEBPACK_IMPORTED_MODULE_11__["glTexture2D"].ImageTexMap;
                let img = tex2D.getImage();
                let tex = imgMap.get(img);
                if (tex) {
                    tex2D.setRenderObjectRef(this, tex);
                    return tex;
                }
                tex = new _glObject_glTexture2D__WEBPACK_IMPORTED_MODULE_11__["glTexture2D"](_gl);
                if (tex.generateFromTexture2D(_gl, tex2D)) {
                    tex2D.setRenderObjectRef(this, tex);
                    imgMap.set(img, tex);
                    return tex;
                }
            }
            else if (tex2D.getWidth() > 0 && tex2D.getHeight() > 0) {
                let tex = (tex2D.getRenderObjectRef(this));
                if (!tex || tex.isUrl) {
                    tex = new _glObject_glTexture2D__WEBPACK_IMPORTED_MODULE_11__["glTexture2D"](_gl);
                }
                if (tex.generateFromTexture2D(_gl, tex2D)) {
                    tex2D.setRenderObjectRef(this, tex);
                    return tex;
                }
            }
        }
        else if (texture.getType() === _graphics_Texture__WEBPACK_IMPORTED_MODULE_6__["Texture"].TEXTURECUBE) {
            let texCube = texture;
            let tex = new _glObject_glTextureCube__WEBPACK_IMPORTED_MODULE_12__["glTextureCube"](_gl);
            if (tex.generateFromTextureCube(_gl, texCube)) {
                texCube.setRenderObjectRef(this, tex);
                return tex;
            }
        }
        return null;
    }
    /**
     * 初始化与更新帧缓冲对象
     */
    initFrame(frame) {
        let glframe = frame.getRenderObjectRef(this);
        if (!glframe) {
            glframe = new _glObject_glFrame__WEBPACK_IMPORTED_MODULE_10__["glFrame"]();
            frame.setRenderObjectRef(this, glframe);
        }
        if (!glframe.getUpdate()) {
            return glframe;
        }
        if (!glframe.generateFromFrame(this._gl, this, frame)) {
            glframe = null;
            frame.setRenderObjectRef(this, null);
        }
        return glframe;
    }
    /**
     * 初始化与更新
     */
    initMaterial(mat) {
        let shaderCache = this._shaderCache;
        let glprog = shaderCache.genShaderProgram(mat, this._deferredRendering);
        if (!glprog) {
            return null;
        }
        return glprog;
    }
    /**
     * 新增或者更新Mesh的数据
     * 当前为了着色器的引用计数
     */
    retainMesh(mesh, forceMat) {
        let gl = this._gl;
        let glGeo = this.initGeometry(mesh.getGeometry());
        if (!glGeo) {
            return false;
        }
        let mat = forceMat || mesh.getMaterial();
        let glProgram = this.initMaterial(mat);
        if (!glProgram) {
            return false;
        }
        glProgram.getTextures().forEach((texLoc, type) => {
            let tex = mat.getTexture(type);
            if (!tex) {
                return;
            }
            let glTex = this.initTexture(tex);
            if (!glTex) {
                return;
            }
            glTex.apply(gl, texLoc);
        });
        return true;
    }
    /**
     * 移除Mesh
     * 当前为了移除着色器的引用计数
     */
    releaseMesh(mesh) {
        let mat = mesh.getMaterial();
        if (mat) {
            this._shaderCache.releaseMaterial(mat);
        }
    }
    /**
     * 应用帧缓冲状态
     * @param frameState
     */
    useFrameState(frameState) {
        const gl = this._gl;
        let stateCache = this._stateCache;
        let clearBit = 0;
        stateCache.setViewport(gl, frameState.viewport.v);
        if (!frameState.needClear) {
            return;
        }
        if (frameState.isClearColor) {
            clearBit = clearBit | gl.COLOR_BUFFER_BIT;
            stateCache.setClearColor(gl, frameState.clearColor.v);
        }
        frameState.isClearDepth;
        if (frameState.isClearDepth) {
            clearBit = clearBit | gl.DEPTH_BUFFER_BIT;
            stateCache.setClearDepth(gl, frameState.clearDepth);
        }
        if (frameState.isClearStencil) {
            clearBit = clearBit | gl.STENCIL_BUFFER_BIT;
            stateCache.setClearStencil(gl, frameState.clearStencil);
        }
        if (clearBit !== 0) {
            gl.clear(clearBit);
        }
    }
    /**
     * 应用帧缓冲
     * @param frame 帧缓冲对象
     * @param frameState 允许额外指定一个帧缓冲状态
     */
    useFrame(frame, frameState) {
        const gl = this._gl;
        if (!frame) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            this.useFrameState(this._defFrameState);
            this._curFrame = null;
            return;
        }
        // if (this._curFrame === frame) {
        //     return;
        // }
        let glframe = this.initFrame(frame);
        if (!glframe) {
            return;
        }
        glframe.apply(gl, this._ext);
        this.useFrameState(frameState ? frameState : frame.getState());
        this._curFrame = frame;
    }
    /**
     * 绘制一个Mesh
     * @param mesh Mesh对象
     * @param camera 相机对象
     */
    _renderMesh(mesh, forceMaterial, shadows, light) {
        let gl = this._gl;
        let mat = forceMaterial || mesh.getMaterial();
        // TODO: 找地方放灯光
        if (shadows) {
            if (shadows.d > 0) {
                let dData = this._lightDatasCache.getShadowDir(shadows.d);
                mat.setDirShadowLights(shadows.d, dData.dir, dData.colors, dData.mats, dData.textures);
            }
            else {
                mat.setDirShadowLights(0, null, null, null, null);
            }
            if (shadows.s > 0) {
                let sData = this._lightDatasCache.getShadowSpot(shadows.s);
                mat.setSpotShadowLights(shadows.s, sData.pos, sData.dir, sData.colors, sData.ranges, sData.mats, sData.textures);
            }
            else {
                mat.setSpotShadowLights(0, null, null, null, null, null, null);
            }
            if (shadows.p > 0) {
                let pData = this._lightDatasCache.getShadowPoint(shadows.p);
                mat.setPointShadowLights(shadows.p, pData.pos, pData.colors, pData.ranges, pData.textures);
            }
            else {
                mat.setPointShadowLights(0, null, null, null, null);
            }
        }
        else {
            mat.setDirShadowLights(0, null, null, null, null);
            mat.setSpotShadowLights(0, null, null, null, null, null, null);
            mat.setPointShadowLights(0, null, null, null, null);
        }
        if (light) {
            let dData = this._lightDatasCache.getDir(light.d);
            mat.setDirLights(light.d, dData.dir, dData.colors);
            let pData = this._lightDatasCache.getPoint(light.p);
            mat.setPointLights(light.p, pData.pos, pData.colors);
            let sData = this._lightDatasCache.getSpot(light.s);
            mat.setSpotLights(light.s, sData.pos, sData.dir, sData.colors);
        }
        if (!this.retainMesh(mesh, forceMaterial)) {
            return;
        }
        let geo = mesh.getGeometry();
        let glgeo = geo.getRenderObjectRef(this);
        this._useMaterialState(mat);
        let glprog = mat.shader.getRenderObjectRef(this);
        glprog.apply(gl);
        glgeo.bindVbo(gl, glprog, geo);
        glprog.applyUniforms(gl, mesh, this._curCamera);
        glgeo.draw(gl);
    }
    /**
     * 渲染到默认帧缓冲
     * @param scene
     * @param camera
     */
    _renderDefScene(scene, camera) {
    }
    /**
     * 渲染到指定帧缓冲
     * @param scene
     * @param camera
     * @param frame
     */
    _renderScene2Frame(scene, camera, frame) {
    }
    /**
     * 将相机对象数据存入矩阵
     * @param camera
     */
    useCamera(camera) {
        if (camera) {
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__["glProgram"].vMatrix.copy(camera.getMatrix());
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__["glProgram"].pMatrix.copy(camera.getProjectionMatrix());
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__["glProgram"].vpMatrix.copy(camera.getViewProjectionMatrix());
            this._curCamera = camera;
        }
    }
    /**
     * 应用材质的状态
     * @param mat
     */
    _useMaterialState(mat) {
        let gl = this._gl;
        let states = this._stateCache;
        states.setBlend(gl, mat.alphaType, mat.blend);
        states.setFaceMode(gl, mat.faceMode, mat.filpFace);
        states.setStencil(gl, mat.enableStencil, mat.stencil);
        states.setDepth(gl, mat.enableDepth, mat.depthMask, mat.depthFunc);
        states.setPolygonOffset(gl, mat.enablePolygonOffset, mat.polygonOffset);
    }
    /**
     * 渲染阴影用的深度图
     * @param scene
     * @param light
     */
    _renderShadow(scene, light, visibleBox, srcCamera) {
        let shadowPipe = this._shadowMapPipeline;
        if (!shadowPipe) {
            shadowPipe = new _pipeline_ShadowMapPipeline__WEBPACK_IMPORTED_MODULE_22__["ShadowMapPipeline"](this);
            this._shadowMapPipeline = shadowPipe;
        }
        shadowPipe.renderShadow(scene, light, visibleBox, srcCamera);
    }
    /**
     * 直接渲染一组Mesh，到当前的Frame
     * @param meshes
     * @param size
     * @param material
     */
    directRenderList(meshes, size, material) {
        this._renderList(meshes, size, material);
    }
    directRenderOrderedList(meshes, size, material) {
        this._renderOrderedList(meshes, size, material);
    }
    /**
     * 直接渲染一个Mesh，到当前的Frame
     * @param meshes
     * @param size
     * @param material
     */
    directRenderMesh(mesh, material) {
        this._renderMesh(mesh, material, null);
    }
    _renderOrderedList(renderList, length, forceMat, shadows, lights) {
        for (let i = 0; i < length; i++) {
            this._renderMesh(renderList[i].obj, forceMat, shadows, lights);
        }
    }
    /**
     * 渲染一组mesh
     * @param renderList
     * @param length
     * @param forceMat
     * @param shadow
     */
    _renderList(renderList, length, forceMat, shadows, lights) {
        for (let i = 0; i < length; i++) {
            this._renderMesh(renderList[i], forceMat, shadows, lights);
        }
    }
    _renderShadows(scene, camera) {
        let renderCulling = this._renderCulling;
        for (let i = 0, l = renderCulling.dirShadowLightSize; i < l; i++) {
            let d = renderCulling.dirShadowLights[i];
            this._renderShadow(scene, d.obj, renderCulling.visibleBox, camera);
        }
        for (let i = 0, l = renderCulling.spotShadowLightSize; i < l; i++) {
            let s = renderCulling.spotShadowLights[i];
            this._renderShadow(scene, s.obj, renderCulling.visibleBox, camera);
        }
        for (let i = 0, l = renderCulling.pointShadowLightSize; i < l; i++) {
            let p = renderCulling.pointShadowLights[i];
            this._renderShadow(scene, p.obj, renderCulling.visibleBox, camera);
        }
    }
    /**
     * 渲染场景的总入口
     * TODO：这里将会通过判定是否存在camera或者是否存在frame分离。
     * @param scene
     * @param camera
     * @param frame
     */
    renderScene(scene, camera, frame, renderArgs) {
        if (!frame) {
            let now = Date.now();
            this._deltaTime = now - this._timeNow;
            this._timeNow = now;
            this._defCamera = camera;
            _glObject_glTexture__WEBPACK_IMPORTED_MODULE_19__["glTexture"].clear();
        }
        if (scene.isScene) {
            let light = scene.getMainLight();
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__["glProgram"].lightDir.copy(light.dir);
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_15__["glProgram"].lightColor.copy(light.color);
        }
        let renderCulling = this._renderCulling;
        this.useCamera(camera);
        let mat4;
        if (renderArgs && renderArgs.frustumCamera) {
            mat4 = renderArgs.frustumCamera.getViewProjectionMatrix();
        }
        else if (camera) {
            mat4 = camera.getViewProjectionMatrix();
        }
        if (!frame) {
            renderCulling.culling(scene, mat4, this._deferredRendering, false);
            this._renderShadows(scene, camera);
            this._lightDatasCache.updateDatasFromCulling(renderCulling);
            if (this._deferredRendering) {
                // 延迟渲染流程走这里，注意，没有优化光源。
                this._deferredPipeling.render(renderCulling, camera, this._defFrame);
            }
            else {
                // 正常渲染走这条，注意，没有优化光源
                this.useCamera(this._defCamera);
                this.useFrame(this._defFrame, this._defFrameState);
                let shadowLightNum = { d: renderCulling.dirShadowLightSize, p: renderCulling.pointShadowLightSize, s: renderCulling.spotShadowLightSize };
                let lightNum = { d: renderCulling.dirLightSize, p: renderCulling.pointLightSize, s: renderCulling.spotLightSize };
                this._renderOrderedList(renderCulling.opacities, renderCulling.opacitySize, null, shadowLightNum, lightNum);
                this._renderOrderedList(renderCulling.alphaTests, renderCulling.alphaTestSize, null, shadowLightNum, lightNum);
                this._renderOrderedList(renderCulling.alphaBlends, renderCulling.alphaBlendSize, null, shadowLightNum, lightNum);
            }
            this.useCamera(this._defCamera);
            let targetFrame;
            if (this._postEffectPipeline.length > 0) {
                this.renderPostEffects();
                targetFrame = this._postEffectPipeline.currentFrame;
            }
            else {
                targetFrame = this._defFrame;
            }
            this.useFrame(null);
            this._defMat.setDiffuseMap(targetFrame.getTextureFromType(0 /* COLOR */).tex);
            this._renderMesh(this._defMesh);
            this.exchangeFrame();
        }
        else {
            this.useFrame(frame);
            this.useCamera(camera);
            renderCulling.culling(scene, mat4, true, false);
            this._renderOrderedList(renderCulling.opacities, renderCulling.opacitySize);
            this._renderOrderedList(renderCulling.alphaTests, renderCulling.alphaTestSize);
            this._renderOrderedList(renderCulling.alphaBlends, renderCulling.alphaBlendSize);
        }
    }
    /**
     * 后处理效果渲染
     */
    renderPostEffects() {
        this._postEffectPipeline.render(this._defFrame, this._deferredRendering);
    }
    /**
     * 获取canvas
     */
    getCanvas() {
        return this._canvas;
    }
    /**
     * 获取webgl context
     */
    getContext() {
        return this._gl;
    }
    /**
     * 获取渲染器Id
     */
    getRendererId() {
        return this.rendererId;
    }
    /**
     * 获取渲染器宽度
     */
    getWidth() {
        return this._screenWidth;
    }
    /**
     * 获取渲染器高度
     */
    getHeight() {
        return this._screenHeight;
    }
    /**
     * 交换帧缓冲
     */
    exchangeFrame() {
        this._frameIndex = (this._frameIndex + 1) % this._cacheFrames.length;
    }
    /**
     * 获取渲染目标帧缓冲
     */
    get currectFrame() {
        return this._cacheFrames[this._frameIndex];
    }
    /**
     * 获取颜色源帧缓冲
     */
    get lastFrame() {
        return this._cacheFrames[(this._frameIndex + 1) % this._cacheFrames.length];
    }
    /**
     * 两帧的间隔时间，单位毫秒
     */
    get deltaTime() {
        return this._deltaTime;
    }
    /**
     * 获取渲染到默认帧缓冲的相机
     */
    get defCamera() {
        return this._defCamera;
    }
    /**
     * 根据后处理管线需求与延迟渲染，更新默认帧缓冲的结构。
     */
    updateDefFrame() {
        let srcReqs = this._postEffectPipeline.getSrcReqs();
    }
    /**
     * 通过类型或者后处理对象禁用后处理
     * @param pe
     */
    disablePostEffect(pe) {
        this._postEffectPipeline.disablePostEffect(pe);
        this.updateDefFrame();
    }
    /**
     * 通过类型或者后处理对象启用后处理
     * @param pe
     */
    enablePostEffect(pe) {
        this._postEffectPipeline.enablePostEffect(pe);
        this.updateDefFrame();
    }
    /**
     * 获取当前启用的后处理类型组
     */
    getEnablingPostEffect() {
        return this._postEffectPipeline.getEnablingPostEffect();
    }
    /**
     * 获取GBuffer的Frame
     */
    getGBufferFrame() {
        return this._deferredRendering ? this._deferredPipeling.gFrame : null;
    }
    /**
     * 切换延迟渲染
     * TODO: 延迟渲染找个地方写吧，不要写在渲染器里面了。
     */
    _swtichDeferredRendering(v) {
        if (this._deferredRendering === v) {
            return;
        }
        if (v) {
            if (!this._deferredPipeling) {
                this._deferredPipeling = new _pipeline_DeferredPipeline__WEBPACK_IMPORTED_MODULE_23__["DeferredPipeline"](this);
            }
        }
        this._deferredRendering = v;
    }
    /**
     * 启用延迟渲染
     */
    enableDeferredRendering() {
        this._swtichDeferredRendering(true);
    }
    /**
     * 禁用延迟渲染
     */
    disableDeferredRendering() {
        this._swtichDeferredRendering(false);
    }
    /**
     * 获取是否开启了延迟渲染
     */
    get isEnableDeferredRender() {
        return this._deferredRendering;
    }
    /**
     * 移除着色器
     * @param obj
     */
    removeShader(obj) {
        let glProg = obj;
        this._shaderCache.removeShader(glProg);
    }
    /**
     * 获取默认的frame状态
     */
    getDefFrameState() {
        return this._defFrameState;
    }
}


/***/ }),

/***/ "./src/renderer/WebGLStateCache.ts":
/*!*****************************************!*\
  !*** ./src/renderer/WebGLStateCache.ts ***!
  \*****************************************/
/*! exports provided: WebGLStateCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLStateCache", function() { return WebGLStateCache; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_Stencil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/Stencil */ "./src/graphics/Stencil.ts");
/* harmony import */ var _graphics_Blend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/Blend */ "./src/graphics/Blend.ts");
/* harmony import */ var _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphics/GraphicsTypes */ "./src/graphics/GraphicsTypes.ts");




/**
 * Webgl状态缓存
 */
class WebGLStateCache {
    constructor() {
        // clear
        // enableClearColor = true;
        // enableClearDepth = true;
        // enableClearStencil = false;
        this.clearColor = [1.0, 1.0, 1.0, 1.0];
        this.clearDepth = 0;
        this.clearStencil = 0;
        // viewport
        this.viewport = [0, 0, 800, 600];
        // color
        this.colorMask = [true, true, true, true];
        // depth
        this.enableDepth = true;
        this.depthFunc = _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LESS"];
        this.depthMask = true;
        // stencil
        this.enableStencil = false;
        this.stencil = _graphics_Stencil__WEBPACK_IMPORTED_MODULE_1__["Stencil"].DefStencil;
        // blend
        this.enableBlend = false;
        this.blend = _graphics_Blend__WEBPACK_IMPORTED_MODULE_2__["Blend"].DefBlend;
        // cullFace
        this.enableCullFace = false;
        this.cullFaceMode = _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["BACK"];
        this.frontFace = _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CCW"];
        // TODO:
        // scissor
        this.enableScissor = false;
        this.scissor = [0, 0, 800, 600];
        // TODO:
        // polygonOffset
        this.enablePolygonOffset = false;
        this.polygonOffset = [0, 0];
    }
    init(gl) {
        gl.clearColor.apply(gl, this.clearColor);
        gl.colorMask.apply(gl, this.colorMask);
        this.enableDepth ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
        gl.depthFunc(this.depthFunc);
        gl.depthMask(this.depthMask);
        this.enableBlend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
        let blend = this.blend;
        gl.blendFuncSeparate.apply(gl, blend.blendFunc);
        gl.blendEquationSeparate.apply(gl, blend.blendEquation);
        this.enableStencil ? gl.enable(gl.STENCIL_TEST) : gl.disable(gl.STENCIL_TEST);
        gl.clearStencil(this.clearStencil);
        let stencil = this.stencil;
        gl.stencilMaskSeparate(gl.FRONT, stencil.stencilMask);
        gl.stencilMaskSeparate(gl.BACK, stencil.stencilBackMask);
        gl.stencilFuncSeparate.apply(gl, stencil.stencilFunc);
        gl.stencilFuncSeparate.apply(gl, stencil.stencilBackFunc);
        gl.stencilOpSeparate.apply(gl, stencil.stencilOp);
        gl.stencilOpSeparate.apply(gl, stencil.stencilBackOp);
        this.enableCullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
        gl.cullFace(this.cullFaceMode);
        gl.frontFace(this.frontFace);
    }
    setViewport(gl, viewport) {
        let vp = this.viewport;
        for (let i = 0; i < 4; i++) {
            if (vp[i] !== viewport[i]) {
                gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
                for (i; i < 4; i++) {
                    vp[i] = viewport[i];
                }
                return;
            }
        }
    }
    setClearColor(gl, color) {
        let vp = this.clearColor;
        for (let i = 0; i < 4; i++) {
            if (vp[i] !== color[i]) {
                gl.clearColor(color[0], color[1], color[2], color[3]);
                for (i; i < 4; i++) {
                    vp[i] = color[i];
                }
                return;
            }
        }
    }
    setClearDepth(gl, depth) {
        if (this.clearDepth !== depth) {
            gl.clearDepth(depth);
            this.clearDepth = depth;
        }
    }
    setClearStencil(gl, stencil) {
        if (this.clearStencil !== stencil) {
            gl.clearStencil(stencil);
            this.clearStencil = stencil;
        }
    }
    setColor(gl) {
    }
    setDepth(gl, enable, mask, func = _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["LESS"]) {
        if (!enable) {
            if (this.enableDepth) {
                gl.disable(gl.DEPTH_TEST);
                this.enableDepth = false;
            }
            return;
        }
        if (!this.enableDepth) {
            gl.enable(gl.DEPTH_TEST);
            this.enableDepth = true;
        }
        if (this.depthMask !== mask) {
            gl.depthMask(mask);
            this.depthMask = mask;
        }
        if (this.depthFunc !== func) {
            gl.depthFunc(func);
            this.depthFunc = func;
        }
    }
    setStencil(gl, enalbe, stencil) {
        if (!enalbe) {
            if (this.enableStencil) {
                this.enableStencil = false;
                gl.disable(gl.STENCIL_TEST);
            }
            return;
        }
        if (!this.enableStencil) {
            gl.enable(gl.STENCIL_TEST);
            this.enableStencil = true;
        }
        if (this.stencil === stencil) {
            return;
        }
        let selfStencil = this.stencil;
        if (selfStencil.stencilMask !== stencil.stencilMask) {
            gl.stencilMaskSeparate(gl.FRONT, stencil.stencilMask);
        }
        if (selfStencil.stencilBackMask !== stencil.stencilBackMask) {
            gl.stencilMaskSeparate(gl.BACK, stencil.stencilBackMask);
        }
        let curr = stencil.stencilFunc;
        let self = selfStencil.stencilFunc;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilFuncSeparate.apply(gl, curr);
        }
        curr = stencil.stencilBackFunc;
        self = selfStencil.stencilBackFunc;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilFuncSeparate.apply(gl, curr);
        }
        curr = stencil.stencilOp;
        self = selfStencil.stencilOp;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilOpSeparate.apply(gl, curr);
        }
        curr = stencil.stencilBackOp;
        self = selfStencil.stencilBackOp;
        if (curr[1] !== self[1] || curr[2] !== self[2] || curr[3] !== self[3]) {
            gl.stencilOpSeparate.apply(gl, curr);
        }
        this.stencil = stencil;
    }
    setBlend(gl, alphaType, blend) {
        if (alphaType !== _graphics_GraphicsTypes__WEBPACK_IMPORTED_MODULE_3__["AlphaType"].BLEND) {
            if (this.enableBlend) {
                gl.disable(gl.BLEND);
                this.enableBlend = false;
            }
            return;
        }
        if (!this.enableBlend) {
            gl.enable(gl.BLEND);
            this.enableBlend = true;
        }
        if (this.blend === blend) {
            return;
        }
        let blendFunc = blend.blendFunc;
        let blendEquation = blend.blendEquation;
        let func = this.blend.blendFunc;
        for (let i = 0; i < 4; i++) {
            if (blendFunc[i] !== func[i]) {
                gl.blendFuncSeparate.apply(gl, blendFunc);
                break;
            }
        }
        let equation = this.blend.blendEquation;
        if (equation[0] !== blendEquation[0] || equation[1] !== blendEquation[1]) {
            gl.blendEquationSeparate(equation[0], equation[1]);
        }
        this.blend = blend;
    }
    setFaceMode(gl, cullFaceMode, flipFace) {
        let frontFace = flipFace ? _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CW"] : _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["CCW"];
        if (frontFace !== this.frontFace) {
            gl.frontFace(frontFace);
            this.frontFace = frontFace;
        }
        let enableCullFace = !!cullFaceMode;
        if (enableCullFace !== this.enableCullFace) {
            enableCullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
            this.enableCullFace = enableCullFace;
        }
        if (cullFaceMode && cullFaceMode !== this.cullFaceMode) {
            gl.cullFace(cullFaceMode);
            this.cullFaceMode = cullFaceMode;
        }
    }
    setPolygonOffset(gl, enable, values) {
        if (!enable) {
            if (this.enablePolygonOffset) {
                gl.disable(gl.POLYGON_OFFSET_FILL);
                this.enablePolygonOffset = false;
            }
            return;
        }
        if (!this.enablePolygonOffset) {
            gl.enable(gl.POLYGON_OFFSET_FILL);
            this.enablePolygonOffset = false;
        }
        if (this.polygonOffset[0] !== values[0] || this.polygonOffset[1] !== values[1]) {
            gl.polygonOffset(values[0], values[1]);
            this.polygonOffset[0] = values[0];
            this.polygonOffset[1] = values[1];
        }
    }
}


/***/ }),

/***/ "./src/renderer/WebGLSupports.ts":
/*!***************************************!*\
  !*** ./src/renderer/WebGLSupports.ts ***!
  \***************************************/
/*! exports provided: WebGLSupports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLSupports", function() { return WebGLSupports; });
/**
 * WebGL扩展支持情况
 * 如果WebGL2默认都支持
 */
class WebGLSupports {
    constructor() {
        this.MAX_COLOR_ATTACHMENTS = 1;
        this.MAX_DRAW_BUFFERS = 1;
    }
    init(gl, log) {
        let getExtension = function (extName) {
            let ext = gl.getExtension(extName);
            // let ext = gl.getExtension(extName) || gl.getExtension('WEBKIT_' + extName) || gl.getExtension('MOZ_' + extName);
            // if (!ext && log) Logger.warn('Can not use webgl extension ' + extName);
            return ext;
        };
        this._vao = gl.getExtension("OES_vertex_array_object");
        let drawBuffers = gl.getExtension("WEBGL_draw_buffers");
        if (drawBuffers) {
            this._drawBuffers = drawBuffers;
            this.MAX_COLOR_ATTACHMENTS = drawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL;
            this.MAX_DRAW_BUFFERS = drawBuffers.MAX_DRAW_BUFFERS_WEBGL;
            this.drawBuffers = drawBuffers.drawBuffersWEBGL.bind(drawBuffers);
        }
        else {
            this.drawBuffers = null;
        }
        // 这两个为浮点纹理写
        //"EXT_color_buffer_half_float"
        //"WEBGL_color_buffer_float" 
        this._shaderTexLod = gl.getExtension('EXT_shader_texture_lod');
        this._texFloat = gl.getExtension("OES_texture_float");
        this._texFloatLinear = gl.getExtension("OES_texture_float_linear");
        this._texHalfFloat = gl.getExtension("OES_texture_half_float");
        this._texHalfFloatLinear = gl.getExtension("OES_texture_half_float_linear");
        this._texFilterAni = gl.getExtension("EXT_texture_filter_anisotropic");
        this._depthTex = gl.getExtension("WEBGL_depth_texture");
        this._standardDerivatives = gl.getExtension("OES_standard_derivatives");
        this._instanceArrays = gl.getExtension('ANGLE_instanced_arrays');
        this._elementIdxUint = gl.getExtension("OES_element_index_uint");
        // this.drawArraysInstanced = this._instanceArrays.drawArraysInstancedANGLE.bind(this._instanceArrays);
    }
    drawBuffers(buffers) { }
    ;
    drawArraysInstanced(mode, first, count, primcount) {
        // this._instanceArrays.drawArraysInstancedANGLE
    }
    setWebGL2(v) {
    }
}


/***/ }),

/***/ "./src/renderer/glObject/glBuffer.ts":
/*!*******************************************!*\
  !*** ./src/renderer/glObject/glBuffer.ts ***!
  \*******************************************/
/*! exports provided: glBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glBuffer", function() { return glBuffer; });
/* harmony import */ var _glObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glObject */ "./src/renderer/glObject/glObject.ts");

class glBuffer extends _glObject__WEBPACK_IMPORTED_MODULE_0__["glObject"] {
    constructor() {
        super();
        this._isIndex = false;
    }
    setData(gl, target, data, usage) {
        let glbuffer = this._buffer;
        gl.bindBuffer(target, glbuffer);
        gl.bufferData(target, data, usage);
        gl.bindBuffer(target, null);
    }
    generateFromBuffer(gl, buffer) {
        let glbuffer = this._buffer;
        if (!glbuffer) {
            glbuffer = gl.createBuffer();
            this._buffer = glbuffer;
        }
        this._isIndex = buffer.isIndex();
        this.setData(gl, buffer.isIndex() ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER, buffer.getData(), buffer.getUsage());
        return this;
    }
    getNativeBuffer() {
        return this._buffer;
    }
}


/***/ }),

/***/ "./src/renderer/glObject/glDraw.ts":
/*!*****************************************!*\
  !*** ./src/renderer/glObject/glDraw.ts ***!
  \*****************************************/
/*! exports provided: glDraw, glDrawWithIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glDraw", function() { return glDraw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glDrawWithIndex", function() { return glDrawWithIndex; });
class glDraw {
    constructor(_mode, _offset, _count, _type) {
        this._mode = _mode;
        this._offset = _offset;
        this._count = _count;
        this._type = _type;
    }
    apply(gl) {
        gl.drawArrays(this._mode, this._offset, this._count);
    }
}
class glDrawWithIndex extends glDraw {
    constructor(mode, offset, count, type) {
        super(mode, offset, count, type);
    }
    apply(gl) {
        gl.drawElements(this._mode, this._count, this._type, this._offset);
    }
}


/***/ }),

/***/ "./src/renderer/glObject/glFrame.ts":
/*!******************************************!*\
  !*** ./src/renderer/glObject/glFrame.ts ***!
  \******************************************/
/*! exports provided: glFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glFrame", function() { return glFrame; });
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Logger */ "./src/core/Logger.ts");
/* harmony import */ var _glObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glObject */ "./src/renderer/glObject/glObject.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");



class glFrame extends _glObject__WEBPACK_IMPORTED_MODULE_1__["glObject"] {
    constructor() {
        super();
        this._frame = undefined;
        this._depthStencil = undefined;
        this._drawBufferMap = new Map();
        this._drawBuffers = [];
    }
    checkTextures(renderer, textureMap, depthStencilTexture) {
        let completed = true;
        textureMap.forEach(function (texTarget, location) {
            let glTexture = renderer.initTexture(texTarget.tex);
            if (glTexture === undefined) {
                completed = false;
            }
            this._drawBufferMap.set(location, glTexture);
        }.bind(this));
        if (depthStencilTexture) {
            let glTexture = renderer.initTexture(depthStencilTexture);
            if (glTexture !== undefined) {
                this._depthStencil = glTexture;
            }
        }
        return completed;
    }
    generateFromFrame(gl, renderer, frame) {
        let textureMap = frame.getTextureMap();
        let depthStencilTexture = frame.getDepthStencilTexture();
        const maxAttachment = 4;
        this._drawBuffers = [];
        if (this.checkTextures(renderer, textureMap, depthStencilTexture) === false) {
            return undefined;
        }
        let frameBuffer = this._frame || gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        this._drawBufferMap.forEach((glTexure, location) => {
            if (location >= maxAttachment) {
                _core_Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error('current just support ' + maxAttachment + ' attachments, but you set ' + location);
                return undefined;
            }
            let attachment = gl.COLOR_ATTACHMENT0 + location;
            this._drawBuffers.push(attachment);
            let texTarget = textureMap.get(location);
            let target = texTarget.target === _graphics_Frame__WEBPACK_IMPORTED_MODULE_2__["TexTarget"].TEXTURE_2D ? gl.TEXTURE_2D : (gl.TEXTURE_CUBE_MAP_POSITIVE_X + texTarget.target - _graphics_Frame__WEBPACK_IMPORTED_MODULE_2__["TexTarget"].TEXTURE_CUBE_MAP_POSITIVE_X);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, target, glTexure.getHandler(), 0);
        });
        if (depthStencilTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.TEXTURE_2D, this._depthStencil.getHandler(), 0);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._frame = frameBuffer;
        this.updated();
        // this.setLocalVersion(frame.getUpdateVersion());
        return this;
    }
    apply(gl, ext) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frame);
        if (this._drawBuffers.length > 1 && ext.drawBuffers) {
            ext.drawBuffers(this._drawBuffers);
        }
    }
}


/***/ }),

/***/ "./src/renderer/glObject/glGeometry.ts":
/*!*********************************************!*\
  !*** ./src/renderer/glObject/glGeometry.ts ***!
  \*********************************************/
/*! exports provided: glGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glGeometry", function() { return glGeometry; });
/* harmony import */ var _glObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glObject */ "./src/renderer/glObject/glObject.ts");
/* harmony import */ var _glDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glDraw */ "./src/renderer/glObject/glDraw.ts");
/* harmony import */ var _glBuffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glBuffer */ "./src/renderer/glObject/glBuffer.ts");
/* harmony import */ var _glProgram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glProgram */ "./src/renderer/glObject/glProgram.ts");




class glGeometry extends _glObject__WEBPACK_IMPORTED_MODULE_0__["glObject"] {
    constructor() {
        super();
        this._vbuffers = [];
        this._ibuffer = null;
        this._draw = null;
    }
    bindVbo(gl, glprog, geometry) {
        if (glGeometry._curr === this && !_glProgram__WEBPACK_IMPORTED_MODULE_3__["glProgram"].curUpdated) {
            return;
        }
        _glProgram__WEBPACK_IMPORTED_MODULE_3__["glProgram"].curUpdated = false;
        glGeometry._curr = this;
        let glGeo = this;
        let vbuffers = glGeo.getvBuffers();
        let buffers = geometry.getBuffers();
        let length = buffers.length;
        for (let i = 0; i < length; i++) {
            let buffer = buffers[i];
            let binded = false;
            let attributes = buffer.getAttributes();
            attributes.forEach(attribute => {
                let location = glprog.getAttribLocation(attribute.attribType);
                if (location === undefined || location === -1) {
                    return;
                }
                else {
                    if (!binded) {
                        gl.bindBuffer(gl.ARRAY_BUFFER, vbuffers[i].getNativeBuffer());
                        binded = true;
                    }
                }
                gl.vertexAttribPointer(location, attribute.num, attribute.type, false, buffer.getStride(), attribute.offset);
            });
        }
        glGeo.bindIbo(gl);
        return this;
    }
    generateFromGeometry(gl, geometry) {
        let buffers = geometry.getBuffers();
        let indexBuffer = geometry.getIndexBuffer();
        let drawParameter = geometry.getDrawParameter();
        if (buffers.length === 0) {
            return undefined;
        }
        let vbuffers = this._vbuffers;
        vbuffers.length = buffers.length;
        buffers.forEach((buffer, index) => {
            let vbuffer = new _glBuffer__WEBPACK_IMPORTED_MODULE_2__["glBuffer"]();
            vbuffer.generateFromBuffer(gl, buffer);
            vbuffers[index] = vbuffer;
        });
        if (indexBuffer) {
            let ibuffer = new _glBuffer__WEBPACK_IMPORTED_MODULE_2__["glBuffer"]();
            ibuffer.generateFromBuffer(gl, indexBuffer);
            this._ibuffer = ibuffer;
            this._draw = new _glDraw__WEBPACK_IMPORTED_MODULE_1__["glDrawWithIndex"](drawParameter.mode, drawParameter.offset, drawParameter.count, indexBuffer.getType());
        }
        else {
            this._draw = new _glDraw__WEBPACK_IMPORTED_MODULE_1__["glDraw"](drawParameter.mode, drawParameter.offset, drawParameter.count, 0);
        }
        this.updated();
        return this;
    }
    bindIbo(gl) {
        if (this._ibuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibuffer.getNativeBuffer());
        }
    }
    getvBuffers() {
        return this._vbuffers;
    }
    getiBuffer() {
        return this._ibuffer;
    }
    getDraw() {
        return this._draw;
    }
    draw(gl) {
        this._draw.apply(gl);
    }
    drawOther(draw, gl) {
        draw.apply(gl);
    }
}


/***/ }),

/***/ "./src/renderer/glObject/glObject.ts":
/*!*******************************************!*\
  !*** ./src/renderer/glObject/glObject.ts ***!
  \*******************************************/
/*! exports provided: glObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glObject", function() { return glObject; });
/* harmony import */ var _graphics_RenderBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../graphics/RenderBase */ "./src/graphics/RenderBase.ts");

class glObject extends _graphics_RenderBase__WEBPACK_IMPORTED_MODULE_0__["RenderBase"] {
}


/***/ }),

/***/ "./src/renderer/glObject/glProgram.ts":
/*!********************************************!*\
  !*** ./src/renderer/glObject/glProgram.ts ***!
  \********************************************/
/*! exports provided: glProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glProgram", function() { return glProgram; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Logger */ "./src/core/Logger.ts");
/* harmony import */ var _glObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glObject */ "./src/renderer/glObject/glObject.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _object_Camera__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../object/Camera */ "./src/object/Camera.ts");
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/Util */ "./src/util/Util.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Renderer */ "./src/renderer/Renderer.ts");










const _matrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
const _vpmatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
const _mvmatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
const _mvpmatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
const _f32 = new Float32Array(16);
const _f4 = new Float32Array(4);
class glProgram extends _glObject__WEBPACK_IMPORTED_MODULE_2__["glObject"] {
    constructor() {
        super();
        this._textures = new Map();
        this._attributes = new Map();
        this._uniforms = new Map();
        this._macros = [];
    }
    _createShaderFromText(gl, type, text) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, text);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0) {
            _core_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].warn(text);
            _core_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return undefined;
        }
        return shader;
    }
    _build(gl) {
        let program = this._program;
        this.apply(gl);
        let uCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        let tCount = 0;
        this._uniforms.clear();
        this._textures.clear();
        for (let i = 0; i < uCount; i++) {
            let data = gl.getActiveUniform(program, i);
            if (!data) {
                continue;
            }
            let loc = gl.getUniformLocation(program, data.name);
            if (data.type === gl.SAMPLER_2D || data.type === gl.SAMPLER_CUBE) {
                let texMap = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"]._getTextures();
                let type = texMap[data.name];
                if (type !== undefined) {
                    gl.uniform1i(loc, tCount);
                    this._textures.set(texMap[data.name], tCount++);
                }
                else {
                    let array = new Int32Array(data.size);
                    let name = Object(_util_Util__WEBPACK_IMPORTED_MODULE_8__["RepRemoveSquareBrackets"])(data.name);
                    for (let i = 0, l = data.size; i < l; i++) {
                        array[i] = tCount;
                        this._textures.set(`${name}_${i}`, tCount++);
                    }
                    gl.uniform1iv(loc, array);
                }
            }
            else {
                let uniMap = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"]._getUniforms();
                let type = uniMap[data.name];
                if (type !== undefined) {
                    this._uniforms.set(uniMap[data.name], {
                        location: loc,
                        type: data.type,
                        name: data.name,
                        size: data.size
                    });
                }
                else {
                    this._uniforms.set(Object(_util_Util__WEBPACK_IMPORTED_MODULE_8__["RepRemoveSquareBrackets"])(data.name), {
                        location: loc,
                        type: data.type,
                        name: data.name,
                        size: data.size
                    });
                }
            }
        }
        let aCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < aCount; i++) {
            let data = gl.getActiveAttrib(program, i);
            let loc = gl.getAttribLocation(program, data.name);
            gl.enableVertexAttribArray(loc);
            let attribMap = _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"]._getAttributes();
            this._attributes.set(attribMap[data.name], loc);
        }
    }
    _createProgram(gl, vs, fs) {
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            _core_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].error("Could not initialise shaders shader " + gl.getProgramInfoLog(program));
            return undefined;
        }
        this._program = program;
        this._build(gl);
        return program;
    }
    _createProgramFromText(gl, vsText, fsText) {
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
    generateFromText(gl, vertText, fragText) {
        let program = this._createProgramFromText(gl, vertText, fragText);
        if (!program) {
            return null;
        }
        this.updated();
        return this;
    }
    apply(gl) {
        if (glProgram._curr !== this) {
            gl.useProgram(this._program);
            glProgram._curr = this;
            glProgram.curUpdated = true;
        }
    }
    setUniformData(gl, type, location, data) {
        // TODO: 这一段写的是个毛线啊。
        switch (type) {
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["INT"]:
                gl.uniform1iv(location, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT"]:
                gl.uniform1f(location, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT_VEC2"]:
                gl.uniform2fv(location, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT_VEC3"]:
                gl.uniform3fv(location, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT_VEC4"]:
                gl.uniform4fv(location, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT_MAT3"]:
                gl.uniformMatrix3fv(location, false, data);
                break;
            case _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FLOAT_MAT4"]:
                gl.uniformMatrix4fv(location, false, data);
                break;
            default:
                break;
        }
    }
    applyUniforms(gl, mesh, camera) {
        let glprog = this;
        let uniforms = glprog.getUniforms();
        if (uniforms.size === 0) {
            return;
        }
        let material = mesh.getMaterial();
        let cameraPos = camera ? camera.getPosition() : _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"].Zero;
        let tempMatrix = _matrix;
        let worldMatrix = mesh.getMatrix();
        let vMat = glProgram.vMatrix;
        let pMat = glProgram.pMatrix;
        let vpMat = glProgram.vpMatrix;
        let MVMatrix = undefined;
        let getMVMatrix = function () {
            MVMatrix = MVMatrix || _mvmatrix.copy(vMat).applyMatrix4(worldMatrix);
            return MVMatrix;
        };
        let VPMatrix = undefined;
        let getVPMatrix = function () {
            VPMatrix = VPMatrix || _vpmatrix.copy(pMat).applyMatrix4(vMat);
            return VPMatrix;
        };
        let MVPMatrix = undefined;
        let getMVPMatrix = function () {
            MVPMatrix = MVPMatrix || _mvpmatrix.copy(vpMat).applyMatrix4(worldMatrix);
            return MVPMatrix;
        };
        let f32 = _f32;
        let f4 = _f4;
        uniforms.forEach((uniformObject, uniformType) => {
            let location = uniformObject.location;
            let type = uniformObject.type;
            let data; //matrix = glMesh._matrix;
            // TODO: 这一段写的都是点啥= =
            switch (uniformType) {
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].mMat:
                    data = worldMatrix;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].mITMat:
                    data = tempMatrix.copy(worldMatrix).invertTranspose();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].vMat:
                    data = vMat;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].vIMat:
                    data = tempMatrix.copy(vMat).invert();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].pMat:
                    data = pMat;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].pIMat:
                    data = tempMatrix.copy(pMat).invert();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].vpIMat:
                    data = tempMatrix.copy(vpMat).invert();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].vpMat:
                    data = getVPMatrix();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].mvpMat:
                    data = getMVPMatrix();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].mvMat:
                    data = getMVMatrix();
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].cameraPos:
                    data = cameraPos;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].lightColor:
                    data = glProgram.lightColor;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].lightDir:
                    data = glProgram.lightDir;
                    break;
                case _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_3__["ShaderConst"].cameraRange: {
                    if (camera.mode === _object_Camera__WEBPACK_IMPORTED_MODULE_7__["Camera"].Orthographic) {
                        f4.set([1.0, 1.0, 1.0, 1.0]);
                    }
                    else {
                        f4.set([camera.far, 1.0 / camera.far, camera.aspect, Math.tan(camera.fovy * 0.5)]);
                    }
                    glprog.setUniformData(gl, type, location, f4);
                    return;
                }
                default:
                    data = material.getProperty(uniformType);
                    break;
            }
            glprog.setUniformData(gl, type, location, data.data);
        });
    }
    getTextures() {
        return this._textures;
    }
    getTextureIndex(type) {
        return this._textures.get(type);
    }
    getAttribLocation(attribType) {
        return this._attributes.get(attribType);
    }
    getUniforms() {
        return this._uniforms;
    }
    set shaderKey(key) {
        this._shaderKey = key;
    }
    get shaderKey() {
        return this._shaderKey;
    }
    remove(idx) {
        let renderer = _Renderer__WEBPACK_IMPORTED_MODULE_9__["Renderer"].getRenderer(idx);
        renderer.removeShader(this);
    }
}
glProgram.curUpdated = false;
glProgram.vMatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
glProgram.pMatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
glProgram.vpMatrix = new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]();
glProgram.lightColor = new _math_Vector4__WEBPACK_IMPORTED_MODULE_5__["Vector4"]();
glProgram.lightDir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();


/***/ }),

/***/ "./src/renderer/glObject/glTexture.ts":
/*!********************************************!*\
  !*** ./src/renderer/glObject/glTexture.ts ***!
  \********************************************/
/*! exports provided: glTexture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glTexture", function() { return glTexture; });
/* harmony import */ var _glObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glObject */ "./src/renderer/glObject/glObject.ts");

class glTexture extends _glObject__WEBPACK_IMPORTED_MODULE_0__["glObject"] {
    constructor(gl) {
        super();
        this._minFilter = gl.LINEAR;
        this._magFilter = gl.LINEAR;
    }
    static clear() {
        for (let key in glTexture._texIdx) {
            glTexture._texIdx[key] = null;
        }
    }
    setFilter(min, mag) {
        this._minFilter = min;
        this._magFilter = mag;
    }
    getHandler() {
        return this._texture;
    }
    apply(gl, index) {
        if (glTexture._texIdx[index] !== this) {
            this._apply(gl, index);
            glTexture._texIdx[index] = this;
        }
    }
    _apply(gl, index) {
    }
}
/** 纹理索引的cache */
glTexture._texIdx = {};


/***/ }),

/***/ "./src/renderer/glObject/glTexture2D.ts":
/*!**********************************************!*\
  !*** ./src/renderer/glObject/glTexture2D.ts ***!
  \**********************************************/
/*! exports provided: glTexture2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glTexture2D", function() { return glTexture2D; });
/* harmony import */ var _glTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTexture */ "./src/renderer/glObject/glTexture.ts");

class glTexture2D extends _glTexture__WEBPACK_IMPORTED_MODULE_0__["glTexture"] {
    constructor(gl) {
        super(gl);
        this._wrapS = gl.CLAMP_TO_EDGE;
        this._wrapT = gl.CLAMP_TO_EDGE;
    }
    _applyParameter(gl, target, mipmap) {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this._magFilter);
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, this._wrapS);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, this._wrapT);
        if (gl.TEXTURE_MAX_ANISOTROPY) {
            gl.texParameteri(target, gl.TEXTURE_MAX_ANISOTROPY, 2.0);
        }
        if (mipmap) {
            gl.generateMipmap(target);
        }
    }
    _setTextureData(gl, target, texture) {
        let format = texture.getFormat();
        let internalformat = texture.getInternalformat();
        let type = texture.getDataType();
        if (texture.getUrl() && texture.getImage()) {
            let image = texture.getImage();
            gl.texImage2D(target, 0, internalformat, format, type, image);
            this._isUrl = true;
        }
        else if (texture.getWidth() !== 0 && texture.getHeight() !== 0) {
            let data = texture.getData();
            gl.texImage2D(target, 0, internalformat, texture.getWidth(), texture.getHeight(), 0, format, type, data);
        }
        else {
            return undefined;
        }
        return this;
    }
    _createTextureDatas(gl, texture2d) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, handler);
        if (this._setTextureData(gl, gl.TEXTURE_2D, texture2d) === undefined) {
            return undefined;
        }
        return handler;
    }
    _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_2D, mipmap);
    }
    _createGLTextureFromTexture(gl, texture) {
        let handler = this._createTextureDatas(gl, texture);
        if (!handler) {
            return;
        }
        this.setFilter(texture.getMinFilter(), texture.getMagFilter());
        this.setWarp(texture.getWrapS(), texture.getWrapT());
        this._applyParameters(gl, texture.getMipmap());
        return handler;
    }
    generateFromTexture2D(gl, texture) {
        let handler = this._createGLTextureFromTexture(gl, texture);
        if (!handler) {
            return;
        }
        this._texture = handler;
        this.updated();
        gl.bindTexture(gl.TEXTURE_2D, null);
        // this.setLocalVersion(texture.getUpdateVersion());
        return this;
    }
    _apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }
    setWarp(wrapS, wrapT) {
        this._wrapS = wrapS;
        this._wrapT = wrapT;
    }
    get isUrl() {
        return this._isUrl;
    }
}
glTexture2D.ImageTexMap = new WeakMap();


/***/ }),

/***/ "./src/renderer/glObject/glTextureCube.ts":
/*!************************************************!*\
  !*** ./src/renderer/glObject/glTextureCube.ts ***!
  \************************************************/
/*! exports provided: glTextureCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glTextureCube", function() { return glTextureCube; });
/* harmony import */ var _glTexture2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTexture2D */ "./src/renderer/glObject/glTexture2D.ts");

class glTextureCube extends _glTexture2D__WEBPACK_IMPORTED_MODULE_0__["glTexture2D"] {
    constructor(gl) {
        super(gl);
    }
    _createGLTextureFromTexture(gl, texCube) {
        this._wrapR = texCube.getWrapR();
        return super._createGLTextureFromTexture(gl, texCube);
    }
    _applyParameter(gl, target, mipmap) {
        // gl.texParameteri(target, gl.TEXTURE_WRAP_R, this._wrapS);
        super._applyParameter(gl, target, mipmap);
    }
    _createTextureDatas(gl, textureCube) {
        let handler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, handler);
        let textures = textureCube.getTexture2ds();
        for (let i = 0; i < textures.length; i++) {
            let texture2d = textures[i];
            if (!texture2d.loaded) {
                texture2d = texture2d._def;
            }
            if (texture2d && this._setTextureData(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, texture2d) === undefined) {
                return undefined;
            }
        }
        return handler;
    }
    _applyParameters(gl, mipmap) {
        this._applyParameter(gl, gl.TEXTURE_CUBE_MAP, mipmap);
    }
    generateFromTextureCube(gl, textureCube) {
        let handler = this._createGLTextureFromTexture(gl, textureCube);
        if (!handler) {
            return;
        }
        this._texture = handler;
        this.updated();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        return this;
    }
    _apply(gl, index) {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
    }
}


/***/ }),

/***/ "./src/renderer/pipeline/DeferredPipeline.ts":
/*!***************************************************!*\
  !*** ./src/renderer/pipeline/DeferredPipeline.ts ***!
  \***************************************************/
/*! exports provided: DeferredPipeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredPipeline", function() { return DeferredPipeline; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _material_DeferredShadingMaterial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../material/DeferredShadingMaterial */ "./src/material/DeferredShadingMaterial.ts");
/* harmony import */ var _graphics_FrameState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphics/FrameState */ "./src/graphics/FrameState.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/GeometryUtil */ "./src/util/GeometryUtil.ts");
/* harmony import */ var _glObject_glProgram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../glObject/glProgram */ "./src/renderer/glObject/glProgram.ts");








class DeferredPipeline {
    constructor(renderer) {
        this._renderer = renderer;
        this._init();
    }
    setSize(w, h) {
        this._gFrame.setSize(w, h);
        this._notClearDepthState.setViewports(0, 0, w, h);
    }
    _init() {
        let renderer = this._renderer;
        let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"];
        frame.setSize(renderer.getWidth(), renderer.getHeight());
        frame.addTexture(0 /* RT0 */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
        frame.addTexture(1 /* RT1 */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
        frame.addTexture(2 /* RT2 */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
        frame.enableDepthStencil();
        frame.getState().setClearColor(true, _math_Vector4__WEBPACK_IMPORTED_MODULE_5__["Vector4"].Zero);
        this._gFrame = frame;
        let mat = new _material_DeferredShadingMaterial__WEBPACK_IMPORTED_MODULE_3__["DeferredShadingMaterial"]();
        let tex = (frame.getTextureFromType(0 /* RT0 */).tex);
        mat.setDiffuseMap(tex);
        tex = (frame.getTextureFromType(1 /* RT1 */).tex);
        mat.setNormalMap(tex);
        tex = (frame.getTextureFromType(2 /* RT2 */).tex);
        mat.setDepthMap(tex);
        mat.enableStencil = true;
        mat.setStencilFunc(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["EQUAL"], 0x80, 0x80);
        mat.setStencilOp(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["KEEP"]);
        mat.enableDepth = false;
        this._deferMat = mat;
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
        let defGeo = new _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_6__["ScreenGeometry"]();
        mesh.setGeometry(defGeo);
        mesh.setMaterial(mat);
        this._deferMesh = mesh;
        mat = new _material_DeferredShadingMaterial__WEBPACK_IMPORTED_MODULE_3__["DeferredShadingMaterial"]();
        tex = (frame.getTextureFromType(0 /* RT0 */).tex);
        mat.setDiffuseMap(tex);
        tex = (frame.getTextureFromType(1 /* RT1 */).tex);
        mat.setNormalMap(tex);
        tex = (frame.getTextureFromType(2 /* RT2 */).tex);
        mat.setDepthMap(tex);
        mat.useForPointLight();
        mat.enableStencil = true;
        mat.setStencil(this._deferMat.stencil);
        mat.enableAlphaBlend();
        mat.setBlendFunc(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["ONE"]);
        mat.setBlendEquation(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FUNC_ADD"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["FUNC_ADD"]);
        mat.enableDepth = false;
        mat.setFlipFace(true);
        this._pointLightMat = mat;
        let geo = new _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_6__["SphereGeometry"](1, 32, 32);
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._pointLightMesh = mesh;
        let defFrameState = renderer.getDefFrameState();
        let state = new _graphics_FrameState__WEBPACK_IMPORTED_MODULE_4__["FrameState"]();
        state.setClearDepth(false);
        state.setClearColor(true, defFrameState.clearColor);
        state.setClearStencil(false, defFrameState.clearStencil);
        state.setViewportAt(defFrameState.viewport);
        this._notClearDepthState = state;
    }
    render(culling, camera, targetFrame) {
        let renderer = this._renderer;
        let gFrame = this._gFrame;
        let ps_x = 1.0 / renderer.getWidth();
        let ps_y = 1.0 / renderer.getHeight();
        renderer.useCamera(camera);
        renderer.useFrame(gFrame);
        renderer.directRenderOrderedList(culling.opacities, culling.opacitySize);
        renderer.directRenderOrderedList(culling.alphaTests, culling.alphaTestSize);
        let depthTex = targetFrame.getDepthStencilTexture();
        targetFrame.setDepthStencil(gFrame.getDepthStencilTexture());
        gFrame.setDepthStencil(depthTex);
        this._deferMat.setPixelSize(ps_x, ps_y);
        renderer.useCamera(camera);
        renderer.useFrame(targetFrame, this._notClearDepthState);
        renderer.directRenderMesh(this._deferMesh);
        let mesh = this._pointLightMesh;
        let mat = this._pointLightMat;
        mat.setPixelSize(ps_x, ps_y);
        let l = culling.pointLightSize;
        let lightsList = culling.pointLights;
        for (let i = 0; i < l; i++) {
            let pl = lightsList[i].obj;
            let r = pl.radius;
            mat.setLightPos(pl.getPosition());
            mesh.setScale(r, r, r);
            mesh.setPositionAt(pl.getPosition());
            _glObject_glProgram__WEBPACK_IMPORTED_MODULE_7__["glProgram"].lightColor.copy(pl.color);
            renderer.directRenderMesh(mesh);
        }
        renderer.directRenderOrderedList(culling.noDeferOpacities, culling.noDeferOpacitySize);
        renderer.directRenderOrderedList(culling.noDeferAlphaTests, culling.noDeferAlphaTestSize);
        renderer.directRenderOrderedList(culling.alphaBlends, culling.alphaBlendSize);
    }
    get gFrame() {
        return this._gFrame;
    }
}


/***/ }),

/***/ "./src/renderer/pipeline/PostEffectsPipeline.ts":
/*!******************************************************!*\
  !*** ./src/renderer/pipeline/PostEffectsPipeline.ts ***!
  \******************************************************/
/*! exports provided: PostEffectsPipeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostEffectsPipeline", function() { return PostEffectsPipeline; });
/* harmony import */ var _postEffect_FXAA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../postEffect/FXAA */ "./src/renderer/postEffect/FXAA.ts");
/* harmony import */ var _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../postEffect/PEBase */ "./src/renderer/postEffect/PEBase.ts");
/* harmony import */ var _postEffect_HDR__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../postEffect/HDR */ "./src/renderer/postEffect/HDR.ts");
/* harmony import */ var _postEffect_SSAO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../postEffect/SSAO */ "./src/renderer/postEffect/SSAO.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");






/**
 * 后处理管线
 */
class PostEffectsPipeline {
    constructor(renderer) {
        this._renderer = renderer;
        this._requestFrames = new Map();
    }
    /** 初始化 */
    init(geo) {
        this._defGeo = geo;
        this._postEffects = [];
        this._srcRequires = [];
        this._initFrame();
    }
    /** 初始化frame */
    _initFrame() {
        let renderer = this._renderer;
        let width = renderer.getWidth();
        let height = renderer.getHeight();
        let frames = [];
        for (let i = 0; i < 2; i++) {
            let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_4__["Frame"]();
            frame.setSize(width, height);
            frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(0, 0, 0, 0.0);
            frames.push(frame);
        }
        this._cacheFrames = frames;
        this._frameIndex = 0;
    }
    /**
     * 后处理管线渲染
     * @param srcFrame 原始帧，
     */
    render(srcFrame, isDefer = false) {
        if (!srcFrame) {
            return;
        }
        this._isDeferredRendering = isDefer;
        this._srcFrame = srcFrame;
        this._postEffects.forEach((pe, index) => {
            this._peNumber = index;
            pe.render();
            pe.render2Target && this.exchangeFrame();
        });
    }
    /**
     * 提供给
     * @param obj
     * @param frame
     */
    renderPass(obj, frame) {
        this._renderer.useFrame(frame);
        this._renderer.directRenderMesh(obj);
    }
    /**
     * 重置尺寸
     * @param w
     * @param h
     */
    resize(w, h) {
        this._postEffects.forEach(pe => {
            pe.resize(w, h);
        });
        this._cacheFrames.forEach(frame => {
            frame.setSize(w, h);
        });
    }
    /**
     * 更新后处理需要的数据源
     */
    _updateSrcReqs() {
        let pes = this._postEffects;
        let result = [];
        let peOrders = [];
        pes.forEach(pe => {
            peOrders.push[pe.order] = true;
            pe.srcRequires().forEach(v => {
                if (result.indexOf(v) < 0) {
                    result.push(v);
                }
            });
        });
        this._srcRequires = result;
        this._enabledPEOrders = peOrders;
    }
    /**
     * 通过后处理对象启用或替换一个后处理对象
     * @param pe
     */
    _enablePostEffect(pe) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === pe.order) {
                pes[i] = pe;
                return;
            }
        }
        pes.push(pe);
        pes.sort((a, b) => { return b.order - a.order; });
        this._updateSrcReqs();
    }
    /**
     * 通过后处理对象移除一个后处理对象
     * @param pe
     */
    _disablePostEffect(pe) {
        let idx = this._postEffects.indexOf(pe);
        if (idx > -1) {
            this._postEffects.splice(idx, 1);
            pe.destroy(this._renderer);
            this._updateSrcReqs();
        }
    }
    /**
     * 通过后处理类型生成后处理
     * @param type
     */
    _createPEFromType(type) {
        let pe;
        switch (type) {
            case _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEType"].FXAA:
                let fxaa = new _postEffect_FXAA__WEBPACK_IMPORTED_MODULE_0__["FXAA"](this);
                fxaa.init(this._defGeo);
                pe = fxaa;
                break;
            case _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEType"].HDR:
                let hdr = new _postEffect_HDR__WEBPACK_IMPORTED_MODULE_2__["HDR"](this);
                hdr.init(this._defGeo);
                pe = hdr;
                break;
            case _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEType"].SSAO:
                let ssao = new _postEffect_SSAO__WEBPACK_IMPORTED_MODULE_3__["SSAO"](this);
                ssao.init(this._defGeo);
                pe = ssao;
            default:
                break;
        }
        return pe;
    }
    /**
     * 关闭后处理
     * @param pe
     */
    disablePostEffect(pe) {
        if (pe instanceof _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEBase"]) {
            this._disablePostEffect(pe);
        }
        else {
            let pes = this._postEffects;
            let l = pes.length;
            for (let i = 0; i < l; i++) {
                if (pes[i].type === pe) {
                    this._disablePostEffect(pes[i]);
                    return;
                }
            }
        }
    }
    /**
     * 关闭某一个序列的后处理
     * @param order
     */
    disablePostEffectByOrder(order) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === order) {
                this._disablePostEffect(pes[i]);
                return;
            }
        }
    }
    /**
     * 启用后处理
     * @param pe
     */
    enablePostEffect(pe) {
        if (pe instanceof _postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEBase"]) {
            this._enablePostEffect(pe);
        }
        else {
            let peObj = this._createPEFromType(pe);
            if (peObj) {
                this._enablePostEffect(peObj);
            }
        }
    }
    /**
     * 获取当前启用的后处理类型组
     */
    getEnablingPostEffect() {
        let a = [];
        this._postEffects.forEach(p => {
            a.push(p.type);
        });
        return a;
    }
    /**
     * 交换帧缓冲
     */
    exchangeFrame() {
        this._frameIndex = (this._frameIndex + 1) % this._cacheFrames.length;
    }
    /**
     * 获取渲染目标帧缓冲
     */
    get targetFrame() {
        return this._cacheFrames[this._frameIndex];
    }
    /**
     * 获取颜色源帧缓冲
     */
    get currentFrame() {
        return this._cacheFrames[(this._frameIndex + 1) % this._cacheFrames.length];
    }
    /**
     * 获取生成ao的Frame
     */
    getAoFrame() {
        return this._requestFrames.get(_postEffect_PEBase__WEBPACK_IMPORTED_MODULE_1__["PEOrder"].AO);
    }
    setRequestFrame(type, frame) {
        if (frame) {
            this._requestFrames.set(type, frame);
        }
    }
    removeRequsetFrame(type, frame) {
        this._requestFrames.delete(type);
    }
    /**
     * 获取当前帧的原始帧数据
     */
    get srcFrame() {
        return this._srcFrame;
    }
    /**
     * 获取全部的支持申请组
     */
    getSrcReqs() {
        return this._srcRequires;
    }
    get width() {
        return this._renderer.getWidth();
    }
    get height() {
        return this._renderer.getHeight();
    }
    get deltaTime() {
        return this._renderer.deltaTime;
    }
    get defCamera() {
        return this._renderer.defCamera;
    }
    get isDeferredRendering() {
        return this._isDeferredRendering;
    }
    /**
     * 获取gBuffer
     */
    get gBufferFrame() {
        return this._renderer.getGBufferFrame();
    }
    get peNumber() {
        return this._peNumber;
    }
    // public get isFirst(): boolean {
    //     return this._peNumber === 0;
    // }
    // public get isLast(): boolean {
    //     return this._peNumber === (this._postEffects.length - 1);
    // }
    isEnablePEOrder(order) {
        return this._enabledPEOrders[order];
    }
    /**
     * 获取数量
     */
    get length() {
        return this._postEffects.length;
    }
}


/***/ }),

/***/ "./src/renderer/pipeline/ShadowMapPipeline.ts":
/*!****************************************************!*\
  !*** ./src/renderer/pipeline/ShadowMapPipeline.ts ***!
  \****************************************************/
/*! exports provided: ShadowMapPipeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShadowMapPipeline", function() { return ShadowMapPipeline; });
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _util_RenderCulling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/RenderCulling */ "./src/util/RenderCulling.ts");
/* harmony import */ var _light_Light__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../light/Light */ "./src/light/Light.ts");
/* harmony import */ var _math_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../math/Box */ "./src/math/Box.ts");
/* harmony import */ var _object_Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../object/Camera */ "./src/object/Camera.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _material_DepthMaterial__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../material/DepthMaterial */ "./src/material/DepthMaterial.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _material_LogBlurMaterial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../material/LogBlurMaterial */ "./src/material/LogBlurMaterial.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/GeometryUtil */ "./src/util/GeometryUtil.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../graphics/TextureCube */ "./src/graphics/TextureCube.ts");














class ShadowMapPipeline {
    constructor(renderer) {
        this._shadowMaps = new Map();
        /** 阴影图可渲染裁剪 */
        this._culling = new _util_RenderCulling__WEBPACK_IMPORTED_MODULE_1__["RenderCulling"]();
        this._renderer = renderer;
        this._material = new _material_DepthMaterial__WEBPACK_IMPORTED_MODULE_6__["DepthMaterial"];
        this._camera = new _object_Camera__WEBPACK_IMPORTED_MODULE_4__["Camera"]();
        let mat = new _material_LogBlurMaterial__WEBPACK_IMPORTED_MODULE_9__["LogBlurMaterial"]();
        this._blurMat = mat;
        this._pointMat = new _material_DepthMaterial__WEBPACK_IMPORTED_MODULE_6__["DepthMaterial"];
        this._pointMat.enablePointShadow();
        let geo = new _util_GeometryUtil__WEBPACK_IMPORTED_MODULE_11__["ScreenGeometry"]();
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_10__["Mesh"]();
        this._blurMesh = mesh;
        mesh.setMaterial(mat);
        mesh.setGeometry(geo);
        let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_5__["Frame"]();
        this._blurFrame = frame;
    }
    setSize(w, h) {
    }
    renderShadow(scene, light, sceneBox, srcCamera) {
        switch (light.type) {
            case _light_Light__WEBPACK_IMPORTED_MODULE_2__["LightType"].Direction:
                this._directionShadow(scene, light, sceneBox, srcCamera);
                break;
            case _light_Light__WEBPACK_IMPORTED_MODULE_2__["LightType"].Point:
                this._pointShadow(scene, light);
                break;
            case _light_Light__WEBPACK_IMPORTED_MODULE_2__["LightType"].Spot:
                this._spotShadow(scene, light);
                break;
            default:
                break;
        }
    }
    _getCachedMap(size) {
        let tex = this._shadowMaps.get(size);
        if (tex) {
            return tex;
        }
        tex = new _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_12__["Texture2D"]();
        tex.setSize(size, size);
        tex.setDataType(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["UNSIGNED_BYTE"]);
        tex.setFilter(_graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_0__["NEAREST"]);
        this._shadowMaps.set(size, tex);
        return tex;
    }
    _directionShadow(scene, light, sceneBox, srcCamera) {
        let culling = this._culling;
        let camera = this._camera;
        let material = this._material;
        // let dirLight = <DirectionLight>light;
        let shadow = light.shadow;
        let dir = light.dir;
        let frame = shadow.frame;
        let vmin = sceneBox.min;
        let vmax = sceneBox.max;
        let boxCenter = _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pool.create();
        let vec3 = _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pubTemp;
        boxCenter.copy(vmax).subAt(vmin).mul(0.5).addAt(vmin);
        let mat4 = _math_Matrix4__WEBPACK_IMPORTED_MODULE_8__["Matrix4"].pubTemp;
        vec3.copy(boxCenter).addAt(dir);
        mat4.lookAt(boxCenter, dir, _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].ZUp);
        let box = _math_Box__WEBPACK_IMPORTED_MODULE_3__["Box"].pubTemp;
        box.reset();
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    vec3.set(i ? vmin.x : vmax.x, j ? vmin.y : vmax.y, k ? vmin.z : vmax.z);
                    vec3.applyMatrix4(mat4);
                    box.expandAtPoint(vec3);
                }
            }
        }
        let min = box.min;
        let max = box.max;
        // let x = max.x - min.x;
        // let y = max.y - min.y;
        // let z = max.z + 1;
        let range = shadow.range; //Math.ceil((x > y ? x : y) / 2);
        // shadow.range =range
        let far = shadow.far; //max.z - min.z + 1;
        let near = 0;
        // vec3.copy(boxCenter).add(dir.x * z, dir.y * z, dir.z * z);
        // camera.setPositionAt(vec3);
        // camera.lookAt(boxCenter);
        // camera.enableOrthographicMode(-range, range, -range, range, near, far);
        // camera.resize(range * 2, range * 2);
        camera.setPositionAt(light.getPosition());
        camera.lookAt(vec3.copy(light.getPosition()).subAt(dir));
        camera.setUp(_math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].ZUp);
        camera.enableOrthographicMode(-range, range, -range, range, near, far);
        camera.update(0);
        shadow.matrix.copy(camera.getViewProjectionMatrix());
        culling.culling(scene, camera.getViewProjectionMatrix(), false, true);
        // frame.setSize(shadow.size, shadow.size);
        // frame.setTexture2D(RTLocation.COLOR, shadow.depthTex);
        // frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
        let renderer = this._renderer;
        renderer.useCamera(camera);
        renderer.useFrame(frame);
        renderer.directRenderOrderedList(culling.opacities, culling.opacitySize, material);
        _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pool.recovery(boxCenter);
        let blurMat = this._blurMat;
        blurMat.setPixelSize(1.0 / shadow.size, 1.0 / shadow.size);
        for (let i = 0; i < 1; i++) {
            blurMat.setSrcTexture(shadow.depthTex);
            blurMat.setPiexlDir(1.0, 0.0);
            frame = this._blurFrame;
            frame.setTexture2D(0 /* COLOR */, this._getCachedMap(shadow.size));
            frame.setSize(shadow.size, shadow.size);
            renderer.useFrame(frame);
            this._renderer.directRenderMesh(this._blurMesh);
            blurMat.setSrcTexture((frame.getTextureFromType(0 /* COLOR */).tex));
            blurMat.setPiexlDir(0.0, 1.0);
            frame.setTexture2D(0 /* COLOR */, shadow.depthTex);
            renderer.useFrame(frame);
            renderer.directRenderMesh(this._blurMesh);
        }
    }
    _spotShadow(scene, light) {
        let culling = this._culling;
        let camera = this._camera;
        let material = this._material;
        let shadow = light.shadow;
        let dir = light.dir;
        let frame = shadow.frame;
        let boxCenter = _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pool.create();
        let vec3 = _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pubTemp;
        let mat4 = _math_Matrix4__WEBPACK_IMPORTED_MODULE_8__["Matrix4"].pubTemp;
        vec3.copy(boxCenter).addAt(dir);
        mat4.lookAt(boxCenter, dir, _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].ZUp);
        let far = light.radius;
        let near = light.radius / 2000.0;
        camera.setPositionAt(light.getPosition());
        camera.lookAt(vec3.copy(light.getPosition()).subAt(dir));
        camera.setUp(_math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].ZUp);
        camera.enablePerspectiveMode(light.angle * 2, 1.0, near, far);
        camera.update(0);
        shadow.near = near;
        shadow.far = far;
        shadow.matrix.copy(camera.getViewProjectionMatrix());
        culling.culling(scene, camera.getViewProjectionMatrix(), false, true);
        // frame.setSize(shadow.size, shadow.size);
        // frame.setTexture2D(RTLocation.COLOR, shadow.depthTex);
        let renderer = this._renderer;
        renderer.useCamera(camera);
        renderer.useFrame(frame);
        renderer.directRenderOrderedList(culling.opacities, culling.opacitySize, material);
        _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pool.recovery(boxCenter);
        // let blurMat = this._blurMat;
        // blurMat.setPixelSize(1.0 / shadow.size, 1.0 / shadow.size);
        // TODO: blur这里需要修正。
        // for (let i = 0; i < 1; i++) {
        //     blurMat.setSrcTexture(shadow.depthTex);
        //     blurMat.setPiexlDir(1.0, 0.0);
        //     frame = this._blurFrame;
        //     frame.setSize(shadow.size, shadow.size);
        //     frame.setTexture2D(RTLocation.COLOR, this._getCachedMap(shadow.size));
        //     renderer.useFrame(frame);
        //     this._renderer.directRenderMesh(this._blurMesh);
        //     blurMat.setSrcTexture(<Texture2D>(frame.getTextureFromType(RTLocation.COLOR).tex));
        //     blurMat.setPiexlDir(0.0, 1.0);
        //     frame.setTexture2D(RTLocation.COLOR, shadow.depthTex);
        //     renderer.useFrame(frame);
        //     renderer.directRenderMesh(this._blurMesh);
        // }
    }
    _pointShadow(scene, light) {
        let culling = this._culling;
        let camera = this._camera;
        let material = this._pointMat;
        let cubeVectors = _graphics_TextureCube__WEBPACK_IMPORTED_MODULE_13__["CubeVectors"];
        let shadow = light.shadow;
        let frames = shadow.frames;
        let vec = _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"].pubTemp;
        let pos = light.pos;
        let far = light.radius;
        let near = light.radius / 2000.0;
        let renderer = this._renderer;
        shadow.far = far;
        camera.enablePerspectiveMode(Math.PI * 0.5, 1.0, near, far);
        for (let i = 0; i < 6; i++) {
            let frame = frames[i];
            let vecs = cubeVectors[i];
            vec.copy(pos).addAt(vecs.target);
            camera.setPositionAt(pos);
            camera.lookAt(vec);
            camera.setUp(vecs.up);
            camera.update(0);
            culling.culling(scene, camera.getViewProjectionMatrix(), false, true);
            renderer.useCamera(camera);
            renderer.useFrame(frame);
            renderer.directRenderOrderedList(culling.opacities, culling.opacitySize, material);
        }
    }
}


/***/ }),

/***/ "./src/renderer/postEffect/FXAA.ts":
/*!*****************************************!*\
  !*** ./src/renderer/postEffect/FXAA.ts ***!
  \*****************************************/
/*! exports provided: FXAA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FXAA", function() { return FXAA; });
/* harmony import */ var _PEBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PEBase */ "./src/renderer/postEffect/PEBase.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _material_FXAAMaterial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../material/FXAAMaterial */ "./src/material/FXAAMaterial.ts");



class FXAA extends _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEBase"] {
    constructor(pipe) {
        super(pipe);
    }
    init(geometry) {
        let material = new _material_FXAAMaterial__WEBPACK_IMPORTED_MODULE_2__["FXAAMaterial"](null);
        this._material = material;
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_1__["Mesh"]();
        mesh.setGeometry(geometry);
        mesh.setMaterial(material);
        this._mesh = mesh;
        this._isInit = true;
    }
    resize(w, h) {
        this._material.setPixelSize(1.0 / w, 1.0 / h);
    }
    render() {
        const pipe = this._pipe;
        let colorFrame = pipe.peNumber === 0 ? pipe.srcFrame : pipe.currentFrame;
        let targetFrame = pipe.targetFrame;
        let tex2D = (colorFrame.getTextureFromType(0 /* COLOR */).tex);
        this._material.setSrcTexture(tex2D);
        pipe.renderPass(this._mesh, targetFrame);
    }
    srcRequires() {
        return FXAA.SrcReqs;
    }
    destroy(renderer) {
        const pipe = this._pipe;
        renderer.releaseMesh(this._mesh);
        this._pipe = null;
        this._mesh = null;
        this._material = null;
    }
    get render2Target() {
        return true;
    }
    get type() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEType"].FXAA;
    }
    get order() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].AA;
    }
}
FXAA.SrcReqs = [
    _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEReqType"].COLOR
];


/***/ }),

/***/ "./src/renderer/postEffect/HDR.ts":
/*!****************************************!*\
  !*** ./src/renderer/postEffect/HDR.ts ***!
  \****************************************/
/*! exports provided: HDR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HDR", function() { return HDR; });
/* harmony import */ var _PEBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PEBase */ "./src/renderer/postEffect/PEBase.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../graphics/Texture2D */ "./src/graphics/Texture2D.ts");
/* harmony import */ var _material_DownSample4Material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../material/DownSample4Material */ "./src/material/DownSample4Material.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _material_GaussianBlurMaterial__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../material/GaussianBlurMaterial */ "./src/material/GaussianBlurMaterial.ts");
/* harmony import */ var _material_DownSampleTo1Material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../material/DownSampleTo1Material */ "./src/material/DownSampleTo1Material.ts");
/* harmony import */ var _material_BloomMaterial__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../material/BloomMaterial */ "./src/material/BloomMaterial.ts");
/* harmony import */ var _material_ToneMappingMaterial__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../material/ToneMappingMaterial */ "./src/material/ToneMappingMaterial.ts");
/* harmony import */ var _material_LumSampleMaterial__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../material/LumSampleMaterial */ "./src/material/LumSampleMaterial.ts");











/**
 *
 */
class HDR extends _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEBase"] {
    constructor(pipe) {
        super(pipe);
        /** 自适应时间，单位毫秒 */
        this._adaptationTime = 1000;
        /** 手动亮度调节参数 */
        this._lumFact = 0.35;
        this._downTo1Idx = 0;
        this._bloomNum = 4;
    }
    init(geo) {
        const pipe = this._pipe;
        // const renderer = pipe.renderer;
        let w = pipe.width;
        let h = pipe.height;
        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);
        let frame;
        this._down4Frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._down4Frame;
        frame.setSize(w_4, h_4);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._down4Frame2 = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._down4Frame2;
        frame.setSize(w_4, h_4);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);
        this._down16Frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._down16Frame;
        frame.setSize(w_16, h_16);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo32Frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._downTo32Frame;
        frame.setSize(32, 32);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo32Frame2 = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._downTo32Frame2;
        frame.setSize(32, 32);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo8Frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._downTo8Frame;
        frame.setSize(8, 8);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["LINEAR"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo2Frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame = this._downTo2Frame;
        frame.setSize(2, 2);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        this._downTo1Frame = [];
        frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame.setSize(1, 1);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo1Frame.push(frame);
        frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame.setSize(1, 1);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["RGB"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["FLOAT"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_5__["NEAREST"]);
        frame.getState().clearColor.set(0, 0, 0, 0);
        frame.getState().needClear = false;
        this._downTo1Frame.push(frame);
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let mat = new _material_DownSample4Material__WEBPACK_IMPORTED_MODULE_3__["DownSample4Material"]();
        this._down4Mat = mat;
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._downSampleMesh = mesh;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let blurMat = new _material_GaussianBlurMaterial__WEBPACK_IMPORTED_MODULE_6__["GaussianBlurMaterial"]();
        this._blurMat = blurMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(blurMat);
        this._blurMesh = mesh;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let downTo1 = new _material_DownSampleTo1Material__WEBPACK_IMPORTED_MODULE_7__["DownSampleTo1Material"]();
        this._downTo1Mat = downTo1;
        mesh.setGeometry(geo);
        mesh.setMaterial(downTo1);
        this._downTo1Mesh = mesh;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let bloomMat = new _material_BloomMaterial__WEBPACK_IMPORTED_MODULE_8__["BloomMaterial"]();
        this._bloomMat = bloomMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(bloomMat);
        this._bloomMesh = mesh;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let toneMat = new _material_ToneMappingMaterial__WEBPACK_IMPORTED_MODULE_9__["ToneMappingMaterial"]();
        this._toneMat = toneMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(toneMat);
        this._toneMesh = mesh;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_4__["Mesh"]();
        let lumMat = new _material_LumSampleMaterial__WEBPACK_IMPORTED_MODULE_10__["LumSampleMaterial"]();
        this._lumMat = lumMat;
        mesh.setGeometry(geo);
        mesh.setMaterial(lumMat);
        this._logMesh = mesh;
        this._isInit = true;
    }
    resize(w, h) {
        let w_4 = Math.floor(w * 0.25);
        let h_4 = Math.floor(h * 0.25);
        this._down4Frame.setSize(w_4, h_4);
        this._down4Frame2.setSize(w_4, h_4);
        let w_16 = Math.floor(w_4 * 0.25);
        let h_16 = Math.floor(h_4 * 0.25);
        this._down16Frame.setSize(w_16, h_16);
    }
    render() {
        const pipe = this._pipe;
        const deltaTime = pipe.deltaTime;
        let w = pipe.width;
        let h = pipe.height;
        let p_x = 1.0 / w;
        let p_y = 1.0 / h;
        let colorFrame = pipe.srcFrame;
        let targetFrame = pipe.targetFrame;
        const sampleMesh = this._downSampleMesh;
        const downTo1Mesh = this._downTo1Mesh;
        const blurMesh = this._blurMesh;
        const bloomMesh = this._bloomMesh;
        const toneMesh = this._toneMesh;
        const logMesh = this._logMesh;
        const down4Mat = this._down4Mat;
        const downTo1Mat = this._downTo1Mat;
        const blurMat = this._blurMat;
        const bloomMat = this._bloomMat;
        const toneMat = this._toneMat;
        const lumMat = this._lumMat;
        const down4Frame = this._down4Frame;
        const down4Frame2 = this._down4Frame2;
        const down16Frame = this._down16Frame;
        const downTo32Frame = this._downTo32Frame;
        const downTo32Frame2 = this._downTo32Frame2;
        const downTo8Frame = this._downTo8Frame;
        const downTo2Frame = this._downTo2Frame;
        const downTo1Src = this.src1Frame;
        const downTo1Dst = this.dst1Frame;
        // 长宽分别降至四分之一
        let tex2D = (colorFrame.getTextureFromType(0 /* COLOR */).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(p_x, p_y);
        pipe.renderPass(sampleMesh, down4Frame);
        let w_4 = 1.0 / down4Frame.getWidth();
        let h_4 = 1.0 / down4Frame.getHeight();
        // 长宽分别降至十六分之一
        tex2D = (down4Frame.getTextureFromType(0 /* COLOR */).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(w_4, h_4);
        pipe.renderPass(sampleMesh, down16Frame);
        // 降至32x32
        tex2D = (down16Frame.getTextureFromType(0 /* COLOR */).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / down16Frame.getWidth(), 1.0 / down16Frame.getHeight());
        pipe.renderPass(sampleMesh, downTo32Frame);
        // 32x32转为亮度图
        tex2D = (downTo32Frame.getTextureFromType(0 /* COLOR */).tex);
        lumMat.setSrcTexture(tex2D);
        pipe.renderPass(logMesh, downTo32Frame2);
        // 降至8x8
        tex2D = (downTo32Frame2.getTextureFromType(0 /* COLOR */).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / 32.0, 1.0 / 32.0);
        pipe.renderPass(sampleMesh, downTo8Frame);
        // 降到2x2
        tex2D = (downTo8Frame.getTextureFromType(0 /* COLOR */).tex);
        down4Mat.setSrcTexture(tex2D);
        down4Mat.setPixelSize(1.0 / 8.0, 1.0 / 8.0);
        pipe.renderPass(sampleMesh, downTo2Frame);
        // 降至 到1x1 对Linear的贴图，采4个像素的中心, 参数中包括前一个1px;
        tex2D = (downTo2Frame.getTextureFromType(0 /* COLOR */).tex);
        downTo1Mat.setSrcTexture(tex2D);
        tex2D = (downTo1Src.getTextureFromType(0 /* COLOR */).tex);
        downTo1Mat.setLumTexture(tex2D);
        downTo1Mat.setPixelSize(1.0 / 4.0, 1.0 / 4.0);
        downTo1Mat.setLumPCT(Math.min(deltaTime / this._adaptationTime, 1.0));
        pipe.renderPass(downTo1Mesh, downTo1Dst);
        // bloom
        tex2D = (down4Frame.getTextureFromType(0 /* COLOR */).tex);
        bloomMat.setSrcTexture(tex2D);
        tex2D = (downTo1Dst.getTextureFromType(0 /* COLOR */).tex);
        bloomMat.setLumTexture(tex2D);
        bloomMat.setLumPCT(this._lumFact);
        pipe.renderPass(bloomMesh, down4Frame2);
        // 高斯模糊像素尺寸
        blurMat.setPixelSize(w_4, h_4);
        for (let i = 0; i < this._bloomNum; i++) {
            // 横向高斯模糊
            tex2D = (down4Frame2.getTextureFromType(0 /* COLOR */).tex);
            blurMat.setSrcTexture(tex2D);
            blurMat.setPiexlDir(1.0, 0.0);
            pipe.renderPass(blurMesh, down4Frame);
            // 纵向高斯模糊
            tex2D = (down4Frame.getTextureFromType(0 /* COLOR */).tex);
            blurMat.setSrcTexture(tex2D);
            blurMat.setPiexlDir(0.0, 1.0);
            pipe.renderPass(blurMesh, down4Frame2);
        }
        // tong mapping
        tex2D = (down4Frame2.getTextureFromType(0 /* COLOR */).tex);
        toneMat.setBloomTexture(tex2D);
        tex2D = (colorFrame.getTextureFromType(0 /* COLOR */).tex);
        toneMat.setSrcTexture(tex2D);
        tex2D = (downTo1Dst.getTextureFromType(0 /* COLOR */).tex);
        toneMat.setLumTexture(tex2D);
        let aoFrame = pipe.getAoFrame();
        if (aoFrame) {
            tex2D = (aoFrame.getTextureFromType(0 /* COLOR */).tex);
        }
        else {
            tex2D = _graphics_Texture2D__WEBPACK_IMPORTED_MODULE_2__["Texture2D"].White;
        }
        toneMat.setAoTexture(tex2D);
        toneMat.setPixelSize(w_4, h_4);
        toneMat.setLumPCT(this._lumFact);
        pipe.renderPass(toneMesh, targetFrame);
        this.exchange1Frame();
    }
    exchange1Frame() {
        this._downTo1Idx = (this._downTo1Idx + 1) % this._downTo1Frame.length;
    }
    get dst1Frame() {
        return this._downTo1Frame[this._downTo1Idx];
    }
    get src1Frame() {
        return this._downTo1Frame[(this._downTo1Idx + 1) % this._downTo1Frame.length];
    }
    destroy(renderer) {
        const pipe = this._pipe;
        renderer.releaseMesh(this._downSampleMesh);
        renderer.releaseMesh(this._downTo1Mesh);
        renderer.releaseMesh(this._blurMesh);
        renderer.releaseMesh(this._bloomMesh);
        renderer.releaseMesh(this._toneMesh);
        renderer.releaseMesh(this._logMesh);
        this._pipe = null;
        this._downSampleMesh = null;
        this._downTo1Mesh = null;
        this._blurMat = null;
        this._bloomMesh = null;
        this._toneMesh = null;
    }
    srcRequires() {
        return HDR.SrcReqs;
    }
    setBloomNum(n) {
        n = n > 0 ? n : 1;
        this._bloomNum = n;
    }
    get render2Target() {
        return true;
    }
    get type() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEType"].HDR;
    }
    get order() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].HDR;
    }
}
HDR.SrcReqs = [
    _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEReqType"].FLOAT_COLOR,
    _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEReqType"].COLOR
];


/***/ }),

/***/ "./src/renderer/postEffect/PEBase.ts":
/*!*******************************************!*\
  !*** ./src/renderer/postEffect/PEBase.ts ***!
  \*******************************************/
/*! exports provided: PEType, PEOrder, PEReqType, PEBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEType", function() { return PEType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEOrder", function() { return PEOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEReqType", function() { return PEReqType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEBase", function() { return PEBase; });
var PEType;
(function (PEType) {
    PEType[PEType["None"] = 0] = "None";
    PEType[PEType["FXAA"] = 1] = "FXAA";
    PEType[PEType["SSAO"] = 2] = "SSAO";
    PEType[PEType["HDR"] = 3] = "HDR";
})(PEType || (PEType = {}));
var PEOrder;
(function (PEOrder) {
    PEOrder[PEOrder["None"] = 0] = "None";
    PEOrder[PEOrder["AA"] = 1] = "AA";
    PEOrder[PEOrder["HDR"] = 2] = "HDR";
    PEOrder[PEOrder["AO"] = 3] = "AO";
})(PEOrder || (PEOrder = {}));
var PEReqType;
(function (PEReqType) {
    PEReqType[PEReqType["FLOAT_COLOR"] = 0] = "FLOAT_COLOR";
    PEReqType[PEReqType["LAST_COLOR"] = 1] = "LAST_COLOR";
    PEReqType[PEReqType["LAST_DEPTH"] = 2] = "LAST_DEPTH";
    PEReqType[PEReqType["LAST_NORMAL"] = 3] = "LAST_NORMAL";
    PEReqType[PEReqType["COLOR"] = 4] = "COLOR";
    PEReqType[PEReqType["NORMAL"] = 5] = "NORMAL";
    PEReqType[PEReqType["DEPTH"] = 6] = "DEPTH";
})(PEReqType || (PEReqType = {}));
class PEBase {
    constructor(pipe) {
        this._enable = false;
        this._isInit = false;
        this._pipe = pipe;
    }
    render() {
    }
    enable() {
        this._enable = true;
    }
    disable() {
    }
    resize(width, height) {
    }
    /** 需求的源贴图类型 */
    srcRequires() {
        return [];
    }
    /** 需求的过程贴图类型 */
    pipeRequires() {
        return [];
    }
    destroy(renderer) {
    }
    /**
     * 是否需要上一个后处理的结果
     */
    get render2Target() {
        return false;
    }
    get type() {
        return PEType.None;
    }
    get order() {
        return PEOrder.None;
    }
    get isInit() {
        return this._isInit;
    }
}


/***/ }),

/***/ "./src/renderer/postEffect/SSAO.ts":
/*!*****************************************!*\
  !*** ./src/renderer/postEffect/SSAO.ts ***!
  \*****************************************/
/*! exports provided: SSAO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSAO", function() { return SSAO; });
/* harmony import */ var _PEBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PEBase */ "./src/renderer/postEffect/PEBase.ts");
/* harmony import */ var _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../graphics/Frame */ "./src/graphics/Frame.ts");
/* harmony import */ var _object_Mesh__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../object/Mesh */ "./src/object/Mesh.ts");
/* harmony import */ var _material_SSAOMaterial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../material/SSAOMaterial */ "./src/material/SSAOMaterial.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _math_Vector4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../math/Vector4 */ "./src/math/Vector4.ts");
/* harmony import */ var _material_BlendAOMaterial__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../material/BlendAOMaterial */ "./src/material/BlendAOMaterial.ts");







/**
 * SSAO后处理。
 * TODO：线性深度的问题，采样随机扰动。
 */
class SSAO extends _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEBase"] {
    constructor(pipe) {
        super(pipe);
        this._render2Target = false;
    }
    init(geometry) {
        let material = new _material_SSAOMaterial__WEBPACK_IMPORTED_MODULE_3__["SSAOMaterial"]();
        this._mat = material;
        let mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
        mesh.setGeometry(geometry);
        mesh.setMaterial(material);
        this._mesh = mesh;
        let blendMat = new _material_BlendAOMaterial__WEBPACK_IMPORTED_MODULE_6__["BlendAOMaterial"];
        this._blendMat = blendMat;
        mesh = new _object_Mesh__WEBPACK_IMPORTED_MODULE_2__["Mesh"]();
        mesh.setGeometry(geometry);
        mesh.setMaterial(blendMat);
        this._blendMesh = mesh;
        let pipe = this._pipe;
        let w = Math.floor(pipe.width);
        let h = Math.floor(pipe.height);
        let frame = new _graphics_Frame__WEBPACK_IMPORTED_MODULE_1__["Frame"]();
        frame.setSize(w, h);
        frame.addTexture(0 /* COLOR */, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["RGBA"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["UNSIGNED_BYTE"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["LINEAR"], _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_4__["LINEAR"]);
        frame.setClearColor(_math_Vector4__WEBPACK_IMPORTED_MODULE_5__["Vector4"].One);
        this._frame = frame;
        pipe.setRequestFrame(_PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].AO, this._frame);
        this._isInit = true;
    }
    setSampleNum(num) {
        this._mat.createSampleData(num);
    }
    resize(w, h) {
        this._mat.setPixelSize(w / 4, h / 4);
        this._frame.setSize(w, h);
    }
    render() {
        const pipe = this._pipe;
        const ssaoMat = this._mat;
        let camera = pipe.defCamera;
        let colorFrame = pipe.srcFrame;
        let aoFrame = this._frame;
        let w = colorFrame.getWidth();
        let h = colorFrame.getHeight();
        let p_x = 1.0 / w;
        let p_y = 1.0 / h;
        let aspect = camera.aspect;
        let tan_2Fov = Math.tan(camera.fovy / 2);
        let n = camera.near;
        let f = camera.far;
        // if (pipe.isDeferredRendering) {
        //     let gFrame = pipe.gBufferFrame;
        //     let normal = <Texture2D>(gFrame.getTextureFromType(RTLocation.RT1).tex);
        //     ssaoMat.setNormalTexture(normal);
        //     ssaoMat.setDepthTexture(<Texture2D>gFrame.getTextureFromType(RTLocation.RT2).tex);
        // } else {
        // }
        ssaoMat.setNormalTexture(null);
        ssaoMat.setDepthTexture((colorFrame.getDepthStencilTexture()));
        ssaoMat.setDiffuseTexture((colorFrame.getTextureFromType(0 /* COLOR */).tex));
        ssaoMat.setPixelSize(p_x, p_y);
        ssaoMat.setAsptRtoTanHfFov(aspect, tan_2Fov, (-n - f) / (n - f), (2 * f * n) / (n - f));
        pipe.renderPass(this._mesh, aoFrame);
        if (pipe.isEnablePEOrder(_PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].HDR)) {
            this._render2Target = false;
        }
        else {
            this._render2Target = true;
            this._blendMat.setSrcTexture((aoFrame.getTextureFromType(0 /* COLOR */).tex));
            this._blendMat.setDstTexture((colorFrame.getTextureFromType(0 /* COLOR */).tex));
            pipe.renderPass(this._blendMesh, pipe.targetFrame);
        }
    }
    srcRequires() {
        return SSAO.SrcReqs;
    }
    /**
     * 是否需要上一个后处理的结果
     */
    get render2Target() {
        return this._render2Target;
    }
    destroy(renderer) {
        this._pipe.removeRequsetFrame(_PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].AO, this._frame);
        renderer.releaseMesh(this._mesh);
        this._pipe = null;
        this._mesh = null;
        this._mat = null;
    }
    get type() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEType"].SSAO;
    }
    get order() {
        return _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEOrder"].AO;
    }
}
SSAO.SrcReqs = [
    _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEReqType"].DEPTH,
    _PEBase__WEBPACK_IMPORTED_MODULE_0__["PEReqType"].COLOR
];


/***/ }),

/***/ "./src/renderer/shaders/ShaderCaches.ts":
/*!**********************************************!*\
  !*** ./src/renderer/shaders/ShaderCaches.ts ***!
  \**********************************************/
/*! exports provided: ShaderCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderCaches", function() { return ShaderCaches; });
/* harmony import */ var _glObject_glProgram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glObject/glProgram */ "./src/renderer/glObject/glProgram.ts");
/* harmony import */ var _shaderLibs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaderLibs */ "./src/renderer/shaders/shaderLibs.ts");


class ShaderCaches {
    constructor(renderer) {
        this._caches = new Map;
        this._renderer = renderer;
    }
    genShaderProgram(mat, enableDefer, macros) {
        let renderer = this._renderer;
        let shader = mat.shader;
        let glprog = shader.getRenderObjectRef(renderer);
        let useDefer = mat.supportDeferred && enableDefer;
        let matNewKey = this.genMatKey(mat, useDefer, macros);
        let matCurKey = glprog ? glprog.shaderKey : '-1';
        if (matCurKey === matNewKey) {
            return glprog;
        }
        let caches = this._caches;
        if (glprog) {
            this.removeKey(matCurKey);
        }
        let ref = caches.get(matNewKey);
        if (ref) {
            glprog = ref.program;
            shader.setRenderObjectRef(renderer, glprog);
            ref.count++;
            return glprog;
        }
        glprog = new _glObject_glProgram__WEBPACK_IMPORTED_MODULE_0__["glProgram"]();
        glprog.shaderKey = matNewKey;
        let type = mat.type;
        let data = _shaderLibs__WEBPACK_IMPORTED_MODULE_1__["shaders"][type];
        let gl = renderer.getContext();
        if (useDefer && data.defer_src) {
            data = data.defer_src;
        }
        let newMacros = mat.getMacros();
        let vertText = this.genStr(data.vert, newMacros, macros);
        let fragText = this.genStr(data.frag, newMacros, macros);
        glprog = glprog.generateFromText(gl, vertText, fragText);
        if (glprog) {
            caches.set(matNewKey, { program: glprog, count: 1 });
            shader.setRenderObjectRef(renderer, glprog);
            return glprog;
        }
        return null;
    }
    releaseMaterial(mat) {
        let shader = mat.shader;
        let glprog = shader.getRenderObjectRef(this._renderer);
        if (!glprog) {
            return;
        }
        let key = glprog.shaderKey;
        this.removeKey(key);
    }
    removeShader(glprog) {
        if (!glprog) {
            return;
        }
        let key = glprog.shaderKey;
        this.removeKey(key);
    }
    removeKey(key) {
        let caches = this._caches;
        let ref = caches.get(key);
        if (ref) {
            ref.count--;
            if (ref.count === 0) {
                caches.delete(key);
                return true;
            }
        }
        return false;
    }
    genStr(text, matMacros, macros) {
        let src = text;
        if (matMacros) {
            let macroStr = '';
            for (let key in matMacros) {
                let value = matMacros[key];
                macroStr += value !== undefined ? `#define ${key} ${value}\n` : `#define ${key}\n`;
            }
            src = macroStr + src;
        }
        if (macros) {
            let macroStr = '';
            macros.forEach(macro => {
                macroStr += `#define ${macro}\n`;
            });
            src = macroStr + src;
        }
        src = '#version 100\n' + src;
        return src;
    }
    genMatKey(mat, enableDefer, macros) {
        let result = mat.key;
        if (enableDefer) {
            result += '_def';
        }
        if (macros && macros.length > 0) {
            macros.forEach(str => {
                result += `_${str}`;
            });
        }
        return result;
    }
}


/***/ }),

/***/ "./src/renderer/shaders/libs/blend_frag_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/blend_frag_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_aoMap;

void main()
{
    vec4 color = texture2D(u_diffuseMap, v_uv);

    vec4 ao = texture2D(u_aoMap, v_uv);

    vec4 result = color * ao.a + ao * (1.0 - ao.a);

    result.a = 1.0;

    gl_FragColor = result;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/bloom_frag_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/bloom_frag_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_lumPCT;

#include <ACESToneMapping>

void main()
{
    vec3 lum_fact = vec3(0.27, 0.67, 0.06);
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;

    float ave_lum = texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    
    vec3 ecolor = ACESToneMapping(color, ave_lum, u_lumPCT.x);

    float t = dot(ecolor, vec3(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0));

    gl_FragColor = t > 0.9 ? vec4(color, 1.0) : vec4(0.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/cartoon_frag_glsl.ts":
/*!********************************************************!*\
  !*** ./src/renderer/shaders/libs/cartoon_frag_glsl.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform sampler2D u_baseColorMap;
uniform sampler2D u_specularMap;
uniform sampler2D u_emissiveMap;
uniform sampler2D u_cartoonLUTMap;

uniform vec3 u_cameraPos;
uniform vec4 u_merged;
uniform vec3 u_lightDir;
uniform vec4 u_lightColor;

void main()
{
    vec3 lightDir = u_lightDir;

    vec3 lightIntensity = u_lightColor.xyz;

    vec4 specular = texture2D(u_specularMap, v_uv);
    vec4 emissive = texture2D(u_emissiveMap, v_uv);
    vec4 baseColor = texture2D(u_baseColorMap, v_uv);

    float aoScale = u_merged[1];
    float glossiness = u_merged[2] * 3.5;
    float reflectance = u_merged[0];

    aoScale *= specular.y;
    glossiness *= specular.x;
    reflectance *= specular.z;

    float NdotL = dot(v_normal, lightDir);

    float darkness = NdotL * aoScale;

    vec3 coldTint = vec3(0.4);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 1.0 / 8.0)).xyz;
    vec3 warmTint = vec3(1.0);//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 5.0 / 8.0)).xyz;
    float threshold = 0.4;//TEXTURE2D(u_cartoonLUTMap, vec2(1.0 / 8.0, 7.0 / 8.0)).x;

    vec3 tint = mix(coldTint, warmTint, smoothstep(threshold - 0.001, threshold + 0.001, darkness));

    vec3 viewDir = normalize(u_cameraPos - v_position);

    float NdotH = pow(dot(v_normal, normalize(viewDir + lightDir)), glossiness) * reflectance;
    float specThreshold = 0.4;
    
    float s = 1.0 + smoothstep(specThreshold - 0.001, specThreshold + 0.001, NdotH) * 0.2;

    
    gl_FragColor = vec4(s * tint * lightIntensity * baseColor.rgb, 1.0);
    // gl_FragColor = vec4(v_normal, 1.0); //specular;//
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/cartoon_vert_glsl.ts":
/*!********************************************************!*\
  !*** ./src/renderer/shaders/libs/cartoon_vert_glsl.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform mat4 u_mvpMat;
uniform mat4 u_mMat;
uniform mat4 u_mITMat;

void main()
{
    v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    v_normal = normalize((u_mITMat * vec4(a_normal, 1.0)).xyz);
    v_position = (u_mMat * a_position).xyz;
    gl_Position = u_mvpMat * a_position;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/color_frag_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/color_frag_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;
uniform vec4 u_baseColor;

void main()
{
    gl_FragColor = vec4(u_baseColor.xyz, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/color_vert_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/color_vert_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
attribute vec4 a_position;
uniform mat4 u_mvpMat;
void main()
{
    gl_Position = u_mvpMat * a_position;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/deferred_shading_frag_glsl.ts":
/*!*****************************************************************!*\
  !*** ./src/renderer/shaders/libs/deferred_shading_frag_glsl.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_depthMap;

uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

uniform mat4 u_vIMat;

uniform vec2 u_pixelSize;
uniform vec3 u_cameraPos;

uniform vec4 u_lightColor;
uniform vec4 u_cameraRange;

#ifdef POINT_LIGHT
    uniform vec3 u_lightPos;
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_lightPos;
#endif

uniform vec3 u_lightDir;

const float PI = 3.14159265359;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

#include <distributionGGX>
#include <geometrySmith>
#include <fresnelSchlick>
#include <fresnelSchlickRoughness>

#include <decodeRGB2Float>

vec3 getViewPos(vec2 texCoord, float depth, vec4 cameraRange){
    //cameraRange.x: far
    //cameraRange.y: 1.0 / far
    //cameraRange.z: aspectRatio
    //cameraRange.w: tan(fovy * 0.5)
    float d = depth * cameraRange.x;
    float temp = d * cameraRange.w;
    return vec3(texCoord.x * cameraRange.z * temp, texCoord.y * temp, -d);
}

void main() 
{
    vec2 uv = gl_FragCoord.xy * u_pixelSize;

    vec4 rt0 = texture2D(u_diffuseMap, uv);
    vec4 rt1 = texture2D(u_normalMap, uv);
    vec4 rt2 = texture2D(u_depthMap, uv);

    vec3 albedo = rt0.xyz;
    vec3 normal = rt1.xyz * 2.0 - 1.0;
    float depth = decodeRGB2Float(rt2.xyz);

    vec3 viewPos = getViewPos(uv * 2.0 - 1.0, depth, u_cameraRange);
    vec3 worldPos = (u_vIMat * vec4(viewPos, 1.0)).xyz;

    float roughness = rt0.w;
    float metallic = rt1.w;
    float ao = rt2.w;

    vec3 F0 = vec3(0.04);
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    vec3 L;

    #ifdef POINT_LIGHT
        L = normalize(u_lightPos - worldPos.xyz);
    #else
        L = u_lightDir.xyz;
    #endif

    vec3 V = normalize(u_cameraPos - worldPos.xyz);
    vec3 N = normalize(normal);
    vec3 H = normalize(V + L);

    float NdotL = dot_plus(N, L); 
    float NdotH = dot_plus(N, H); 
    float HdotV = dot_plus(H, V);
    float NdotV = dot_plus(N, V);

    float G = geometrySmith(NdotV, NdotL, roughness);
    float D = distributionGGX(NdotH, roughness);
    vec3 F = fresnelSchlick(HdotV, F0);

    vec3 nominator = D * G * F;//分子
    float denominator = 4.0 * NdotV * NdotL + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // 直接光照结果
    vec3 lo = (kD * (albedo) / PI + brdf) * u_lightColor.xyz * NdotL;

    #ifdef POINT_LIGHT
        vec3 d3 = u_lightPos - worldPos.xyz;
        lo *= 1.0 / dot(d3, d3);
        gl_FragColor = vec4(lo, 1.0);
    #else
        vec3 R = N * dot_plus(N, V) * 2.0 - V; 
        R = vec3(R.x, R.z, -R.y);
        // 环境光部分
        vec3 coordN = vec3(N.x, N.z, -N.y);
        vec3 irradiance = textureCube(u_irradianceMap, coordN).xyz;
        vec3 diffuse = irradiance * albedo;
        vec3 F_s = fresnelSchlickRoughness(NdotV, F0, roughness);
        vec3 kD_a = vec3(1.0) - F_s;
        kD_a *= 1.0 - metallic;

        vec2 envBRDF  = texture2D(u_brdfLUTMap, vec2(NdotV, roughness)).rg;
        vec3 prefilteredColor = textureCubeLodEXT(u_prefilterMap, R, roughness * 8.0).rgb;  
        vec3 specular = prefilteredColor * (F_s * envBRDF.x + envBRDF.y);
        vec3 ambient = (kD_a * diffuse + specular) * ao;

        // 最终颜色
        vec3 color = ambient + lo;

        gl_FragColor = vec4(color, 1.0);
    #endif
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/deferred_shading_vert_glsl.ts":
/*!*****************************************************************!*\
  !*** ./src/renderer/shaders/libs/deferred_shading_vert_glsl.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`

attribute vec4 a_position;

#ifdef POINT_LIGHT
    uniform mat4 u_mvpMat;
#endif

void main()
{
    #ifdef POINT_LIGHT
        gl_Position = u_mvpMat * a_position;
    #else
        gl_Position = a_position;
    #endif   
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/depth_frag_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/depth_frag_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

#ifdef ALPHA_TEST
    varying vec2 v_uv;
    uniform sampler2D u_ODMap;
    uniform sampler2D u_diffuseMap;
    uniform vec4 u_baseColor;
#endif

varying float v_depth;

#include <encodeFloat2RGBA>

void main()
{
    #ifdef ALPHA_TEST
        vec4 bc = texture2D(u_diffuseMap, v_uv);
        bc.xyz = pow(bc.xyz, vec3(2.2));
        vec4 baseColor = bc * u_baseColor;

        float alpha = texture2D(u_ODMap, fract(gl_FragCoord.xy * vec2(1.0 / 16.0))).a;
        if (baseColor.a <= alpha) {
            discard;
        }
    #endif

    float depth = v_depth; //exp(v_depth * 80.0);
    gl_FragColor = vec4(encodeFloat2RGBA(v_depth));
    // gl_FragColor = vec4(depth);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/depth_vert_glsl.ts":
/*!******************************************************!*\
  !*** ./src/renderer/shaders/libs/depth_vert_glsl.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`

attribute vec4 a_position;

varying float v_depth;
uniform mat4 u_mvpMat;
uniform vec4 u_cameraRange;


#ifdef POINT_SHADOW
    uniform mat4 u_mMat;
    uniform vec3 u_cameraPos;
#endif

#ifdef ALPHA_TEST
    attribute vec2 a_texcoord;

    varying vec2 v_uv;
    uniform vec4 u_uvOffset;
#endif

const float dd = 1.0 / sqrt(3.0);

void main()
{
    #ifdef ALPHA_TEST
        v_uv = a_texcoord * u_uvOffset.xy + u_uvOffset.zw;
    #endif

    vec4 pos = u_mvpMat * a_position;

    #ifdef POINT_SHADOW
        vec4 mpos = u_mMat * a_position;
        v_depth = length(mpos.xyz - u_cameraPos) * u_cameraRange.y * dd;
    #else
        v_depth = pos.w == 1.0 ? pos.z * 0.5 + 0.5 : pos.w * u_cameraRange.y; //
    #endif
    gl_Position = pos;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/diffuse_frag_glsl.ts":
/*!********************************************************!*\
  !*** ./src/renderer/shaders/libs/diffuse_frag_glsl.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_diffuseMap;
uniform vec4 u_baseColor;

void main()
{
    vec4 baseColor = texture2D(u_diffuseMap, v_uv) * u_baseColor;
    gl_FragColor = vec4(baseColor.xyz, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/diffuse_vert_glsl.ts":
/*!********************************************************!*\
  !*** ./src/renderer/shaders/libs/diffuse_vert_glsl.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
attribute vec4 a_position;
attribute vec2 a_texcoord;
varying vec2 v_uv;
uniform mat4 u_mvpMat;
void main()
{
    v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    gl_Position = u_mvp * a_position;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/down_sampling4_frag_glsl.ts":
/*!***************************************************************!*\
  !*** ./src/renderer/shaders/libs/down_sampling4_frag_glsl.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;

void main()
{
    vec4 result_color = vec4(0.0);

    vec2 pixelSize = u_pixelSize.xy;

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, 1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, 1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(1.5, -1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, pixelSize * vec2(-1.5, -1.5) + v_uv);

    result_color *= 1.0 / 16.0;

    gl_FragColor = vec4(result_color.xyz, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/down_sampling_to1_frag_glsl.ts":
/*!******************************************************************!*\
  !*** ./src/renderer/shaders/libs/down_sampling_to1_frag_glsl.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_lumMap;
uniform vec2 u_pixelSize;
uniform vec2 u_lumPCT;

void main()
{
    vec4 result_color = vec4(0.0);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, 1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, 1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, 0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, 1.5) + v_uv);  

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(1.5, -1.5) + v_uv);

    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-0.5, -1.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, -0.5) + v_uv);
    result_color += texture2D(u_diffuseMap, u_pixelSize * vec2(-1.5, -1.5) + v_uv);
    

    float l = result_color.x / 16.0;

    vec2 lum = vec2(texture2D(u_lumMap, vec2(0.5, 0.5)).x, l);
    vec2 pct = vec2((1.0 - u_lumPCT.x), u_lumPCT.x);
    float fin = dot(lum, pct);
    
    gl_FragColor = vec4(fin, fin, fin, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/fullscreen_frag_glsl.ts":
/*!***********************************************************!*\
  !*** ./src/renderer/shaders/libs/fullscreen_frag_glsl.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_diffuseMap;

void main()
{
    vec4 baseColor = texture2D(u_diffuseMap, v_uv);
    // baseColor = pow(color, vec3(1.0/2.2)); 
    gl_FragColor = vec4(pow(baseColor.xyz, vec3(1.0/2.2)), 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/fullscreen_vert_glsl.ts":
/*!***********************************************************!*\
  !*** ./src/renderer/shaders/libs/fullscreen_vert_glsl.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
attribute vec4 a_position;
attribute vec2 a_texcoord;
varying vec2 v_uv;

void main()
{
    v_uv = a_texcoord; // vec2(a_texcoord.x, 1.0 - a_texcoord.y);
    gl_Position = a_position;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/fxaa_frag_glsl.ts":
/*!*****************************************************!*\
  !*** ./src/renderer/shaders/libs/fxaa_frag_glsl.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;
varying vec2 v_uv;

uniform sampler2D u_diffuseMap;

uniform vec2 u_pixelSize;

vec4 o_fragColor;

// Nvidia的FXAA算法
void main(){
    const float FXAA_SPAN_MAX = 8.0;
    const float FXAA_REDUCE_MUL = 1.0 / 8.0;
    const float FXAA_REDUCE_MIN = 1.0 / 128.0;

    vec3 rgbNW = texture2D(u_diffuseMap, v_uv + (vec2(-1.0, -1.0) * u_pixelSize)).xyz;
    vec3 rgbNE = texture2D(u_diffuseMap, v_uv + (vec2(1.0, -1.0) * u_pixelSize)).xyz;
    vec3 rgbSW = texture2D(u_diffuseMap, v_uv + (vec2(-1.0, 1.0) * u_pixelSize)).xyz;
    vec3 rgbSE = texture2D(u_diffuseMap, v_uv + (vec2(1.0, 1.0) * u_pixelSize)).xyz;
    vec3 rgbM = texture2D(u_diffuseMap, v_uv).xyz;

    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);

    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);

    dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
        max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
        dir * rcpDirMin)) * u_pixelSize;

    vec3 rgbA = 0.5 * (
        texture2D(u_diffuseMap, v_uv.xy + dir * (1.0 / 3.0 - 0.5)).xyz +
        texture2D(u_diffuseMap, v_uv.xy + dir * (2.0 / 3.0 - 0.5)).xyz);

    vec3 rgbB = rgbA * 0.5 + 0.25 * (
        texture2D(u_diffuseMap, v_uv.xy - dir * 0.5).xyz +
        texture2D(u_diffuseMap, v_uv.xy + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if((lumaB < lumaMin) || (lumaB > lumaMax)){
        o_fragColor.xyz = rgbA;
    }else{
        o_fragColor.xyz = rgbB;
    }
 
    gl_FragColor = vec4(o_fragColor.xyz, 1.0);
    // gl_FragColor = vec4(pow(o_fragColor.xyz, vec3(1.0/2.2)), 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/gaussian_blur_frag_glsl.ts":
/*!**************************************************************!*\
  !*** ./src/renderer/shaders/libs/gaussian_blur_frag_glsl.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;
uniform vec2 u_pixelDir;

void main()
{
    vec2 dir = u_pixelDir * u_pixelSize;
    
    vec4 result_color = vec4(0.0);

    // 0.398943, 0.241971, 0.053991, 0.004432, 0.000134
    result_color += texture2D(u_diffuseMap, dir * vec2(4.0, 4.0) + v_uv) * 0.000134;
    result_color += texture2D(u_diffuseMap, dir * vec2(3.0, 3.0) + v_uv) * 0.004432;
    result_color += texture2D(u_diffuseMap, dir * vec2(2.0, 2.0) + v_uv) * 0.053991;
    result_color += texture2D(u_diffuseMap, dir * vec2(1.0, 1.0) + v_uv) * 0.241971;

    result_color += texture2D(u_diffuseMap, dir * vec2(0.0, 0.0) + v_uv) * 0.398943;

    result_color += texture2D(u_diffuseMap, dir * vec2(-1.0, -1.0) + v_uv) * 0.241971;
    result_color += texture2D(u_diffuseMap, dir * vec2(-2.0, -2.0) + v_uv) * 0.053991;
    result_color += texture2D(u_diffuseMap, dir * vec2(-3.0, -3.0) + v_uv) * 0.004432;
    result_color += texture2D(u_diffuseMap, dir * vec2(-4.0, -4.0) + v_uv) * 0.000134;

    gl_FragColor = result_color;//vec4(result_color.xyz, 1.0);
}

`);


/***/ }),

/***/ "./src/renderer/shaders/libs/gbuffer_frag_glsl.ts":
/*!********************************************************!*\
  !*** ./src/renderer/shaders/libs/gbuffer_frag_glsl.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`

#extension GL_EXT_draw_buffers : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
#endif

uniform sampler2D u_diffuseMap;
uniform sampler2D u_normalMap;
uniform sampler2D u_roughnessMap;
uniform sampler2D u_metallicMap;
uniform sampler2D u_aoMap;

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

uniform mat4 u_vMat;
uniform vec3 u_specular;
uniform vec4 u_baseColor;
uniform vec2 u_matType;
varying vec3 v_viewPos;
varying float v_depth;

#include <encodeFloat2RGB>

void main()
{
    vec4 baseColor = pow(texture2D(u_diffuseMap, v_uv), vec4(2.2)) * u_baseColor;
    #ifdef ALPHA_TEST
        float alpha = texture2D(u_ODMap, fract(gl_FragCoord.xy * vec2(1.0 / 16.0))).a;
        if (baseColor.a <= alpha) {
            discard;
        }
    #endif

    vec4 spec = texture2D(u_roughnessMap, v_uv);
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec3 albedo = baseColor.xyz;

    
    #ifdef NORMAL_MAP
        vec3 normal = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
        normal = normalize(normal.x * v_tangent + normal.y * v_binormal + normal.z * v_normal);
    #else 
        vec3 normal = v_normal;
    #endif
    
    // normal = (u_vMat * vec4(normal, 0.0)).xyz;

    vec3 depth3 = encodeFloat2RGB(v_depth);

    gl_FragData[0] = vec4(albedo, roughness);
    gl_FragData[1] = vec4(normal * 0.5 + 0.5, metallic);
    gl_FragData[2] = vec4(depth3, ao);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/log_blur_glsl.ts":
/*!****************************************************!*\
  !*** ./src/renderer/shaders/libs/log_blur_glsl.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`

precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform vec2 u_pixelSize;
uniform vec2 u_pixelDir;
uniform vec4 u_cameraRange;
#ifdef KERNEL_RADIUS 
    uniform float u_weight[KERNEL_RADIUS];
#endif

#include <encodeFloat2RGBA>
#include <decodeRGBA2Float>

void main()
{
    vec2 dir = u_pixelDir * u_pixelSize;

    #ifdef KERNEL_RADIUS
        
    #else
        
    #endif

    float u_weight[4];
    u_weight[0] = 0.241971;
    u_weight[1] = 0.053991;
    u_weight[2] = 0.004432;
    u_weight[3] = 0.000134;

    float z = 300.0;
    float w = 1.0 / z;

    float d0 = decodeRGBA2Float(texture2D(u_diffuseMap, v_uv)) * z;

    float color = 0.398943;

    #ifdef KERNEL_RADIUS
        for (int i = 0; i < KERNEL_RADIUS; i++) 
    #else
       
    #endif
    for (int i = 0; i < 4; i++) 
    {
        float d1 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv)) * z;
        float d2 = decodeRGBA2Float(texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv)) * z;
        // float d1 = texture2D(u_diffuseMap, dir * vec2(float(i+1)) + v_uv).x * z;
        // float d2 = texture2D(u_diffuseMap, dir * vec2(float(-i-1)) + v_uv).x * z;
        color += (exp(d1 - d0) + exp(d2 - d0)) * u_weight[i];
    }

    float result = clamp((d0 + log(color)) * w, 0.0, 0.999);
    gl_FragColor = vec4(encodeFloat2RGBA(result));
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/lum_sample_frag_glsl.ts":
/*!***********************************************************!*\
  !*** ./src/renderer/shaders/libs/lum_sample_frag_glsl.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;

void main()
{
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;
    float lum = dot(vec3(0.299, 0.587, 0.114), color) + 0.0001;
    
    gl_FragColor = vec4(vec3(lum), 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/skybox_frag_glsl.ts":
/*!*******************************************************!*\
  !*** ./src/renderer/shaders/libs/skybox_frag_glsl.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec3 v_uv;
uniform samplerCube u_diffuseMap;

void main()
{
    vec4 baseColor = textureCube(u_diffuseMap, v_uv);
    gl_FragColor = vec4(baseColor.xyz, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/skybox_vert_glsl.ts":
/*!*******************************************************!*\
  !*** ./src/renderer/shaders/libs/skybox_vert_glsl.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`

attribute vec3 a_position;

varying vec3 v_uv;

uniform mat4 u_vpMat;
uniform vec3 u_cameraPos;

void main()
{
    v_uv = vec3(-a_position.x, -a_position.z, a_position.y);
    vec4 pos = u_vpMat * vec4(u_cameraPos - a_position, 1.0);
    gl_Position = pos.xyww;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/ssao_frag_glsl.ts":
/*!*****************************************************!*\
  !*** ./src/renderer/shaders/libs/ssao_frag_glsl.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

#ifdef NORMAL_MAP
    uniform sampler2D u_normalMap;
#endif 

uniform sampler2D u_depthMap;
uniform sampler2D u_randomMap;

uniform mat4 u_pMat;
uniform mat4 u_pIMat;
uniform vec4 u_multiUsing;
uniform vec4 u_cameraRange;
uniform vec2 u_pixelSize;

uniform vec3 u_samples[SAMPLE_NUM];

#include <decodeRGB2Float>

float linearToDepth(float l, float f, float n) 
{
    return (f + n - 2.0 * n * f) / (l * (f - n));
}

void main()
{
    // vec2 randomUV = v_uv * u_pixelSize;
    // vec3 randomDir = texture2D(u_randomMap, randomUV).xyz * 2.0;

    #ifdef NORMAL_MAP
        vec4 rt2 = texture2D(u_depthMap, v_uv);
        float d = decodeRGB2Float(rt2.xyz);
        float depth = linearToDepth(d * 2.0 - 1.0, u_cameraRange.x, u_cameraRange.y);
    #else
        float depth = texture2D(u_depthMap, v_uv).x;
        float d = depth;
    #endif 

    vec4 pos = u_pIMat * (vec4(v_uv, depth, 1.0) * 2.0 - 1.0);
    pos.xyz /= pos.w;

    float ao = 0.0;

    for (int i = 0; i < SAMPLE_NUM; i++) {
        vec4 np = u_pMat * vec4(vec3(pos.xyz + u_samples[i]), 1.0);
        np.xyz /= np.w;
        np.xyz = np.xyz * 0.5 + 0.5;

        #ifdef NORMAL_MAP
            vec4 rtn = texture2D(u_depthMap, np.xy);
            float nzSrc = decodeRGB2Float(rtn.xyz);
            float nz = linearToDepth(nzSrc * 2.0 - 1.0, u_cameraRange.x, u_cameraRange.y);
            float rangeCheck = smoothstep(0.0, 1.0, u_cameraRange.z / abs(nzSrc - d));
        #else
            float nz = texture2D(u_depthMap, np.xy).x;
            vec4 nView = u_pIMat * (vec4(np.xy, nz, 1.0) * 2.0 - 1.0);
            nView.xyz /= nView.w;
            float rangeCheck = smoothstep(0.0, 1.0, 1.0 / abs(pos.z - nView.z));
        #endif 
    
        ao += (nz < np.z ? 1.0 : 0.0) * rangeCheck;
    }
    ao /= float(SAMPLE_NUM);

    gl_FragColor = vec4(vec3(0.0), 1.0 - ao);
    // gl_FragColor = vec4(vec3(1.0 - ao), 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/standard_frag_glsl.ts":
/*!*********************************************************!*\
  !*** ./src/renderer/shaders/libs/standard_frag_glsl.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
#extension GL_EXT_shader_texture_lod : enable

precision mediump float;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_worldPos;

#include <ShadowMapDefine>
#include <LightingDefine>

#ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
    uniform sampler2D u_normalMap;
#endif

#ifdef ALPHA_TEST
    uniform sampler2D u_ODMap;
#endif

uniform sampler2D u_diffuseMap;

uniform sampler2D u_roughnessMap;
uniform sampler2D u_brdfLUTMap;

uniform samplerCube u_irradianceMap;
uniform samplerCube u_prefilterMap;

const float PI = 3.14159265359;
const float inv_PI = 1.0 / PI;

float dot_plus(vec3 v1, vec3 v2)
{
    return max(dot(v1, v2), 0.0);
}

uniform vec3 u_specular;
uniform vec3 u_cameraPos;
uniform vec4 u_baseColor;

#include <distributionGGX>
#include <geometrySmith>
#include <fresnelSchlick>
#include <fresnelSchlickRoughness>

#include <decodeRGBA2Float>

vec3 directionLight(float NdotV, float roughness, float metallic, vec3 albedo, vec3 F0, vec3 N, vec3 V, vec3 dir, vec4 color) {
    vec3 L = dir;
    vec3 H = normalize(V + L);

    float NdotL = dot_plus(N, L); 
    float NdotH = dot_plus(N, H); 
    float HdotV = dot_plus(H, V);

    float G = geometrySmith(NdotV, NdotL, roughness);
    float D = distributionGGX(NdotH, roughness);
    vec3 F = fresnelSchlick(HdotV, F0);

    vec3 nominator = D * G * F;//分子
    float denominator = 4.0 * NdotV * NdotL + 0.0001;//分母 
    vec3 brdf = nominator / denominator;

    vec3 kD = vec3(1.0) - F;
    kD *= 1.0 - metallic;

    return (kD * (albedo) * inv_PI + brdf) * color.xyz * NdotL;
}

// 计算esm 当前c值为300
float calcShadow(vec3 depth3, float z) {
    float d = depth3.z;
    float shadow;
    if (any(lessThan(depth3.xy, vec2(0.0))) || any(greaterThan(depth3.xy, vec2(1.0)))) {
        shadow = 1.0;
    } else {
        shadow = clamp(exp((z - d + 0.0005) * 300.0), 0.0, 1.0);
    }
    return (d > 1.0 || d < 0.0) ? 1.0 : shadow;
}

void main()
{
    vec4 bc = texture2D(u_diffuseMap, v_uv);
    bc.xyz = pow(bc.xyz, vec3(2.2));
    vec4 baseColor = bc * u_baseColor;
    #ifdef ALPHA_TEST
        float alpha = texture2D(u_ODMap, fract(gl_FragCoord.xy * vec2(1.0 / 16.0))).a;
        if (baseColor.a <= alpha) {
            discard;
        }
    #endif

    vec4 spec = texture2D(u_roughnessMap, v_uv);
    
    float roughness = spec.r * u_specular.r;
    float metallic = spec.g * u_specular.g;
    float ao = spec.b * u_specular.b;

    vec3 albedo = baseColor.xyz;

    vec3 F0 = vec3(0.04);
    
    F0 = F0 * (1.0 - metallic) + albedo * metallic;

    // 是否存在法线贴图
    #ifdef NORMAL_MAP
        vec3 normal = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
        vec3 N = normalize(normal.x * v_tangent + normal.y * v_binormal + normal.z * v_normal);
    #else
        vec3 N = normalize(v_normal);
    #endif

    vec3 V = normalize(u_cameraPos - v_worldPos);

    float NdotV = dot_plus(N, V);

    vec3 lo = vec3(0.0);

    // 方向光阴影
    #ifdef DIRECTION_SHADOW_LIGHT
        #if DIRECTION_SHADOW_LIGHT > 0
        {
            vec3 depth3 = u_directionDepths[0];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[0], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[0], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[0], u_directionShadowColors[0]) * shadow;
        }
        #endif
        #if DIRECTION_SHADOW_LIGHT > 1
        {
            vec3 depth3 = u_directionDepths[1];
            float z = decodeRGBA2Float(texture2D(u_directionShadowMaps[1], depth3.xy)); 
            float shadow = calcShadow(u_directionDepths[1], z);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionShadowDirs[1], u_directionShadowColors[1]) * shadow;
        }
        #endif
    #endif

    #ifdef DIRECTION_LIGHT
        for (int i = 0; i < DIRECTION_LIGHT; i++) {
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, u_directionDirs[i], u_directionColors[i]);
        }
    #endif

    // 点光源阴影
    #ifdef POINT_SHADOW_LIGHT
        #if POINT_SHADOW_LIGHT > 0
        {
            #define POINT_MAP_INDEX 0
            #ifndef POINT_SHADOW_PCF_0
                #define POINT_SHADOW_PCF
            #endif
            #include<PointShadowCalc>
            #ifndef POINT_SHADOW_PCF_0
                #undef POINT_SHADOW_PCF
            #endif
            #undef POINT_MAP_INDEX
        }
        #endif

        #if POINT_SHADOW_LIGHT > 1
        {
            #define POINT_MAP_INDEX 1
            #ifndef POINT_SHADOW_PCF_0
                #define POINT_SHADOW_PCF
            #endif
            #include<PointShadowCalc>
            #ifndef POINT_SHADOW_PCF_0
                #undef POINT_SHADOW_PCF
            #endif
            #undef POINT_MAP_INDEX
        }
        #endif
    #endif

    #ifdef POINT_LIGHT
        for (int i = 0; i < POINT_LIGHT; i++) {
            vec3 pos = u_pointPos[i];
            vec4 color = u_pointColors[i];
            vec3 d3 = pos - v_worldPos;
            float d3len = length(d3);
            float factor = max(1.0 - (1.0 - color.w) * (d3len * d3len), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, normalize(d3), color) * factor;
        }
    #endif

    // 聚光灯阴影
    #ifdef SPOT_SHADOW_LIGHT
        #if SPOT_SHADOW_LIGHT > 0
        {
            vec4 depthVec = u_spotMats[0] * vec4(v_worldPos, 1.0);
            vec3 depth3 = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y); //v_spotDepths_0;// 
            
            vec3 pos = u_spotShadowPos[0];
            vec4 color = u_spotShadowColors[0];
            vec4 dir = u_spotShadowDirs[0];

            vec3 d3 = pos - v_worldPos;
            vec3 L = normalize(d3);
            
            float bias = max(0.05 * (1.0 - dot(N, L)), 0.01);

            float shadow = 0.0;
            for (int i = -1; i <= 1; i++) {
                for (int j = -1; j <= 1; j++) {
                    vec2 sp_uv = depth3.xy + u_spotRanges[0].zw * vec2(float(i), float(j));
                    float z = decodeRGBA2Float(texture2D(u_spotShadowMaps[0], sp_uv));
                    float sh = depth3.z - bias > z ? 0.0 : 1.0;
                    sh = (any(lessThan(sp_uv, vec2(0.0))) || any(greaterThan(sp_uv, vec2(1.0)))) ? 1.0 : sh;
                    shadow += (depth3.z > 1.0 || depth3.z < 0.0) ? 1.0 : sh;
                }
            }
            shadow /= 9.0;

            float ag = step(dir.w, dot(dir.xyz, L));
            float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, L, color) * factor * ag * shadow;   
        }
        #endif
        #if SPOT_SHADOW_LIGHT > 1
        #endif
    #endif

    #ifdef SPOT_LIGHT
        for (int i = 0; i < SPOT_LIGHT; i++) {
            vec3 pos = u_spotPos[i];
            vec4 color = u_spotColors[i];
            vec4 dir = u_spotDirs[i];
            vec3 d3 = pos - v_worldPos;
            vec3 d3_norm = normalize(d3);
            float ag = step(dir.w, dot(dir.xyz, d3_norm));
            float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
            lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, d3_norm, color)  * factor * ag;
        }
    #endif

    // 环境光部分
    vec3 coordN = vec3(N.x, N.z, -N.y);
    vec3 irradiance = textureCubeLodEXT(u_irradianceMap, coordN, 8.0).xyz;
    vec3 diffuse = irradiance * albedo;
    vec3 F_s = fresnelSchlickRoughness(NdotV, F0, roughness);
    vec3 kD_a = vec3(1.0) - F_s;
    kD_a *= 1.0 - metallic;

    vec3 R = N * dot_plus(N, V) * 2.0 - V; 
    R = vec3(R.x, R.z, -R.y);

    vec2 envBRDF  = texture2D(u_brdfLUTMap, vec2(NdotV, roughness)).rg;
    vec3 prefilteredColor = textureCubeLodEXT(u_prefilterMap, R, roughness * 8.0).rgb; 
    // vec3 prefilteredColor = textureCube(u_prefilterMap, R).rgb * (1.0 - roughness) + irradiance * roughness;
    vec3 specular = prefilteredColor * (F_s * envBRDF.x + envBRDF.y);
    vec3 ambient = (kD_a * diffuse + specular) * ao;

    vec3 color = (ambient) + lo;
    gl_FragColor = vec4(color, baseColor.w);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/standard_vert_glsl.ts":
/*!*********************************************************!*\
  !*** ./src/renderer/shaders/libs/standard_vert_glsl.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
attribute vec4 a_position;
attribute vec2 a_texcoord;
attribute vec3 a_normal;
attribute vec3 a_tangent;

varying vec2 v_uv;
varying vec3 v_worldPos;
varying vec3 v_viewPos;
varying vec3 v_normal;

// #ifdef NORMAL_MAP
    varying vec3 v_tangent;
    varying vec3 v_binormal;
// #endif

varying float v_depth;

uniform vec4 u_uvOffset;

uniform mat4 u_mMat;
uniform mat4 u_mvMat;
uniform mat4 u_mITMat;
uniform mat4 u_mvpMat;
uniform vec4 u_cameraRange;

#ifdef DIRECTION_SHADOW_LIGHT
    uniform mat4 u_directionMats[DIRECTION_SHADOW_LIGHT];
    varying vec3 u_directionDepths[DIRECTION_SHADOW_LIGHT];  
#endif

#ifdef SPOT_SHADOW_LIGHT
    // uniform mat4 u_spotMats[SPOT_SHADOW_LIGHT];
    // uniform vec2 u_spotRanges[SPOT_SHADOW_LIGHT];
    // varying vec3 v_spotDepths[SPOT_SHADOW_LIGHT];  
    #if SPOT_SHADOW_LIGHT > 0
        // varying highp vec3 v_spotDepths_0;
    #endif

#endif

// #ifdef SHADOW_MAP
//     uniform mat4 u_depthMat;
//     varying vec3 v_depth3;  
// #endif

void main()
{
    v_uv = a_texcoord * u_uvOffset.xy + u_uvOffset.zw;

    vec4 worldPos = u_mMat * a_position;
    v_worldPos = worldPos.xyz;

    // #ifdef NORMAL_MAP
        v_tangent = normalize((u_mMat * vec4(a_tangent, 0.0)).xyz);
        v_binormal = cross(v_tangent, v_normal);
    // #endif
    v_normal = normalize((u_mITMat * vec4(a_normal, 0.0)).xyz);

    v_viewPos = (u_mvMat * a_position).xyz;

    vec4 pos = u_mvpMat * a_position;
    v_depth = pos.w * u_cameraRange.y;

    // #ifdef SHADOW_MAP
    //     vec4 depthVec = u_depthMat * vec4(v_worldPos, 1.0);
    //     v_depth3 = depthVec.xyz * 0.5 + 0.5;
    // #endif

    #ifdef DIRECTION_SHADOW_LIGHT
        for (int i = 0; i < DIRECTION_SHADOW_LIGHT; i++) {
            vec4 depthVec = u_directionMats[i] * vec4(v_worldPos, 1.0);
            u_directionDepths[i] = depthVec.xyz * 0.5 + 0.5;
        }
    #endif

    #ifdef SPOT_SHADOW_LIGHT

        #if SPOT_SHADOW_LIGHT > 0
            // vec4 depthVec = u_spotMats[0] * vec4(v_worldPos, 1.0);
            // v_spotDepths_0 = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[0].y);
        #endif

        // for (int i = 0; i < SPOT_SHADOW_LIGHT; i++) {
        //     vec4 depthVec = u_spotMats[i] * vec4(v_worldPos, 1.0);
        //     u_spotDepths[i] = vec3(depthVec.xy / depthVec.w * 0.5 + 0.5, depthVec.w * u_spotRanges[i].y);
        // }
    #endif

    gl_Position = pos;
}
`);


/***/ }),

/***/ "./src/renderer/shaders/libs/tone_mapping_frag_glsl.ts":
/*!*************************************************************!*\
  !*** ./src/renderer/shaders/libs/tone_mapping_frag_glsl.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_diffuseMap;
uniform sampler2D u_bloomMap;
uniform sampler2D u_lumMap;
uniform sampler2D u_aoMap;
uniform vec2 u_lumPCT;
uniform vec2 u_pixelSize;

#include <ACESToneMapping>

void main()
{
    vec3 lum_fact = vec3(0.27, 0.67, 0.06);
    vec3 color = texture2D(u_diffuseMap, v_uv).xyz;

    float ave_lum = texture2D(u_lumMap, vec2(0.5, 0.5)).x;
    
    color = ACESToneMapping(color, ave_lum, u_lumPCT.x);

    vec3 bloom = texture2D(u_bloomMap, v_uv).xyz * 1.3;
    float ao = texture2D(u_aoMap, v_uv).a;
    vec3 final_color = clamp(color * ao + bloom, 0.0, 1.0);

    gl_FragColor = vec4(final_color, 1.0);
}
`);


/***/ }),

/***/ "./src/renderer/shaders/mods/brdf.ts":
/*!*******************************************!*\
  !*** ./src/renderer/shaders/mods/brdf.ts ***!
  \*******************************************/
/*! exports provided: distributionGGX, geometrySmith, fresnelSchlick, fresnelSchlickRoughness, fastDFG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distributionGGX", function() { return distributionGGX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geometrySmith", function() { return geometrySmith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fresnelSchlick", function() { return fresnelSchlick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fresnelSchlickRoughness", function() { return fresnelSchlickRoughness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fastDFG", function() { return fastDFG; });
const distributionGGX = `
// 法线分布统计
float distributionGGX(float NdotH, float roughness)
{
    float a2     = roughness * roughness;
    float NdotH2 = NdotH * NdotH;

    float nom    = a2;
    float denom  = (NdotH2 * (a2 - 1.0) + 1.0);
    denom        = PI * denom * denom;

    return nom / denom;
}
`;
const geometrySmith = `
float geometrySchlickGGX(float NdotV, float k)
{
    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

// Schlick几何方程
float geometrySmith(float NdotV, float NdotL, float roughness) 
{
    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;

    float ggx2  = geometrySchlickGGX(NdotV, k);
    float ggx1  = geometrySchlickGGX(NdotL, k);

    return ggx1 * ggx2;
}
`;
const fresnelSchlick = `
//Schlick菲涅尔方程
vec3 fresnelSchlick(float HdotV, vec3 F0)
{
    return F0 + (vec3(1.0) - F0) * pow((1.0 - HdotV), 5.0);
}
`;
const fresnelSchlickRoughness = `
//Schlick菲涅尔方程，带粗糙度
vec3 fresnelSchlickRoughness(float HdotV, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow((1.0 - HdotV), 5.0);
}
`;
// vec3 brdf = FastDFG(roughness, NdotV, NdotL) * metalic;
const fastDFG = `
float fastDFG(float roughness, float NoV, float NoL)
{
    float a = roughness * roughness;
    float a2 = a * a;
    float G_V = NoV + sqrt( (NoV - NoV * a2) * NoV + a2 );
    float G_L = NoL + sqrt( (NoL - NoL * a2) * NoL + a2 );
    return 1.0 / ( G_V * G_L );
}
`;


/***/ }),

/***/ "./src/renderer/shaders/mods/decode.ts":
/*!*********************************************!*\
  !*** ./src/renderer/shaders/mods/decode.ts ***!
  \*********************************************/
/*! exports provided: decodeRGB2Float, decodeRGBA2Float */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeRGB2Float", function() { return decodeRGB2Float; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeRGBA2Float", function() { return decodeRGBA2Float; });
const decodeRGB2Float = `
float decodeRGB2Float(vec3 rgb)
{
    return dot(rgb, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));
}
`;
const decodeRGBA2Float = `
float decodeRGBA2Float(vec4 rgba)
{
    return dot(rgba, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));
}
`;


/***/ }),

/***/ "./src/renderer/shaders/mods/encode.ts":
/*!*********************************************!*\
  !*** ./src/renderer/shaders/mods/encode.ts ***!
  \*********************************************/
/*! exports provided: encodeFloat2RGB, encodeFloat2RGBA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeFloat2RGB", function() { return encodeFloat2RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeFloat2RGBA", function() { return encodeFloat2RGBA; });
const encodeFloat2RGB = `
vec3 encodeFloat2RGB(float v)
{
    vec3 enc = vec3(1.0, 255.0, 65025.0) * v;
    enc = fract(enc);
    enc -= enc.yzz * vec3(1.0/255.0, 1.0/255.0, 0.0);
    return enc;
}
`;
const encodeFloat2RGBA = `
vec4 encodeFloat2RGBA(float v)
{
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0, 1.0/255.0, 1.0/255.0, 0.0);
    return enc;
}
`;


/***/ }),

/***/ "./src/renderer/shaders/mods/lighting.ts":
/*!***********************************************!*\
  !*** ./src/renderer/shaders/mods/lighting.ts ***!
  \***********************************************/
/*! exports provided: LightingDefine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightingDefine", function() { return LightingDefine; });
const LightingDefine = `

#ifndef LIGHTING_DEFINE
#define LIGHTING_DEFINE

#ifdef DIRECTION_LIGHT
    uniform vec3 u_directionDirs[DIRECTION_LIGHT];
    uniform vec4 u_directionColors[DIRECTION_LIGHT];
#endif

#ifdef POINT_LIGHT
    uniform vec3 u_pointPos[POINT_LIGHT];
    uniform vec4 u_pointColors[POINT_LIGHT];
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_spotPos[SPOT_LIGHT];
    uniform vec4 u_spotDirs[SPOT_LIGHT];
    uniform vec4 u_spotColors[SPOT_LIGHT];
#endif

#endif

`;


/***/ }),

/***/ "./src/renderer/shaders/mods/shadow.ts":
/*!*********************************************!*\
  !*** ./src/renderer/shaders/mods/shadow.ts ***!
  \*********************************************/
/*! exports provided: ShadowMapDefine, standardShadowMap, PointShadowCalc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShadowMapDefine", function() { return ShadowMapDefine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "standardShadowMap", function() { return standardShadowMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointShadowCalc", function() { return PointShadowCalc; });
const ShadowMapDefine = `
#ifdef DIRECTION_SHADOW_LIGHT
    uniform vec3 u_directionShadowDirs[DIRECTION_SHADOW_LIGHT];
    uniform vec4 u_directionShadowColors[DIRECTION_SHADOW_LIGHT];
    uniform sampler2D u_directionShadowMaps[DIRECTION_SHADOW_LIGHT];
    varying vec3 u_directionDepths[DIRECTION_SHADOW_LIGHT];  
#endif

#ifdef POINT_SHADOW_LIGHT
    uniform vec3 u_pointShadowPos[POINT_SHADOW_LIGHT];
    uniform vec4 u_pointShadowColors[POINT_SHADOW_LIGHT];
    uniform samplerCube u_pointShadowMaps[POINT_SHADOW_LIGHT];
    uniform vec2 u_pointRanges[POINT_SHADOW_LIGHT];
#endif

#ifdef SPOT_SHADOW_LIGHT
    uniform vec3 u_spotShadowPos[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowDirs[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotShadowColors[SPOT_SHADOW_LIGHT];
    uniform sampler2D u_spotShadowMaps[SPOT_SHADOW_LIGHT];
    uniform mat4 u_spotMats[SPOT_SHADOW_LIGHT];
    uniform vec4 u_spotRanges[SPOT_SHADOW_LIGHT];     
#endif
`;
// 废弃
const standardShadowMap = `
#include <decodeRGB2Float>

vec4 standardShadowMap()
{
    #ifdef SHADOW_MAP
        // PCF
        // vec2 uvoffset[9];
        // const float fenmu = 1.0 / 1024.0;
        // uvoffset[0] = vec2(0.0, 0.0);
        // uvoffset[1] = vec2(0.0, fenmu);
        // uvoffset[2] = vec2(0.0, -fenmu);
        // uvoffset[3] = vec2(fenmu, 0.0);
        // uvoffset[4] = vec2(-fenmu, 0.0);
        // uvoffset[5] = vec2(fenmu, fenmu);
        // uvoffset[6] = vec2(-fenmu, fenmu);
        // uvoffset[7] = vec2(fenmu, -fenmu);
        // uvoffset[8] = vec2(-fenmu, -fenmu);
        
        // float bias = max(0.005 * (1.0 - dot(N, L)), 0.0005);
        // float shadow = 0.0;
        // for (int i = 0; i < 9; i++) {
        //     vec2 s_uv = v_depth3.xy + uvoffset[i];
        //     if (any(lessThan(s_uv, vec2(0.0))) || any(greaterThan(s_uv, vec2(1.0)))) {
        //         shadow += 1.0;
        //     } else {
        //         float depth2 = decodeRGBA2Float(texture2D(u_depthMap, s_uv).rgb);
        //         shadow += clamp(exp(200.0 * (depth2 - depth)), 0.5, 1.0); 
        //         // shadow += (depth - bias > depth2 ? 0.5 : 1.0);
        //     }
        // }
        // float shadow = (depth > depth2 ? 0.5 : 1.0);

        // 改进的ESM手动差值部分，测试了一下，encode的float可以在encode状态下差值，最终结果是正确的。
        // vec2 depthPixelSize = vec2(1.0 / 512.0);
        // vec2 fullUV = v_depth3.xy * vec2(512.0, 512.0) - vec2(0.5);
        // vec2 floorUV = floor(fullUV) + vec2(0.5);
        // vec2 ceilUV = ceil(fullUV) + vec2(0.5);
        // vec2 fractUV = fract(fullUV);
        // vec2 invfractUV = vec2(1.0) - fractUV;

        // float z0 = decodeRGBA2Float(texture2D(u_depthMap, ceilUV * depthPixelSize));
        // float z1 = decodeRGBA2Float(texture2D(u_depthMap, vec2(ceilUV.x, floorUV.y) * depthPixelSize));
        // float z2 = decodeRGBA2Float(texture2D(u_depthMap, vec2(floorUV.x, ceilUV.y) * depthPixelSize));
        // float z3 = decodeRGBA2Float(texture2D(u_depthMap, floorUV * depthPixelSize));

        // float nz0 = z3 * invfractUV.x * invfractUV.y;
        // float nz1 = z2 * invfractUV.x * fractUV.y;
        // float nz2 = z1 * fractUV.x * invfractUV.y;
        // float nz3 = z0 * fractUV.x * fractUV.y;
        // texture2D(u_depthMap, v_depth3.xy).r;// nz0 + nz1 + nz2 + nz3;// 

        // float d = v_depth3.z;
        // float z = decodeRGBA2Float(texture2D(u_depthMap, v_depth3.xy)); 
        // float shadow;
        // if (any(lessThan(v_depth3.xy, vec2(0.0))) || any(greaterThan(v_depth3.xy, vec2(1.0)))) {
        //     shadow = 1.0;
        // } else {
        //     shadow = clamp(exp((z - d) * 300.0), 0.0, 1.0); //d > z ? 1.0 : 
        // }
        // shadow = d > 1.0 ? 1.0 : shadow;
        // lo = mix(lo * 0.75 + vec3(0.0, 0.0, 1.0) * 0.25, vec3(0.0), shadow);
        // lo *= vec3(1.0 - shadow, 1.0, 1.0);
    #endif    

}

`;
const PointShadowCalc = `

    vec3 pos = u_pointShadowPos[POINT_MAP_INDEX];
    vec4 color = u_pointShadowColors[POINT_MAP_INDEX];
    vec3 d3 = v_worldPos - pos;
    float d = length(d3);
    d3 /= d;
    d3 = vec3(d3.x, d3.z, -d3.y);

    vec3 L = normalize(pos - v_worldPos);
    float bias = max(5.0 * (1.0 - dot(N, L)), 2.0);
    float shadow = 0.0;
    #ifdef POINT_SHADOW_PCF
        float diskRadius = (1.0 + (d * u_pointRanges[POINT_MAP_INDEX].y)) * 0.005;// / 25.0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    vec3 bbi = vec3( i == 0 ? 1.0: -1.0 ,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                    float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                    float sh = d - bias > z ? 0.0 : 1.0;
                    shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
                }
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( 0,  j == 0 ? 1.0: -1.0 ,  k == 0 ? 1.0: -1.0 ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( k == 0 ? 1.0: -1.0,   j == 0 ? 1.0: -1.0 ,0   ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                vec3 bbi = vec3( j == 0 ? 1.0: -1.0 , 0,   k == 0 ? 1.0: -1.0 ) * diskRadius;
                float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3 + bbi));
                float sh = d - bias > z ? 0.0 : 1.0;
                shadow += d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : sh;
            }
        }

        shadow /= 20.0;
    #else
        float z = u_pointRanges[POINT_MAP_INDEX].x * decodeRGBA2Float(textureCube(u_pointShadowMaps[POINT_MAP_INDEX], d3));
        shadow = d - bias > z ? 0.0 : 1.0;
        shadow = d > u_pointRanges[POINT_MAP_INDEX].x ? 1.0 : shadow;
    #endif

    float factor = max(1.0 - (1.0 - color.w) * (d * d), 0.0);
    // float factor = max(1.0 - (1.0 - color.w) * dot(d3, d3), 0.0);
    lo += directionLight(NdotV, roughness, metallic, albedo, F0, N, V, L, color) * factor * shadow;
`;


/***/ }),

/***/ "./src/renderer/shaders/mods/toneMapping.ts":
/*!**************************************************!*\
  !*** ./src/renderer/shaders/mods/toneMapping.ts ***!
  \**************************************************/
/*! exports provided: ACESToneMapping */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACESToneMapping", function() { return ACESToneMapping; });
const ACESToneMapping = `
// 美国电影艺术与科学学会的tone mapping (一堆magic number用来拟合曲线);
vec3 ACESToneMapping(vec3 color, float avgLum, float adapted_lum)
{
	const float A = 2.51;
	const float B = 0.03;
	const float C = 2.43;
	const float D = 0.59;
	const float E = 0.14;

	color *= adapted_lum / avgLum;
	return (color * (A * color + B)) / (color * (C * color + D) + E);
}
`;


/***/ }),

/***/ "./src/renderer/shaders/shaderLibs.ts":
/*!********************************************!*\
  !*** ./src/renderer/shaders/shaderLibs.ts ***!
  \********************************************/
/*! exports provided: mods, repStr, shaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mods", function() { return mods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repStr", function() { return repStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shaders", function() { return shaders; });
/* harmony import */ var _mods_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mods/encode */ "./src/renderer/shaders/mods/encode.ts");
/* harmony import */ var _mods_decode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mods/decode */ "./src/renderer/shaders/mods/decode.ts");
/* harmony import */ var _mods_toneMapping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mods/toneMapping */ "./src/renderer/shaders/mods/toneMapping.ts");
/* harmony import */ var _mods_shadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mods/shadow */ "./src/renderer/shaders/mods/shadow.ts");
/* harmony import */ var _mods_brdf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mods/brdf */ "./src/renderer/shaders/mods/brdf.ts");
/* harmony import */ var _mods_lighting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mods/lighting */ "./src/renderer/shaders/mods/lighting.ts");
/* harmony import */ var _libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./libs/fullscreen_vert_glsl */ "./src/renderer/shaders/libs/fullscreen_vert_glsl.ts");
/* harmony import */ var _libs_fullscreen_frag_glsl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./libs/fullscreen_frag_glsl */ "./src/renderer/shaders/libs/fullscreen_frag_glsl.ts");
/* harmony import */ var _libs_color_vert_glsl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./libs/color_vert_glsl */ "./src/renderer/shaders/libs/color_vert_glsl.ts");
/* harmony import */ var _libs_color_frag_glsl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./libs/color_frag_glsl */ "./src/renderer/shaders/libs/color_frag_glsl.ts");
/* harmony import */ var _libs_diffuse_vert_glsl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./libs/diffuse_vert_glsl */ "./src/renderer/shaders/libs/diffuse_vert_glsl.ts");
/* harmony import */ var _libs_diffuse_frag_glsl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./libs/diffuse_frag_glsl */ "./src/renderer/shaders/libs/diffuse_frag_glsl.ts");
/* harmony import */ var _libs_cartoon_vert_glsl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./libs/cartoon_vert_glsl */ "./src/renderer/shaders/libs/cartoon_vert_glsl.ts");
/* harmony import */ var _libs_cartoon_frag_glsl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./libs/cartoon_frag_glsl */ "./src/renderer/shaders/libs/cartoon_frag_glsl.ts");
/* harmony import */ var _libs_standard_vert_glsl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./libs/standard_vert_glsl */ "./src/renderer/shaders/libs/standard_vert_glsl.ts");
/* harmony import */ var _libs_standard_frag_glsl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./libs/standard_frag_glsl */ "./src/renderer/shaders/libs/standard_frag_glsl.ts");
/* harmony import */ var _libs_fxaa_frag_glsl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./libs/fxaa_frag_glsl */ "./src/renderer/shaders/libs/fxaa_frag_glsl.ts");
/* harmony import */ var _libs_down_sampling4_frag_glsl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./libs/down_sampling4_frag_glsl */ "./src/renderer/shaders/libs/down_sampling4_frag_glsl.ts");
/* harmony import */ var _libs_gaussian_blur_frag_glsl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./libs/gaussian_blur_frag_glsl */ "./src/renderer/shaders/libs/gaussian_blur_frag_glsl.ts");
/* harmony import */ var _libs_down_sampling_to1_frag_glsl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./libs/down_sampling_to1_frag_glsl */ "./src/renderer/shaders/libs/down_sampling_to1_frag_glsl.ts");
/* harmony import */ var _libs_bloom_frag_glsl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./libs/bloom_frag_glsl */ "./src/renderer/shaders/libs/bloom_frag_glsl.ts");
/* harmony import */ var _libs_tone_mapping_frag_glsl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./libs/tone_mapping_frag_glsl */ "./src/renderer/shaders/libs/tone_mapping_frag_glsl.ts");
/* harmony import */ var _libs_lum_sample_frag_glsl__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./libs/lum_sample_frag_glsl */ "./src/renderer/shaders/libs/lum_sample_frag_glsl.ts");
/* harmony import */ var _libs_ssao_frag_glsl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./libs/ssao_frag_glsl */ "./src/renderer/shaders/libs/ssao_frag_glsl.ts");
/* harmony import */ var _libs_gbuffer_frag_glsl__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./libs/gbuffer_frag_glsl */ "./src/renderer/shaders/libs/gbuffer_frag_glsl.ts");
/* harmony import */ var _libs_deferred_shading_frag_glsl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./libs/deferred_shading_frag_glsl */ "./src/renderer/shaders/libs/deferred_shading_frag_glsl.ts");
/* harmony import */ var _libs_deferred_shading_vert_glsl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./libs/deferred_shading_vert_glsl */ "./src/renderer/shaders/libs/deferred_shading_vert_glsl.ts");
/* harmony import */ var _libs_skybox_vert_glsl__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./libs/skybox_vert_glsl */ "./src/renderer/shaders/libs/skybox_vert_glsl.ts");
/* harmony import */ var _libs_skybox_frag_glsl__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./libs/skybox_frag_glsl */ "./src/renderer/shaders/libs/skybox_frag_glsl.ts");
/* harmony import */ var _libs_blend_frag_glsl__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./libs/blend_frag_glsl */ "./src/renderer/shaders/libs/blend_frag_glsl.ts");
/* harmony import */ var _libs_depth_vert_glsl__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./libs/depth_vert_glsl */ "./src/renderer/shaders/libs/depth_vert_glsl.ts");
/* harmony import */ var _libs_depth_frag_glsl__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./libs/depth_frag_glsl */ "./src/renderer/shaders/libs/depth_frag_glsl.ts");
/* harmony import */ var _libs_log_blur_glsl__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./libs/log_blur_glsl */ "./src/renderer/shaders/libs/log_blur_glsl.ts");






const mods = {};
function addToModes(obj) {
    for (let key in obj) {
        mods[key] = obj[key];
    }
}
addToModes(_mods_encode__WEBPACK_IMPORTED_MODULE_0__);
addToModes(_mods_decode__WEBPACK_IMPORTED_MODULE_1__);
addToModes(_mods_shadow__WEBPACK_IMPORTED_MODULE_3__);
addToModes(_mods_brdf__WEBPACK_IMPORTED_MODULE_4__);
addToModes(_mods_toneMapping__WEBPACK_IMPORTED_MODULE_2__);
addToModes(_mods_lighting__WEBPACK_IMPORTED_MODULE_5__);
const reg = /#include\s*<([a-zA-Z0-9_./]+)>/;
function repStr(text) {
    let src = text;
    let result;
    do {
        result = reg.exec(src);
        if (result) {
            src = src.replace(result[0], mods[result[1]]);
        }
    } while (result);
    return src;
}



























const shaders = {
    'fullscreen': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_fullscreen_frag_glsl__WEBPACK_IMPORTED_MODULE_7__["default"]),
    },
    'color': {
        vert: repStr(_libs_color_vert_glsl__WEBPACK_IMPORTED_MODULE_8__["default"]),
        frag: repStr(_libs_color_frag_glsl__WEBPACK_IMPORTED_MODULE_9__["default"]),
    },
    'diffuse': {
        vert: repStr(_libs_diffuse_vert_glsl__WEBPACK_IMPORTED_MODULE_10__["default"]),
        frag: repStr(_libs_diffuse_frag_glsl__WEBPACK_IMPORTED_MODULE_11__["default"]),
    },
    'cartoon': {
        vert: repStr(_libs_cartoon_vert_glsl__WEBPACK_IMPORTED_MODULE_12__["default"]),
        frag: repStr(_libs_cartoon_frag_glsl__WEBPACK_IMPORTED_MODULE_13__["default"]),
    },
    'standard': {
        vert: repStr(_libs_standard_vert_glsl__WEBPACK_IMPORTED_MODULE_14__["default"]),
        frag: repStr(_libs_standard_frag_glsl__WEBPACK_IMPORTED_MODULE_15__["default"]),
        defer_src: {
            vert: repStr(_libs_standard_vert_glsl__WEBPACK_IMPORTED_MODULE_14__["default"]),
            frag: repStr(_libs_gbuffer_frag_glsl__WEBPACK_IMPORTED_MODULE_24__["default"]),
        }
    },
    'fxaa': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_fxaa_frag_glsl__WEBPACK_IMPORTED_MODULE_16__["default"]),
    },
    'down_sample4': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_down_sampling4_frag_glsl__WEBPACK_IMPORTED_MODULE_17__["default"])
    },
    'gaussian_blur': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_gaussian_blur_frag_glsl__WEBPACK_IMPORTED_MODULE_18__["default"]),
    },
    'down_sample_to1': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_down_sampling_to1_frag_glsl__WEBPACK_IMPORTED_MODULE_19__["default"]),
    },
    'bloom': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_bloom_frag_glsl__WEBPACK_IMPORTED_MODULE_20__["default"]),
    },
    'tone_mapping': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_tone_mapping_frag_glsl__WEBPACK_IMPORTED_MODULE_21__["default"]),
    },
    'lum_sample': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_lum_sample_frag_glsl__WEBPACK_IMPORTED_MODULE_22__["default"]),
    },
    'ssao': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_ssao_frag_glsl__WEBPACK_IMPORTED_MODULE_23__["default"]),
    },
    'deferred_shading': {
        vert: repStr(_libs_deferred_shading_vert_glsl__WEBPACK_IMPORTED_MODULE_26__["default"]),
        frag: repStr(_libs_deferred_shading_frag_glsl__WEBPACK_IMPORTED_MODULE_25__["default"]),
    },
    'skybox': {
        vert: repStr(_libs_skybox_vert_glsl__WEBPACK_IMPORTED_MODULE_27__["default"]),
        frag: repStr(_libs_skybox_frag_glsl__WEBPACK_IMPORTED_MODULE_28__["default"]),
    },
    'blendAO': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_blend_frag_glsl__WEBPACK_IMPORTED_MODULE_29__["default"]),
    },
    'depth': {
        vert: repStr(_libs_depth_vert_glsl__WEBPACK_IMPORTED_MODULE_30__["default"]),
        frag: repStr(_libs_depth_frag_glsl__WEBPACK_IMPORTED_MODULE_31__["default"]),
    },
    'log_blur': {
        vert: repStr(_libs_fullscreen_vert_glsl__WEBPACK_IMPORTED_MODULE_6__["default"]),
        frag: repStr(_libs_log_blur_glsl__WEBPACK_IMPORTED_MODULE_32__["default"]),
    },
};


/***/ }),

/***/ "./src/ui/Sprite.ts":
/*!**************************!*\
  !*** ./src/ui/Sprite.ts ***!
  \**************************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return Sprite; });
/* harmony import */ var _object_Object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/Object3D */ "./src/object/Object3D.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4 */ "./src/math/Matrix4.ts");
/* harmony import */ var _math_Point2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Point2 */ "./src/math/Point2.ts");




class Sprite extends _object_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"] {
    constructor() {
        super();
        /** all other paramter */
        // protected _P:{} = {};
        this._ = new Float32Array(4);
        this._isThrough = false;
        this.mouseEnable = true;
    }
    _update() {
        if (this._needsUpdate) {
            this._needsUpdate = false;
        }
    }
    needsUpdate() {
        this._needsUpdate = true;
    }
    setSize(width, height) {
        this._[0] = width;
        this._[1] = height;
        this.needsUpdate();
    }
    set width(v) {
        this._[0] = v;
    }
    get width() {
        return this._[0];
    }
    set height(v) {
        this._[1] = v;
    }
    get height() {
        return this._[1];
    }
    set rotate(v) {
        this._[2] = v;
    }
    get rotate() {
        return this._[2] = 0;
    }
    set mouseEnable(v) {
        this._[3] = v ? 1 : 0;
    }
    get mouseEnable() {
        return this._[3] !== 0;
    }
    getRectData() {
        return [this.x, this.y, this.width, this.height];
    }
    getStageData() {
        let rectData = this.getRectData();
        let mat = this._matrix;
        let xs = rectData[0];
        let ys = rectData[1];
        let xe = xs + rectData[2];
        let ye = ys + rectData[3];
        let param = [[xs, ys], [xs, ye], [xe, ye], [xe, ys]];
        let result = [];
        let vec = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];
        for (let i = 0; i < 4; i++) {
            let d = param[i];
            vec.set(d[0], d[1], 0);
            vec.applyMatrix4(mat);
            result.push(vec.x, vec.y);
        }
        return result;
    }
    isRender() {
        return false;
    }
    getUIData() {
        return '';
    }
    getIsFont() {
        return false;
    }
    /**
     * 点选检测
     * @param x client坐标x
     * @param y client坐标y
     */
    checkPick(x, y) {
        let pmat = this._parent ? this._parent.getMatrix() : _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"].unitMat4;
        let mat = _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"].pubTemp.copy(this._matrix).applyMatrix4(pmat);
        mat.invert();
        let vec = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](x, y, 0);
        vec.applyMatrix4(mat);
        let rectData = this.getRectData();
        let sx = 0;
        let sy = 0;
        let ex = sx + rectData[2];
        let ey = sy + rectData[3];
        return vec.x >= sx && vec.x <= ex && vec.y >= sy && vec.y <= ey;
    }
    /**
     * 子节点检测
     * @param x
     * @param y
     * @param e
     */
    checkChildPick(x, y, e) {
        // 是否选中自己
        if (!this.checkPick(x, y) || !this.mouseEnable) {
            return false;
        }
        // 将自己添加到path中 TODO: 可以穿透的物体没有事件怎么办？
        e.path.push(this);
        // 遍历子节点的选中情况
        let children = this._children;
        let l = children.length;
        for (let i = 0; i < l; i++) {
            let child = children[i];
            if (child.checkChildPick(x, y, e)) {
                return true;
            }
        }
        // 对自己发送事件
        this.event(e.type, [e]);
        if (!this._isThrough || e.stopPropagation) {
            return true;
        }
    }
    screenPointToLocal(pos) {
        let pmat = this._parent ? this._parent.getMatrix() : _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"].unitMat4;
        let mat = _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"].pubTemp.copy(this._matrix).applyMatrix4(pmat);
        mat.invert();
        let vec = new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](pos.x, pos.y, 0);
        vec.applyMatrix4(mat);
        return new _math_Point2__WEBPACK_IMPORTED_MODULE_3__["Point2"](vec.x, vec.y);
    }
}


/***/ }),

/***/ "./src/ui/Stage.ts":
/*!*************************!*\
  !*** ./src/ui/Stage.ts ***!
  \*************************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ "./src/ui/Sprite.ts");

class Stage extends _Sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"] {
    constructor() {
        super();
        this._data = new Float32Array(65535);
        this._indices = new Uint16Array(65535 * 2);
        this._isThrough = true;
    }
    createRenderMesh() {
        let resultObj = {
            data: this._data,
            indices: this._indices,
            dataCount: 0,
            indexCount: 0,
            result: [],
        };
        this._createRenderMesh(this, resultObj);
        return resultObj;
    }
    _createRenderMesh(sprite, resultObj) {
        if (sprite.isRender()) {
            let data = sprite.getStageData();
        }
        let children = sprite.getChildren();
        let l = children.length;
        for (let i = 0; i < l; i++) {
            let child = children[i];
            this._createRenderMesh(child, resultObj);
        }
    }
}


/***/ }),

/***/ "./src/util/Base64.ts":
/*!****************************!*\
  !*** ./src/util/Base64.ts ***!
  \****************************/
/*! exports provided: base64encode, base64decode, utf16to8, utf8to16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64encode", function() { return base64encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64decode", function() { return base64decode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf16to8", function() { return utf16to8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8to16", function() { return utf8to16; });
//下面是64个基本的编码
let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];
//编码的方法
function base64encode(str) {
    let out, i, len;
    let c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//解码的方法
function base64decode(str) {
    let c1, c2, c3, c4;
    let i, j, len, out;
    len = str.length;
    i = 0;
    out = "";
    let d = new Uint8Array(Math.ceil(len * 3 / 4));
    j = 0;
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        d[j++] = (c1 << 2) | ((c2 & 0x30) >> 4);
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return d.buffer;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return d.buffer;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        d[j++] = (c1 << 2) | ((c2 & 0x30) >> 4);
    }
    return d.buffer;
}
function utf16to8(str) {
    let out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        }
        else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
        else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}


/***/ }),

/***/ "./src/util/GeometryUtil.ts":
/*!**********************************!*\
  !*** ./src/util/GeometryUtil.ts ***!
  \**********************************/
/*! exports provided: ScreenGeometry, BoxGeometry, SphereGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenGeometry", function() { return ScreenGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxGeometry", function() { return BoxGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SphereGeometry", function() { return SphereGeometry; });
/* harmony import */ var _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphics/Geometry */ "./src/graphics/Geometry.ts");
/* harmony import */ var _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphics/ShaderConst */ "./src/graphics/ShaderConst.ts");
/* harmony import */ var _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphics/RendererParameter */ "./src/graphics/RendererParameter.ts");
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Util */ "./src/util/Util.ts");





class ScreenGeometry extends _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor() {
        super();
        this.makeTri();
    }
    makeTri() {
        let vertexPositionData = new Float32Array([
            -1, 1, 0, 1,
            -1, -3, 0, -1,
            3, 1, 2, 1,
        ]);
        let attribs = [
            {
                name: 'Position',
                attribute: _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].position,
                num: 2,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].texcoord,
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 2,
            },
        ];
        this.addMultiAttribute(attribs, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], vertexPositionData.BYTES_PER_ELEMENT * 4, vertexPositionData);
        // this.setIndexData(indexData);
        this.setDrawParameter(3);
    }
}
class BoxGeometry extends _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(l = 1, w = 1, h = 1) {
        super();
        this._size = new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"];
        this.setBoxParameter(l, w, h);
    }
    setBoxParameter(l = 1, w = 1, h = 1) {
        this._size.set(l * 0.5, w * 0.5, h * 0.5);
        this._createGeo();
    }
    _createGeo() {
        let vertices = [
            -1.0, 1.0, -1.0,
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            -1.0, 1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0
        ];
        let vertexPositionData = new Float32Array(vertices);
        let attribs = [
            {
                name: 'Position',
                attribute: _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].position,
                num: 3,
                offset: 0,
            },
        ];
        this.addMultiAttribute(attribs, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], vertexPositionData.BYTES_PER_ELEMENT * 3, vertexPositionData);
        this.setDrawParameter(36);
    }
}
class SphereGeometry extends _graphics_Geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(radius = 1, widthSegments = 16, heightSegments = 16) {
        super();
        this._radius = 1;
        this._widthSegments = 16;
        this._heightSegments = 16;
        this.setSphereParameter(radius, widthSegments, heightSegments);
    }
    setSphereParameter(radius = 1, widthSegments = 16, heightSegments = 16) {
        this._radius = radius;
        this._widthSegments = widthSegments;
        this._heightSegments = heightSegments;
        this._createGeo();
    }
    _createGeo() {
        let r = this._radius;
        let w = this._widthSegments;
        let h = this._heightSegments;
        let index = 0;
        let grid = [];
        let indices = [];
        let vertices = [];
        let normals = [];
        let uvs = [];
        let vertex = new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        let normal = new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        let phiStart = 0;
        let phiLength = Math.PI * 2;
        let thetaStart = 0;
        let thetaLength = Math.PI;
        let thetaEnd = thetaStart + thetaLength;
        let iy, ix;
        for (iy = 0; iy <= h; iy++) {
            let verticesRow = [];
            let v = iy / h;
            for (ix = 0; ix <= w; ix++) {
                let u = ix / w;
                // vertex
                vertex.x = r * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = r * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.z = r * Math.cos(thetaStart + v * thetaLength);
                vertices.push(vertex.x, vertex.y, vertex.z);
                // normal
                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);
                // uv
                uvs.push(u, 1 - v);
                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }
        for (iy = 0; iy < h; iy++) {
            for (ix = 0; ix < w; ix++) {
                var a = grid[iy][ix + 1];
                var b = grid[iy][ix];
                var c = grid[iy + 1][ix];
                var d = grid[iy + 1][ix + 1];
                if (iy !== 0)
                    indices.push(a, b, d);
                if (iy !== h - 1)
                    indices.push(b, c, d);
            }
        }
        let tangents = Object(_Util__WEBPACK_IMPORTED_MODULE_4__["calcTangent"])(vertices, uvs, normals, indices);
        this.addSingleAttribute('Position', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].position, 3, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], new Float32Array(vertices));
        this.addSingleAttribute('UV', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].texcoord, 2, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], new Float32Array(uvs));
        this.addSingleAttribute('Normal', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].normal, 3, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], new Float32Array(normals));
        this.addSingleAttribute('Tangent', _graphics_ShaderConst__WEBPACK_IMPORTED_MODULE_1__["ShaderConst"].tangent, 4, _graphics_RendererParameter__WEBPACK_IMPORTED_MODULE_2__["FLOAT"], new Float32Array(tangents));
        this.setIndexData(new Uint16Array(indices));
        this.setDrawParameter(indices.length);
        // this.addSingleAttribute('Binormal', ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
    }
}


/***/ }),

/***/ "./src/util/Handler.ts":
/*!*****************************!*\
  !*** ./src/util/Handler.ts ***!
  \*****************************/
/*! exports provided: Handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return Handler; });
/**
 * 执行的具柄
 */
class Handler {
    constructor(caller, method, args, once = false) {
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        this._id = Handler._gid++;
    }
    setTo(caller, method, args, once = false) {
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = false;
    }
    run() {
        if (!this.method)
            return null;
        const result = this.method.apply(this.caller, this.args);
        this.once && this.clear();
        return result;
    }
    runWith(data) {
        if (this.method == null)
            return null;
        let id = this._id;
        let result;
        if (data == null)
            result = this.method.apply(this.caller, this.args);
        else if (!this.args && !data.unshift)
            result = this.method.call(this.caller, data);
        else if (this.args)
            result = this.method.apply(this.caller, this.args.concat(data));
        else
            result = this.method.apply(this.caller, data);
        return result;
    }
    clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    }
}
Handler._gid = 1;


/***/ }),

/***/ "./src/util/LightDatasCache.ts":
/*!*************************************!*\
  !*** ./src/util/LightDatasCache.ts ***!
  \*************************************/
/*! exports provided: LightDatasCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightDatasCache", function() { return LightDatasCache; });
class LightDatasCache {
    constructor() {
        this._dirs = new Map();
        this._points = new Map();
        this._spots = new Map();
        this._shadowDirs = new Map();
        this._shadowPoints = new Map();
        this._shadowSpots = new Map();
    }
    _getDir(num, isShadow) {
        let dirs = isShadow ? this._shadowDirs : this._dirs;
        let obj = dirs.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            dir: { data: new Float32Array(num * 3) },
            colors: { data: new Float32Array(num * 4) }
        };
        if (isShadow) {
            obj.textures = new Array(num);
            obj.mats = { data: new Float32Array(num * 16) };
        }
        dirs.set(num, obj);
        return obj;
    }
    _getPoint(num, isShadow) {
        let points = isShadow ? this._shadowPoints : this._points;
        let obj = points.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            pos: { data: new Float32Array(num * 3) },
            colors: { data: new Float32Array(num * 4) }
        };
        if (isShadow) {
            obj.textures = new Array(num);
            obj.ranges = { data: new Float32Array(num * 2) };
        }
        points.set(num, obj);
        return obj;
    }
    _getSpot(num, isShadow) {
        let spots = isShadow ? this._shadowSpots : this._spots;
        let obj = spots.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            pos: { data: new Float32Array(num * 3) },
            dir: { data: new Float32Array(num * 4) },
            colors: { data: new Float32Array(num * 4) }
        };
        if (isShadow) {
            obj.textures = new Array(num);
            obj.mats = { data: new Float32Array(num * 16) };
            obj.ranges = { data: new Float32Array(num * 4) };
        }
        spots.set(num, obj);
        return obj;
    }
    updateDatasFromCulling(renderCulling) {
        let lightDatasCache = this;
        let pData;
        let dData;
        let cData;
        let texs;
        let rData;
        let mData;
        // light shadow
        if (renderCulling.dirShadowLightSize > 0) {
            let dirShadows = renderCulling.dirShadowLights;
            let dirShadowDatas = lightDatasCache.getShadowDir(renderCulling.dirShadowLightSize);
            dData = dirShadowDatas.dir.data;
            cData = dirShadowDatas.colors.data;
            texs = dirShadowDatas.textures;
            mData = dirShadowDatas.mats.data;
            for (let i = 0, l = renderCulling.dirShadowLightSize; i < l; i++) {
                let d = dirShadows[i].obj;
                dData.set(d.dir.v, i * 3);
                cData.set(d.color.v, i * 4);
                mData.set(d.shadow.matrix.data, i * 16);
                texs[i] = d.shadow.depthTex;
            }
        }
        if (renderCulling.spotShadowLightSize > 0) {
            let spotShadows = renderCulling.spotShadowLights;
            let spotShadowDatas = lightDatasCache.getShadowSpot(renderCulling.spotShadowLightSize);
            dData = spotShadowDatas.dir.data;
            pData = spotShadowDatas.pos.data;
            cData = spotShadowDatas.colors.data;
            rData = spotShadowDatas.ranges.data;
            mData = spotShadowDatas.mats.data;
            texs = spotShadowDatas.textures;
            for (let i = 0, l = renderCulling.spotShadowLightSize; i < l; i++) {
                let s = spotShadows[i].obj;
                let ss = s.shadow;
                dData.set(s.dir.v, i * 4);
                dData[i * 4 + 3] = Math.cos(s.angle);
                pData.set(s.pos.v, i * 3);
                cData.set(s.color.v, i * 4);
                mData.set(ss.matrix.data, i * 16);
                rData[i * 4] = ss.far;
                rData[i * 4 + 1] = 1.0 / ss.far;
                rData[i * 4 + 2] = rData[i * 4 + 3] = 1.0 / ss.size;
                texs[i] = ss.depthTex;
            }
        }
        if (renderCulling.pointShadowLightSize > 0) {
            let pointShadows = renderCulling.pointShadowLights;
            let pointShadowDatas = lightDatasCache.getShadowPoint(renderCulling.pointShadowLightSize);
            pData = pointShadowDatas.pos.data;
            cData = pointShadowDatas.colors.data;
            rData = pointShadowDatas.ranges.data;
            texs = pointShadowDatas.textures;
            for (let i = 0, l = renderCulling.pointShadowLightSize; i < l; i++) {
                let p = pointShadows[i].obj;
                let ps = p.shadow;
                pData.set(p.pos.v, i * 3);
                cData.set(p.color.v, i * 4);
                let dd = ps.far * Math.sqrt(3.0);
                rData[i * 2] = dd;
                rData[i * 2 + 1] = 1.0 / dd;
                texs[i] = ps.depthTex;
            }
        }
        // light
        let pointLights = renderCulling.pointLights;
        let dirLights = renderCulling.dirLights;
        let spotLights = renderCulling.spotLights;
        let dirDatas = lightDatasCache.getDir(renderCulling.dirLightSize);
        let pointDatas = lightDatasCache.getPoint(renderCulling.pointLightSize);
        let spotDatas = lightDatasCache.getSpot(renderCulling.spotLightSize);
        dData = dirDatas.dir.data;
        cData = dirDatas.colors.data;
        for (let i = 0, l = renderCulling.dirLightSize; i < l; i++) {
            let d = dirLights[i].obj;
            dData.set(d.dir.v, i * 3);
            cData.set(d.color.v, i * 4);
        }
        pData = pointDatas.pos.data;
        cData = pointDatas.colors.data;
        for (let i = 0, l = renderCulling.pointLightSize; i < l; i++) {
            let p = pointLights[i].obj;
            pData.set(p.pos.v, i * 3);
            cData.set(p.color.v, i * 4);
        }
        pData = spotDatas.pos.data;
        dData = spotDatas.dir.data;
        cData = spotDatas.colors.data;
        for (let i = 0, l = renderCulling.spotLightSize; i < l; i++) {
            let s = spotLights[i].obj;
            pData.set(s.pos.v, i * 3);
            dData.set(s.dir.v, i * 4);
            dData[i * 4 + 3] = Math.cos(s.angle);
            cData.set(s.color.v, i * 4);
        }
    }
    getDir(num) {
        return this._getDir(num, false);
    }
    getShadowDir(num) {
        return this._getDir(num, true);
    }
    getPoint(num) {
        return this._getPoint(num, false);
    }
    getShadowPoint(num) {
        return this._getPoint(num, true);
    }
    getSpot(num) {
        return this._getSpot(num, false);
    }
    getShadowSpot(num) {
        return this._getSpot(num, true);
    }
}


/***/ }),

/***/ "./src/util/ObjectPool.ts":
/*!********************************!*\
  !*** ./src/util/ObjectPool.ts ***!
  \********************************/
/*! exports provided: ObjectPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectPool", function() { return ObjectPool; });
class ObjectPool {
    constructor(func, defLength = 1) {
        this._data = [];
        this._func = func;
        for (let i = 0; i < defLength; i++) {
            this._data.push(new func);
        }
    }
    create() {
        if (this._data.length > 0) {
            return this._data.pop();
        }
        return new this._func;
    }
    recovery(d) {
        this._data.push(d);
    }
}


/***/ }),

/***/ "./src/util/RenderCulling.ts":
/*!***********************************!*\
  !*** ./src/util/RenderCulling.ts ***!
  \***********************************/
/*! exports provided: Object3DProxy, RenderCulling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Object3DProxy", function() { return Object3DProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderCulling", function() { return RenderCulling; });
/* harmony import */ var _math_Frustum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Frustum */ "./src/math/Frustum.ts");
/* harmony import */ var _light_Light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../light/Light */ "./src/light/Light.ts");
/* harmony import */ var _math_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Box */ "./src/math/Box.ts");
/* harmony import */ var _bounding_Bounding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bounding/Bounding */ "./src/bounding/Bounding.ts");
/* harmony import */ var _ObjectPool__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ObjectPool */ "./src/util/ObjectPool.ts");





class Object3DProxy {
}
var SortType;
(function (SortType) {
    SortType[SortType["None"] = 0] = "None";
    SortType[SortType["Positive"] = 1] = "Positive";
    SortType[SortType["Inveried"] = 2] = "Inveried";
})(SortType || (SortType = {}));
/**
 * 渲染剔除
 * TODO想办法优化这一对东西；
 */
class RenderCulling {
    constructor() {
        this._objPool = new _ObjectPool__WEBPACK_IMPORTED_MODULE_4__["ObjectPool"](Object3DProxy, 32);
        // protected _directionPool: ObjectPool<DirLightProxy> = new ObjectPool<DirLightProxy>(Object3DProxy, 4);
        // protected _pointPool: ObjectPool<PointLightProxy> = new ObjectPool<PointLightProxy>(Object3DProxy, 4);
        // protected _spotPool: ObjectPool<SpotLightProxy> = new ObjectPool<SpotLightProxy>(Object3DProxy, 4);
        this.frustum = new _math_Frustum__WEBPACK_IMPORTED_MODULE_0__["Frustum"]();
        this.opacities = new Array(64);
        this.opacitySize = 0;
        this.noDeferOpacities = new Array(8);
        this.alphaTests = new Array(16);
        this.alphaTestSize = 0;
        this.noDeferAlphaTests = new Array(4);
        this.noDeferAlphaTestSize = 0;
        this.alphaBlends = new Array(16);
        this.alphaBlendSize = 0;
        this.dirLights = new Array(4);
        this.dirLightSize = 0;
        this.dirShadowLights = new Array(2);
        this.dirShadowLightSize = 0;
        this.pointLights = new Array(4);
        this.pointLightSize = 0;
        this.pointShadowLights = new Array(2);
        this.pointShadowLightSize = 0;
        this.spotLights = new Array(4);
        this.spotLightSize = 0;
        this.spotShadowLights = new Array(2);
        this.spotShadowLightSize = 0;
        this.visibleBox = new _math_Box__WEBPACK_IMPORTED_MODULE_2__["Box"]();
    }
    culling(scene, mat4, isDefer, isShadow) {
        this.frustum.setFromMatrix(mat4);
        this.basePlane = this.frustum.getPlane(4);
        this.opacitySize =
            this.noDeferOpacitySize =
                this.alphaTestSize =
                    this.noDeferAlphaTestSize =
                        this.alphaBlendSize =
                            this.dirLightSize =
                                this.dirShadowLightSize =
                                    this.pointLightSize =
                                        this.pointShadowLightSize =
                                            this.spotLightSize =
                                                this.spotShadowLightSize =
                                                    0;
        this.visibleBox.reset();
        this._cutObject3D(scene, scene.visible, isDefer, isShadow);
        this._postCulling(this.opacities, this.opacitySize, SortType.Positive);
        this._postCulling(this.noDeferOpacities, this.noDeferOpacitySize, SortType.Positive);
        this._postCulling(this.alphaTests, this.alphaTestSize, SortType.Positive);
        this._postCulling(this.noDeferAlphaTests, this.noDeferAlphaTestSize, SortType.Positive);
        this._postCulling(this.alphaBlends, this.alphaBlendSize, SortType.Inveried);
        this._postCulling(this.dirLights, this.dirLightSize);
        this._postCulling(this.dirShadowLights, this.dirShadowLightSize);
        this._postCulling(this.pointLights, this.pointLightSize);
        this._postCulling(this.pointShadowLights, this.pointShadowLightSize);
        this._postCulling(this.spotLights, this.spotLightSize);
        this._postCulling(this.spotShadowLights, this.spotShadowLightSize);
    }
    _postCulling(ar, size, sorting = SortType.None) {
        this._clearTail(ar, size);
        if (sorting === SortType.Positive) {
            this._sortObjects(ar, false);
        }
        else if (sorting === SortType.Inveried) {
            this._sortObjects(ar, true);
        }
    }
    _clearTail(ar, size) {
        for (let i = size, l = ar.length; i < l; i++) {
            if (ar[i]) {
                this._objPool.recovery(ar[i]);
                ar[i].obj = null;
                ar[i] = null;
            }
            else {
                break;
            }
        }
    }
    _sortObjects(list, inv = false) {
        if (inv) {
            list.sort((a, b) => {
                if (!b)
                    return -1;
                if (!a)
                    return 1;
                return a.distance - b.distance;
            });
        }
        else {
            list.sort((a, b) => {
                if (!b)
                    return -1;
                if (!a)
                    return 1;
                return b.distance - a.distance;
            });
        }
    }
    _cutObject3D(obj, isRendering, isDefer, isShadow) {
        let display = obj.visible && isRendering;
        if (obj.isMesh && display) {
            this._cutMesh(obj, isDefer, isShadow);
        }
        else if (obj.isLight) {
            this._cutLight(obj);
        }
        let children = obj.getChildren();
        let l = children.length;
        for (let i = 0; i < l; i++) {
            this._cutObject3D(children[i], display, isDefer, isShadow);
        }
    }
    _setObjToArray(ar, obj, idx) {
        let proxy = ar[idx];
        if (!proxy) {
            proxy = this._objPool.create();
            ar[idx] = proxy;
        }
        proxy.obj = obj;
        proxy.distance = this.basePlane.distanceToPoint(obj.getPosition());
    }
    _cutMesh(mesh, isDefer, isShadow) {
        if (!mesh.beRendering() || (isShadow && !mesh.castShadow)) {
            return;
        }
        let visibleBox = this.visibleBox;
        let frustum = this.frustum;
        let bounding = mesh.getBounding();
        let mat = mesh.getMaterial();
        if (bounding) {
            switch (bounding.getType()) {
                case _bounding_Bounding__WEBPACK_IMPORTED_MODULE_3__["BoundingType"].TYPE_AABB:
                    let box = bounding.box;
                    if (box) {
                        if (!frustum.intersectBox(box)) {
                            return;
                        }
                        visibleBox.expandAtBox(box);
                    }
                    break;
                default:
                    break;
            }
        }
        if (mat.alphaBlend) {
            this._setObjToArray(this.alphaBlends, mesh, this.alphaBlendSize++);
        }
        else if (mat.alphaTest) {
            if (isDefer && !mat.supportDeferred) {
                this._setObjToArray(this.noDeferAlphaTests, mesh, this.noDeferAlphaTestSize++);
            }
            else {
                this._setObjToArray(this.alphaTests, mesh, this.alphaTestSize++);
            }
        }
        else {
            if (isDefer && !mat.supportDeferred) {
                this._setObjToArray(this.noDeferOpacities, mesh, this.noDeferOpacitySize++);
            }
            else {
                this._setObjToArray(this.opacities, mesh, this.opacitySize++);
            }
        }
    }
    _cutLight(light) {
        switch (light.type) {
            case _light_Light__WEBPACK_IMPORTED_MODULE_1__["LightType"].Direction:
                if (light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.dirShadowLights, light, this.dirShadowLightSize++);
                }
                else {
                    this._setObjToArray(this.dirLights, light, this.dirLightSize++);
                }
                break;
            case _light_Light__WEBPACK_IMPORTED_MODULE_1__["LightType"].Spot:
                if (light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.spotShadowLights, light, this.spotShadowLightSize++);
                }
                else {
                    this._setObjToArray(this.spotLights, light, this.spotLightSize++);
                }
                break;
            case _light_Light__WEBPACK_IMPORTED_MODULE_1__["LightType"].Point:
                if (light.shadow && light.shadow.enalbed) {
                    this._setObjToArray(this.pointShadowLights, light, this.pointShadowLightSize++);
                }
                else {
                    this._setObjToArray(this.pointLights, light, this.pointLightSize++);
                }
                break;
        }
    }
}


/***/ }),

/***/ "./src/util/TriangleIntersect.ts":
/*!***************************************!*\
  !*** ./src/util/TriangleIntersect.ts ***!
  \***************************************/
/*! exports provided: triangleIntersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triangleIntersect", function() { return triangleIntersect; });
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");

// https://blog.csdn.net/fourierfeng/article/details/11969915
let a = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
function get_vector4_det(v1, v2, v3, v4) {
    for (let i = 0; i != 3; ++i) {
        a[0][i] = v1.v[i] - v4.v[i];
        a[1][i] = v2.v[i] - v4.v[i];
        a[2][i] = v3.v[i] - v4.v[i];
    }
    return a[0][0] * a[1][1] * a[2][2]
        + a[0][1] * a[1][2] * a[2][0]
        + a[0][2] * a[1][0] * a[2][1]
        - a[0][2] * a[1][1] * a[2][0]
        - a[0][1] * a[1][0] * a[2][2]
        - a[0][0] * a[1][2] * a[2][1];
}
function direction(p1x, p1y, p2x, p2y, px, py) {
    return (px - p1x) * (p2y - p1y) - (p2x - p1x) * (py - p1y);
}
function on_segment(p1x, p1y, p2x, p2y, px, py) {
    let max = p1x > p2x ? p1x : p2x;
    let min = p1x < p2x ? p1x : p2x;
    let max1 = p1y > p2y ? p1y : p2y;
    let min1 = p1y < p2y ? p1y : p2y;
    return (px >= min && px <= max && py >= min1 && py <= max1);
}
function get_central_point(centralPoint, tri) {
    centralPoint.x = (tri.point1.x + tri.point2.x + tri.point3.x);
    centralPoint.y = (tri.point1.y + tri.point2.y + tri.point3.y);
    centralPoint.z = (tri.point1.z + tri.point2.z + tri.point3.z);
}
function segments_intersert(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    let d1, d2, d3, d4;
    d1 = direction(p3x, p3y, p4x, p4y, p1x, p1y);
    d2 = direction(p3x, p3y, p4x, p4y, p2x, p2y);
    d3 = direction(p1x, p1y, p2x, p2y, p3x, p3y);
    d4 = direction(p1x, p1y, p2x, p2y, p4x, p4y);
    if (d1 * d2 < 0 && d3 * d4 < 0) {
        return true;
    }
    else if (d1 == 0 && on_segment(p3x, p3y, p4x, p4y, p1x, p1y)) {
        return true;
    }
    else if (d2 == 0 && on_segment(p3x, p3y, p4x, p4y, p2x, p2y)) {
        return true;
    }
    else if (d3 == 0 && on_segment(p1x, p1y, p2x, p2y, p3x, p3y)) {
        return true;
    }
    else if (d4 == 0 && on_segment(p1x, p1y, p2x, p2y, p4x, p4y)) {
        return true;
    }
    return false;
}
function line_triangle_intersert_inSamePlane(tri, v1, v2, i0 = 0, i1 = 1) {
    let d1 = v1.v;
    let d2 = v2.v;
    let d3 = tri.point1.v;
    let d4 = tri.point2.v;
    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }
    d3 = tri.point2.v;
    d4 = tri.point3.v;
    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }
    d3 = tri.point1.v;
    d4 = tri.point3.v;
    if (segments_intersert(d1[i0], d1[i1], d2[i0], d2[i1], d3[i0], d3[i1], d4[i0], d4[i1])) {
        return true;
    }
    return false;
}
function is_point_within_triangle_3(tri, vec) {
    let v0 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri.point3, tri.point1).mul(3);
    let v1 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri.point2, tri.point1).mul(3);
    let v2 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().copy(tri.point1).negate().mul(3).addAt(vec);
    let dot00 = v0.dot(v0);
    let dot01 = v0.dot(v1);
    let dot02 = v0.dot(v2);
    let dot11 = v1.dot(v1);
    let dot12 = v1.dot(v2);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v0);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v1);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v2);
    let inverDeno = 1.0 / (dot00 * dot11 - dot01 * dot01);
    let u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
    if (u < 0 || u > 1) { // if u out of range, return directly
        return false;
    }
    let v = (dot00 * dot12 - dot01 * dot02) * inverDeno;
    if (v < 0 || v > 1) { // if v out of range, return directly
        return false;
    }
    return u + v <= 1;
}
function triangle_intersert_inSamePlane(tri1, tri2) {
    let v1 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri1.point2, tri1.point1);
    let v2 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri1.point3, tri1.point2);
    let d = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().crossBy(v1, v2);
    let i0 = 0, i1 = 1;
    if (d.z !== 0) {
        i0 = 0, i1 = 1;
    }
    else if (d.x !== 0) {
        i0 = 1, i1 = 2;
    }
    else if (d.y !== 0) {
        i0 = 0, i1 = 2;
    }
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v1);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v2);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(d);
    if (line_triangle_intersert_inSamePlane(tri2, tri1.point1, tri1.point2, i0, i1)) {
        return true;
    }
    else if (line_triangle_intersert_inSamePlane(tri2, tri1.point2, tri1.point3, i0, i1)) {
        return true;
    }
    else if (line_triangle_intersert_inSamePlane(tri2, tri1.point1, tri1.point3, i0, i1)) {
        return true;
    }
    else {
        let centralPoint1 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create();
        let centralPoint2 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create();
        get_central_point(centralPoint1, tri1);
        get_central_point(centralPoint2, tri2);
        let result = is_point_within_triangle_3(tri2, centralPoint1) || is_point_within_triangle_3(tri1, centralPoint2);
        _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(centralPoint1);
        _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(centralPoint2);
        return result;
    }
}
function is_point_within_triangle(tri, vec) {
    let v0 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri.point3, tri.point1);
    let v1 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(tri.point2, tri.point1);
    let v2 = _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.create().subBy(vec, tri.point1);
    let dot00 = v0.dot(v0);
    let dot01 = v0.dot(v1);
    let dot02 = v0.dot(v2);
    let dot11 = v1.dot(v1);
    let dot12 = v1.dot(v2);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v0);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v1);
    _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"].pool.recovery(v2);
    let inverDeno = 1.0 / (dot00 * dot11 - dot01 * dot01);
    let u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
    if (u < 0 || u > 1) { // if u out of range, return directly
        return false;
    }
    let v = (dot00 * dot12 - dot01 * dot02) * inverDeno;
    if (v < 0 || v > 1) { // if v out of range, return directly
        return false;
    }
    return u + v <= 1;
}
let nums = new Float32Array(9);
function triangleIntersect(tri1, tri2) {
    let tri1_a = tri1.point1, tri1_b = tri1.point2, tri1_c = tri1.point3;
    let tri2_a = tri2.point1, tri2_b = tri2.point2, tri2_c = tri2.point3;
    nums[0] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_a);
    nums[1] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_b);
    nums[2] = get_vector4_det(tri1_a, tri1_b, tri1_c, tri2_c);
    if (nums[0] > 0 && nums[1] > 0 && nums[2] > 0) {
        return false;
    }
    if (nums[0] < 0 && nums[1] < 0 && nums[2] < 0) {
        return false;
    }
    if (nums[0] === 0 && nums[0] === 0 && nums[0] === 0) {
        return triangle_intersert_inSamePlane(tri1, tri2);
    }
    if (nums[0] === 0 && nums[1] * nums[2] > 0) {
        return is_point_within_triangle(tri1, tri2_a);
    }
    else if (nums[1] === 0 && nums[2] * nums[0] > 0) {
        return is_point_within_triangle(tri1, tri2_b);
    }
    else if (nums[2] === 0 && nums[0] * nums[1] > 0) {
        return is_point_within_triangle(tri1, tri2_c);
    }
    nums[3] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_a);
    nums[4] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_b);
    nums[5] = get_vector4_det(tri2_a, tri2_b, tri2_c, tri1_c);
    if (nums[3] > 0 && nums[4] > 0 && nums[5] > 0) {
        return false;
    }
    if (nums[3] < 0 && nums[4] < 0 && nums[5] < 0) {
        return false;
    }
    if (nums[3] === 0 && nums[4] * nums[5] > 0) {
        return is_point_within_triangle(tri1, tri2_a);
    }
    else if (nums[4] === 0 && nums[5] * nums[3] > 0) {
        return is_point_within_triangle(tri1, tri2_b);
    }
    else if (nums[5] === 0 && nums[3] * nums[4] > 0) {
        return is_point_within_triangle(tri1, tri2_c);
    }
    let m;
    let im;
    if (nums[4] * nums[5] >= 0 && nums[3] !== 0) {
        if (nums[3] < 0) {
            m = tri2_b;
            tri2_b = tri2_c;
            tri2_c = m;
            im = nums[1];
            nums[1] = nums[2];
        }
    }
    else if (nums[3] * nums[5] >= 0 && nums[4] != 0) {
        m = tri1_a;
        tri1_a = tri1_b;
        tri1_b = tri1_c;
        tri1_c = m;
        if (nums[4] < 0) {
            m = tri2_b;
            tri2_b = tri2_c;
            tri2_c = m;
            im = nums[1];
            nums[1] = nums[2];
            nums[2] = im;
        }
    }
    else if (nums[3] * nums[4] >= 0 && nums[5] != 0) {
        m = tri1_a;
        tri1_a = tri1_c;
        tri1_c = tri1_b;
        tri1_b = m;
        if (nums[5] < 0) {
            m = tri2_b;
            tri2_b = tri2_c;
            tri2_c = m;
            im = nums[1];
            nums[1] = nums[2];
            nums[2] = im;
        }
    }
    if (nums[1] * nums[2] >= 0 && nums[0] != 0) {
        if (nums[0] < 0) {
            m = tri1_b;
            tri1_b = tri1_c;
            tri1_c = m;
        }
    }
    else if (nums[0] * nums[2] >= 0 && nums[1] != 0) {
        m = tri2_a;
        tri2_a = tri2_b;
        tri2_b = tri2_c;
        tri2_c = m;
        if (nums[1] < 0) {
            m = tri1_b;
            tri1_b = tri1_c;
            tri1_c = m;
        }
    }
    else if (nums[0] * nums[1] >= 0 && nums[2] != 0) {
        m = tri2_a;
        tri2_a = tri2_c;
        tri2_c = tri2_b;
        tri2_b = m;
        if (nums[2] < 0) {
            m = tri1_b;
            tri1_b = tri1_c;
            tri1_c = m;
        }
    }
    return get_vector4_det(tri1_a, tri1_b, tri2_a, tri2_b) <= 0
        && get_vector4_det(tri1_a, tri1_c, tri2_c, tri2_a) <= 0;
}


/***/ }),

/***/ "./src/util/Util.ts":
/*!**************************!*\
  !*** ./src/util/Util.ts ***!
  \**************************/
/*! exports provided: BuildOrderedDitheringData, Check2DPointInPoly, calcTangent, RepRemoveSquareBrackets, GaussianDistribution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildOrderedDitheringData", function() { return BuildOrderedDitheringData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Check2DPointInPoly", function() { return Check2DPointInPoly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcTangent", function() { return calcTangent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepRemoveSquareBrackets", function() { return RepRemoveSquareBrackets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GaussianDistribution", function() { return GaussianDistribution; });
/* harmony import */ var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3 */ "./src/math/Vector3.ts");

function BuildOrderedDitheringData(n = 4) {
    const l = Math.pow(2, n);
    const l2 = l * l;
    const r = new Array(l2);
    const cx = [0, 1, 1, 0];
    const cy = [0, 1, 0, 1];
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(Math.pow(2, n - i - 1));
    }
    let x, y, b, p;
    let t = new Uint32Array([0]);
    for (let i = 0; i < l2; i++) {
        x = y = 0;
        t[0] = i;
        for (let j = 0; j < n; j++) {
            b = t[0] % 4;
            p = a[j];
            x += cx[b] * p;
            y += cy[b] * p;
            t[0] /= 4;
        }
        r[y * l + x] = i;
    }
    let helf = l2 / 2 - 1;
    for (let i = 0; i < l2; i++) {
        if (r[i] < helf) {
            r[i]++;
        }
    }
    return r;
}
function Check2DPointInPoly(pt, poly) {
    let i, j;
    let c = false;
    for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        let posi = poly[i];
        let posj = poly[j];
        if ((((posi.y <= pt.y) && (pt.y < posj.y)) || ((posj.y <= pt.y) && (pt.y < posi.y)))
            && (pt.x < (posj.x - posi.x) * (pt.y - posi.y) / (posj.y - posi.y) + posi.x)) {
            c = !c;
        }
    }
    return c;
}
/**
     * 计算顶点切线
     *
     * @param posData 顶点位置数组
     * @param uvData 顶点uv数组
     * @param normalData 顶点法线数组
     * @param indexData 元素索引数组
     * @returns 切线数组
     */
function calcTangent(posData, uvData, normalData, indexData) {
    let numVertices = posData.length / 3;
    let numIndices = indexData.length;
    let tangentData = [];
    let binormalData = [];
    let normCoef;
    let i;
    for (i = 0; i < numVertices; i++) {
        tangentData[i * 4] = 0;
        tangentData[i * 4 + 1] = 0;
        tangentData[i * 4 + 2] = 0;
        tangentData[i * 4 + 3] = 0;
        binormalData[i * 3] = 0;
        binormalData[i * 3 + 1] = 0;
        binormalData[i * 3 + 2] = 0;
    }
    let tangent = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    let tangent2 = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    let binormal = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    let normal = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    let sdir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    let tdir = new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    for (i = 0; i < numIndices; i += 3) {
        let i1 = indexData[i];
        let i2 = indexData[i + 1];
        let i3 = indexData[i + 2];
        let v1x = posData[i1 * 3];
        let v1y = posData[i1 * 3 + 1];
        let v1z = posData[i1 * 3 + 2];
        let v2x = posData[i2 * 3];
        let v2y = posData[i2 * 3 + 1];
        let v2z = posData[i2 * 3 + 2];
        let v3x = posData[i3 * 3];
        let v3y = posData[i3 * 3 + 1];
        let v3z = posData[i3 * 3 + 2];
        let w1x = uvData[i1 * 2];
        let w1y = uvData[i1 * 2 + 1];
        let w2x = uvData[i2 * 2];
        let w2y = uvData[i2 * 2 + 1];
        let w3x = uvData[i3 * 2];
        let w3y = uvData[i3 * 2 + 1];
        let x1 = v2x - v1x;
        let x2 = v3x - v1x;
        let y1 = v2y - v1y;
        let y2 = v3y - v1y;
        let z1 = v2z - v1z;
        let z2 = v3z - v1z;
        let s1 = w2x - w1x;
        let s2 = w3x - w1x;
        let t1 = w2y - w1y;
        let t2 = w3y - w1y;
        let r = 1.0 / (s1 * t2 - s2 * t1);
        sdir.x = (t2 * x1 - t1 * x2) * r;
        sdir.y = (t2 * y1 - t1 * y2) * r;
        sdir.z = (t2 * z1 - t1 * z2) * r;
        tdir.x = (s1 * x2 - s2 * x1) * r;
        tdir.y = (s1 * y2 - s2 * y1) * r;
        tdir.z = (s1 * z2 - s2 * z1) * r;
        tangentData[i1 * 4] += sdir.x;
        tangentData[i1 * 4 + 1] += sdir.y;
        tangentData[i1 * 4 + 2] += sdir.z;
        tangentData[i2 * 4] += sdir.x;
        tangentData[i2 * 4 + 1] += sdir.y;
        tangentData[i2 * 4 + 2] += sdir.z;
        tangentData[i3 * 4] += sdir.x;
        tangentData[i3 * 4 + 1] += sdir.y;
        tangentData[i3 * 4 + 2] += sdir.z;
        binormalData[i1 * 3] += tdir.x;
        binormalData[i1 * 3 + 1] += tdir.y;
        binormalData[i1 * 3 + 2] += tdir.z;
        binormalData[i2 * 3] += tdir.x;
        binormalData[i2 * 3 + 1] += tdir.y;
        binormalData[i2 * 3 + 2] += tdir.z;
        binormalData[i3 * 3] += tdir.x;
        binormalData[i3 * 3 + 1] += tdir.y;
        binormalData[i3 * 3 + 2] += tdir.z;
    }
    for (i = 0; i < numVertices; i++) {
        //assign normal
        normal.x = normalData[i * 3];
        normal.y = normalData[i * 3 + 1];
        normal.z = normalData[i * 3 + 2];
        //normalize tangent
        tangent.x = tangentData[i * 4];
        tangent.y = tangentData[i * 4 + 1];
        tangent.z = tangentData[i * 4 + 2];
        // Gram-Schmidt orthogonalize
        let NdotT = normal.dot(tangent);
        tangent2.x = tangent.x - normal.x * NdotT;
        tangent2.y = tangent.y - normal.y * NdotT;
        tangent2.z = tangent.z - normal.z * NdotT;
        tangent2.normalize();
        tangentData[i * 4] = tangent2.x;
        tangentData[i * 4 + 1] = tangent2.y;
        tangentData[i * 4 + 2] = tangent2.z;
        binormal.x = binormalData[i * 3];
        binormal.y = binormalData[i * 3 + 1];
        binormal.z = binormalData[i * 3 + 2];
        // Calculate handedness
        tangentData[i * 4 + 3] = (normal.cross(tangent).dot(binormal) < 0) ? -1.0 : 1.0;
    }
    return tangentData;
}
const reg = /\[([a-zA-Z0-9_./]+)\]/;
function RepRemoveSquareBrackets(str) {
    let result = reg.exec(str);
    if (result) {
        return str.replace(result[0], '');
    }
}
function GaussianDistribution(x, y, rho) {
    let rho2 = 2 * rho * rho;
    let g = 1.0 / Math.sqrt(rho2 * Math.PI) * Math.exp(-(x * x + y * y) / rho2);
    return g;
}


/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./src/CGE.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/CGE.ts */"./src/CGE.ts");


/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map