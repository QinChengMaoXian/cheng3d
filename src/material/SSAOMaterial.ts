import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { Vector3 } from "../math/Vector3";

import * as CGE from '../graphics/RendererParameter';
import { Vector4 } from "../math/Vector4";
import { Vector2 } from "../math/Vector2";

export class SSAOMaterial extends Material {

    protected _pixelSize: Vector2;
    protected _multiUsing: Vector4;
    protected _samples: { data: Float32Array };

    protected _sampleNum: number = 64;

    constructor() {
        super();

        this._pixelSize = new Vector2(1, 1);
        this.setProperty(ShaderConst.pixelSize, this._pixelSize);

        this._multiUsing = new Vector4(1, 1, 1, 1);
        this.setProperty(ShaderConst.multiUsing, this._multiUsing);

        this.createSampleData(16);

        let randomMap = new Texture2D();
        randomMap.setUrl('./resources/randomMap.gif', Texture2D.Normal);
        randomMap.setFilter(CGE.NEAREST, CGE.NEAREST);
        randomMap.setWarp(CGE.REPEAT, CGE.REPEAT);
        this.setTexture(ShaderConst.randomMap, randomMap);
    }

    public createSampleData(sampleNum: number = 64) {
        if (!this._samples || this._sampleNum !== sampleNum) {
            this._addMacro(`SAMPLE_NUM`, sampleNum);
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
        this._multiUsing.set(x, y, z, w);
    }

    public setNormalTexture(tex: Texture2D) {
        if (tex) {
            this._addMacro('NORMAL_MAP');
            this.setTexture(ShaderConst.normalMap, tex);
        } else {
            this._removeMacro('NORMAL_MAP');
            this.removeTexture(ShaderConst.normalMap);
        }
    }

    public setPixelSize(x: number, y: number) {
        this._pixelSize.set(x, y);
    }

    get type() {
        return 'ssao'
    }
}
