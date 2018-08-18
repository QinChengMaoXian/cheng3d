import * as CGE from '../../../src/CGE';
import { App } from '../App';
import { LayerKey } from '../base/Constant';

export class LayerManager {

    protected _layers: CGE.Object3D[];

    constructor() {

    }

    public init() {
        let scene = App.instance.scene;
        let length = LayerKey.Length;
        let layers = [];

        for (let i = 0 ; i < length; i++) {
            let obj = new CGE.Object3D;
            scene.addChild(obj);
            layers.push(obj);
        }

        this._layers = layers;
    }

    public addToLayer(obj: CGE.Object3D, key: LayerKey) {
        let layer = this._layers[key];
        if (!obj || !layer) return;
        layer.addChild(obj);
    }

    public removeToLayer(obj: CGE.Object3D, key: LayerKey) {
        let layer = this._layers[key];
        if (!obj || !layer) return;
        layer.removeChild(obj);
    }

    public getLayer(key: LayerKey): CGE.Object3D {
        return this._layers[key];
    }

}