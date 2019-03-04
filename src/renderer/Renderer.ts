import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame'

import { Mesh } from '../object/Mesh';
import { Base } from '../core/Base';

import { PEType, PEBase } from './postEffect/PEBase'
import { Logger } from '../core/Logger';
import { RenderBase } from '../graphics/RenderBase';

export class Renderer extends Base {

    /** CGE的结构计划支持多个Renderer共存，但是不会允许超过一定的数量 */
    protected static Renderers: Renderer[] = [];

    /** 渲染器计数 */
    private static RendererNum = 0;

    public static getRenderer(id: number) {
        return Renderer.Renderers[id];
    }

    /** 当前渲染器的id */
    public readonly rendererId = Renderer.RendererNum++;

    constructor() {
        super();
        if (Renderer.Renderers.length < 1) {
            Renderer.Renderers.push(this);
        } else {
            Logger.error('Too many renderer instance');
        }
    }

    removeShader(obj: RenderBase){}
}

export interface IRenderer {

    renderScene(scene: Object3D, camera: Camera, frame?: Frame);
    init(width: number, height: number);
    setSize(width: number, height: number);
    retainMesh(mesh: Mesh);
    releaseMesh(mesh: Mesh);
    getRendererId(): number;
    getWidth(): number;
    getHeight(): number;

    disablePostEffect(type: PEType | PEBase);

    enablePostEffect(type: PEType | PEBase);
    getEnablingPostEffect(): PEType[];

    removeShader(obj: RenderBase);

    // exchangeFrame();
    getGBufferFrame(): Frame;

    deltaTime: number;
    defCamera: Camera;

    // currentColorFrame: Frame;
    // currectTargetFrame: Frame;
}