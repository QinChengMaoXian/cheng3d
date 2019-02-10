import { WebGLRenderer } from "../WebGLRenderer";
import { Material } from "../../material/Material";
import { glProgram } from "../glObject/glProgram";

export class ShaderCaches {
    
    protected _caches: Map<string, glProgram> = new Map;

    protected _renderer: WebGLRenderer;

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer;
    }

    genShaderProgram(material: Material): glProgram {
        let shader = material.shader;
        let glprogram: glProgram = (shader.getRenderObjectRef(this._renderer) as glProgram);
        let matNewKey = this.genMatKey(material);
        let matCurKey = glprogram.shaderKey;

        if (matCurKey === matNewKey) {
            return glprogram;
        }

        glprogram = this._caches.get(matNewKey);

        if (glprogram) {
            shader.setRenderObjectRef(this._renderer, glprogram);
            return glprogram;
        }

        glprogram = new glProgram();
        glprogram.shaderKey = matNewKey;
        // glprogram.generateFromText()

        return null;
    }

    genMatKey(material: Material, macros?: string[]): string {
        return material.type
    }


}