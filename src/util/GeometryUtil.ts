import { Geometry } from '../graphics/Geometry';
import { ShaderConst } from '../graphics/ShaderConst';
import * as CGE from '../graphics/RendererParameter'

export class PlaneGeometry extends Geometry {

    constructor() {
        super();

        this._init();
    }

    public setSize(width: number, height: number) {

    }

    protected _init() {
        this._makeFromSize(1, 1);
    }

    protected _makeFromSize(w: number, h: number) {
        let vertexPositionData = new Float32Array([
            -w,  h, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
             w,  h, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
             w, -h, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
            -w, -h, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
        ]);
        
        let indexData = new Uint16Array([
            0, 2, 1,
            2, 0, 3, 
        ]);

        let attribs = [
            {
                name: 'Position',
                attribute: ShaderConst.position, 
                num: 3,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: ShaderConst.texcoord, 
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
            },
            {
                name: 'Normal',
                attribute: ShaderConst.normal, 
                num: 3,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 5,
            },
            {
                name: 'Tangent',
                attribute: ShaderConst.tangent, 
                num: 3,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 8,
            },
        ];
        
        this.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 11, vertexPositionData);
        this.setIndexData(indexData);
        this.setDrawParameter(indexData.length);
    }
}