import { CObject } from '../core/object.js';

export class Scene extends CObject {
    constructor() {
        super();
        Object.assign(this, {
            _entities: new Map(),
            _mainCamera: undefined,
            _mainLight: undefined,
            _enforceMaterial: undefined,
            _deferred: false,
        });
    }

    update() {
        this._entities.forEach((entity) => {
            entity.update();
        });
    }

    getEntitys() {
        return this._entities;
    }

    addEntity(entity) {
        this._entities.set(entity.id, entity);
    }

    getRenderEntities() {
        let renderEntities = [];
        this._entities.forEach((entity, id) => {
            if (entity.canBeRendering()) {
                renderEntities.push(entity);
            }
        });
        return renderEntities;
    }

    getShadowMapEntitiesFromLight() {

    }

    getMainCamera() {
        return this._mainCamera;
    }

    setMainCamera(entity) {
        this.addEntity(entity);
        this._mainCamera = entity.camera;
    }
}