import * as CGE from './src/CGE'

let test_diff = './resources/spnza_bricks_a_diff.jpg';
let test_normal = './resources/spnza_bricks_a_ddn.jpg';
let man_diff = './resources/VWS_B_Male2-2.jpg';
let gltf_diff = './resources/Cesium_Man/Cesium_Man.jpg'
let color_diff = './resources/color.jpg'

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
            // mainScene.addChild(obj);   
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

// import { 
//     teapotPositions,
//     teapotTexCoords,
//     teapotNormals,
//     teapotBinormals,
//     teapotTangents,
//     teapotIndices,
// } from './teapot';

// let teapotGeometry = new CGE.Geometry();
// teapotGeometry.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, teapotPositions);
// teapotGeometry.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 3, CGE.FLOAT, teapotTexCoords);
// teapotGeometry.addSingleAttribute('Normal', CGE.ShaderConst.normal, 3, CGE.FLOAT, teapotNormals);
// teapotGeometry.addSingleAttribute('Binormal', CGE.ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
// teapotGeometry.addSingleAttribute('Tangent', CGE.ShaderConst.tangent, 3, CGE.FLOAT, teapotTangents);
// teapotGeometry.setIndexData(teapotIndices);
// teapotGeometry.setDrawParameter(teapotIndices.length);

// let teapotMesh = new CGE.Mesh();
// teapotMesh.setScale(1, 1, 1);
// teapotMesh.setPosition(10, 50, 20);
// teapotMesh.setGeometry(teapotGeometry);

// teapotMesh.setMaterial(standMat);

const app = new CGE.Application();
app.init(window.innerWidth, window.innerHeight);
window['app'] = app;

let renderer = app.getRenderer();
renderer.enableDepthTest();
renderer.setClearColor(1.0, 0.5, 0.5, 1.0);

let mainScene = app.getScene();

let camera = app.getCamera();
camera.setPositionAt(new CGE.Vector3(-20, 20, 20));
camera.lookAt(new CGE.Vector3(0, 1, 10));

let tri_scale = 10;

let tri_num = 2;
let half_num = tri_num / 2;

let vertexd = new Float32Array(tri_num * tri_num * tri_num * 18);

for (let k = 0; k < tri_num; k++) {
    for (let j = 0; j < tri_num; j++) {
        for (let i = 0; i < tri_num; i++) {
            let index = (k * tri_num * tri_num + j * tri_num + i) * 18;
            for (let t = 0; t < 6; t++) {
                vertexd[index + t * 3 + 0] = ((Math.random() + i - half_num) * tri_scale);
                vertexd[index + t * 3 + 1] = ((Math.random() + j - half_num) * tri_scale);
                vertexd[index + t * 3 + 2] = ((Math.random() + k) * tri_scale);
            }
        }
    }
}
// console.log(vertexd);

let tri1 = new CGE.Triangle();
let tri2 = new CGE.Triangle();

window['tri1'] = tri1;
window['tri2'] = tri2;

// let results = [];

let t1p1 = tri1.point1;
let t1p2 = tri1.point2;
let t1p3 = tri1.point3;

let t2p1 = tri2.point1;
let t2p2 = tri2.point2;
let t2p3 = tri2.point3;

let uvd = new Float32Array(tri_num * tri_num * tri_num * 12);

let startTime = Date.now();

let le = tri_num * tri_num * tri_num;

for (let i = 0; i < le; i++) {
    let index = i * 18;

    t1p1.set(vertexd[index + 0], vertexd[index + 1], vertexd[index + 2]);
    t1p2.set(vertexd[index + 3], vertexd[index + 4], vertexd[index + 5]);
    t1p3.set(vertexd[index + 6], vertexd[index + 7], vertexd[index + 8]);

    t2p1.set(vertexd[index + 9], vertexd[index + 10], vertexd[index + 11]);
    t2p2.set(vertexd[index + 12], vertexd[index + 13], vertexd[index + 14]);
    t2p3.set(vertexd[index + 15], vertexd[index + 16], vertexd[index + 17]);

    let result = CGE.triangleIntersect(tri1, tri2);

    let result1 = result ? 0.25 : 0.75;
    let result2 = result ? 0.75 : 0.25;

    let i2 = i * 12;

    for (let t = 0; t < 3; t++) {
        uvd[i2 + t * 2 + 0] = result1;
        uvd[i2 + t * 2 + 1] = result1;
    }

    for (let t = 3; t < 6; t++) {
        uvd[i2 + t * 2 + 0] = result1;
        uvd[i2 + t * 2 + 1] = result2;
    }
}

let endTime = Date.now(); 

console.log(startTime, endTime, endTime - startTime);

// console.log(uvd);

// console.log(results);

let triGeo = new CGE.Geometry();
triGeo.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, vertexd);
triGeo.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 2, CGE.FLOAT, uvd);
// triGeo.setIndexData(indexd);
triGeo.setDrawParameter(vertexd.length / 3);

let triTexture = new CGE.Texture2D();
triTexture.setImageUrl(color_diff);
triTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
triTexture.setMipmap(true);
let triMaterial = new CGE.DiffuseMaterial(triTexture);

let triMesh = new CGE.Mesh();
triMesh.setGeometry(triGeo);
triMesh.setMaterial(triMaterial);

mainScene.addChild(triMesh);

document.body.appendChild(renderer.getCanvas());



let mesh = new CGE.Mesh();
mesh.setScale(100, 100, 100);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(colorShowingMaterial);


let events = new Map();

window['camera'] = camera;

window.onresize = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    app.setSize(width, height);
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

app.start();

