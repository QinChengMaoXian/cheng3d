import { CObject } from '../core/object.js';
import { ComponentType } from '../object/objectType.js';

export class Component extends CObject {
    constructor(object, componentType) {
        super();
        Object.assign(this, {
            _entity: undefined,
            _object: object,
            _type: componentType,
        });
    }

    update() {
        this._object.update();
    }

    getObject() {
        return this._object;
    }

    getType() {
        return this._type;
    }

    setEntity(entity) {
        this._entity = entity;
    }

    getEntity(entity) {
        return this._entity;
    }

    static CreateTransfromComponent(transform) {
        return new Component(transform, ComponentType.Transform);
    }

    static CreateGeometryComponent(geometry) {
        return new Component(geometry, ComponentType.Geometry);
    }

    static CreateMaterialComponent(material) {
        return new Component(material, ComponentType.Material);
    }

    static CreateCameraComponent(camera) {
        // TODO: Remove this;
        return new Component(camera, ComponentType.Camera);
    }

    static CreateLightComponent(light) {
        return new Component(light, ComponentType.Light);
    }
}
