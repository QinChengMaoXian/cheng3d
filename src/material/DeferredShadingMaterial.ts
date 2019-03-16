import { Material } from './Material';
import { ShaderConst as s } from '../graphics/ShaderConst'
import { Texture2D } from '../graphics/Texture2D';
import { TextureCube } from '../graphics/TextureCube';
import { LightType, Light } from '../light/Light';
import { Vector3 } from '../math/Vector3';
import { Vector2 } from '../math/Vector2';

export class DeferredShadingMaterial extends Material {

    private _pixelSize: Vector2
    public _lightPos: Vector3;

    protected _lightType = LightType.Direction;

    constructor() {
        super();

        this._pixelSize = new Vector2()
        this.setProperty(s.pixelSize, this._pixelSize);

        this._lightPos = new Vector3();
        this.setProperty(s.lightPos, this._lightPos);

        this.setTexture(s.irradianceMap, TextureCube.Black);
        this.setTexture(s.prefilterMap, TextureCube.Black);
        this.setTexture(s.brdfLUTMap, Texture2D.BrdfLUT);
    }

    public setDiffuseMap(tex: Texture2D) {
        this.setTexture(s.diffuseMap, tex);
    }

    public setNormalMap(tex: Texture2D) {
        this.setTexture(s.normalMap, tex);
    }

    public setSpecularMap(tex: Texture2D) {
        this.setTexture(s.specularMap, tex);
    }

    public setDepthMap(tex: Texture2D) {
        this.setTexture(s.depthMap, tex);
    }

    public setBrdfLUT(tex: Texture2D) {
        this.setTexture(s.brdfLUTMap, tex);
    }

    public setPixelSize(x: number, y: number) {
        this._pixelSize.set(x, y);
    }

    public setLightPos(v: Vector3) {
        this._lightPos.copy(v);
    }

    public useForDirectionLight() {
        if (this._lightType === LightType.Point) {
            this._removeMacro('POINT_LIGHT');
        } else if(this._lightType === LightType.Spot) {
            this._removeMacro('SPOT_LIGHT');
        }
    }

    public useForPointLight() {
        if (this._lightType === LightType.Point) {
            return;
        } else if(this._lightType === LightType.Spot) {
            this._removeMacro('SPOT_LIGHT');
        }
        this._addMacro('POINT_LIGHT');
    }

    public uesForSpotLight() {
        if (this._lightType === LightType.Spot) {
            return;
        } else if(this._lightType === LightType.Point) {
            this._removeMacro('POINT_LIGHT');
        }
        this._addMacro('SPOT_LIGHT');
    }

    public get type(): string {
        return 'deferred_shading';
    }
}
