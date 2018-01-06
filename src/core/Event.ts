import { Base } from './Base';

export class Event extends Base {
    _func;
    constructor() {
        super();
        this._func = undefined;
    }

    setFunc(func) {
        this._func = func;
    }

    update(delta) {
        if (!this._func) 
            return;
        this._func(delta);
    }

    static createFromFunc(func) {
        let event = new Event();
        event.setFunc(func);
        return event;
    }
}
