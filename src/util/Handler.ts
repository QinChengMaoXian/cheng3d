export class Handler {
    private static _gid: number = 1;
    protected _id: number;

    constructor(public caller: any,
                public method: Function,
                public args?: any[],
                public once: boolean = false) {
        this._id = Handler._gid++;
    }

    public setTo(caller: any, method: Function, args?: any[], once: boolean = false) {
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = false;
    }

    public run() {
        if (this.method) return null;
        const id = this._id;
        const result = this.method.apply(this.caller, this.args);
        this.once && this.clear();
        return result;
    }

    public clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    }
}