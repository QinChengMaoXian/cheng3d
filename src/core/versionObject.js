import { CObject } from './object.js';

export class VersionObject extends CObject {
    constructor() {
        super();
        let _updateVersion = 0;
        this.needsUpdate = function() {
            _updateVersion++;
        };

        this.getUpdateVersion = function(version) {
            return _updateVersion;
        };
    }
}
