import * as CGE from './src/CGE'

let test_diff = './resources/spnza_bricks_a_diff.jpg';
let test_normal = './resources/spnza_bricks_a_ddn.jpg';
let man_diff = './resources/VWS_B_Male2-2.jpg';
let gltf_diff = './resources/Cesium_Man/Cesium_Man.jpg'

import { 
    teapotPositions,
    teapotTexCoords,
    teapotNormals,
    teapotBinormals,
    teapotTangents,
    teapotIndices,
} from './teapot';

let mainScene = new CGE.Scene();
/*

let manTexture = createTexture2DFromImage(man_diff, true);
let manShowingMaterial = new FullScreenTextureMaterial(manTexture);

let loaderCallback = response => {
    CGE.Logger.info(response);
}

let cgeLoader = new CGE.Loader();
cgeLoader.loadUrl('./resources/avatar.dae').then(result => { 
        CGE.Logger.info('load from CGE loader');
        CGE.Logger.info(result);
    });
cgeLoader.loadUrls([
    { 
        url: './resources/Cesium_Man/Cesium_Man.gltf',
    }, 
    {
        url: './resources/avatar.dae',
    }], 
    loaderCallback
);

let dae_doc = undefined;
let loader_geo = undefined;
let func = function(event, object) {
    switch (event) {
        case 'document':
            dae_doc = object;
            CGE.Logger.info(dae_doc);
            break;

        case 'entity':
            CGE.Logger.info(object);
            loader_geo = object;
            let loadShowingTransform = new CGE.Transform(new CGE.Vector3(-20.0, -20.0, -0.1), undefined, new CGE.Vector3(50, 50, 50));
            let loadShowingEntity = CGE.Entity.createRenderableEntity(loader_geo, colorShowingMaterial, loadShowingTransform);
            mainScene.addEntity(loadShowingEntity);
            break;

        case 'error':
            CGE.Logger.error(object);
            break;
    
        default:
            break;
    }
}

let collada = new CGE.ColladaLoader();
collada.load('./resources/avatar.dae', func);


//===========================================================

let gltfJson = undefined;
let gltfCallback = (event, object) => {
    switch (event) {
        case 'entity':
            gltfJson = object[0];
            CGE.Logger.info(gltfJson);
            let loadShowingTransform = new CGE.Transform(new CGE.Vector3(20.0, 20.0, -0.1), undefined, new CGE.Vector3(50, 50, 50));
            let gltfTexture = createTexture2DFromImage(gltf_diff, true);
            let gltfMaterial = new FullScreenTextureMaterial(gltfTexture);
            let loadShowingEntity = CGE.Entity.createRenderableEntity(gltfJson, colorShowingMaterial, loadShowingTransform);
            mainScene.addEntity(loadShowingEntity);   
            break;

        case 'error':
            CGE.Logger.error(object);
            break;
    
        default:
            break;
    }
}




let gltfTest = new CGE.GltfLoader();
gltfTest.load('./resources/Cesium_Man/Cesium_Man.gltf', gltfCallback);

let gltfBin = undefined;
new Promise((resolve, reject) => {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                resolve(xmlHttp);
            } else {
                reject(new Error(this.statusText));
            }
        }
    }
    xmlHttp.open('GET', './resources/Cesium_Man/Cesium_Man.bin', true);
    xmlHttp.responseType = 'arraybuffer';
    xmlHttp.send(null);
}).then((json) => {
    gltfBin = json['response'];
    CGE.Logger.info(json);
}).catch((error) => {
    CGE.Logger.info(error);
});

CGE.Logger.info('now start promise');


let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.AttribType.POSITION, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV0', CGE.AttribType.TEXCOORD0, 3, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.AttribType.NORMAL, 3, CGE.FLOAT, teapotNormals);
teapotGeometry.addSingleAttribute('Binormal', CGE.AttribType.BINORMAL, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.AttribType.TANGENT, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);

// TODO: rebuild this class;


let colorShowingTransform = new CGE.Transform(new CGE.Vector3(0.0, 0.0, -0.1), undefined, new CGE.Vector3(50, 50, 1));
let colorShowingEntity = CGE.Entity.createRenderableEntity(planeVertexGeometry, colorShowingMaterial, colorShowingTransform);

let teapotTransform = new CGE.Transform(new CGE.Vector3(0.0, 0.0, -0.1), undefined, new CGE.Vector3(1, 1, 1));
let teapotEntity = CGE.Entity.createRenderableEntity(teapotGeometry, colorShowingMaterial, teapotTransform);

window['teapot'] = teapotEntity;

let cameraEntity = new CGE.Entity();
cameraEntity.addComponent(CGE.Component.CreateTransfromComponent(new CGE.Transform()));
cameraEntity.addComponent(CGE.Component.CreateCameraComponent(camera));

mainScene.setMainCamera(cameraEntity);
mainScene.addEntity(colorShowingEntity);
mainScene.addEntity(teapotEntity);

*/

window['CGE'] = CGE;

let colorTexrure = new CGE.Texture2D();// createTexture2DFromImage(test_diff, true);
colorTexrure.setImageUrl(test_diff);
colorTexrure.setFilter(CGE.LINEAR, CGE.LINEAR);
colorTexrure.setMipmap(true);
colorTexrure.setWarp(CGE.REPEAT, CGE.REPEAT);

let normalTexture = new CGE.Texture2D();// createTexture2DFromImage(test_diff, true);
normalTexture.setImageUrl(test_normal);
normalTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
normalTexture.setMipmap(true);
normalTexture.setWarp(CGE.REPEAT, CGE.REPEAT);


let colorShowingMaterial = new CGE.DiffuseMaterial(colorTexrure);

let standMat = new CGE.StandardMaterial(colorTexrure, normalTexture);

let gltfJson = undefined;
let gltfCallback = (event, object) => {
    switch (event) {
        case 'entity':
            gltfJson = object[0];
            CGE.Logger.info(gltfJson);
            let gltfTexture = new CGE.Texture2D();
            gltfTexture.setImageUrl(gltf_diff);
            gltfTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
            gltfTexture.setMipmap(true);
            let gltfMaterial = new CGE.DiffuseMaterial(gltfTexture);
            let mesh = new CGE.Mesh();
            mesh.setScale(20, 20, 20);
            mesh.setGeometry(gltfJson);
            mesh.setMaterial(gltfMaterial);
            let obj = new CGE.Object3D();
            obj.addChild(mesh);
            obj.name = 'test';
            mainScene.addChild(obj);   
            break;

        case 'error':
            CGE.Logger.error(object);
            break;
    
        default:
            break;
    }
}




let gltfTest = new CGE.GltfLoader();
gltfTest.load('./resources/Cesium_Man/Cesium_Man.gltf', gltfCallback);

let vertexPositionData = new Float32Array([
    -1.0, 1.0, 0.0,  0.0, 5.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
    1.0,  1.0, 0.0,  5.0, 5.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
    1.0, -1.0, 0.0,  5.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 0.0,
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
        attribute: CGE.ShaderConst.position, 
        num: 3,
        offset: 0,
    },
    {
        name: 'UV',
        attribute: CGE.ShaderConst.texcoord, 
        num: 2,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 3,
    },
    {
        name: 'Normal',
        attribute: CGE.ShaderConst.normal, 
        num: 3,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 5,
    },
    {
        name: 'Tangent',
        attribute: CGE.ShaderConst.tangent, 
        num: 3,
        offset: vertexPositionData.BYTES_PER_ELEMENT * 8,
    },
];

planeVertexGeometry.addMultiAttribute(attribs, CGE.FLOAT, vertexPositionData.BYTES_PER_ELEMENT * 11, vertexPositionData);
planeVertexGeometry.setIndexData(indexData);
planeVertexGeometry.setDrawParameter(indexData.length);

let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 3, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.ShaderConst.normal, 3, CGE.FLOAT, teapotNormals);
teapotGeometry.addSingleAttribute('Binormal', CGE.ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.ShaderConst.tangent, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);


let renderer = new CGE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.enableDepthTest();
renderer.setClearColor(1.0, 0.5, 0.5, 1.0);


window['renderer'] = renderer;

document.body.appendChild(renderer.getCanvas());

window['scene'] = mainScene;

// let frame = new CGE.Frame();
// frame.addTexture()

let mesh = new CGE.Mesh();
mesh.setScale(100, 100, 100);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(colorShowingMaterial);

let teapotMesh = new CGE.Mesh();
teapotMesh.setScale(1, 1, 1);
teapotMesh.setPosition(10, 50, 20);
teapotMesh.setGeometry(teapotGeometry);

teapotMesh.setMaterial(standMat);
// teapotMesh.setMaterial(colorShowingMaterial);

mainScene.addChild(mesh);
mainScene.addChild(teapotMesh);

let events = new Map();

let camera = new CGE.Camera(window.innerWidth, window.innerHeight);
camera.setPositionAt(new CGE.Vector3(-20, 20, 20));
camera.lookAt(new CGE.Vector3(0, 1, 10));
camera.update(0);

window['camera'] = camera;

let render = function(delta) {
    camera.update(delta);
    events.forEach((event) => {
        event.update(delta);
    });
    mainScene.update(delta);
    renderer.renderScene(mainScene, camera);
};

window.onresize = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.resize(width, height);
    camera.update(0);
    render(0);
};

let noError = true;
window.onerror = function(event) {
    noError = false;
}

let _d = 0.5;

let forward = CGE.Event.createFromFunc(() => {camera.forwardStep(_d);});
let back = CGE.Event.createFromFunc(() => {camera.forwardStep(-_d);});
let left = CGE.Event.createFromFunc(() => {camera.horizontalStep(-_d);});
let right = CGE.Event.createFromFunc(() => {camera.horizontalStep(_d);});

let verticalTop = CGE.Event.createFromFunc(() => {camera.verticalStep(_d);});
let verticalDown = CGE.Event.createFromFunc(() => {camera.verticalStep(-_d);});

window.onkeydown = function(event) {
    // CGE.Logger.info(event);
    switch(event.which || event.keyCode) {
        case 87:
            events.set(forward.id, forward);
            break;

        case 65:
            events.set(left.id, left);
            break;

        case 83:
            events.set(back.id, back);
            break;

        case 68:
            events.set(right.id, right);
            break;

        case 81:
            events.set(verticalTop.id, verticalTop);
            break;
        
        case 69:
            events.set(verticalDown.id, verticalDown);
            break;

        default:
            break;
    }
}

window.onkeyup = function(event) {
    switch(event.which || event.keyCode) {
        case 87:
            events.delete(forward.id);
            break;

        case 65:
            events.delete(left.id);
            break;

        case 83:
            events.delete(back.id);
            break;

        case 68:
            events.delete(right.id);
            break;

        case 81:
            events.delete(verticalTop.id);
            break;
        
        case 69:
            events.delete(verticalDown.id);
            break;

        default:
            break;
    }
}

window.onblur = function(event) {
    events.clear();
}

let mouseDown = false;

window.onmousemove = function(event) {
    if (mouseDown) {
        let del = 0.005;
        let moveX = event.movementX * del;
        let moveY = event.movementY * del;
        camera.rotateViewFromForward(moveX, moveY);
    }
}

window.onmousedown = function(event) {
    mouseDown = true;
}

window.onmouseup = function(event) {
    mouseDown = false;
}

let dataS = new Date();

let fps = null;
let fpsUpdate = 0;

function loop() {
    let animationframe = window.requestAnimationFrame
                        ||function(a){
        setTimeout(a, 1000/5);
    };
    if (noError) {
        animationframe(loop);
    }
    let dateE = new Date();
    let delta = dateE.getTime() - dataS.getTime();
    dataS = dateE;
    if (fpsUpdate++ % 10 === 0) {
        if (!fps) {
            fps = document.getElementById('fps');
        }
        var f = 1000 / delta;
        fps.innerText = 'fps:' + f.toFixed(0);
    }
    render(delta);
};

setTimeout(render, 200);

window['loop'] = loop;
window['render'] = render; 

// loop();
