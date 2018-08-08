import * as CGE from '../../src/CGE';

export class app {

    private static _app: CGE.Application;

    static init() {
        if (!this._app) {
            this._app = new CGE.Application;
        }
    }

    static get self(): CGE.Application {
        return this._app;
    }
}
