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
import { ScreenGeometry, SphereGeometry } from '../util/GeometryUtil';

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
import { PostEffectsPipeline } from './pipeline/PostEffectsPipeline';
import { PEType, PEBase } from './postEffect/PEBase';
import { WebGLSupports } from './WebGLSupports';
import { DeferredShadingMaterial } from '../material/DeferredShadingMaterial';
import { Light, LightType } from '../light/Light';
import { PointLight } from '../light/PointLight';
import { glTexture } from './glObject/glTexture';
import { WebGLStateCache } from './WebGLStateCache';
import { RenderBase } from '../graphics/RenderBase';
import { Matrix4 } from '../math/Matrix4';
import { Box } from '../math/Box';
import { Shadow } from '../light/Shadow';
import { RenderCulling } from '../util/RenderCulling';
import { ShadowMapPipeline } from './pipeline/ShadowMapPipeline';
import { DeferredPipeline } from './pipeline/DeferredPipeline';
import { DirectionLight } from '../light/DirectionLight';
import { SpotLight } from '../light/SpotLight';


export interface RenderArgs{
    frustumCamera?: Camera;
}

export class LightDatasCache {

    protected _dirs: Map<number, {dir: {data: Float32Array}, colors: {data: Float32Array}}> = new Map();
    protected _points: Map<number, {pos: {data: Float32Array}, colors: {data: Float32Array}}> = new Map();
    protected _spots: Map<number, {pos: {data: Float32Array}, dir: {data: Float32Array}, colors: {data: Float32Array}}> = new Map();

    public getDir(num: number) {
        let obj = this._dirs.get(num);
        if (obj) {
            return obj;
        }

        obj = {
            dir: {
                data: new Float32Array(num * 3)
            },
            colors: {
                data: new Float32Array(num * 4)
            }
        }
        this._dirs.set(num, obj);

        return obj;
    }

    public getPoint(num: number) {
        let obj = this._points.get(num);
        if (obj) {
            return obj;
        }

        obj = {
            pos: {
                data: new Float32Array(num * 3)
            },
            colors: {
                data: new Float32Array(num * 4)
            }
        }
        this._points.set(num, obj);

        return obj;
    }

    public getSpot(num: number) {
        let obj = this._spots.get(num);
        if (obj) {
            return obj;
        }

        obj = {
            pos: {
                data: new Float32Array(num * 3)
            },
            dir: {
                data: new Float32Array(num * 4)
            },
            colors: {
                data: new Float32Array(num * 4)
            }
        }
        this._spots.set(num, obj);

        return obj;
    }
}

// const lights = {
//     dirD: { data: new Float32Array(3) },
//     dirC: { data: new Float32Array(3) },
//     pointP: { data: new Float32Array(3) },
//     pointC: { data: new Float32Array(3) },
//     spotP: { data: new Float32Array(3) },
//     spotD: { data: new Float32Array(3) },
//     spotC: { data: new Float32Array(3) },
// } 

/**
 * webgl 1.0 渲染器；
 * TODO: 思考 renderer 如何增加分类的释放，比如材质，纹理，几何等;
 */
export class WebGLRenderer extends Renderer implements IRenderer {

    /** canvas 对象引用 */
    private _canvas: HTMLCanvasElement;
    /** webgl 对象引用 */
    private _gl: WebGLRenderingContext;

    /** WebGL状态缓存 */
    private _stateCache: WebGLStateCache;

    /** 默认帧缓冲状态 */
    private _defFrameState = new FrameState();
        
    /** 着色器缓存 */
    private _shaderCache = new ShaderCaches(this);

    /** 后处理管线管理 */
    private _postEffectPipeline: PostEffectsPipeline;

    /** 阴影渲染管线 */
    private _shadowMapPipeline: ShadowMapPipeline;

    /** 延迟渲染管线 */
    private _deferredPipeling: DeferredPipeline;

    /** gl支持的扩展组 */
    private _ext: WebGLSupports;

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
    /** 当前应用的相机 */
    private _curCamera: Camera;

    /** 当前的frame */
    private _curFrame: Frame;
    /** 默认的frame */
    private _defFrame: Frame;

    /** 缓存帧组，用于需求上一帧结果时启用 */
    private _cacheFrames: Frame[];
    /** 缓存帧组索引 */
    private _frameIndex: number;

    /** 当前时间，只在渲染到默认帧缓冲时更新 */
    private _timeNow: number;
    /** 间隔时间，只在渲染到默认帧缓冲时更新*/
    private _deltaTime: number;

    /** 是否是延迟渲染 */
    private _deferredRendering: boolean = false;

    /** 可见裁剪对象 */
    private _renderCulling: RenderCulling = new RenderCulling();

    /** 临时的灯光属性缓存 */
    private _lightDatasCache: LightDatasCache = new LightDatasCache();

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

        this._initExtensions();

        this._initDefFrame(width, height);

        this._initDefMesh();

        this._postEffectPipeline = new PostEffectsPipeline(this);
        this._postEffectPipeline.init(this._defGeo);

        this.setSize(width, height);

        this._stateCache = new WebGLStateCache();
        this._stateCache.init(this._gl);

        this._timeNow = Date.now();
    }

    /**
     * 设置渲染器大小，
     * 注意，这个会更改掉canvas大小
     */
    public setSize(w: number, h: number) {
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
        })

        this._defFrame.setSize(w, h);

        this._postEffectPipeline.resize(w, h);

        if (this._deferredPipeling) {
            this._deferredPipeling.setSize(w, h);
        }

        if (this._shadowMapPipeline) {
            this._shadowMapPipeline.setSize(w, h)
        }

        this.event(Event.RENDERER_RESIZE, [w, h]);
    };

    /**
     * 初始化默认Mesh
     */
    private _initDefMesh() {
        let mesh = new Mesh();
        let geo = new ScreenGeometry();
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
    public initTexture(texture: Texture): glTexture {
        let _gl = this._gl;
        let gltexture = <glTexture>texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
            gltexture.updated();
            return gltexture;
        }

        if (texture.getType() === Texture.TEXTURE2D) {
            let tex2D = <Texture2D>texture;
            if (tex2D.isUrl) {
                if (!tex2D.loaded) {
                    return this.initTexture(tex2D._def);
                }
                let imgMap = glTexture2D.ImageTexMap;
                let img = tex2D.getImage() as HTMLImageElement;
                let tex = imgMap.get(img);
                if (tex) {
                    tex2D.setRenderObjectRef(this, tex);
                    return tex;
                }
                tex = new glTexture2D(_gl);
                if (tex.generateFromTexture2D(_gl, tex2D)) {
                    tex2D.setRenderObjectRef(this, tex);
                    imgMap.set(img, tex);
                    return tex;
                }
            } else if (tex2D.getWidth() > 0 && tex2D.getHeight() > 0) {
                let tex = <glTexture2D>(tex2D.getRenderObjectRef(this));
                if (!tex || tex.isUrl) {
                    tex = new glTexture2D(_gl);
                }
                if (tex.generateFromTexture2D(_gl, tex2D)) {
                    tex2D.setRenderObjectRef(this, tex);
                    return tex;
                }
            }
        } else if (texture.getType() === Texture.TEXTURECUBE) {
            let texCube = <TextureCube>texture;
            let tex = new glTextureCube(_gl);
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
    retainMesh(mesh: Mesh, forceMat?: Material) {
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
    }

    /**
     * 应用帧缓冲状态
     * @param frameState 
     */
    public useFrameState(frameState: FrameState) {
        const gl = this._gl;

        let stateCache = this._stateCache;
        let clearBit = 0;

        stateCache.setViewport(gl, frameState.viewport.data);

        if (!frameState.needClear) {
            return;
        }

        if (frameState.isClearColor) {
            clearBit = clearBit | gl.COLOR_BUFFER_BIT;
            stateCache.setClearColor(gl, frameState.clearColor.data);
        }

        frameState.isClearDepth
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
    public useFrame(frame?: Frame, frameState?: FrameState) {
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
        this.useFrameState(frameState? frameState: frame.getState());
        this._curFrame = frame;
    }

    /**
     * 绘制一个Mesh
     * @param mesh Mesh对象
     * @param camera 相机对象
     */
    protected _renderMesh(mesh: Mesh, forceMaterial?: Material, shadows?: Shadow[], light?: {d: number, p: number, s: number}) {
        let gl = this._gl;

        let mat = forceMaterial || mesh.getMaterial();

        if (shadows && mesh.receiveShadow) {
            shadows.forEach(shadow => {
                mat.setDepthMap(shadow.depthTex);
                mat.setDepthMatData(shadow.matrix);
                mat.enableShadow();
            })
        } else {
            mat.disableShadow();
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
        let glgeo = <glGeometry>geo.getRenderObjectRef(this);

        this._useMaterialState(mat);

        let glprog = <glProgram>mat.shader.getRenderObjectRef(this);

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
    public useCamera(camera: Camera) {
        if (camera) {
            glProgram.vMatrix.copy(camera.getMatrix());
            glProgram.pMatrix.copy(camera.getProjectionMatrix());
            glProgram.vpMatrix.copy(camera.getViewProjectionMatrix());
            this._curCamera = camera;
        }
    }

    /**
     * 应用材质的状态
     * @param mat 
     */
    protected _useMaterialState(mat: Material) {
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
    protected _renderShadow(scene: Object3D, light: Light, visibleBox: Box, srcCamera: Camera) {
        let shadowPipe = this._shadowMapPipeline;

        if (!shadowPipe) {
            shadowPipe = new ShadowMapPipeline(this);
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
    public directRenderList(meshes: Mesh[], size: number, material?: Material) {
        this._renderList(meshes, size, material);
    }

    /**
     * 直接渲染一个Mesh，到当前的Frame
     * @param meshes 
     * @param size 
     * @param material 
     */
    public directRenderMesh(mesh: Mesh, material?: Material) {
        this._renderMesh(mesh, material, null);
    }

    /**
     * 渲染一组mesh
     * @param renderList 
     * @param length 
     * @param forceMat 
     * @param shadow 
     */
    protected _renderList(renderList: Mesh[], length: number, forceMat?: Material, shadows?: Shadow[], lights?: any) {
        for (let i = 0; i < length; i++) {
            this._renderMesh(renderList[i], forceMat, shadows, lights);
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
        if (!frame) {
            let now = Date.now();
            this._deltaTime = now - this._timeNow;
            this._timeNow = now;
            this._defCamera = camera;
            glTexture.clear();
        }

        if (scene.isScene) {
            let light = (<Scene>scene).getMainLight();
            glProgram.lightDir.copy(light.dir);
            glProgram.lightColor.copy(light.color);
        }

        let renderCulling = this._renderCulling;

        this.useCamera(camera);

        let mat4: Matrix4;

        if (renderArgs && renderArgs.frustumCamera) {
            mat4 = renderArgs.frustumCamera.getViewProjectionMatrix();
        } else if (camera) {
            mat4 = camera.getViewProjectionMatrix();
        }

        if (!frame) {
            if (this._deferredRendering) {
                // 延迟渲染流程走这里，注意，没有优化光源。
                renderCulling.culling(scene, mat4, true, false);
                this._deferredPipeling.render(renderCulling, camera, this._defFrame);
            } else {
                // 正常渲染走这条，注意，没有优化光源
                renderCulling.culling(scene, mat4, false, false);

                let shadows = [];
                let shadowLights = renderCulling.shadowLights;
                for (let i = 0, l = renderCulling.shadowLightSize; i < l; i++) {
                    let light = shadowLights[i];
                    this._renderShadow(scene, light, renderCulling.visibleBox, camera);
                    shadows.push(light.shadow);
                }

                let pointLights = [];
                let dirLights = [];
                let spotLights = [];

                let renderLights = renderCulling.lights;
                for (let i = 0; i < renderCulling.lightSize; i++) {
                    if (renderLights[i].type === LightType.Point) {
                        pointLights.push(renderLights[i]);
                    } else if (renderLights[i].type === LightType.Direction) {
                        dirLights.push(renderLights[i]);
                    } else if (renderLights[i].type === LightType.Spot) {
                        spotLights.push(renderLights[i]);
                    }
                }

                let dirDatas = this._lightDatasCache.getDir(dirLights.length);
                let pointDatas = this._lightDatasCache.getPoint(pointLights.length);
                let spotDatas = this._lightDatasCache.getSpot(spotLights.length);

                // lights.dirC.data = new Float32Array(4 * dirLights.length);
                // lights.dirD.data = new Float32Array(3 * dirLights.length);
                // lights.pointC.data = new Float32Array(4 * pointLights.length);
                // lights.pointP.data = new Float32Array(3 * pointLights.length);
                // lights.spotC.data = new Float32Array(4 * spotLights.length);
                // lights.spotD.data = new Float32Array(4 * spotLights.length);
                // lights.spotP.data = new Float32Array(3 * spotLights.length);
                let pData: Float32Array
                let dData: Float32Array = dirDatas.dir.data;
                let cData: Float32Array = dirDatas.colors.data;
                
                for (let i = 0, l = dirLights.length; i < l; i++) {
                    let d = <DirectionLight>dirLights[i];
                    dData.set(d.dir.v, i * 3);
                    cData.set(d.color.v, i * 4);
                }

                pData = pointDatas.pos.data;
                cData = pointDatas.colors.data;

                pointLights.forEach((p: PointLight, idx) => {
                    pData.set(p.pos.v, idx * 3);
                    cData.set(p.color.v, idx * 4);
                });

                pData = spotDatas.pos.data;
                dData = spotDatas.dir.data;
                cData = spotDatas.colors.data;

                spotLights.forEach((s: SpotLight, idx) => {
                    pData.set(s.pos.v, idx * 3);
                    dData.set(s.dir.v, idx * 4);
                    dData[idx * 4 + 3] = Math.cos(s.angle);
                    cData.set(s.color.v, idx * 4);
                });

                // let shadow: Shadow;
                // if (scene.isScene) {
                //     let light = (<Scene>scene).getMainLight();
                //     if (light.shadow) {
                //         this._renderShadow(scene, light, renderCulling.visibleBox, camera);
                //         shadow = light.shadow;
                //     }
                // }

                this.useCamera(this._defCamera);
                this.useFrame(this._defFrame, this._defFrameState);

                let lightNum = {d: dirLights.length, p: pointLights.length, s: spotLights.length};

                this._renderList(renderCulling.opacities, renderCulling.opacitySize, null, shadows, lightNum);
                this._renderList(renderCulling.alphaTests, renderCulling.alphaTestSize, null, shadows, lightNum);
                this._renderList(renderCulling.alphaBlends, renderCulling.alphaBlendSize, null, shadows, lightNum);
            }

            this.useCamera(this._defCamera);
            
            let targetFrame: Frame;
            if (this._postEffectPipeline.length > 0) {
                this.renderPostEffects();
                targetFrame = this._postEffectPipeline.currentFrame;
            } else {
                targetFrame = this._defFrame;
            }

            this.useFrame(null);
            this._defMat.setDiffuseMap(<Texture2D>targetFrame.getTextureFromType(RTLocation.COLOR).tex);
            this._renderMesh(this._defMesh);
            this.exchangeFrame();
        } else {
            this.useFrame(frame);
            this.useCamera(camera);
            renderCulling.culling(scene, mat4, true, false);
            this._renderList(renderCulling.opacities, renderCulling.opacitySize);
            this._renderList(renderCulling.alphaTests, renderCulling.alphaTestSize);
            this._renderList(renderCulling.alphaBlends, renderCulling.alphaBlendSize);
        }
    }

    /**
     * 后处理效果渲染
     */
    protected renderPostEffects() {
        this._postEffectPipeline.render(this._defFrame, this._deferredRendering);
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
        let srcReqs = this._postEffectPipeline.getSrcReqs();
    }

    /**
     * 通过类型或者后处理对象禁用后处理
     * @param pe 
     */
    public disablePostEffect(pe: PEType | PEBase) {
        this._postEffectPipeline.disablePostEffect(pe);
        this.updateDefFrame();
    }

    /**
     * 通过类型或者后处理对象启用后处理
     * @param pe 
     */
    public enablePostEffect(pe: PEType | PEBase) {
        this._postEffectPipeline.enablePostEffect(pe);
        this.updateDefFrame();
    }

    /**
     * 获取当前启用的后处理类型组
     */
    public getEnablingPostEffect(): PEType[] {
        return this._postEffectPipeline.getEnablingPostEffect();
    }

    /**
     * 获取GBuffer的Frame
     */
    public getGBufferFrame(): Frame {
        return this._deferredRendering ? this._deferredPipeling.gFrame : null;
    }

    /**
     * 切换延迟渲染
     * TODO: 延迟渲染找个地方写吧，不要写在渲染器里面了。
     */
    protected _swtichDeferredRendering(v: boolean) {
        if (this._deferredRendering === v) {
            return;
        }

        if (v) {
            if (!this._deferredPipeling) {
                this._deferredPipeling = new DeferredPipeline(this);
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

    /**
     * 移除着色器
     * @param obj 
     */
    public removeShader(obj: RenderBase) {
        let glProg = <glProgram>obj;
        this._shaderCache.removeShader(glProg);
    }

    public getDefFrameState(): FrameState {
        return this._defFrameState;
    }
}
