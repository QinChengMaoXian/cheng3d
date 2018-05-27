import * as CGE from '../graphics/RendererParameter';
import { Logger } from '../core/Base';
import { MatrixType } from '../graphics/GraphicsTypes';

import { RenderTargetState } from '../graphics/RenderTargetState';
import { Base } from '../core/Base';
import { Matrix4 } from '../math/Matrix4';
import { Vector4 } from '../math/Vector4';
import { Scene } from '../object/Scene';
import { Mesh } from '../object/Mesh';
import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame';
import { FXAA } from './postEffect/FXAA';
import { Renderer } from './Renderer';

import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';
import { Geometry } from '../graphics/Geometry';
import { Shader } from '../graphics/Shader';

import { RenderTargetLocation } from '../graphics/GraphicsTypes';
import { FullScreenMaterial } from '../material/FullScreenMaterial';

import { glBuffer } from './glObject/glBuffer'
import { glDraw } from './glObject/glDraw'
import { glMesh } from './glObject/glMesh'
import { glFrame } from './glObject/glFrame'
import { glProgram } from './glObject/glProgram'
import { glTexture2D } from './glObject/glTexture2D'
import { glTextureCube } from './glObject/glTextureCube'
import { glTexture } from './glObject/glTexture';
import { PlaneGeometry } from '../util/GeometryUtil';


export class WebGLRenderer extends Base implements Renderer {
    private static RendererNum = 0;

    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _ext: {} = {};

    private _defaultTargetState = new RenderTargetState();

    private _screenWidth: number = -1;
    private _screenHeight: number = -1;

    private _renderCount: number = 0;

    private _mesh: Mesh;

    private _glMesh: glMesh;

    private _curFrame: Frame;

    private _defFrame: Frame;

    private _renderToFloatTexture: boolean = false;
    private _renderToHalfFloatTexture: boolean = false;

    private _rendererId = WebGLRenderer.RendererNum++;

    constructor() {
        super();
        this.init();
    }

    public init() {
        this._canvas = document.createElement('canvas');
        const _canvas = this._canvas;

        this._gl = _canvas.getContext('webgl', {antialias: true});
        const _gl = this._gl;

        this._initExtensions();

        this._initFrame();

        _gl.enable(_gl.DEPTH_TEST);
        _gl.depthFunc(_gl.LEQUAL);
        _gl.disable(_gl.BLEND);

        this._glMesh = new glMesh();
    }

    public enableDepthTest() {
        this._defaultTargetState.setClearDepth(true);
    }

    public disableDepthTest() {
       this._defaultTargetState.setClearDepth(false);
    }

    public setOffset(x, y, w, h) {
        this._defaultTargetState.setViewport(new Vector4(x, y, w, h));
    }

    public setClearColor(r, g, b, a) {
        this._defaultTargetState.setClearColor(true, new Vector4(r, g, b, a));
    }

    public clear(color?: Vector4, depth?: boolean, stencil?: boolean) {
        const defaultTargetState = this._defaultTargetState;
        if (color !== null || color !== undefined) {
            defaultTargetState.setClearColor(true, color);
        }

        if (color !== null || color !== undefined) {

        }
        // defaultTargetState.setClearColor(true, color);
        // defaultTargetState.setClearDepth(true, depth);
        // defaultTargetState.setClearStencil(true, stencil);
    }

    public initGeometry(geometry: Geometry) {
        let glbuffer: glBuffer = <glBuffer>geometry.getRenderObjectRef(this);
        if (!glbuffer) {
            glbuffer = new glBuffer();
            geometry.setRenderObjectRef(this, glbuffer);
        }
        if (!glbuffer.getUpdate()) {
            return glbuffer;
        }
        if(!glbuffer.generateFromGeometry(this._gl, geometry)) {
            glbuffer = null;
            geometry.setRenderObjectRef(this, null);
        }
        return glbuffer;
    }

    public initShader(shader: Shader) {
        let glprogram: glProgram = <glProgram>shader.getRenderObjectRef(this);
        if (!glprogram) {
            glprogram = new glProgram();
            shader.setRenderObjectRef(this, glprogram);
        }

        if (!glprogram.getUpdate()) {
            return glprogram
        }

        if (!glprogram.generateFromShader(this._gl, shader)) {
            glprogram = null;
            shader.setRenderObjectRef(this, null);
        }
        return glprogram;
    }

    public initTexture(texture: Texture) {
        let _gl = this._gl;
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
    }

    public initFrame(frame: Frame) {
        let glframe: glFrame = <glFrame>frame.getRenderObjectRef(this);
        if (!glframe) {
            glframe = new glFrame();
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

    public useFrame(frame?: Frame) {
        const gl = this._gl;

        if (!frame) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return;
        }

        let glframe = this.initFrame(frame);

        if (!glframe) {
            return;
        }

        glframe.apply(gl);
    }

    public renderScene(scene: Object3D, camera: Camera, frame?: Frame) {
        let _camera;
        let _cameraMatrices;
        let _renderList = [];
        const gl = this._gl;

        const _getCameraMatrices = (camera) => {
            return {
                viewMatirx: camera.getMatrix().clone(),
                projectionMatirx: camera.getProjectionMatrix().clone(),
                viewProjectionMatirx: camera.getViewProjectionMatrix().clone(),
            }
        };

        let glmesh = this._glMesh;
        const _renderMesh = (mesh: Mesh, camera) => {
            let geo = mesh.getGeometry();
            let mat = mesh.getMaterial();
            let shader = mat.getShader();
            let images = mat.getTextures();
            return glmesh.draw(this, gl, mesh, shader, images, _cameraMatrices);
        }

        const _render = () => {
            let l = _renderList.length;
            for (let i = 0; i < l; i++) {
                let mesh = _renderList[i];
                _renderMesh(mesh, _camera);
            }
        }

        const _addToRenderList = (mesh) => {
            _renderList.push(mesh);
        }

        const _preRenderObjects = (obj) => {
            if(obj.beRendering()) {
                _addToRenderList(obj);
            }
            const children = obj.getChildren();
            const l = children.length;
            for(let i = 0; i < l; i++) {
                const child = children[i];
                _preRenderObjects(child);
            }
        }

        const _renderScene = (scene: Object3D, camera: Camera, frame?: Frame) => {
            this.clear();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            let v = this._defaultTargetState.viewport;
            gl.viewport(v.x, v.y, v.z, v.w); 

            _camera = camera;
            _cameraMatrices = _getCameraMatrices(camera);
            _renderList = [];
            _preRenderObjects(scene);
            _render();
        }

        this.useFrame(this._defFrame);
        _renderScene(scene, camera, frame);
        this.useFrame(null);
        _renderScene(this._mesh, camera);
    }

    /**
     * Do NOT call this function;
     */
    public _renderPostEffect(scene: Object3D, camera?: Camera) {

    }

    public setSize (width, height) {
        const _canvas = this._canvas;

        _canvas.width = width;
        _canvas.height = height;
        this._screenWidth = width;
        this._screenHeight = height;
        this._defFrame.setSize(width, height);
        this._defaultTargetState.setViewport(new Vector4(0, 0, width, height));
    };

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public getContext(): WebGLRenderingContext {
        return this._gl;
    }

    private _initFrame() {
        let frame = new Frame();
        frame.setSize(this._canvas.width, this._canvas.height);
        frame.addTexture(RenderTargetLocation.COLOR, CGE.RGBA, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.enableDepthStencil();
        this._defFrame = frame;

        let mesh = new Mesh();
        let geo = new PlaneGeometry();
        let mat = new FullScreenMaterial(frame.getTextureFromType(RenderTargetLocation.COLOR));
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._mesh = mesh;
    }

    private _initExtensions() {
        const _gl = this._gl;
        let _ext = this._ext;

        let getExtension = function(extName) {
            let ext = _gl.getExtension(extName) || _gl.getExtension('WEBKIT_' + extName) || _gl.getExtension('MOZ_' + extName);
            if (!ext) {
                Logger.warn('Can not use webgl extension ' + extName);
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
            Logger.error('Can not use webgl extension');
            return undefined;
        }

        Object.assign(_gl, {
            VERTEX_ARRAY_BINDING: _ext['OES_vertex_array_object'].VERTEX_ARRAY_BINDING_OES,
            MAX_COLOR_ATTACHMENTS: _ext['WEBGL_draw_buffers'].MAX_COLOR_ATTACHMENTS_WEBGL,
            MAX_DRAW_BUFFERS: _ext['WEBGL_draw_buffers'].MAX_DRAW_BUFFERS_WEBGL,
            TEXTURE_MAX_ANISOTROPY: _ext['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT,

            // createVertexArray: _ext['OES_vertex_array_object'].createVertexArrayOES.bind(_ext['OES_vertex_array_object']),
            // deleteVertexArray: _ext['OES_vertex_array_object'].deleteVertexArrayOES.bind(_ext['OES_vertex_array_object']),
            // bindVertexArray: _ext['OES_vertex_array_object'].bindVertexArrayOES.bind(_ext['OES_vertex_array_object']),
            // isVertexArray: _ext['OES_vertex_array_object'].isVertexArrayOES.bind(_ext['OES_vertex_array_object']),
            
            drawBuffers: _ext['WEBGL_draw_buffers'].drawBuffersWEBGL.bind(_ext['WEBGL_draw_buffers']),
        });
    }

    public getRendererId(): number {
        return this._rendererId;
    }
}
