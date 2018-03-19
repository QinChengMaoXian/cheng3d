import { Base } from '../../core/Base'

export class glObject {
    protected _localVersion = -1;
    protected _renderCount = -1;
    protected _update: boolean = false;
    
    constructor() {
        
    }

    public update() {

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
