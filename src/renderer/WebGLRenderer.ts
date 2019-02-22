import * as CGE from '../graphics/RendererParameter';
import { Logger } from '../core/Logger';

import { FrameState } from '../graphics/FrameState';
import { Vector4 } from '../math/Vector4';
import { Mesh } from '../object/Mesh';
import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame';
import { IRenderer } from './Renderer';

import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';
import { Geometry } from '../graphics/Geometry';
import { ScreenGeometry } from '../util/GeometryUtil';

import { RenderTargetLocation } from '../graphics/GraphicsTypes';
import { FullScreenMaterial } from '../material/FullScreenMaterial';

import { glGeometry } from './glObject/glGeometry'
import { glFrame } from './glObject/glFrame'
import { glTexture2D } from './glObject/glTexture2D'
import { glTextureCube } from './glObject/glTextureCube'
import { Platform } from '../platform/Platform';
import { ShaderCaches } from './shaders/ShaderCaches';
import { Material } from '../material/Material';
import { glProgram } from './glObject/glProgram';
import { Scene } from '../object/Scene';
import { FXAA } from './postEffect/FXAA';
import { Event } from '../core/Event';
import { Base } from '../core/Base';
import { Matrix4 } from '../math/Matrix4';
import { PEType, PEBase, PEOrder } from './postEffect/PEBase';
import { HDR } from './postEffect/HDR';

/**
 * webgl 1.0 渲染器；
 * TODO: 思考 renderer 是否需要增加分类的释放，比如材质，纹理，几何等
 */
export class WebGLRenderer extends Base implements IRenderer {
    private static RendererNum = 0;

    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _ext: {} = {};

    private _curFrameState = new FrameState();
    private _defFrameState = new FrameState();

    private _screenWidth: number = -1;
    private _screenHeight: number = -1;

    private _renderCount: number = 0;

    private _defMesh: Mesh;
    private _defMat: FullScreenMaterial;
    private _defGeo: Geometry;

    private _curFrame: Frame;
    // private _defFrame: Frame;

    private _renderToFloatTexture: boolean = false;
    private _renderToHalfFloatTexture: boolean = false;

    private _rendererId = WebGLRenderer.RendererNum++;

    private _shaderCache = new ShaderCaches(this);

    private _cacheFrames: Frame[];
    private _frameIndex: number;

    private _postEffects: PEBase[];

    private _timeNow: number;
    private _deltaTime: number;

    constructor() {
        super();
    }

    public init(width: number, height: number) {
        this._canvas =  Platform.createCanvas();
        const _canvas = this._canvas;

        this._gl = <WebGLRenderingContext>_canvas.getContext('webgl');
        const _gl = this._gl;

        this._initExtensions();

        this._initDefFrame(width, height);

        this.setSize(width, height);

        this._postEffects = [];

        // TODO: remove this;
        _gl.enable(_gl.DEPTH_TEST);
        _gl.depthFunc(_gl.LEQUAL);
        // _gl.enable(_gl.BLEND);
        _gl.cullFace(_gl.BACK);

        this._timeNow = Date.now();
    }

    public enableDepthTest() {
        this._defFrameState.setClearDepth(true);
    }

    public disableDepthTest() {
       this._defFrameState.setClearDepth(false);
    }

    public setOffset(x, y, w, h) {
        this._defFrameState.setViewport(new Vector4(x, y, w, h));
    }

    public setClearColor(r, g, b, a) {
        // this._defFrame.getState().clearColor.set(r, g, b, 0.0);
        this._defFrameState.setClearColor(true, new Vector4(r, g, b, a));
    }

    public initGeometry(geometry: Geometry) {
        let glgeo: glGeometry = <glGeometry>geometry.getRenderObjectRef(this);
        if (!glgeo) {
            glgeo = new glGeometry();
            geometry.setRenderObjectRef(this, glgeo);
        }
        if (!glgeo.getUpdate()) {
            return glgeo;
        }
        if(!glgeo.generateFromGeometry(this._gl, geometry)) {
            glgeo = null;
            geometry.setRenderObjectRef(this, null);
        }
        return glgeo;
    }

    public initTexture(texture: Texture) {
        let _gl = this._gl;
        let gltexture:any = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
            return gltexture;
        }

        if (texture instanceof Texture2D) {
            let tex = new glTexture2D(_gl);
            if (tex.generateFromTexture2D(_gl, texture)) {
                texture.setRenderObjectRef(this, tex);
                return tex;
            }
        } else if (texture instanceof TextureCube) {
            let tex = new glTextureCube(_gl);
            if (tex.generateFromTextureCube(_gl, texture)) {
                texture.setRenderObjectRef(this, tex);
                return tex;
            }
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

    public initMaterial(mat: Material) {
        let shaderCache = this._shaderCache;
        let glprog = shaderCache.genShaderProgram(mat);
        if (!glprog) {
            return null;
        }
        return glprog;
    }

    retainMesh(mesh: Mesh) {
        let gl = this._gl;
        let glGeo = this.initGeometry(mesh.getGeometry());
        if (!glGeo) {
            return false;
        }

        let mat = mesh.getMaterial();
        let glProgram = this.initMaterial(mesh.getMaterial());
        if (!glProgram) {
            return false;
        }

        //TODO: 加载的纹理还没加载好怎么办？
        mat.getTextures().forEach((texture, type) => {
            let glTexture = this.initTexture(texture);
            if (glTexture) {
                let texIndex = glProgram.getTextureIndex(type);
                if (texIndex !== null && texIndex !== undefined) {
                    glTexture.apply(gl, texIndex);
                }
            }
        });

        return true;
    }

    releaseMesh(mesh: Mesh) {
        let mat = mesh.getMaterial();
        if (mat) {
            this._shaderCache.releaseMaterial(mat);
        }

        mesh.setGeometry(null);
        mesh.setMaterial(null);
    }

    public useFrameState(frameState: FrameState) {
        const gl = this._gl;

        let cache = this._curFrameState;
        let clearBit = 0;

        if (!cache.viewport.equal(frameState.viewport)) {
            cache.viewport.setAt(frameState.viewport);
            let data = cache.viewport.data;
            gl.viewport(data[0], data[1], data[2], data[3]);
        }

        cache.isClearColor = frameState.isClearColor;
        if (cache.isClearColor) {
            clearBit = clearBit | gl.COLOR_BUFFER_BIT;
            if (!cache.clearColor.equal(frameState.clearColor)) {
                cache.clearColor.setAt(frameState.clearColor);
                let data = cache.clearColor.data;
                gl.clearColor(data[0], data[1], data[2], data[3]);
            }
        }

        cache.isClearDepth = frameState.isClearDepth;
        if (cache.isClearDepth) {
            clearBit = clearBit | gl.DEPTH_BUFFER_BIT;
            if (cache.clearDepth !== frameState.clearDepth) {
                cache.clearDepth = frameState.clearDepth;
                gl.clearDepth(cache.clearDepth);
            }
        }
        
        cache.isClearStencil = frameState.isClearStencil;
        if (cache.isClearStencil) {
            clearBit = clearBit | gl.STENCIL_BUFFER_BIT;
            if (cache.clearStencil !== frameState.clearStencil) {
                cache.clearStencil = frameState.clearStencil;
                gl.clearStencil(cache.clearStencil);
            }
        }

        gl.clear(clearBit);

    }

    public useFrame(frame?: Frame, frameState?: FrameState) {
        const gl = this._gl;

        if (!frame) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            this.useFrameState(this._defFrameState);
            this._curFrame = null;
            return;
        }

        if (this._curFrame === frame) {
            return;
        }

        let glframe = this.initFrame(frame);

        if (!glframe) {
            return;
        }

        glframe.apply(gl);
        this.useFrameState(frameState? frameState: frame.getState());
        this._curFrame = frame;
    }

    protected _renderMesh = (mesh: Mesh, camera?: Camera) => {
        let gl = this._gl;

        if (!this.retainMesh(mesh)) {
            return;
        }

        let geo = mesh.getGeometry();
        let glgeo = (geo.getRenderObjectRef(this) as glGeometry);
        
        let mat = mesh.getMaterial();
        let glprog = (mat.shader.getRenderObjectRef(this) as glProgram);

        glprog.apply(gl);
        glgeo.bindVbo(gl, glprog, geo);
        glprog.applyUniforms(gl, mesh, camera);
        glgeo.draw(gl);
    }

    public renderScene(scene: Object3D, camera?: Camera, frame?: Frame) {
        if (!frame) {
            let now = Date.now();
            this._deltaTime = now - this._timeNow;
            this._timeNow = now;
        }

        let _renderList = [];

        glProgram.vMatrix.copy(camera ? camera.getMatrix() : Matrix4.unitMat4);
        glProgram.pMatrix.copy(camera ? camera.getProjectionMatrix() : Matrix4.unitMat4);
        glProgram.vpMatrix.copy(camera ? camera.getViewProjectionMatrix(): Matrix4.unitMat4);

        if (scene instanceof Scene) {
            let light = (<Scene>scene).getMainLight();
            glProgram.lightDir.copy(light.getDirection());
            glProgram.lightColor.copy(light.getColor());
        }

        const _render = () => {
            let l = _renderList.length;
            for (let i = 0; i < l; i++) {
                let mesh = _renderList[i];
                this._renderMesh(mesh, camera);
            }
        }

        const _addToRenderList = (mesh) => {
            _renderList.push(mesh);
        }

        const _preRenderObjects = (obj: Object3D, isRendering: boolean) => {
            let display = obj.visible && isRendering;
            if(obj.beRendering() && display) {
                _addToRenderList(obj);
            }

            const children = obj.getChildren();
            const l = children.length;
            for(let i = 0; i < l; i++) {
                const child = children[i];
                _preRenderObjects(child, display);
            }
        }

        const _renderScene = (scene: Object3D) => {
            _renderList = [];
            _preRenderObjects(scene, scene.visible);
            _render();
        }

        if (!frame) {
            this.useFrame(this.currectTargetFrame, this._defFrameState);
            _renderScene(scene);
            
            this._exchangeFrame();
            this.renderPostEffects();

            this.useFrame(null);
            this._defMat.setDiffuseMap(<Texture2D>this.currentColorFrame.getTextureFromType(RenderTargetLocation.COLOR).tex);
            this._renderMesh(this._defMesh);

        } else {
            this.useFrame(frame);
            _renderScene(scene);
        }
    }

    protected renderPostEffects() {
        this._postEffects.forEach(pe => {
            pe.render();
            this._exchangeFrame();
        })
    }

    public setSize(width: number, height: number) {
        const _canvas = this._canvas;

        _canvas.width = width;
        _canvas.height = height;

        this._screenWidth = width;
        this._screenHeight = height;

        this._defFrameState.setViewport(new Vector4(0, 0, width, height));

        this._cacheFrames.forEach(frame => {
            frame.setSize(width, height);
            this.initFrame(frame);
        })

        this.event(Event.RENDERER_RESIZE, [width, height]);
    };

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public getContext(): WebGLRenderingContext {
        return this._gl;
    }

    private _initDefFrame(width: number, height: number) {

        let frames = [];
        for (let i = 0; i < 2; i++) {
            let frame = new Frame();
            frame.setSize(width, height);
            frame.addTexture(RenderTargetLocation.COLOR, CGE.RGBA, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
            frame.enableDepthStencil();
            frame.getState().clearColor.set(0, 0, 0, 0.0);
            this.initFrame(frame);
            frames.push(frame);
        }

        this._cacheFrames = frames;
        this._frameIndex = 0;

        let mesh = new Mesh();
        let geo = new ScreenGeometry();
        geo.makeTri();
        this._defGeo = geo;

        let mat = new FullScreenMaterial();
        this._defMat = mat;
        mesh.setGeometry(geo);
        mesh.setMaterial(mat);
        this._defMesh = mesh;
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
        _ext['OES_texture_float_linear'] = getExtension("OES_texture_float_linear");
        _ext['WEBGL_depth_texture'] = getExtension("WEBGL_depth_texture");
        _ext['EXT_texture_filter_anisotropic'] = getExtension("EXT_texture_filter_anisotropic");
        _ext['EXT_shader_texture_lod'] = getExtension('EXT_shader_texture_lod');

        if (!_ext['WEBGL_draw_buffers']
            || !_ext['OES_standard_derivatives']
            || !_ext['OES_texture_half_float']
            || !_ext['OES_texture_float']
            || !_ext['WEBGL_depth_texture']
            || !_ext['EXT_texture_filter_anisotropic']) {
            // Logger.error('Can not use webgl extension');
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
    }

    public getRendererId(): number {
        return this._rendererId;
    }

    public getWidth(): number {
        return this._screenWidth;
    }

    public getHeight(): number {
        return this._screenHeight;
    }
    
    protected _exchangeFrame() {
        this._frameIndex = (this._frameIndex + 1) % this._cacheFrames.length;
    }

    public exchangeFrame() {
        this._exchangeFrame();
    }

    public get currectTargetFrame(): Frame {
        return this._cacheFrames[this._frameIndex];
    }

    public get currentColorFrame(): Frame {
        return this._cacheFrames[(this._frameIndex + 1) % this._cacheFrames.length];
    }

    public get deltaTime(): number {
        return this._deltaTime;
    }

    protected _enablePostEffect(pe: PEBase) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === pe.order) {
                pes[i] = pe;
                return;
            }
        }
        pes.push(pe);
        pes.sort((a, b) => { return b.order - a.order });
    }

    protected _disablePostEffect(pe: PEBase) {
        let idx = this._postEffects.indexOf(pe);
        if (idx > -1) {
            this._postEffects.splice(idx, 1);
            pe.destroy();
        }
    }

    protected _createPEFromType(type: PEType) {
        let pe: PEBase;
        switch (type) {
            case PEType.FXAA:
                let fxaa = new FXAA(this);
                fxaa.init(this._defGeo);
                pe = fxaa;
                break;

            case PEType.HDR:
                let hdr = new HDR(this);
                hdr.init(this._defGeo);
                pe = hdr;
            default:
                break;
        }
        return pe;
    }

    public disablePostEffect(pe: PEType | PEBase) {
        if (pe instanceof PEBase) {
            this._disablePostEffect(pe);
        } else {
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

    public disablePostEffectByOrder(order: PEOrder) {
        let pes = this._postEffects;
        let l = pes.length;
        for (let i = 0; i < l; i++) {
            if (pes[i].order === order) {
                this._disablePostEffect(pes[i]);
                return;
            }
        }
    }

    public enablePostEffect(pe: PEType | PEBase) {
        if (pe instanceof PEBase) {
            this._enablePostEffect(pe);
        } else {
            let peObj = this._createPEFromType(pe);
            if (peObj) {
                this.enablePostEffect(peObj);
            }
        }
    }

    public getEnablingPostEffect(): PEType[] {
        let a = [];
        this._postEffects.forEach(p => {
            a.push(p.type);
        })
        return a;
    }
}
