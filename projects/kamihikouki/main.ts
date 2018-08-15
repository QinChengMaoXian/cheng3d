import { App } from './App';
import * as CGE from '../../src/CGE';
import { Airplane } from './model/Airplane';

export class Main {

    init() {
        let app = App.instance;

        let air: Airplane = new Airplane;
        air.init(1);

        app.cgeApp.getScene().addChild(air.getView());
    }

    getCGEApp(): CGE.Application {
        return App.instance.cgeApp;
    }

}