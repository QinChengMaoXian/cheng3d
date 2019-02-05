import { Panel } from "./Panel";

export class Image extends Panel {

    protected _skin: string;

    constructor() {
        super();
    }

    set skin(skin: string) {
        this._skin = skin;
    }

    get skin(): string {
        return this._skin;
    }

    public getIsRender() {
        return this.visible && this.skin && this.skin !== '';
    }
}
