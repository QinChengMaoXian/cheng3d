import * as CGE from '../../../src/CGE';
import { manager } from '../App';
import { LayerKey } from '../base/Constant';

export class BaseView extends CGE.Mesh {

    public addToLayer(key: LayerKey) {
        manager.layer.addToLayer(this, key);
    }

}
