import { Base } from './Base';

export class VersionObject extends Base {
    private _updateVersion = 0;

    public needsUpdate() {
        this._updateVersion++;
    }

    public getUpdateVersion() {
        return this._updateVersion;
    }

    constructor() {
        super();
    }
}
