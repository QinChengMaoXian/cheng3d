import { app } from './app';
import * as CGE from '../../src/CGE';
import { Airplane } from './model/Airplane';

export class Main {

    init() {
        app.init();

        let air: Airplane = new Airplane;
        air.init(1);

        app.self.getScene().addChild(air.getView());
    }

    getApp(): CGE.Application {
        return app.self;
    }

}