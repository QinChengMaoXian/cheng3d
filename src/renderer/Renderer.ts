import { Object3D } from '../object/Object3D';
import { Camera } from '../object/Camera';
import { Texture } from '../graphics/Texture';
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';
import { Geometry } from '../graphics/Geometry';
import { Shader } from '../graphics/Shader';

import { Base } from '../core/Base';

export interface Renderer {

    renderScene(scene: Object3D, camera: Camera);

    initGeometry(geometry: Geometry);

    initShader(shader: Shader);

    initTexture(texture: Texture);

    _renderPostEffect(scene: Object3D, camera?: Camera);
}