import { ObjectBase } from './ObjectBase';

export class VersionObject extends ObjectBase {
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
