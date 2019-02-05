import { GraphicsObject } from './GraphicsObject'

export class Shader extends GraphicsObject {
    protected _vertexShaderText = '';
    protected _fragmentShaderText = '';

    protected _isLoaded: boolean = false;

    constructor() {
        super();
    }

    loadShaderFile(vsUrl: string, fsUrl: string) {
         
    }

    setShaderText(vsText: string, fsText: string) {
        this._vertexShaderText = Shader.replaceCode(vsText);
        this._fragmentShaderText = Shader.replaceCode(fsText);
        this._isLoaded = true;
    }

    getVertexShaderText(): string {
        return this._vertexShaderText;
    }

    getFragmentShaderText(): string {
        return this._fragmentShaderText;
    }

    private static readonly func = {
        '#include[OBMapDecl]' : 
            `#ifdef OB_MAP
            uniform sampler2D u_ODMap;
            uniform vec2 u_ODSizeInv;
            bool OBMap(float alpha) {
                return alpha < texture2d(u_ODMap, gl_FragCoord.xy * u_ODSizeInv).a;
            }
            #endif
        `,
        '#include[OBMap]' : `
            #ifdef OB_MAP
                if (OBMap(baseColor.a)) {
                    discard;
                }
            #endif
        `,
        'TEXTURE2D' : 'texture2D',
        'TEXTURECUBE' : 'textureCube'
    }

    private static replaceCode(code: string): string {
        const keys = Object.keys(Shader.func);
        let result = code;
        keys.forEach(key => {
            let temp;
            while (temp !== result) {
                temp = result;
                result = temp.replace(key, Shader.func[key]);
            }
        })
        return result;
    }
}
