import * as CGE from '../graphics/RendererParameter'
import { Logger } from '../core/Base'
import { MatrixType } from '../graphics/GraphicsTypes'
import { Texture } from '../graphics/Texture'
import { Texture2D } from '../graphics/Texture2D'
import { TextureCube } from '../graphics/TextureCube'
import { RenderTargetState } from '../graphics/RenderTargetState'
import { Base } from '../core/Base'
import { Matrix4 } from '../math/Matrix4'
import { Vector4 } from '../math/Vector4'

import { glBuffer } from './glObject/glBuffer'
import { glDraw } from './glObject/glDraw'
import { glFrame } from './glObject/glFrame'
import { glProgram } from './glObject/glProgram'
import { glTexture2D } from './glObject/glTexture2D'
import { glTextureCube } from './glObject/glTextureCube'
import { glTexture } from './glObject/glTexture';

export function WebGLRenderer(): void {
    // TODO: The Function name MUST use '_' inital that all called _gl function;
    // TODO: Take unless _gl's function out of constructor;

    let _canvas = document.createElement('canvas');
    let _gl = _canvas.getContext('webgl', {antialias: true});

    if (_gl === undefined) {
        alert('Can not use webgl');
        return undefined;
    }

    let _ext = {};

    let getExtension = function(extName) {
        let ext = _gl.getExtension(extName) || _gl.getExtension('WEBKIT_' + extName) || _gl.getExtension('MOZ_' + extName);
        if (!ext) {
            alert('Can not use webgl extension ' + extName);
        }
        return ext;
    };

    _ext['OES_vertex_array_object'] = getExtension("OES_vertex_array_object");
    _ext['WEBGL_draw_buffers'] = getExtension("WEBGL_draw_buffers");
    _ext['OES_standard_derivatives'] = getExtension("OES_standard_derivatives");
    _ext['OES_texture_half_float'] = getExtension("OES_texture_half_float");
    _ext['OES_texture_float'] = getExtension("OES_texture_float");
    _ext['WEBGL_depth_texture'] = getExtension("WEBGL_depth_texture");
    _ext['EXT_texture_filter_anisotropic'] = getExtension("EXT_texture_filter_anisotropic");

    if (!_ext['WEBGL_draw_buffers']
        || !_ext['OES_standard_derivatives']
        || !_ext['OES_texture_half_float']
        || !_ext['OES_texture_float']
        || !_ext['WEBGL_depth_texture']
        || !_ext['EXT_texture_filter_anisotropic']) {
        alert('Can not use webgl extension');
        return undefined;
    }

    Object.assign(_gl, {
        VERTEX_ARRAY_BINDING: _ext['OES_vertex_array_object'].VERTEX_ARRAY_BINDING_OES,
        MAX_COLOR_ATTACHMENTS: _ext['WEBGL_draw_buffers'].MAX_COLOR_ATTACHMENTS_WEBGL,
        MAX_DRAW_BUFFERS: _ext['WEBGL_draw_buffers'].MAX_DRAW_BUFFERS_WEBGL,
        TEXTURE_MAX_ANISOTROPY: _ext['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT,

        createVertexArray: _ext['OES_vertex_array_object'].createVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        deleteVertexArray: _ext['OES_vertex_array_object'].deleteVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        bindVertexArray: _ext['OES_vertex_array_object'].bindVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        isVertexArray: _ext['OES_vertex_array_object'].isVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        
        drawBuffers: _ext['WEBGL_draw_buffers'].drawBuffersWEBGL.bind(_ext['WEBGL_draw_buffers']),
    });

    // TODO: Add a class to control gl context;

    let ANISOTROPY = 2.0;
    _gl.enable(_gl.DEPTH_TEST);
    _gl.depthFunc(_gl.LEQUAL);
    _gl.disable(_gl.BLEND);

    // this function is ONLY used for DEBUG;
    this.getContext = function() {
        return _gl;
    };

    let clear = function(color, depth, stencil) {
        _gl.clear(
            (color ? _gl.COLOR_BUFFER_BIT : 0) |
            (depth ? _gl.DEPTH_BUFFER_BIT : 0) |
            (stencil ? _gl.STENCIL_BUFFER_BIT : 0)
        );
    };


    let defaultTargetState = new RenderTargetState();
    let currentTargetState = new RenderTargetState();

    let applyTergetState = function(state) {
        let color = state.clearColor;
        _gl.clearColor(color.x, color.y, color.z, color.w);
        let viewport = state.viewport;
        _gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);

        if (state.isClearDepth !== currentTargetState.isClearDepth) {
            currentTargetState.isClearDepth = state.isClearDepth;
            if (state.isClearDepth) {
                _gl.enable(_gl.DEPTH_TEST);
            } else {
                _gl.disable(_gl.DEPTH_TEST);
            }
        }
        clear(state.isClearColor, state.isClearDepth, state.isClearStencil);
    };

    let self = this;

    // let initializedMap = new Map();
    // this.getInitializedMap = function() {
    //     return initializedMap;
    // };

    let renderCount = 0;
    let screenWidth = 0, 
        screenHeight = 0;

    this.enableDepthTest = function() {
        defaultTargetState.setClearDepth(true);
    };

    this.disableDepthTest = function() {
        defaultTargetState.setClearDepth(false);
    };

    this.setSize = function(width, height) {
        _canvas.width = width;
        _canvas.height = height;
        screenWidth = width;
        screenHeight = height;
        defaultTargetState.setViewport(new Vector4(0, 0, width, height));
    };

    this.setOffset = function(x, y, w, h) {
        defaultTargetState.setViewport(new Vector4(x, y, w, h));
    };

    this.setClearColor = function(r, g, b, a) {
        defaultTargetState.setClearColor(true, new Vector4(r, g, b, a));
    };

    this.getCanvas = function() {
        return _canvas;
    };

    this.clear = function (color, depth, stencil){
        defaultTargetState.setClearColor(true, color);
        defaultTargetState.setClearDepth(true, depth);
        defaultTargetState.setClearStencil(true, stencil);
    };

    this.initGeometry = function(geometry) {
        let glbuffer = geometry.getRenderObjectRef(this);
        if (!glbuffer) {
            glbuffer = new glBuffer();
            geometry.setRenderObjectRef(this, glbuffer);
        }
        if (!glbuffer.getUpdate()) {
            return glbuffer;
        }
        if(!glbuffer.generateFromGeometry(_gl, geometry)) {
            glbuffer = null;
            geometry.setRenderObjectRef(this, null);
        }
        return glbuffer;
    };

    this.initShader = function(shader) {
        let glprogram = shader.getRenderObjectRef(this);
        if (glprogram !== undefined) {
            return glprogram;
        }

        glprogram = new glProgram();
        if (glprogram.generateFromShader(_gl, shader)) {
            shader.setRenderObjectRef(this, glprogram);
            return glprogram;
        }
    };

    this.initTexture = function(texture: Texture) {
        let gltexture:any = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
            return gltexture;
        }
            
        if (texture instanceof Texture2D) {
            gltexture = new glTexture2D(_gl);
            if (gltexture.generateFromTexture(_gl, texture)) {
                texture.setRenderObjectRef(this, gltexture);
                return gltexture;
            }
        } else if (texture instanceof TextureCube) {
            gltexture = new glTextureCube(_gl);
        }
    };

    this._getCameraMatrices = function(camera) {
        return {
            viewMatirx: camera.getMatrix().clone(),
            projectionMatirx: camera.getProjectionMatrix().clone(),
            viewProjectionMatirx: camera.getViewProjectionMatrix().clone(),
        }
    };

    this._renderMesh = function(mesh, camera) {
        let geo = mesh.getGeometry();
        let mat = mesh.getMaterial();

        let buffer = this.initGeometry(geo);
        if (!buffer) {
            return;
        }

        let shader = this.initShader(mat.getShader());
        if (!shader) {
            return;
        }

        let maps = mat.getPropertyProvide();
        let l = maps.length;
        for (let i = 0; i < l; i++) {
            let map = maps[i];
            let tex = this.initTexture(map.map);
            
        }

    }

    this._renderObject3D = function(object3D, camera) {
        if (object3D.beRendering()) {
            this._render(object3D, camera);
        }

        const children = object3D.getChildren();
        const l = children.length;
        for(let i = 0; i < l; i++) {
            const child = children[i];
            this._renderMesh(child, camera);
        }
    }

    this.renderScene = function(scene, camera) {
        
    }
};
