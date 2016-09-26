import * as CGE from './src/CGE.js'
import { 
    createTexture2DFromImage, 
    DeferredMaterial,
    FullScreenTextureMaterial,
} from './ext.js'

import test_diff from './resources/spnza_bricks_a_diff.jpg';

import { 
    teapotPositions,
    teapotTexCoords,
    teapotNormals,
    teapotBinormals,
    teapotTangents,
    teapotIndices,
} from './teapot.js';

let vertexPositionData = new Float32Array([
    -1.0, 1.0, 0.0,  0.0, 1.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
    1.0,  1.0, 0.0,  1.0, 1.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
    1.0, -1.0, 0.0,  1.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
    -1.0, -1.0, 0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
]);

let indexData = new Uint16Array([
    0, 2, 1,
    2, 0, 3, 
]);

let planeVertexGeometry = new CGE.Geometry();

let attribs = [
    {
        name: 'Position',
        attribute: CGE.AttribType.POSITION, 
        num: 3,
        offset: 0,
    },
    {
        name: 'UV',
        attribute: CGE.AttribType.UV0, 
        num: 2,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
    },
    {
        name: 'Normal',
        attribute: CGE.AttribType.NORMAL, 
        num: 3,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 5,
    },
    {
        name: 'Tangent',
        attribute: CGE.AttribType.TANGENT, 
        num: 3,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 8,
    },
];

planeVertexGeometry.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 11, vertexPositionData);
planeVertexGeometry.setIndexData(indexData);
planeVertexGeometry.setDrawParameter(indexData.length);

let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.AttribType.POSITION, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV0', CGE.AttribType.UV0, 2, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.AttribType.NORMAL, 3, CGE.FLOAT, teapotNormals);
teapotGeometry.addSingleAttribute('Binormal', CGE.AttribType.BINORMAL, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.AttribType.TANGENT, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);

let renderer = new CGE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.enableDepthTest();
renderer.setClearColor(1.0, 0.5, 0.5, 1.0);
renderer.clear(true, true);

document.body.appendChild(renderer.getCanvas());

let colorTexrure = createTexture2DFromImage(test_diff, true);
let colorShowingMaterial = new FullScreenTextureMaterial(colorTexrure);
let colorShowingTransform = new CGE.Transform(new CGE.Vector3(0.0, 0.0, -0.1), undefined, new CGE.Vector3(0.5, 0.5, 1));
let colorShowingEntity = CGE.Entity.createRenderableEntity(planeVertexGeometry, colorShowingMaterial, colorShowingTransform);

let camera = new CGE.Camera(window.innerWidth, window.innerHeight);
camera.setPosition(new CGE.Vector3(100, 100, 100));
camera.lookAt(new CGE.Vector3(0,0,0));
camera.update();

let cameraEntity = new CGE.Entity();
cameraEntity.addComponent(CGE.Component.CreateTransfromComponent(new CGE.Transform()));
cameraEntity.addComponent(CGE.Component.CreateCameraComponent(camera));

let mainScene = new CGE.Scene();
mainScene.setMainCamera(cameraEntity);
mainScene.addEntity(colorShowingEntity);

let render = function() {
    // renderTargetScene.update();
    // trans.forEach(function(transform){
    //     transform.applyMatrix4(testMat4);
    // });
    // renderer.renderScene(renderTargetScene, renderTarget);
    mainScene.update();
    renderer.renderScene(mainScene);
};

window.onresize = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.resize(width, height);
    camera.update();
    // renderTargetCamera.resize(width, height);
    // renderTargetCamera.update();
    render();
};

let noError = true;
window.onerror = function(event) {
    noError = false;
}

function loop() {
    let animationframe = window.requestAnimationFrame
                        ||window.mozRequestAnimationFrame
                        ||window.webkitRequestAnimationFrame
                        ||window.msRequestAnimationFrame
                        ||window.oRequestAnimationFrame
                        ||function(a){
        setTimeout(a, 1000/5);
    };
    if (noError) {
        animationframe(loop);
    }
	render();
};

loop();
