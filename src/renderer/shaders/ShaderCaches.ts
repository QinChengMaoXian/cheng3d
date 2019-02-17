import { WebGLRenderer } from "../WebGLRenderer";
import { Material } from "../../material/Material";
import { glProgram } from "../glObject/glProgram";
import { shaders, mods } from "./shaderLibs";

interface refProg {
    program: glProgram;
    count: number;
}

export class ShaderCaches {
    
    protected _caches: Map<string, refProg> = new Map;

    protected _renderer: WebGLRenderer;

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer;
    }

    genShaderProgram(mat: Material, macros?: string[]): glProgram {
        let caches = this._caches;
        let renderer = this._renderer;
        let shader = mat.shader;
        let glprog: glProgram = (shader.getRenderObjectRef(renderer) as glProgram);
        let matNewKey = this.genMatKey(mat, macros);
        let matCurKey = glprog ? glprog.shaderKey : '-1';

        if (matCurKey === matNewKey) {
            return glprog;
        }

        if (glprog) {
            this.removeKey(matCurKey);
        }
        
        let ref = caches.get(matNewKey);

        if (ref) {
            glprog = ref.program;
            shader.setRenderObjectRef(renderer, glprog);
            ref.count++;
            return glprog;
        }

        glprog = new glProgram();
        glprog.shaderKey = matNewKey;

        let type = mat.type;
        let data = shaders[type];

        let gl = this._renderer.getContext();

        let vertText = this.genStr(data.vert, macros);
        let fragText = this.genStr(data.frag, macros);

        glprog = glprog.generateFromText(gl, vertText, fragText);

        if (glprog) {
            caches.set(matNewKey, { program: glprog, count: 1 });
            shader.setRenderObjectRef(renderer, glprog);
            return glprog;
        }

        return null;
    }

    releaseMaterial(mat: Material) {
        let shader = mat.shader;
        let glprog: glProgram = (shader.getRenderObjectRef(this._renderer) as glProgram);
        if (!glprog) {
            return;
        }
        let key = glprog.shaderKey;
        this.removeKey(key);
    }

    protected removeKey(key: string) {
        let ref = this._caches.get(key);
        if (ref) {
            ref.count--;
            if (ref.count === 0) {
                caches.delete(key);
                return true;
            }
        }
        return false;
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