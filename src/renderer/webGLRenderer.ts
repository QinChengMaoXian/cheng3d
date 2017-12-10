import * as CGE from '../graphics/RendererParameter'
import { Logger } from '../core/Base'
import { MatrixType } from '../graphics/GraphicsTypes'
import { Texture2D } from '../graphics/Texture2D'
import { TextureCube } from '../graphics/TextureCube'
import { RenderTargetState } from '../graphics/RenderTargetState'
import { ObjectBase } from '../core/ObjectBase'
import { Matrix4 } from '../math/Matrix4'
import { Vector4 } from '../math/Vector4'

import { glBuffer } from './glObject/glBuffer'
import { glDraw } from './glObject/glDraw'
import { glFrame } from './glObject/glFrame'
import { glMesh } from './glObject/glMesh'
import { glProgram } from './glObject/glProgram'
import { glTexture2D } from './glObject/glTexture2D'
import { glTextureCube } from './glObject/glTextureCube'

export function WebGLRenderer():void {
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

    if (!_ext['OES_vertex_array_object']
        || !_ext['WEBGL_draw_buffers']
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

        // if (state.isClearStencil !== currentTargetState.isClearStencil) {
        //     currentTargetState.isClearStencil = state.isClearStencil;
        //     if (state.isClearStencil) {
        //         _gl.enable(_gl.STENCIL_TEST);
        //     } else {
        //         _gl.disable(_gl.STENCIL_TEST);
        //     }
        // }

        clear(state.isClearColor, state.isClearDepth, state.isClearStencil);
    };

    let self = this;

    // let initializedMap = new Map();
    // glBuffer --->  Geometry
    // glProgram  ---> material & shader
    // glTexturexd  ----> texturexd
    // glFrame -----> renderTarget

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
        if (glbuffer && glbuffer.getLocalVersion() === geometry.getUpdateVersion()) {
            return glbuffer;
        }

        glbuffer = new glBuffer();
        if (glbuffer.generateFromGeometry(_gl, geometry)) {
            geometry.setRenderObjectRef(this, glbuffer);
            return glbuffer;
        }

        // let glbuffer = initializedMap.get(geometry.id);
        // if (glbuffer !== undefined && glbuffer.getLocalVersion() === geometry.getUpdateVersion()) 
        //     return glbuffer;

        // glbuffer = new glBuffer();
        // if (glbuffer.generateFromGeometry(_gl, geometry)) {
        //     initializedMap.set(geometry.id, glbuffer);
        //     return glbuffer;
        // }
    };

    this.initShader = function(shader) {
        let glprogram = shader.getRenderObjectRef(this);
        if (glprogram && glprogram.getLocalVersion() === shader.getUpdateVersion()) {
            return glprogram;
        }

        glprogram = new glProgram();
        if (glprogram.generateFromShader(_gl, shader)) {
            shader.setRenderObjectRef(this, glprogram);
            return glprogram;
        }

        // let glprogram = initializedMap.get(shader.id);
        // if (glprogram !== undefined && glprogram.getLocalVersion() === shader.getUpdateVersion()) 
        //     return glprogram;

        // glprogram = new glProgram();
        // if (glprogram.generateFromShader(_gl, shader)) {
        //     initializedMap.set(shader.id, glprogram);
        //     return glprogram;
        // }
    };

    this.initTexture = function(texture) {
        let gltexture = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && gltexture.getLocalVersion() === texture.getUpdateVersion()) {
            return gltexture;
        }
            
        if (texture instanceof Texture2D) {
            gltexture = new glTexture2D(_gl);
        } else if (texture instanceof TextureCube) {
            gltexture = new glTextureCube(_gl);
        }

        if (gltexture.generateFromTexture(_gl, texture)) {
            texture.setRenderObjectRef(this, gltexture);
            return gltexture;
        }

        // let gltexture = initializedMap.get(texture.id);
        // if (gltexture !== undefined && gltexture.getLocalVersion() === texture.getUpdateVersion()) 
        //     return gltexture; 
        // if (texture instanceof Texture2D) {
        //     gltexture = new glTexture2D(_gl);
        // } else if (texture instanceof TextureCube) {
        //     gltexture = new glTextureCube(_gl);
        // }
        // if (gltexture.generateFromTexture(_gl, texture)) {
        //     initializedMap.set(texture.id, gltexture);
        //     return gltexture;
        // }
    };

    let _glMeshManager = {
        _glMeshMap: new Map(),
        addGLMesh: function(geometryId, shaderId, glmesh) {
            let map = this._glMeshMap.get(geometryId);
            if (map === undefined) {
                map = new Map();
                this._glMeshMap.set(geometryId, map);
            }
            map.set(shaderId, glmesh);
        },

        getGLMesh: function(geometryId, shaderId) {
            let map = this._glMeshMap.get(geometryId);
            if (map === undefined) {
                return undefined;
            }
            return map.get(shaderId);
        },
    };

    // meshMap struct: map(bufferId, map(shaderId, glMesh));

    this._renderEntity = function(entity, cameraMatrices) {
        let geometry = entity.geometry;
        let shader = entity.material.getShader();
        let glmesh = _glMeshManager.getGLMesh(geometry.id, shader.id);

        // TODO: What's the fxxk this?
        if (glmesh !== undefined
            && glmesh.getLocalVersion() === geometry.getUpdateVersion() 
            && glmesh.get2ndLocalVersion() === shader.getUpdateVersion()) {
            glmesh.checkGLObject(this, entity);
        } else {
            glmesh = new glMesh();
            if (glmesh.generate(_gl, this, entity)) {
                _glMeshManager.addGLMesh(geometry.id, shader.id, glmesh);
            } else {
                return undefined;
            }
        }
        glmesh.apply(_gl, entity, cameraMatrices);
        glmesh.draw(_gl);
    };

    this._getCameraMatrices = function(camera) {
        return {
            viewMatirx: camera.getMatrix().clone(),
            projectionMatirx: camera.getProjectionMatrix().clone(),
            viewProjectionMatirx: camera.getViewProjectionMatrix().clone(),
        }
    };

    // let maxFrameAttachment = _gl.getParameter(_gl.MAX_COLOR_ATTACHMENTS);

    this.applyRenderTarget = function(renderTarget) {
        if (renderTarget.isFollowScreen) {
            renderTarget.setSize(screenWidth, screenHeight);
        }
        // let glframe = initializedMap.get(renderTarget.id);
        // if (glframe && glframe.getLocalVersion() === renderTarget.getUpdateVersion()) {
        //     if (!glframe.checkTextures(this, renderTarget.getTextureMap(), renderTarget.getDepthStencilTexture())) {
        //         return undefined;
        //     }
        // } else {
        //     glframe = new glFrame();
        //     if (!glframe.generateFromRenderTarget(_gl, this, renderTarget, maxFrameAttachment)) {
        //         return undefined;
        //     }
        //     initializedMap.set(renderTarget.id, glframe);
        // }
        // glframe.apply(_gl);
        // applyTergetState(renderTarget.getState());
    };

    this.renderScene = function(scene, renderTarget) {
        // TODO: renderTarget should be managed by something;
        if (renderTarget === undefined) {
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            applyTergetState(defaultTargetState);
        } else {
            self.applyRenderTarget(renderTarget);
        }
        clear(true, true, false);
        renderCount++;
        let camera = scene.getMainCamera();
        if (camera === undefined) {
            Logger.warn('follow scene miss mainCamera');
            return undefined;
        }
        let cameraMatrices = this._getCameraMatrices(camera);
        let entities = scene.getRenderEntities();
        entities.forEach(function(entity) {
            this._renderEntity(entity, cameraMatrices);
        }.bind(this));
    };
};
