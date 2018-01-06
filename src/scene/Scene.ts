import { Base } from '../core/Base';

export class Scene extends Base {
    _entities = new Map();
    _mainCamera = undefined;
    _mainLight = undefined;
    _enforceMaterial = undefined;
    _deferred = false;
    
    constructor() {
        super();
    }

    update(delta) {
        this._entities.forEach((entity) => {
            entity.update(delta);
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