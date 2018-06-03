import { Handler } from '../util/Handler';

export class EventDispatcher {

    protected _events: Map<string, Handler[]> = new Map();

    constructor() {
        
    }

    public add(type: string, celler: any, method: Function, args?: any[]) {
        this._addEvent(type, celler, method, args, false);
    }

    public once(type: string, celler: any, method: Function, args?: any[]) {
        this._addEvent(type, celler, method, args, true);
    }

    public remove(type: string, celler: any, method: Function) {
        let events = this._events;
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l;) {
                let handler = handlers[i];
                if (handler.caller === celler && handler.method === method) {
                    handlers.splice(i, 1);
                    l = handlers.length;
                } else {
                    i++;
                }
                handler.clear();
                handler = null;
            }
            if (handlers.length === 0) {
                events.delete(type);
            }
        }
    }

    public removeAll() {
        this._events.forEach((handlers, key) => {
            if (handlers) {
                let l = handlers.length;
                for (let i = 0; i < l; i++) {
                    let handler = handlers[i];
                    handler.clear();
                    handler = null;
                }
                handlers.splice(0, l);
            }
        });
        this._events.clear();
    }

    public emit(type: string, args?: any[]) {
        let events = this._events;
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l; i++) {
                let handler = handlers[i];
                return handler.runWith(args);
            }
        } 
    }

    protected _addEvent(type: string, celler: any, method: Function, args?: any[], once: boolean = false) {
        let events = this._events;
        let handlers = events.get(type);
        if (handlers) {
            let l = handlers.length;
            for (let i = 0; i < l; i++) {
                let handler = handlers[i];
                if (handler.caller === celler && handler.method === method) {
                    handler.args = args;
                    handler.once = once;
                    return;
                }
            }
        } else {
            handlers = [];
            events.set(type, handlers);
        }
        handlers.push(new Handler(celler, method, args, once));
    }



}
