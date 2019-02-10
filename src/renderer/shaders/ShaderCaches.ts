import { WebGLRenderer } from "../WebGLRenderer";
import { Material } from "../../material/Material";
import { glProgram } from "../glObject/glProgram";
import shaders from "./shaderLibs"

export class ShaderCaches {
    
    protected _caches: Map<string, glProgram> = new Map;

    protected _renderer: WebGLRenderer;

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer;
    }

    genShaderProgram(mat: Material): glProgram {
        let renderer = this._renderer;
        let shader = mat.shader;
        let glprogram: glProgram = (shader.getRenderObjectRef(renderer) as glProgram);
        let matNewKey = this.genMatKey(mat);
        let matCurKey = glprogram ? glprogram.shaderKey : '-1';

        if (matCurKey === matNewKey) {
            return glprogram;
        }

        glprogram = this._caches.get(matNewKey);

        if (glprogram) {
            shader.setRenderObjectRef(renderer, glprogram);
            mat.shader.setRenderObjectRef(renderer, glprogram);
            return glprogram;
        }

        glprogram = new glProgram();
        glprogram.shaderKey = matNewKey;

        let type = mat.type;
        let data = shaders[type];

        let gl = this._renderer.getContext();

        glprogram = glprogram.generateFromText(gl, data.vert, data.frag);
        if (glprogram) {
            this._caches.set(matNewKey, glprogram);
            mat.shader.setRenderObjectRef(renderer, glprogram);
            return glprogram;
        }

        return null;
    }

    genMatKey(mat: Material, macros?: string[]): string {
        return mat.type
    }


}