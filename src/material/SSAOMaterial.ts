import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector3 } from "../math/Vector3";

import * as CGE from '../graphics/RendererParameter';

export class SSAOMaterial extends Material {

    protected _pixelSize: { data: Float32Array };
    protected _multiUsing: { data: Float32Array };
    protected _samples: { data: Float32Array };

    protected _sampleNum: number = 64;

    constructor() {
        super();

        this._pixelSize = { data: new Float32Array([1.0, 1.0]) };
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._multiUsing = { data: new Float32Array([1.0, 1.0, 1.0, 1.0]) };
        this.setProperty(ShaderConst.multiUsing, this._multiUsing);

        this.createSampleData(16);

        let randomMap = new Texture2D()
        randomMap.setImageUrl('./resources/randomMap.gif', Texture2D.Normal);
        randomMap.setFilter(CGE.NEAREST, CGE.NEAREST);
        randomMap.setWarp(CGE.REPEAT, CGE.REPEAT);
        this.setTexture(ShaderConst.randomMap, randomMap);
    }

    public createSampleData(sampleNum: number = 64) {
        if (!this._samples || this._sampleNum !== sampleNum) {
            this._removeMacro(`SAMPLE_NUM ${this._sampleNum}`);
            this._addMacro(`SAMPLE_NUM ${sampleNum}`);
            this._sampleNum = sampleNum;
            this._samples = { data: new Float32Array(sampleNum * 3) };
            this.setProperty('u_samples', this._samples);
        }

        let result = [];
        let vec3 = new Vector3();
        for (let i = 0; i < sampleNum; i++) {
            var scale = i / sampleNum;
            vec3.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vec3.normalize().mul(scale * scale * 0.9 + 0.1);
            result.push(vec3.x, vec3.y, vec3.z);
        }
        this._samples.data.set(result);
    }

    public setDiffuseTexture(tex: Texture2D) {
        this.setTexture(ShaderConst.diffuseMap, tex);
    }

    public setDepthTexture(tex: Texture2D) {
        this.setTexture(ShaderConst.depthMap, tex);
    }

    public setAsptRtoTanHfFov(x: number, y: number, z: number, w: number) {
        this._multiUsing.data.set(arguments);
    }

    public setNormalTexture(tex: Texture2D) {
        if (tex) {
            this._addMacro('NORMAL_MAP');
        } else {
            this._removeMacro('NORMAL_MAP');
        }
        this.setTexture(ShaderConst.normalMap, tex);
    }

    public setPixelSize(x, y) {
        let d = this._pixelSize.data;
        d[0] = x;
        d[1] = y;
    }

    get type() {
        return 'ssao'
    }
}
