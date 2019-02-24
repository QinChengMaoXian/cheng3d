import { Material } from './Material';
import { ShaderConst } from '../graphics/ShaderConst';
import { Vector4 } from '../math/Vector4';
import { Texture } from '../graphics/Texture';

/**
 * 一个可以引用其他材质并覆盖修改其他材质属性的材质。
 * 开发中懒省事的方法，不建议直接使用
 */
export class ReferMaterial extends Material {

    protected _referMat: Material;

    constructor(mat: Material) {
        super();
        this._referMat = mat;
    }

    public setReferMaterial(mat: Material) {
        this._referMat = mat;
        this.clearTextures();
        this.clearProperties();
    }
    
    public overrideProperty(type: string | number, data: any) {
        if (this._referMat.getProperty(type)) {
            super.setProperty(type, data);
        }
    }

    public overrideTexture(type: string | number, tex: Texture) {
        if (this._referMat.getTexture(type)) {
            super.setTexture(type, tex);
        }
    }

    public getProperty(type: string | number) {
        let prop = super.getProperty(type);
        if (!prop) {
            prop = this._referMat.getProperty(type);
        }
        return prop;
    }

    public getTexture(type: string | number) {
        let tex = super.getTexture(type);
        if (!tex) {
            tex = this._referMat.getTexture(type);
        }
        return tex;
    }

    public setUVOffset(sx: number, sy: number, ox: number, oy: number) {
        let v = super.getProperty(ShaderConst.uvOffset);
        if (v) {
            v.data.set([arguments])
        } else {
            this.setProperty(ShaderConst.uvOffset, new Vector4(sx, sy, ox, oy));
        }
    }

    public get type(): string {
        return this._referMat.type;
    }

    public get supportDeferred(): boolean {
        return this._referMat.supportDeferred;
    }
}
