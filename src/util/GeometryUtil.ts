import { Geometry } from '../graphics/Geometry';
import { ShaderConst } from '../graphics/ShaderConst';
import * as CGE from '../graphics/RendererParameter'

export class ScreenGeometry extends Geometry {

    constructor() {
        super();
    }

    public makeTri() {
        let vertexPositionData = new Float32Array([
            -1,  1, 0,  1,
            -1, -3, 0, -1,
             3,  1, 2,  1,
        ]);
        
        let indexData = new Uint16Array([
            0, 1, 2, 
        ]);

        let attribs = [
            {
                name: 'Position',
                attribute: ShaderConst.position, 
                num: 2,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: ShaderConst.texcoord, 
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 2,
            },
        ];
        
        this.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 4, vertexPositionData);
        this.setIndexData(indexData);
        this.setDrawParameter(indexData.length);
    }
}