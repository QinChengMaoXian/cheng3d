import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame'

import { Mesh } from '../object/Mesh';
import { Base } from '../core/Base';
import { Texture2D } from '../graphics/Texture2D';

import { PEType, PEBase } from './postEffect/PEBase'

export class Renderer extends Base {

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

    // exchangeFrame();
    getGBufferFrame(): Frame;

    deltaTime: number;
    defCamera: Camera;

    // currentColorFrame: Frame;
    // currectTargetFrame: Frame;
}