import { RenderBase } from '../../graphics/RenderBase'

export class glObject extends RenderBase {
    protected _localVersion = -1;
    protected _renderCount = -1;

    constructor() {
        super();
    }

    public getLocalVersion() {
        return this._localVersion;
    }

    public setLocalVersion(version) {
        this._localVersion = version;
    }

    public checkVersion(version) {
        return version - this._localVersion;
    }

    public checkRenderCount(renderCount) {
        return renderCount - this._renderCount; 
    }

    public updateRenderCount(renderCount) {
        this._renderCount = renderCount;
    }
}
