import { Base } from '../core/Base';
import { ComponentType } from './ObjectType';

export class Component extends Base {
    _entity;
    _object;
    _type;
    constructor(object, componentType) {
        super();
        this._object = object;
        this._type = componentType;
    }

    update(delta) {
        this._object.update(delta);
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

    getEntity() {
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
