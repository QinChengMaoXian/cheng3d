export class RenderBase {
    protected _update: boolean = false;

    public needsUpdate() {
        this._update = true;
    }

    public getUpdate() {
        return this._update;
    }
}