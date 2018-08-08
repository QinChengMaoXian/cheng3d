import { app } from './app';
import * as CGE from '../../src/CGE';

export class Main {

    init() {
        app.init();
    }

    getApp(): CGE.Application {
        return app.self;
    }

}