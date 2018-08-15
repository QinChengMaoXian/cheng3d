import * as CGE from '../../src/CGE';
import { Manager } from './manager/Manager';

export class App extends CGE.EventDispatcher {

    private static _app: App;

    static get instance(): App {
        if (!this._app) {
            this._app = new App;
            this._app.init();
        }
        return this._app;
    }

    private _cgeApp: CGE.Application;

    private _manager: Manager;

    constructor() {
        super();
    }

    private init() {
        this._cgeApp = new CGE.Application();
        this._cgeApp.init(CGE.Platform.width, CGE.Platform.height);

        this._manager = new Manager();
        this._manager.init();
    }

    public get cgeApp(): CGE.Application {
        return this._cgeApp;
    }
}
