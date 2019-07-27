import { Mesh } from "./Mesh";
import { Vector3 } from "../math/Vector3";
import { ColorMaterial } from "../material/ColorMaterial";
import { Geometry, DrawMode } from "../graphics/Geometry";
import { ShaderConst } from "../graphics/ShaderConst";
import { FLOAT } from "../graphics/RendererParameter";
import { Box } from "../math/Box";

interface LinesData {
    points: number[]
}

export class LineSegment extends Mesh {

    protected _pointsList: LinesData[] = []

    protected _needUpdateLines: boolean = false;

    constructor() {
        super()

        let mat = new ColorMaterial();
        this._material = mat;

        let geo = new Geometry();
        this.setGeometry(geo);
    }

    public setMaterial(mat: any) {

    }

    public drawBox(box: Box) {

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    
                }
            }
        }
    }

    public setPoints(values: number[], num: number = 3) {
        if (!values || values.length < 2) {
            return
        }
        
        const list: number[] = []
        for (let i = 0, l = values.length; i < l; i += num) {
            list.push(values[i], values[i + 1], num > 2 ? values[i + 2] : 0);
        }

        this._pointsList.push({
            points: list
        })


        this._setNeedUpdateLines()
    }

    protected _setNeedUpdateLines() {
        this._needUpdateLines = true;
        this._needsUpdate = true
    }

    protected _update(d, u) {
        super._update(d, u)
        if (this._needUpdateLines) {
            this._needUpdateLines = false;
            this._updateLinesData()
        }
    }

    protected _updateLinesData() {

        let pointData = [];
        let indexData = [];
        let pointCount = 0;
        this._pointsList.forEach(data => {
            const points = data.points;

            indexData.push(pointCount++)
            pointData.push(points[0], points[1], points[2]);

            for (let i = 3, l = points.length; i < l; i += 3) {
                indexData.push(pointCount)

                pointData.push(points[i], points[i+1], points[i+2]);

                indexData.push(pointCount++)
            }

            indexData.pop()
        })

        this._geometry.addSingleAttribute('Position', ShaderConst.position, 3, FLOAT, new Float32Array(pointData));
        this._geometry.setIndexData(new Uint16Array(indexData))
        this._geometry.setDrawParameter(indexData.length, DrawMode.LINES, 0)
        this._geometry.buildBounding()
    }

}