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

import { RTLocation } from '../graphics/GraphicsTypes';
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
import { Event } from '../core/Event';
import { Base } from '../core/Base';
import { Matrix4 } from '../math/Matrix4';
import { PostEffectsPipeline } from './PostEffectsPipeline';
import { PEType, PEBase, PEReqType } from './postEffect/PEBase';
import { WebGLSupports } from './WebGLSupports';
import { DeferredShadingMaterial } from '../material/DeferredShadingMaterial';
import { glTexture } from './glObject/glTexture';


/**
 * webgl 1.0 渲染器；
 * TODO: 思考 renderer 如何增加分类的释放，比如材质，纹理，几何等;
 */
export class WebGLRenderer extends Base implements IRenderer {
    /** 渲染器计数 */
    private static RendererNum = 0;

    /** canvas 对象引用 */
    private _canvas: HTMLCanvasElement;
    /** webgl 对象引用 */
    private _gl: WebGLRenderingContext;

    /** 当前帧缓冲状态 */
    private _curFrameState = new FrameState();
    /** 默认帧缓冲状态 */
    private _defFrameState = new FrameState();

    /** 渲染器宽度 */
    private _screenWidth: number = -1;
    /** 渲染器高度 */
    private _screenHeight: number = -1;

    /** 渲染帧数计数 */
    private _renderCount: number = 0;

    /** 用于Gamma的Mesh */
    private _defMesh: Mesh;
    /** 用于Gamma的材质 */
    private _defMat: FullScreenMaterial;
    /** 用于全屏渲染的几何体 */
    private _defGeo: Geometry;

    /** 渲染到默认frame时传入的相机 */
    private _defCamera: Camera;

    /** 当前的frame */
    private _curFrame: Frame;
    // private _defFrame: Frame;

    /** 是否可以渲染到浮点纹理,TODO：这个检测如何实现？ */
    private _renderToFloatTexture: boolean = false;
    /** 是否可以渲染到半浮点纹理 TODO：这个检测如何实现？ */
    private _renderToHalfFloatTexture: boolean = false;
    
    /** 当前渲染器的id */
    private _rendererId = WebGLRenderer.RendererNum++;

    /** 着色器缓存 */
    private _shaderCache = new ShaderCaches(this);

    /** 缓存的离屏帧缓冲对象 */
    private _cacheFrames: Frame[];
    /** 缓存的离屏帧缓冲当前索引 */
    private _frameIndex: number;

    /** 当前时间，只在渲染到默认帧缓冲时更新 */
    private _timeNow: number;
    /** 间隔时间，只在渲染到默认帧缓冲时更新*/
    private _deltaTime: number;

    /** 后处理管线管理 */
    private _postEffectPipline: PostEffectsPipeline;

    /** gl支持的扩展组 */
    private _ext: WebGLSupports;

    /** 是否是延迟渲染 */
    private _deferredRendering: boolean = false;

    /** gBuffer Frame */
    private _gFrame: Frame;
    
    /** 延迟着色用的Mesh */
    private _deferMesh: Mesh;

    /** 延迟着色用的材质 */
    private _deferMat: DeferredShadingMaterial

    /** 不清理深度的帧缓冲状态对象 */
    private _notClearDepthState: FrameState;

    constructor() {
        super();
    }

    /**
     * 通过长宽初始化
     * 其中包括生成canvas
     * TODO：canvas是否需要外部传入
     * @param width 
     * @param height 
     */
    public init(width: number, height: number) {
        this._canvas =  Platform.createCanvas();
        const _canvas = this._canvas;

        this._gl = <WebGLRenderingContext>_canvas.getContext('webgl');
        const _gl = this._gl;

        this._initExtensions();

        this._initDefFrame(width, height);
        
        this._initDefMesh();

        this._postEffectPipline = new PostEffectsPipeline(this);
        this._postEffectPipline.init(this._defGeo);

        this.setSize(width, height);

        // TODO: remove this;
        _gl.enable(_gl.DEPTH_TEST);
        _gl.depthFunc(_gl.LEQUAL);
        // _gl.enable(_gl.BLEND);
        _gl.cullFace(_gl.BACK);

        this._timeNow = Date.now();
    }

    /**
     * 设置渲染器大小，
     * 注意，这个会更改掉canvas大小
     */
    public setSize(width: number, height: number) {
        const _canvas = this._canvas;

        _canvas.width = width;
        _canvas.height = height;

        this._screenWidth = width;
        this._screenHeight = height;

        this._defFrameState.setViewports(0, 0, width, height);
        this._defFrameState.setClearStencil(true);

        this._cacheFrames.forEach(frame => {
            frame.setSize(width, height);
            this.initFrame(frame);
        })

        this._postEffectPipline.resize(width, height);

        if (this._gFrame) {
            this._gFrame.setSize(width, height);
        }

        this.event(Event.RENDERER_RESIZE, [width, height]);
    };

    /**
     * 初始化默认Mesh
     */
    private _initDefMesh() {
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

    /**
     * 初始化渲染器默认离屏帧缓冲；
     * @param width 
     * @param height 
     */
    private _initDefFrame(width: number, height: number) {
        let frames = [];
        for (let i = 0; i < 2; i++) {
            let frame = new Frame();
            frame.setSize(width, height);
            frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
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
    private _initExtensions() {
        const gl = this._gl;
        let ext = new WebGLSupports();
        ext.init(gl, true);
        this._ext = ext;
        // let getExtension = function(extName) {
        //     let ext = _gl.getExtension(extName) || _gl.getExtension('WEBKIT_' + extName) || _gl.getExtension('MOZ_' + extName);
        //     if (!ext) {
        //         Logger.warn('Can not use webgl extension ' + extName);
        //     }
        //     return ext;
        // };

        // _ext['OES_vertex_array_object'] = getExtension("OES_vertex_array_object");
        // _ext['WEBGL_draw_buffers'] = getExtension("WEBGL_draw_buffers");
        // _ext['OES_standard_derivatives'] = getExtension("OES_standard_derivatives");
        // _ext['OES_texture_half_float'] = getExtension("OES_texture_half_float");
        // _ext['OES_texture_float'] = getExtension("OES_texture_float");
        // _ext['OES_texture_float_linear'] = getExtension("OES_texture_float_linear");
        // _ext['WEBGL_depth_texture'] = getExtension("WEBGL_depth_texture");
        // _ext['EXT_texture_filter_anisotropic'] = getExtension("EXT_texture_filter_anisotropic");
        // _ext['EXT_shader_texture_lod'] = getExtension('EXT_shader_texture_lod');

        // if (!_ext['WEBGL_draw_buffers']
        //     || !_ext['OES_standard_derivatives']
        //     || !_ext['OES_texture_half_float']
        //     || !_ext['OES_texture_float']
        //     || !_ext['WEBGL_depth_texture']
        //     || !_ext['EXT_texture_filter_anisotropic']) {
        //     // Logger.error('Can not use webgl extension');
        //     return undefined;
        // }

        // Object.assign(_gl, {
        //     VERTEX_ARRAY_BINDING: _ext['OES_vertex_array_object'].VERTEX_ARRAY_BINDING_OES,
        //     MAX_COLOR_ATTACHMENTS: _ext['WEBGL_draw_buffers'].MAX_COLOR_ATTACHMENTS_WEBGL,
        //     MAX_DRAW_BUFFERS: _ext['WEBGL_draw_buffers'].MAX_DRAW_BUFFERS_WEBGL,
        //     TEXTURE_MAX_ANISOTROPY: _ext['EXT_texture_filter_anisotropic'].TEXTURE_MAX_ANISOTROPY_EXT,

        //     createVertexArray: _ext['OES_vertex_array_object'].createVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        //     deleteVertexArray: _ext['OES_vertex_array_object'].deleteVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        //     bindVertexArray: _ext['OES_vertex_array_object'].bindVertexArrayOES.bind(_ext['OES_vertex_array_object']),
        //     isVertexArray: _ext['OES_vertex_array_object'].isVertexArrayOES.bind(_ext['OES_vertex_array_object']),
            
        //     drawBuffers: _ext['WEBGL_draw_buffers'].drawBuffersWEBGL.bind(_ext['WEBGL_draw_buffers']),
        // });
    }

    /** 
     * 启用深度测试
     */
    public enableDepthTest() {
        this._defFrameState.setClearDepth(true);
    }

    /** 
     * 关闭深度测试
     */
    public disableDepthTest() {
       this._defFrameState.setClearDepth(false);
    }

    /**
     *  窗口显示尺寸设置 
     */
    public setViewports(x, y, w, h) {
        this._defFrameState.setViewports(x, y, w, h);
    }

    /**  
     * 设置清理颜色
     */
    public setClearColor(r, g, b, a) {
        this._defFrameState.setClearColor(true, new Vector4(r, g, b, a));
    }

    /** 
     * 初始化与更新几何对象
     */
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

    /** 
     * 初始化与更新纹理对象
     */
    public initTexture(texture: Texture) {
        let _gl = this._gl;
        let gltexture:any = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
            return gltexture;
        }

        if (texture instanceof Texture2D) {
            if (!texture.loaded) {
                return this.initTexture(texture._def);
            } else {
                let tex = new glTexture2D(_gl);
                if (tex.generateFromTexture2D(_gl, texture)) {
                    texture.setRenderObjectRef(this, tex);
                    return tex;
                }
            }
        } else if (texture instanceof TextureCube) {
            let tex = new glTextureCube(_gl);
            if (tex.generateFromTextureCube(_gl, texture)) {
                texture.setRenderObjectRef(this, tex);
                return tex;
            }
        }
    }

    /** 
     * 初始化与更新帧缓冲对象
     */
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

    /** 
     * 初始化与更新
     */
    public initMaterial(mat: Material) {
        let shaderCache = this._shaderCache;
        let glprog = shaderCache.genShaderProgram(mat, this._deferredRendering);
        if (!glprog) {
            return null;
        }
        return glprog;
    }

    /** 纹理索引的cache 临时写在这里 */
    private _texIdx = {};

    /** 
     * 新增或者更新Mesh的数据
     * 当前为了着色器的引用计数
     */
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
        let texIdx = this._texIdx;

        mat.getTextures().forEach((tex, type) => {
            let glTex: glTexture = this.initTexture(tex);
            if (glTex) {
                let texLoc = glProgram.getTextureIndex(type);
                if (texLoc !== undefined && texLoc !== null) {
                    if (this._texIdx[texLoc] !== glTex) {
                        glTex.apply(gl, texLoc);
                        texIdx[texLoc] = glTex;
                    }
                }
            }
        });

        return true;
    }

    /** 
     * 移除Mesh
     * 当前为了移除着色器的引用计数
     */
    releaseMesh(mesh: Mesh) {
        let mat = mesh.getMaterial();
        if (mat) {
            this._shaderCache.releaseMaterial(mat);
        }

        mesh.setGeometry(null);
        mesh.setMaterial(null);
    }

    /**
     * 应用帧缓冲状态
     * @param frameState 
     */
    public useFrameState(frameState: FrameState) {
        const gl = this._gl;

        let cache = this._curFrameState;
        let clearBit = 0;

        if (!cache.viewport.equal(frameState.viewport)) {
            cache.viewport.setAt(frameState.viewport);
            let data = cache.viewport.data;
            gl.viewport(data[0], data[1], data[2], data[3]);
        }

        if (!frameState.needClear) {
            return;
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

    /**
     * 应用帧缓冲
     * @param frame 帧缓冲对象 
     * @param frameState 允许额外指定一个帧缓冲状态
     */
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

        glframe.apply(gl, this._ext);
        this.useFrameState(frameState? frameState: frame.getState());
        this._curFrame = frame;
    }

    /**
     * 绘制一个Mesh
     * @param mesh Mesh对象
     * @param camera 相机对象
     */
    protected _renderMesh(mesh: Mesh, camera?: Camera) {
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

    /**
     * 渲染到默认帧缓冲
     * @param scene 
     * @param camera 
     */
    protected _renderDefScene(scene: Object3D, camera: Camera) {

    }

    /**
     * 渲染到指定帧缓冲
     * @param scene 
     * @param camera 
     * @param frame 
     */
    protected _renderScene2Frame(scene: Object3D, camera: Camera, frame: Frame) {

    }

    /**
     * 将相机对象数据存入矩阵
     * @param camera 
     */
    protected _useCamera(camera: Camera) {
        if (camera) {
            glProgram.vMatrix.copy(camera.getMatrix());
            glProgram.pMatrix.copy(camera.getProjectionMatrix());
            glProgram.vpMatrix.copy(camera.getViewProjectionMatrix());
        }
    }

    /**
     * 渲染场景的总入口
     * TODO：这里将会通过判定是否存在camera或者是否存在frame分离。
     * @param scene
     * @param camera 
     * @param frame 
     */
    public renderScene(scene: Object3D, camera?: Camera, frame?: Frame) {
        let gl = this._gl;

        if (!frame) {
            let now = Date.now();
            this._deltaTime = now - this._timeNow;
            this._timeNow = now;
            this._defCamera = camera;
        }

        let _noAlphaList = [];
        let _alphaTestList = [];
        let _alphaBlendList =[];

        this._useCamera(camera);
        
        if (scene.isScene) {
            let light = (<Scene>scene).getMainLight();
            glProgram.lightDir.copy(light.getDirection());
            glProgram.lightColor.copy(light.getColor());
        }

        const _renderList = (renderList) => {
            let l = renderList.length;
            for (let i = 0; i < l; i++) {
                let mesh = renderList[i];
                this._renderMesh(mesh, camera);
            }
        }

        const _addToRenderList = (mesh) => {
            let mat = (<Mesh>mesh).getMaterial();
            if (mat.alphaBlend) {
                _alphaBlendList.push(mesh);
            } else if (mat.alphaTest) {
                _alphaTestList.push(mesh);
            } else {
                _noAlphaList.push(mesh);
            }
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
            _preRenderObjects(scene, scene.visible);
            _renderList(_noAlphaList);
            _renderList(_alphaTestList);
            _renderList(_alphaBlendList);
        }

        if (!frame) {
            if (this._deferredRendering) {
                // 延迟渲染流程走这里，注意灯光优化还没开始。
                let gFrame = this._gFrame;
                this.initFrame(gFrame);

                _preRenderObjects(scene, scene.visible);

                this.useFrame(gFrame);

                gl.enable(gl.STENCIL_TEST);
                gl.stencilFunc(gl.ALWAYS, 0x80, 0xFF);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

                _renderList(_noAlphaList);
                _renderList(_alphaTestList);
                // this._deferMat.setDepthMap(gFrame.getDepthStencilTexture());
                this._deferMat.setPixelSize(1.0 / this._screenWidth, 1.0 / this._screenHeight);

                let targetFrame = this.currectTargetFrame;
                
                let depthTex = targetFrame.getDepthStencilTexture();
                targetFrame.setDepthStencil(gFrame.getDepthStencilTexture());
                gFrame.setDepthStencil(depthTex);

                this.useFrame(targetFrame, this._notClearDepthState);

                gl.disable(gl.DEPTH_TEST);                
                gl.stencilFunc(gl.EQUAL, 0x80, 0xFF);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                this._renderMesh(this._deferMesh, this._defCamera);
                gl.disable(gl.STENCIL_TEST);
                gl.enable(gl.DEPTH_TEST);

                _renderList(_alphaBlendList);
            } else {
                // 正常渲染走这条，注意同样没有优化光源
                this.useFrame(this.currectTargetFrame, this._defFrameState);
                _renderScene(scene);
            }

            this.exchangeFrame();
            this._useCamera(this._defCamera);
            this.renderPostEffects();

            this.useFrame(null);
            this._defMat.setDiffuseMap(<Texture2D>this.currentColorFrame.getTextureFromType(RTLocation.COLOR).tex);
            this._renderMesh(this._defMesh);

        } else {
            this.useFrame(frame);
            _renderScene(scene);
        }
    }

    /**
     * 后处理效果渲染
     */
    protected renderPostEffects() {
        this._postEffectPipline.render();
    }

    /**
     * 获取canvas
     */
    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    /**
     * 获取webgl context
     */
    public getContext(): WebGLRenderingContext {
        return this._gl;
    }

    /**
     * 获取渲染器Id
     */
    public getRendererId(): number {
        return this._rendererId;
    }

    /**
     * 获取渲染器宽度
     */
    public getWidth(): number {
        return this._screenWidth;
    }

    /**
     * 获取渲染器高度
     */
    public getHeight(): number {
        return this._screenHeight;
    }

    /**
     * 交换帧缓冲
     */
    public exchangeFrame() {
        this._frameIndex = (this._frameIndex + 1) % this._cacheFrames.length;
    }

    /**
     * 获取渲染目标帧缓冲
     */
    public get currectTargetFrame(): Frame {
        return this._cacheFrames[this._frameIndex];
    }

    /**
     * 获取颜色源帧缓冲
     */
    public get currentColorFrame(): Frame {
        return this._cacheFrames[(this._frameIndex + 1) % this._cacheFrames.length];
    }

    /**
     * 两帧的间隔时间，单位毫秒
     */
    public get deltaTime(): number {
        return this._deltaTime;
    }

    /**
     * 获取渲染到默认帧缓冲的相机
     */
    public get defCamera() {
        return this._defCamera;
    }

    /**
     * 根据后处理管线需求与延迟渲染，更新默认帧缓冲的结构。
     */
    public updateDefFrame() {
        let srcReqs = this._postEffectPipline.getSrcReqs();
    }

    /**
     * 通过类型或者后处理对象禁用后处理
     * @param pe 
     */
    public disablePostEffect(pe: PEType | PEBase) {
        this._postEffectPipline.disablePostEffect(pe);
        this.updateDefFrame();
    }

    /**
     * 通过类型或者后处理对象启用后处理
     * @param pe 
     */
    public enablePostEffect(pe: PEType | PEBase) {
        this._postEffectPipline.enablePostEffect(pe);
        this.updateDefFrame();
    }

    /**
     * 获取当前启用的后处理类型组
     */
    public getEnablingPostEffect(): PEType[] {
        return this._postEffectPipline.getEnablingPostEffect();
    }

    protected _swtichDeferredRendering(v: boolean) {
        if (this._deferredRendering === v) {
            return;
        }

        if (v) {
            if (!this._gFrame) {
                let frame = new Frame;
                frame.setSize(this._screenWidth, this._screenHeight);
                frame.addTexture(RTLocation.RT0, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
                frame.addTexture(RTLocation.RT1, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
                frame.addTexture(RTLocation.RT2, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
                frame.enableDepthStencil();
                frame.getState().setClearColor(true, Vector4.Zero);
                this._gFrame = frame;
            }

            if (!this._deferMesh) {
                let frame = this._gFrame;
                let mat = new DeferredShadingMaterial();
                let tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT0).tex)
                mat.setDiffuseMap(tex);
                tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT1).tex)
                mat.setNormalMap(tex);
                tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT2).tex)
                mat.setDepthMap(tex);
                this._deferMat = mat;

                let mesh = new Mesh();
                mesh.setGeometry(this._defGeo);
                mesh.setMaterial(mat);
                this._deferMesh = mesh;
            }

            if (!this._notClearDepthState) {
                let state = new FrameState();
                state.setClearDepth(false);
                state.setClearColor(true, this._defFrameState.clearColor);
                state.setClearStencil(false, this._defFrameState.clearStencil);
                state.setViewportAt(this._defFrameState.viewport);
                this._notClearDepthState = state;
            }
        }

        this._deferredRendering = v;
    }

    /**
     * 启用延迟渲染
     */
    public enableDeferredRendering() {
        this._swtichDeferredRendering(true);
    }

    /**
     * 禁用延迟渲染
     */
    public disalbeDeferredRendering() {
        this._swtichDeferredRendering(false);
    }

    /**
     * 获取是否开启了延迟渲染
     */
    public get isEnableDeferredRender() {
        return this._deferredRendering;
    }
}
