import { Box } from "./Box";

export class Image extends Box {

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
