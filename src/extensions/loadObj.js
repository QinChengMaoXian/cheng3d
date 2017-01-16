import { Texture2D } from '../graphics/texture2D.js'
import { TextureCube } from '../graphics/textureCube.js'
import { Geometry } from '../graphics/eometry.js'

import { Entity } from '../object/entity.js'
import { Transform } from '../object/transform.js'
import { Component } from '../object/component.js'

export class LoadObj {
    constructor() {

    }

    loadFile(src, callback) {
        if (!callback) {
            return;
        }
    }
}
