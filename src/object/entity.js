import { CObject } from '../core/object.js';
import { Component } from './component.js';
import { ComponentType } from './objectType.js';

export class Entity extends CObject {
    constructor() {
        super();
        Object.assign(this, {
            _parent: undefined,
            _children: [],
            _components: new Map(),
            transform: undefined,
            geometry: undefined,
            material: undefined,
            camera: undefined,
            light: undefined,
        });
    }

    update() {
        this._components.forEach(function(component, type) {
            component.update();
        });
    }

    addComponent(component) {
        if (component instanceof Component) {
            if (component.getEntity() !== undefined) {
                return undefined;
            }
            switch (component.getType()) {
                case ComponentType.Transform: 
                    this.transform = component.getObject(); 
                    break;
                case ComponentType.Geometry:
                    this.geometry = component.getObject(); 
                    break;
                case ComponentType.Material:
                    this.material = component.getObject();
                    break;
                case ComponentType.Camera:
                    this.camera = component.getObject();
                    break;
                case ComponentType.Light:
                    this.light = component.getObject();
                    break;
                default:
                    break;
            }
            component.setEntity(this);
            this._components.set(component.getType(), component);
        }
    }

    getComponent(componentType) {
        return this._components.get(componentType);
    }

    getComponentObject(componentType) {
        let component = this._components.get(componentType);
        return component !== undefined ? component.getObject() : undefined;
    }

    removeComponent(component) {
        if (component instanceof Component) {
            this.removeFromType(component.getType());
        }
    }

    removeFromType(type) {
        let component = this.getComponent(type);
        if (component instanceof Component) {
            switch (type) {
                case ComponentType.transform: 
                    this.transform = undefined; 
                    break;
                case ComponentType.Geometry: 
                    this.geometry = undefined; 
                    break;
                case ComponentType.Material:
                    this.material = undefined;
                    break;
                case ComponentType.Camera:
                    this.camera = undefined;
                    break;
                case ComponentType.Light:
                    this.light = undefined;
                    break;
                default:
                    break;
            }
            component.setEntity(undefined);
            this._components.delete(type);
        }
    }

    // TODO: re-name this function;
    canBeRendering() {
        return (this.geometry !== undefined) && (this.material !== undefined);
    }

    addChild(entity) {
        this._children.push(subEntity);
    }

    setParent(entity) {
        this._parent = entity;
    }

    getParent(entity) {
        return this._parent;
    }

    static createRenderableEntity(geometry, material, transform) {
        let entity = new Entity();
        entity.addComponent(Component.CreateGeometryComponent(geometry));
        entity.addComponent(Component.CreateMaterialComponent(material));
        entity.addComponent(Component.CreateTransfromComponent(transform));
        return entity;
    }
}