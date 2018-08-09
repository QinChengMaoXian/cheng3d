import * as CGE from '../../src/CGE';

export class app {

    private static _app: CGE.Application;

    static init() {
        if (!this._app) {
            this._app = new CGE.Application;
            this._app.init(window.innerWidth, window.innerHeight);
        }
    }

    static get self(): CGE.Application {
        return this._app;
    }
}
