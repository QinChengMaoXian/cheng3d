import { Handler } from '../util/Handler';
import { Base } from '../core/Base'

export class EventDispatcher extends Base {

    protected _events: Map<string, Handler>;

    constructor() {
        super();
    }

    public on(type: string, celler: any, method: Function, args?: any[], once: boolean = false) {

    }

}
