import * as CGE from '../../../src/CGE'
import { CommandManager } from './CommandManager';

export class Manager extends CGE.EventDispatcher {

    private _command: CommandManager

    constructor() {
        super();
    }

    init() {
        this._command = new CommandManager;
    }

}
