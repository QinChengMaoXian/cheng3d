import * as CGE from '../graphics/RendererParameter';

import { FrameState } from '../graphics/FrameState';
import { Vector4 } from '../math/Vector4';
import { Mesh } from '../object/Mesh';
import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame';
import { Renderer, IRenderer } from './Renderer';

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
import { PostEffectsPipeline } from './PostEffectsPipeline';
import { PEType, PEBase } from './postEffect/PEBase';
import { WebGLSupports } from './WebGLSupports';
import { DeferredShadingMaterial } from '../material/DeferredShadingMaterial';
import { Frustum } from '../math/Frustum';
import { Bounding } from '../bounding/Bounding';
import { AABB } from '../bounding/AABB';

export interface RenderArgs{
    frustumCamera?: Camera;
}

/**
 * webgl 1.0 渲染器；
 * TODO: 思考 renderer 如何增加分类的释放，比如材质，纹理，几何等;
 */
export class WebGLRenderer extends Renderer implements IRenderer {

    /** canvas 对象引用 */
    private _canvas: HTMLCanvasElement;
    /** webgl 对象引用 */
    private _gl: WebGLRenderingContext;

    /** 当前帧缓冲状态 */
    private _curFrameState = new FrameState();
    /** 默认帧缓冲状态 */
    private _defFrameState = new FrameState();

    /** 窗口宽度 */
    private _screenWidth: number = -1;
    /** 窗口高度 */
    private _screenHeight: number = -1;

    /** 渲染器宽度 */
    private _width: number = -1;
    /** 渲染器高度 */
    private _height: number = -1;

    /** 宽度缩放比例 */
    private _scaleW: number = 1;
    /** 高度缩放比例 */
    private _scaleH: number = 1;

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

    /** 默认的frame */
    private _defFrame: Frame;
    

    /** 着色器缓存 */
    private _shaderCache = new ShaderCaches(this);

    /** 缓存帧组，用于需求上一帧结果时启用 */
    private _cacheFrames: Frame[];
    /** 缓存帧组索引 */
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

    /** 裁剪视锥 */
    private _frustum: Frustum = new Frustum;

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

        this._defFrame.setSize(width, height);

        this._postEffectPipline.resize(width, height);

        if (this._gFrame) {
            this._gFrame.setSize(width, height);
        }

        if (this._notClearDepthState) {
            this._notClearDepthState.setViewports(0, 0, width, height);
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
        let frame = new Frame();
        frame.setSize(width, height);
        frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.FLOAT, CGE.NEAREST, CGE.NEAREST);
        frame.enableDepthStencil();
        frame.getState().clearColor.set(0, 0, 0, 0.0);
        this._defFrame = frame;

        let frames = [];
        for (let i = 0; i < 2; i++) {
            let frame = new Frame();
            frame.setSize(width, height);
            frame.addTexture(RTLocation.COLOR, CGE.RGBA, CGE.UNSIGNED_BYTE, CGE.NEAREST, CGE.NEAREST);
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

        glProgram.getTextures().forEach((texLoc, type) => {
            let tex: Texture = mat.getTexture(type);
            if (!tex) {
                return;
            }
            let glTex = this.initTexture(tex);
            if (!glTex) {
                return;
            }
            glTex.apply(gl, texLoc);
        })

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
    public renderScene(scene: Object3D, camera?: Camera, frame?: Frame, renderArgs?: RenderArgs) {
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

        let lightsList = [];

        let frustum = this._frustum;

        this._useCamera(camera);

        if (renderArgs && renderArgs.frustumCamera) {
            frustum.setFromMatrix(renderArgs.frustumCamera.getViewProjectionMatrix());
        } else {
            camera && frustum.setFromMatrix(camera.getViewProjectionMatrix());
        }

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

        const _addToRenderList = (mesh: Mesh) => {
            let mat = (<Mesh>mesh).getMaterial();

            if (camera) {
                let bounding = mesh.getBounding();
                switch (bounding.getType()) {
                    case Bounding.TYPE_AABB:
                        if (!frustum.intersectBox((bounding as AABB).box)) {
                            return;
                        }
                        break;
                
                    default:
                        break;
                }
            }

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
                _addToRenderList(<Mesh>obj);
            }

            if (obj.isLight) {
                lightsList.push(obj);
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

                let targetFrame = this._defFrame;
                
                let depthTex = targetFrame.getDepthStencilTexture();
                targetFrame.setDepthStencil(gFrame.getDepthStencilTexture());
                gFrame.setDepthStencil(depthTex);

                this.useFrame(targetFrame, this._notClearDepthState);

                gl.disable(gl.DEPTH_TEST);                
                gl.stencilFunc(gl.EQUAL, 0x80, 0x80);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                this._renderMesh(this._deferMesh, this._defCamera);
                gl.disable(gl.STENCIL_TEST);
                gl.enable(gl.DEPTH_TEST);

                _renderList(_alphaBlendList);
            } else {
                // 正常渲染走这条，注意同样没有优化光源
                this.useFrame(this._defFrame, this._defFrameState);

                _preRenderObjects(scene, scene.visible);
                _renderList(_noAlphaList);
                _renderList(_alphaTestList);
                _renderList(_alphaBlendList);
            }

            this._useCamera(this._defCamera);
            

            let targetFrame: Frame;
            if (this._postEffectPipline.length > 0) {
                this.renderPostEffects();
                targetFrame = this._postEffectPipline.currentFrame;
            } else {
                targetFrame = this._defFrame;
            }

            this.useFrame(null);
            this._defMat.setDiffuseMap(<Texture2D>targetFrame.getTextureFromType(RTLocation.COLOR).tex);
            this._renderMesh(this._defMesh);
            this.exchangeFrame();
        } else {
            this.useFrame(frame);
            _renderScene(scene);
        }
    }

    /**
     * 后处理效果渲染
     */
    protected renderPostEffects() {
        this._postEffectPipline.render(this._defFrame, this._deferredRendering);
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
        return this.rendererId;
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
    public get currectFrame(): Frame {
        return this._cacheFrames[this._frameIndex];
    }

    /**
     * 获取颜色源帧缓冲
     */
    public get lastFrame(): Frame {
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

    /**
     * 获取GBuffer的Frame
     */
    public getGBufferFrame(): Frame {
        return this._deferredRendering ? this._gFrame : null;
    }

    /**
     * 切换延迟渲染
     */
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
    public disableDeferredRendering() {
        this._swtichDeferredRendering(false);
    }

    /**
     * 获取是否开启了延迟渲染
     */
    public get isEnableDeferredRender() {
        return this._deferredRendering;
    }
}
