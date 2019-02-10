import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Frame } from '../graphics/Frame'

import { Base } from '../core/Base';
import { Mesh } from '../object/Mesh';

export class Renderer extends Base {

}

export interface IRenderer {

    renderScene(scene: Object3D, camera: Camera, frame?: Frame);

    init(width: number, height: number);

    setSize(width: number, height: number);

    retainMesh(mesh: Mesh);

    releaseMesh(mesh: Mesh);

    _renderPostEffect(scene: Object3D, camera?: Camera);

    getRendererId(): number;

}