export class RenderBase {
    protected _update: boolean = true;

    public needsUpdate() {
        this._update = true;
    }

    public getUpdate() {
        return this._update;
    }
}