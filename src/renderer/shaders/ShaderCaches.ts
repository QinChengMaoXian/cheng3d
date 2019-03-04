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

    genShaderProgram(mat: Material, enableDefer?: boolean, macros?: string[]): glProgram {    
        let renderer = this._renderer;
        let shader = mat.shader;
        let glprog: glProgram = (shader.getRenderObjectRef(renderer) as glProgram);
        let useDefer = mat.supportDeferred && enableDefer;
        let matNewKey = this.genMatKey(mat, useDefer, macros);
        let matCurKey = glprog ? glprog.shaderKey : '-1';

        if (matCurKey === matNewKey) {
            return glprog;
        }

        let caches = this._caches;

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

        let gl = renderer.getContext();

        if (useDefer && data.defer_src) {
            data = data.defer_src;
        }

        let newMacros = mat.getMacros();   

        let vertText = this.genStr(data.vert, newMacros, macros);
        let fragText = this.genStr(data.frag, newMacros, macros);

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

    removeShader(glprog: glProgram) {
        if (!glprog) {
            return;
        }
        let key = glprog.shaderKey;
        this.removeKey(key);
    }

    protected removeKey(key: string) {
        let caches = this._caches;
        let ref = caches.get(key);
        if (ref) {
            ref.count--;
            if (ref.count === 0) {
                caches.delete(key);
                return true;
            }
        }
        return false;
    }

    genStr(text: string, matMacros: {[key: string]: number}, macros?: string[]) {
        let src = text;
        
        if (matMacros) {
            let macroStr = '';
            for (let key in matMacros) {
                let value = matMacros[key];
                macroStr += value !== undefined ? `#define ${key} ${value}\n` : `#define ${key}\n`;
            }
            src = macroStr + src;
        }

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

    genMatKey(mat: Material, enableDefer?: boolean, macros?: string[]): string {
        let result = mat.key;
        if (enableDefer) {
            result += '_def';
        }
        if (macros && macros.length > 0) {
            macros.forEach(str => {
                result += `_${str}`;
            })
        }
        return result;
    }
}
