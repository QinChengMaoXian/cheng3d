import { Material } from "./Material";
import { Texture2D } from "../graphics/Texture2D";
import { ShaderConst } from "../graphics/ShaderConst";
import { RGBA } from "../graphics/RendererParameter";
import { Vector4 } from "../math/Vector4";

export class CartoonMaterial extends Material {

    public param: Vector4 = new Vector4();

    constructor(baseColor: string, specular: string, emissive: string) {
        super();

        this.setTexture2DFromUrl(ShaderConst.baseColorMap, baseColor);
        this.setTexture2DFromUrl(ShaderConst.specularMap, specular);
        this.setTexture2DFromUrl(ShaderConst.emissiveMap, emissive);

        this.setTexture(ShaderConst.cartoonLUTMap, CartoonMaterial.getCartoonStyleLUT());

        this.reflectance = 1.0;
        this.aoScale = 1.0;
        this.glossiness = 1.0;

        this.setProperty(ShaderConst.merged, this.param);
    }

    get glossiness(): number {
        return this.param.v[0];
    }

    set glossiness(value: number) {
        this.param.v[0] = value;
    }

    get aoScale(): number {
        return this.param.v[1];
    }

    set aoScale(value: number) {
        this.param.v[1] = value;
    }

    get reflectance(): number {
        return this.param.v[2];
    }

    set reflectance(value: number) {
        this.param.v[2] = value;
    }

    private static _cartoonLUTMap: Texture2D;
    public static getCartoonStyleLUT(): Texture2D {
        if (!this._cartoonLUTMap) {
            let numStyle: number = 1;
            //第一行存暗面色调, 第一行存过度色调，第二行存亮面色调，第三行存threshold（注意色调不同于光源颜色，是要乘上光源颜色的）
            let styleData: Uint8Array = new Uint8Array(4 * 4 * 4);
            //临时测试，未来这个表可由美术绘制并加载
            for (let i: number = 0; i < 2; i++) {
                if (i == 0) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.7 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.4 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                } else if (i == 1) {
                    //threshold
                    styleData[i * 4] = 0.2 * 255;
                    styleData[i * 4 + 1] = 0.2 * 255;
                    styleData[i * 4 + 2] = 0.2 * 255;
                    styleData[i * 4 + 3] = 255;
                    //亮面色调
                    styleData[4 * 4 + i * 4] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 1] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 2] = 1.0 * 255;
                    styleData[4 * 4 + i * 4 + 3] = 255;
                    //过度色调
                    styleData[4 * 8 + i * 4] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 1] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 2] = 0.8 * 255;
                    styleData[4 * 8 + i * 4 + 3] = 255;
                    //暗面色调
                    styleData[4 * 12 + i * 4] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 1] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 2] = 0.6 * 255;
                    styleData[4 * 12 + i * 4 + 3] = 255;
                }

            }
            let texture = new Texture2D();
            texture.setData(4, 4, styleData);
            texture.setFormat(RGBA, RGBA);
            this._cartoonLUTMap = texture;
        }
        return this._cartoonLUTMap;
    }
}
