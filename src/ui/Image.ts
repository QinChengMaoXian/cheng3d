import { Sprite } from "./Sprite";
import { Texture2D } from "../graphics/Texture2D";

export class Image extends Sprite {
    protected _skin: string;
    protected _texture2d: Texture2D;

    constructor() {
        super();
    }

    set skin(string) {
        
    }

    get skin(): string {
        return this._skin;
    }
}
