import { WebGLRenderer } from "../WebGLRenderer";
import { Material } from "../../material/Material";
import { glProgram } from "../glObject/glProgram";
import { shaders, mods } from "./shaderLibs";

export class ShaderCaches {
    
    protected _caches: Map<string, glProgram> = new Map;

    protected _renderer: WebGLRenderer;

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer;
    }

    genShaderProgram(mat: Material, macros?: string[]): glProgram {
        let renderer = this._renderer;
        let shader = mat.shader;
        let glprogram: glProgram = (shader.getRenderObjectRef(renderer) as glProgram);
        let matNewKey = this.genMatKey(mat, macros);
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

        let vertText = this.genStr(data.vert, macros);
        let fragText = this.genStr(data.frag, macros);

        glprogram = glprogram.generateFromText(gl, vertText, fragText);
        if (glprogram) {
            this._caches.set(matNewKey, glprogram);
            mat.shader.setRenderObjectRef(renderer, glprogram);
            return glprogram;
        }

        return null;
    }

    genStr(text: string, macros?: string[]) {
        let src = text;
        if (macros) {
            let macroStr = '';
            macros.forEach(macro => {
                macroStr += `#define ${macro}\n`;
            });
            src = macroStr + src;
        }
        src = '#version 100\n' + src;
        return src;
    }

    genMatKey(mat: Material, macros?: string[]): string {
        return mat.type
    }
}