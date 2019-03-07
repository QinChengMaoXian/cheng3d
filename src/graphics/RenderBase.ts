export class RenderBase {
    private _update: boolean = true;

    public needsUpdate() {
        this._update = true;
    }

    public updated() {
        this._update = false;
    }

    public getUpdate() {
        return this._update;
    }

    public remove(idx: number) {
        
    }
}