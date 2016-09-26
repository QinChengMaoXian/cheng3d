import { CObject } from '../../core/object.js'

export class glObject extends CObject {
    constructor() {
        super();
        Object.assign(this, {
            _localVersion: -1,
            _renderCount: -1,
        });
    }

    getLocalVersion() {
        return this._localVersion;
    }

    setLocalVersion(version) {
        this._localVersion = version;
    }

    checkVersion(version) {
        return version - _localVersion;
    }

    checkRenderCount() {
        return renderCount - this._renderCount; 
    }

    updateRenderCount() {
        this._renderCount = renderCount;
    }
}
