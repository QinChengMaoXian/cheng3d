import { Mesh } from "./Mesh";
import { Vector3 } from "../math/Vector3";
import { ColorMaterial } from "../material/ColorMaterial";
import { Geometry } from "../graphics/Geometry";

interface LinesData {
    points: Vector3[]
}

export class LineSegment extends Mesh {

    protected _pointsList: LinesData[] = []

    constructor() {
        super()

        let mat = new ColorMaterial();
        this.setMaterial(mat);

        let geo = new Geometry();
        this.setGeometry(geo);
    }

    public setPoints(values: number[], num: number = 3) {
        if (!values || values.length < 2) {
            return
        }
        
        const list: Vector3[] = []
        for (let i = 0, l = values.length; i < l; i += num) {
            let point = new Vector3(values[i], values[i + 1], num > 2 ? values[i + 2] : 0);
            list.push(point);
        }

        this._pointsList.push({
            points: list
        })

        this._update()
    }

    protected _update() {

    }

}