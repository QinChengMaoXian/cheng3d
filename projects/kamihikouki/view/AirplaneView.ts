import * as CGE from '../../../src/CGE'

export class AirplaneView extends CGE.Mesh {

    constructor() {
        super();
    }

    public init(type: number) {
        this.setType(type);
    }

    public setType(type: number) {
        let geo = this._createGeo();
        this.setGeometry(geo);
        let mat = new CGE.DiffuseMaterial('');
        this.setMaterial(mat);
    }

    /**
     * TODO：load from files
     */
    protected _createGeo(): CGE.Geometry {
        let geo = new CGE.Geometry();

        let vertexPositionData = new Float32Array([
            -0.1, 0.0, 0.0,  0.0, 1.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
             0.1, 0.0, 0.0,  1.0, 1.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
             0.0, 0.2, 0.0,  1.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,

             0.0, 0.2, 0.0,  1.0, 0.0,  1.0, 0.0, 0.0,  0.0, 0.0, -1.0,
             0.0, 0.0, 0.0,  1.0, 0.0,  1.0, 0.0, 0.0,  0.0, 0.0, -1.0,
             0.0, 0.0, -0.05, 0.0, 0.0,  1.0, 0.0, 0.0,  0.0, 0.0, -1.0,
        ]);
        
        let indexData = new Uint16Array([
            0, 1, 2,
            3, 4, 5, 
        ]);
        
        let attribs = [
            {
                name: 'Position',
                attribute: CGE.ShaderConst.position, 
                num: 3,
                offset: 0,
            },
            {
                name: 'UV',
                attribute: CGE.ShaderConst.texcoord, 
                num: 2,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
            },
            {
                name: 'Normal',
                attribute: CGE.ShaderConst.normal, 
                num: 3,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 5,
            },
            {
                name: 'Tangent',
                attribute: CGE.ShaderConst.tangent, 
                num: 3,
                offset: vertexPositionData.BYTES_PER_ELEMENT * 8,
            },
        ];
        
        geo.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 11, vertexPositionData);
        geo.setIndexData(indexData);
        geo.setDrawParameter(indexData.length);

        return geo;
    }
}
