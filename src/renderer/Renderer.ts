import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';
import { Geometry } from '../graphics/Geometry';
import { Shader } from '../graphics/Shader';
import { Frame } from '../graphics/Frame'

import { Base } from '../core/Base';
import { Stage } from '../ui/Stage';

export class Renderer extends Base {

}

export interface IRenderer {

    renderScene(scene: Object3D, camera: Camera, frame?: Frame);

    init(width: number, height: number);

    setSize(width: number, height: number);

    initGeometry(geometry: Geometry);

    initShader(shader: Shader);

    initTexture(texture: Texture);

    _renderPostEffect(scene: Object3D, camera?: Camera);

    getRendererId(): number;

}