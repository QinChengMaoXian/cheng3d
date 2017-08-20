import { ObjectBase } from '../../core/ObjectBase'

export class glObject extends ObjectBase {
    protected _localVersion = -1;
    protected _renderCount = -1;
    
    constructor() {
        super();
    }

    getLocalVersion() {
        return this._localVersion;
    }

    setLocalVersion(version) {
        this._localVersion = version;
    }

    checkVersion(version) {
        return version - this._localVersion;
    }

    checkRenderCount(renderCount) {
        return renderCount - this._renderCount; 
    }

    updateRenderCount(renderCount) {
        this._renderCount = renderCount;
    }
}
