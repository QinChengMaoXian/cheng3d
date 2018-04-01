import { Texture2D } from '../graphics/Texture2D'
import { TextureCube } from '../graphics/TextureCube'
import { Geometry } from '../graphics/Geometry'

import { Entity } from '../object/Entity.js'
import { Component } from '../object/Component'

export class LoadObj {
    constructor() {

    }

    loadFile(src, callback) {
        if (!callback) {
            return;
        }
    }
}
