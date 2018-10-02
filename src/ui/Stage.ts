import { Sprite } from "./Sprite";
import { Event } from "../core/Event";
import { Object3D } from "../object/Object3D";

export class Stage extends Sprite {

    constructor() {
        super();
    }

    public createRenderMesh(parent: Object3D) {
        const children = this._children;

        let l = children.length;

        for (let i = 0; i < l; i++) {

        }
    }

    protected _createRenderMesh(sprite: Sprite) {
        
    }

    static checkEvent(base: Sprite, event: Event) {
        let x = event.stageX;
        let y = event.stageY;

        let rectData = base.getRectData();

        let sx = rectData[0];
        let sy = rectData[1];

        let ex = sx + rectData[2];
        let ey = sy + rectData[3];

        return x >= sx && x <= ex && y >= sy && y <= ey;
    }
}

