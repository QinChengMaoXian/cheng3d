import { App } from './App';
import * as CGE from '../../src/CGE';
import { Airplane } from './model/Airplane';

export class Main {

    init() {
        let app = App.instance;
    }

    getCGEApp(): CGE.Application {
        return App.instance.cgeApp;
    }

    getApp(): App {
        return App.instance;
    }

}