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
import { PostEffectsPipeline } from './PostEffectsPipeline';
import { PEType, PEBase } from './postEffect/PEBase';
import { WebGLSupports } from './WebGLSupports';
import { DeferredShadingMaterial } from '../material/DeferredShadingMaterial';
import { Frustum } from '../math/Frustum';
import { Bounding } from '../bounding/Bounding';
import { AABB } from '../bounding/AABB';
import { Light, LightType } from '../light/Light';
import { PointLight } from '../light/PointLight';
import { glTexture } from './glObject/glTexture';
import { WebGLStateCache } from './WebGLStateCache';
import { RenderBase } from '../graphics/RenderBase';
import { Matrix4 } from '../math/Matrix4';
import { Box } from '../math/Box';
import { DirectionLight } from '../light/DirectionLight';
import { DirectionShadow } from '../light/DirectionShadow';
import { Vector3 } from '../math/Vector3';
import { DepthMaterial } from '../material/DepthMaterial';
import { Shadow } from '../light/Shadow';

export interface RenderArgs{
    frustumCamera?: Camera;
}

/**
 * 渲染剔除
 */
export class RenderCulling {

    public frustum: Frustum = new Frustum();

    public opacities: Mesh[] = new Array(64);
    public opacitySize: number = 0;

    public noDeferOpacities: Mesh[] = new Array(32);
    public noDeferOpacitySize: number = 0;

    public alphaTests: Mesh[] = new Array(32);
    public alphaTestSize: number = 0;

    public alphaBlends: Mesh[] = new Array(32);
    public alphaBlendSize: number = 0;

    public lights: Light[] = new Array(32);
    public lightSize: number = 0;

    public visibleBox: Box = new Box();

    constructor() {
        
    }

    public culling(scene: Object3D, mat4: Matrix4, isDefer: boolean, isShadow: boolean) {
        this.frustum.setFromMatrix(mat4);

        this.opacitySize = 
        this.noDeferOpacitySize = 
        this.alphaTestSize = 
        this.alphaBlendSize = 
        this.lightSize = 0;

        this.visibleBox.reset();

        this._cutObject3D(scene, scene.visible, isDefer, isShadow);

        this._clearTail(this.opacities, this.opacitySize);
        this._clearTail(this.noDeferOpacities, this.noDeferOpacitySize);
        this._clearTail(this.alphaTests, this.alphaTestSize);
        this._clearTail(this.alphaBlends, this.alphaBlendSize);
        this._clearTail(this.lights, this.lightSize);
    }

    protected _clearTail(ar: any[], i: number) {
        let l = ar.length;
        for (i; i < l; i++) {
            if (!ar[i]) {
                return;
            }
            ar[i] = null;
        }
    }

    protected _cutObject3D(obj: Object3D, isRendering: boolean, isDefer: boolean, isShadow: boolean) {
        let display = obj.visible && isRendering;
        if (obj.isMesh && display) {
            this._cutMesh(<Mesh>obj, isDefer, isShadow);
        } else if (obj.isLight) {
            this._cutLight(<Light>obj);
        }

        let children = obj.getChildren();
        let l = children.length;
        for (let i = 0; i < l; i++) {
            this._cutObject3D(children[i], display, isDefer, isShadow);
        }
    }

    protected _cutMesh(mesh: Mesh, isDefer: boolean, isShadow: boolean) {
        if (!mesh.beRendering() || isShadow && !mesh.caseShadow) {
            return;
        }

        let visibleBox = this.visibleBox;
        let frustum = this.frustum;
        let bounding = mesh.getBounding();
        let mat = (<Mesh>mesh).getMaterial();

        if (bounding) {
            switch (bounding.getType()) {
                case Bounding.TYPE_AABB:
                    let box = (bounding as AABB).box;
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
            this.alphaBlends[this.alphaBlendSize++] = mesh;
        } else if (mat.alphaTest) {
            this.alphaTests[this.alphaTestSize++] = mesh;
        } else {
            if (isDefer && !mat.supportDeferred) {
                this.noDeferOpacities[this.noDeferOpacitySize++] = mesh;
            } else {
                this.opacities[this.opacitySize++] = mesh;
            }
        }
    }

    protected _cutLight(light: Light) {
        this.lights[this.lightSize] = light;
        this.lightSize++;
    }
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

    /** 可见裁剪对象 */
    private _renderCulling: RenderCulling = new RenderCulling();

    /** 阴影图可渲染裁剪 */
    private _shadowCulling: RenderCulling = new RenderCulling();

    /** 渲染阴影图用的帧缓冲对象 */
    private _shadowFrame: Frame;

    /** 渲染深度用的材质 */
    private _depthMat: DepthMaterial; 

    /** 深度用的相机 */
    private _depthCamera: Camera;

    /** 延迟着色用点光源模型 */
    private _pointLightMesh: Mesh;

    /** 延迟着色用点光源材质 */
    private _pointLightMat: DeferredShadingMaterial;

    /** WebGL状态缓存 */
    private _stateCache: WebGLStateCache;

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

        this._postEffectPipline = new PostEffectsPipeline(this);
        this._postEffectPipline.init(this._defGeo);

        this.setSize(width, height);

        this._stateCache = new WebGLStateCache();
        this._stateCache.init(this._gl);

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
    public initTexture(texture: Texture): glTexture {
        let _gl = this._gl;
        let gltexture:any = texture.getRenderObjectRef(this);
        if (gltexture !== undefined && !gltexture.getUpdate()) {
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

        mesh.setGeometry(null);
        mesh.setMaterial(null);
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
    protected _renderMesh(mesh: Mesh, camera?: Camera, forceMaterial?: Material, shadow?: Shadow) {
        let gl = this._gl;

        let mat = forceMaterial || mesh.getMaterial();

        if (shadow && mesh.receiveShadow) {
            mat.setDepthMap(shadow.depthTex);
            mat.setDepthMatData(shadow.matrix);
            mat.enableShadow();
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
        let shadowCulling = this._shadowCulling;

        let shadowFrame = this._shadowFrame;
        if (!shadowFrame) {
            shadowFrame = new Frame();
            shadowFrame.enableDepthStencil();
            shadowFrame.getState().clearColor.set(1, 1, 1, 1);
            this._shadowFrame = shadowFrame;
        }
        let depthMat = this._depthMat;
        if (!depthMat) {
            depthMat = new DepthMaterial;
            // depthMat.enablePolygonOffset = true;
            // depthMat.polygonOffset[0] = 1.0;
            // depthMat.polygonOffset[1] = 1.0;
            this.initMaterial(depthMat);
            this._depthMat = depthMat;
        }

        let camera = this._depthCamera;
        if (!camera) {
            camera = new Camera();
            this._depthCamera = camera;
        }

        if (light.type === LightType.Direction) {
            let dirLight = <DirectionLight>light;
            let dirShadow = dirLight.shadow;
            let dir = dirLight.dir;

            let vmin = visibleBox.min;
            let vmax = visibleBox.max;

            let boxCenter = Vector3.pool.create();
            let vec3 = Vector3.pubTemp;
            
            boxCenter.copy(vmax).subAt(vmin).mul(0.5).addAt(vmin);
            let mat4 = Matrix4.pubTemp;
            vec3.copy(boxCenter).addAt(dir);
            
            mat4.lookAt(boxCenter, dir, Vector3.ZUp);

            let box = Box.pubTemp;
            box.reset();

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    for (let k = 0; k < 2; k++) {
                        vec3.set(i ? vmin.x: vmax.x, j ? vmin.y: vmax.y, k ? vmin.z: vmax.z);
                        vec3.applyMatrix4(mat4);
                        box.expandAtPoint(vec3);
                    }
                }
            }

            let min = box.min;
            let max = box.max;

            let x = max.x - min.x;
            let y = max.y - min.y;
            let z = max.z + 1;

            let range = dirShadow.range; //Math.ceil((x > y ? x : y) / 2);
            // dirShadow.range =range
            let far = dirShadow.far;//max.z - min.z + 1;
            let near = 1;

            // vec3.copy(boxCenter).add(dir.x * z, dir.y * z, dir.z * z);
            // camera.setPositionAt(vec3);
            // camera.lookAt(boxCenter);
            // camera.enableOrthographicMode(-range, range, -range, range, near, far);

            
            // camera.resize(range * 2, range * 2);
            camera.setPositionAt(dirLight.getPosition());
            camera.lookAt(vec3.copy(dirLight.getPosition()).subAt(dir));
            camera.setUp(Vector3.ZUp);
            camera.enableOrthographicMode(-range, range, -range, range, 1, far);
            camera.update(0);

            dirShadow.matrix.copy(camera.getViewProjectionMatrix());

            this._useCamera(camera);

            shadowCulling.culling(scene, camera.getViewProjectionMatrix(), false, true);

            shadowFrame.setSize(dirShadow.size, dirShadow.size);
            shadowFrame.setTexture2D(RTLocation.COLOR, dirShadow.depthTex);

            this.useFrame(shadowFrame);
            this._renderList(shadowCulling.opacities, shadowCulling.opacitySize, camera, depthMat);
        }
    }

    protected _renderList(renderList: Mesh[], length: number, camera: Camera, forceMat?: Material, shadow?: Shadow) {
        for (let i = 0; i < length; i++) {
            let mesh = renderList[i];
            this._renderMesh(mesh, camera, forceMat, shadow);
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
        }

        if (scene.isScene) {
            let light = (<Scene>scene).getMainLight();
            glProgram.lightDir.copy(light.dir);
            glProgram.lightColor.copy(light.color);
        }

        let renderCulling = this._renderCulling;

        this._useCamera(camera);

        let mat4: Matrix4;

        if (renderArgs && renderArgs.frustumCamera) {
            mat4 = renderArgs.frustumCamera.getViewProjectionMatrix();
        } else if (camera) {
            mat4 = camera.getViewProjectionMatrix();
        }

        if (!frame) {
            if (this._deferredRendering) {
                // 延迟渲染流程走这里，注意，没有优化光源。
                let gFrame = this._gFrame;

                renderCulling.culling(scene, mat4, true, false);

                this.useFrame(gFrame);

                this._renderList(renderCulling.opacities, renderCulling.opacitySize, camera);
                this._renderList(renderCulling.alphaTests, renderCulling.alphaTestSize, camera);

                this._deferMat.setPixelSize(1.0 / this._screenWidth, 1.0 / this._screenHeight);

                let targetFrame = this._defFrame;
                
                let depthTex = targetFrame.getDepthStencilTexture();
                targetFrame.setDepthStencil(gFrame.getDepthStencilTexture());
                gFrame.setDepthStencil(depthTex);

                this.useFrame(targetFrame, this._notClearDepthState);

                this._renderMesh(this._deferMesh, this._defCamera);

                let mesh = this._pointLightMesh;
                let mat = this._pointLightMat;

                mat.setPixelSize(1.0 / this._screenWidth, 1.0 / this._screenHeight);
                let l = renderCulling.lightSize;
                let lightsList = renderCulling.lights;

                for (let i = 0; i < l; i++) {
                    let pl = lightsList[i] as PointLight;
                    let r = pl.radius;
                    mat.setLightPos(pl.getPosition());  
                    mesh.setScale(r, r, r);
                    mesh.setPositionAt(pl.getPosition());
                    glProgram.lightColor.copy(pl.color);
                    this._renderMesh(mesh, this._defCamera);
                }
                
                this._renderList(renderCulling.noDeferOpacities, renderCulling.noDeferOpacitySize, camera);
                this._renderList(renderCulling.alphaBlends, renderCulling.alphaBlendSize, camera);
            } else {
                // 正常渲染走这条，注意，没有优化光源
                renderCulling.culling(scene, mat4, false, false);
                let shadow: Shadow;
                if (scene.isScene) {
                    let light = (<Scene>scene).getMainLight();
                    if (light.shadow) {
                        this._renderShadow(scene, light, renderCulling.visibleBox, camera);
                        shadow = light.shadow;
                    }
                }

                this._useCamera(this._defCamera);
                this.useFrame(this._defFrame, this._defFrameState);

                this._renderList(renderCulling.opacities, renderCulling.opacitySize, camera, null, shadow);
                this._renderList(renderCulling.alphaTests, renderCulling.alphaTestSize, camera, null, shadow);
                this._renderList(renderCulling.alphaBlends, renderCulling.alphaBlendSize, camera, null, shadow);
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

            renderCulling.culling(scene, mat4, true, false);
            this._renderList(renderCulling.opacities, renderCulling.opacitySize, camera);
            this._renderList(renderCulling.alphaTests, renderCulling.alphaTestSize, camera);
            this._renderList(renderCulling.alphaBlends, renderCulling.alphaBlendSize, camera);
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
     * TODO: 延迟渲染找个地方写吧，不要写在渲染器里面了。
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
                mat.enableStencil = true;
                mat.setStencilFunc(CGE.EQUAL, 0x80, 0x80);
                mat.setStencilOp(CGE.KEEP, CGE.KEEP, CGE.KEEP);
                mat.enableDepth = false;
                this._deferMat = mat;

                let mesh = new Mesh();
                mesh.setGeometry(this._defGeo);
                mesh.setMaterial(mat);
                this._deferMesh = mesh;

                mat = new DeferredShadingMaterial();
                tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT0).tex)
                mat.setDiffuseMap(tex);
                tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT1).tex)
                mat.setNormalMap(tex);
                tex = <Texture2D>(frame.getTextureFromType(RTLocation.RT2).tex)
                mat.setDepthMap(tex);
                mat.useForPointLight();
                mat.enableStencil = true;
                mat.setStencil(this._deferMat.stencil);
                mat.enableAlphaBlend();
                mat.setBlendFunc(CGE.ONE, CGE.ONE, CGE.ONE, CGE.ONE);
                mat.setBlendEquation(CGE.FUNC_ADD, CGE.FUNC_ADD);
                mat.enableDepth = false;
                mat.setFlipFace(true);
                this._pointLightMat = mat;

                let geo = new SphereGeometry(1, 32, 32);
                mesh = new Mesh();
                mesh.setGeometry(geo);
                mesh.setMaterial(mat);
                this._pointLightMesh = mesh;
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

    /**
     * 移除着色器
     * @param obj 
     */
    public removeShader(obj: RenderBase) {
        let glProg = <glProgram>obj;
        this._shaderCache.removeShader(glProg);
    }
}
