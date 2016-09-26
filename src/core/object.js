import { GetObjectCount } from '../core/base.js';

export class CObject {
    constructor() {
        Object.defineProperty(this, 'id', {writable: false, value: GetObjectCount()});
    }

    getId() {
        return this.id;
    }

    update() {

    }
}
