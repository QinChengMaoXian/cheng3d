import * as CGE from '../../../src/CGE';
import { CommandManager } from './CommandManager';
import { PlayManager } from './PlayManager';
import { LayerManager } from './LayerManager';

export class Manager extends CGE.EventDispatcher {

    private _command: CommandManager;
    private _play: PlayManager;
    private _layer: LayerManager;

    constructor() {
        super();
    }

    public init() {
        let command = new CommandManager;
        command.init();
        this._command = command;

        let layer = new LayerManager;
        layer.init();
        this._layer = layer;

        let play = new PlayManager;
        play.init();
        this._play = play;
    }

    get command() {
        return this._command;
    }

    get play() {
        return this._play;
    }

    get layer() {
        return this._layer;
    }
}
