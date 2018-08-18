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

    public run(): any {
        if (!this.method) return null;
        const result = this.method.apply(this.caller, this.args);
        this.once && this.clear();
        return result;
    }

    public runWith(data: any) {
        if (this.method == null) return null;
        let id = this._id;
        let result;
        if (data == null) result = this.method.apply(this.caller, this.args);
        else if (!this.args && !data.unshift) result = this.method.call(this.caller, data);
        else if (this.args) result = this.method.apply(this.caller, this.args.concat(data));
        else result = this.method.apply(this.caller, data);
        return result;
    }

    public clear() {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    }
}