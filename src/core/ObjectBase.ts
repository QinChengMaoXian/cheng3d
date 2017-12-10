import { GetObjectCount } from '../core/Base';

export class ObjectBase {
    protected _id:number = GetObjectCount();
    public name:string = ''
    constructor() {
        
    }

    public get id() {
        return this._id;
    }

    public update(delta) {

    }
}
