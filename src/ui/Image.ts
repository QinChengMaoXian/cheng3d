import { Sprite } from "./Sprite";

export class Image extends Sprite {
    protected _skin: string;

    constructor() {
        super();
    }

    set skin(skin: string) {
        
    }

    get skin(): string {
        return this._skin;
    }
}
