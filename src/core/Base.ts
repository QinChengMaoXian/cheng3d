export const VERSION = '05';

export const Logger = {
    info: function(message) {
        console.log(message);
    },

    warn: function(message) {
        console.warn(message);
    },

    error: function(message) {
        console.error(message);
    },
};

export const GetTypeCount = function() {
    let TypeCount = 0;
    return function getTypeCount() {
        return TypeCount++;
    };
}();

export const GetObjectCount = function() {
    let ObjectCount = 0;
    return function getObjectCount() {
        return ObjectCount++;
    };
}();

export class Base {
    private _uuid: string = generateUUID();
    protected _id:number = GetObjectCount();
    public name:string = ''
    constructor() {
        
    }

    public get id() {
        return this._id;
    }

    public get uuid() {
        return this._uuid;
    }

    public update(delta) {

    }

    public toJson(obj?) {
        const result:any = obj || {};
        result.uuid = this._uuid;
        result.name = this.name;
        result.type = this.constructor.name;
        return result;
    }

    public fromJson(obj) {
        this._uuid = obj.uuid;
        this.name = obj.name;
    }
}

export function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export const GLMAT_EPSILON = 0.000001;
export const USE_MULTI_RENDERER = false;
