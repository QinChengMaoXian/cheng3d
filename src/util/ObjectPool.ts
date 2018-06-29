export class ObjectPool<T>
{
    protected _data: T[] = [];
    protected _func: {new(): T; };

    constructor(func: {new(): T; }, defLength: number = 1) {
        this._func = func;
        for (let i = 0; i < defLength; i++) {
            this._data.push(new func);
        }
    }

    public create(): T {
        if (this._data.length > 0) {
            return this._data.pop();
        }

        return new this._func;
    }

    public recovery(d: T) {
        this._data.push(d);
    }
} 