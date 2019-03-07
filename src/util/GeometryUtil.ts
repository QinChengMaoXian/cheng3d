import { Geometry } from '../graphics/Geometry';
import { ShaderConst } from '../graphics/ShaderConst';
import * as CGE from '../graphics/RendererParameter'
import { Vector3 } from '../math/Vector3';
import { calcTangent } from './Util';

export class ScreenGeometry extends Geometry {

    constructor() {
        super();
        this.makeTri();
    }

    public makeTri() {
        let vertexPositionData = new Float32Array([
            -1, 1, 0, 1,
            -1, -3, 0, -1,
            3, 1, 2, 1,
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
        // this.setIndexData(indexData);
        this.setDrawParameter(3);
    }
}

export class BoxGeometry extends Geometry {

    protected _size: Vector3 = new Vector3;

    constructor(l: number = 1, w: number = 1, h: number = 1) {
        super();
        this.setBoxParameter(l, w, h);
    }

    setBoxParameter(l: number = 1, w: number = 1, h: number = 1) {
        this._size.set(l * 0.5, w * 0.5, h * 0.5);
        this._createGeo();
    }

    private _createGeo() {
        let vertices = [
            -1.0,  1.0, -1.0,
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
        
            -1.0, -1.0,  1.0,
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0,
        
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
        
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
        
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
        
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0
        ];

        let vertexPositionData = new Float32Array(vertices);

        let attribs = [
            {
                name: 'Position',
                attribute: ShaderConst.position,
                num: 3,
                offset: 0,
            },
        ];

        this.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 3, vertexPositionData);
        this.setDrawParameter(36);
    }
}

export class SphereGeometry extends Geometry {

    protected _radius: number = 1;
    protected _widthSegments: number = 16;
    protected _heightSegments: number = 16;

    constructor(radius: number = 1, widthSegments: number = 16, heightSegments: number = 16) {
        super();
        this.setSphereParameter(radius, widthSegments, heightSegments);
    }

    setSphereParameter(radius: number = 1, widthSegments: number = 16, heightSegments: number = 16) {
        this._radius = radius;
        this._widthSegments = widthSegments;
        this._heightSegments = heightSegments;
        this._createGeo();
    }

    protected _createGeo() {

        let r = this._radius;
        let w = this._widthSegments;
        let h = this._heightSegments;

        let index = 0;
        let grid: number[][] = [];

        let indices: number[] = [];
        let vertices: number[] = [];
        let normals: number[] = [];
        let uvs: number[] = [];

        let vertex = new Vector3();
        let normal = new Vector3();

        let phiStart: number = 0;
        let phiLength: number = Math.PI * 2;

        let thetaStart: number = 0;
        let thetaLength: number = Math.PI;

        let thetaEnd = thetaStart + thetaLength;

        let iy, ix;

        for (iy = 0; iy <= h; iy++) {
            let verticesRow: number[] = [];
            let v = iy / h;

            for (ix = 0; ix <= w; ix++) {

                let u = ix / w;

                // vertex
                vertex.x = r * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = r * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.z = r * Math.cos(thetaStart + v * thetaLength);
                
                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal
                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);

                // uv
                uvs.push(u, 1 - v);

                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }

        for (iy = 0; iy < h; iy++) {

            for (ix = 0; ix < w; ix++) {

                var a = grid[iy][ix + 1];
                var b = grid[iy][ix];
                var c = grid[iy + 1][ix];
                var d = grid[iy + 1][ix + 1];

                if (iy !== 0) indices.push(a, b, d);
                if (iy !== h - 1) indices.push(b, c, d);

            }

        }

        let tangents = calcTangent(vertices, uvs, normals, indices);

        this.addSingleAttribute('Position', ShaderConst.position, 3, CGE.FLOAT, new Float32Array(vertices));
        this.addSingleAttribute('UV', ShaderConst.texcoord, 2, CGE.FLOAT, new Float32Array(uvs));
        this.addSingleAttribute('Normal', ShaderConst.normal, 3, CGE.FLOAT, new Float32Array(normals));
        this.addSingleAttribute('Tangent', ShaderConst.tangent, 4, CGE.FLOAT, new Float32Array(tangents));
        this.setIndexData(new Uint16Array(indices));
        this.setDrawParameter(indices.length);
        
        // this.addSingleAttribute('Binormal', ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
    }

}
