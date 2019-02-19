import * as CGE from './src/CGE'

// let test_diff = './res/spnza_bricks_a_diff.jpg';
// let test_ddn = './res/spnza_bricks_a_ddn.jpg';
// let test_spec = './res/spnza_bricks_a_spec.png';

let cartoon_color = './res/bronya_color.png';
let cartoon_light = './res/bronya_lightmap.jpg';
let cartoon_emission = './res/bronya_emission.jpg';
let cartoon_obj = './res/bronya.obj';

let brdf_basecolor = './resources/brdfTest/rustediron2_basecolor.jpg';
// let brdf_metallic = './resources/brdfTest/rustediron2_metallic.png';
let brdf_normal = './resources/brdfTest/rustediron2_normal.jpg';
// let brdf_roughness = './resources/brdfTest/rustediron2_roughness.png';
let brdf_specular = './resources/brdfTest/rustediron2_specular.jpg'

let env_lut = './resources/envLUT.png'

// window['CGE'] = CGE;

import { Main } from './projects/kamihikouki/main';

let main = new Main();
main.init();
let app = main.getCGEApp();
let mainScene = app.getScene();
let stage = app.getStage();

let camera = app.getCamera();

camera.setPositionAt(new CGE.Vector3(-20, 20, 20));

let spr = new CGE.Sprite();
spr.setSize(200, 200);
spr.setPosition(50, 100, 0);

// stage.addChild(spr);

// stage.on(Event.MOUSE_DOWN, this, (e: Event) => {
//     console.log('stage on mouse down');
// });

// spr.on(CGE.Event.CLICK, this, (e: CGE.Event) => {
//     console.log('spr on click');
// });

// spr.on(CGE.Event.MOUSE_OVER, this, (e: CGE.Event) => {
//     console.log('spr on mouse over');
// });

// spr.on(CGE.Event.MOUSE_OUT, this, (e: CGE.Event) => {
//     console.log('spr on mouse out');
// });

let timer = app.getTimer();


///////////////////////////////////////////////////////////////////////////
// 鼠标与键盘控制主相机，TODO以下的代码需要封装在相机控制类中。
let _d = 2;

let cameraRotate = (e: CGE.Event) => {
    let del = 0.005;
    let moveX = e.movementX * del;
    let moveY = e.movementY * del;
    camera.rotateViewFromForward(moveX, moveY);
}

stage.on(CGE.Event.KEY_DOWN, this, (e: CGE.Event) => {
    switch (e.key) {
        case 'w':
            timer.frameLoop(1, camera, camera.forwardStep, [_d]);
            break;
    
        case 's':
            timer.frameLoop(1, camera, camera.forwardStep, [-_d]);
            break;

        case 'a':
            timer.frameLoop(1, camera, camera.horizontalStep, [-_d]);
            break;
        
        case 'd':
            timer.frameLoop(1, camera, camera.horizontalStep, [_d]);
            break;

        default:
            break;
    }
});

stage.on(CGE.Event.KEY_UP, this, (e: CGE.Event) => {
    switch (e.key) {
        case 'w':
        case 's':
            timer.remove(camera, camera.forwardStep);
            break;

        case 'a':
        case 'd':
            timer.remove(camera, camera.horizontalStep);
            break;

        default:
            break;
    }
});

stage.on(CGE.Event.MOUSE_DOWN, this, (e: Event) => {
    stage.on(CGE.Event.MOUSE_MOVE, this, cameraRotate);
});

stage.on(CGE.Event.MOUSE_UP, this, (e: Event) => {
    stage.off(CGE.Event.MOUSE_MOVE, this, cameraRotate);
});

// 相机控制代码块结束
///////////////////////////////////////////////////////////////////////////


let game_app = main.getApp();

// let app = new CGE.Application();
// app.init(CGE.Platform.width, CGE.Platform.height);

// let colorTexrure = new CGE.Texture2D();// createTexture2DFromImage(test_diff, true);
// colorTexrure.setImageUrl(test_diff);
// colorTexrure.setFilter(CGE.LINEAR, CGE.LINEAR);
// colorTexrure.setMipmap(true);
// colorTexrure.setWarp(CGE.REPEAT, CGE.REPEAT);

// let normalTexture = new CGE.Texture2D();// createTexture2DFromImage(test_diff, true);
// normalTexture.setImageUrl(test_ddn);
// normalTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
// normalTexture.setMipmap(true);
// normalTexture.setWarp(CGE.REPEAT, CGE.REPEAT);

// let specTexture = new CGE.Texture2D();// createTexture2DFromImage(test_diff, true);
// specTexture.setImageUrl(test_spec);
// specTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
// specTexture.setMipmap(true);
// specTexture.setWarp(CGE.REPEAT, CGE.REPEAT);

let objLoader = new CGE.OBJLoader();

// let colorShowingMaterial = new CGE.DiffuseMaterial(colorTexrure);

// let standMat = new CGE.StandardMaterial(brdf_basecolor, brdf_normal, brdf_specular, brdf_specular, brdf_specular);


let geo = new CGE.SphereGeometry(1, 32, 32);
// let gltfMaterial = new CGE.DiffuseMaterial(test_diff);

let createTexture2DFromImage = function(imgSrc, mipmap?) {
    let texture2d = new CGE.Texture2D();
    texture2d.setImageUrl(imgSrc);
    if (mipmap === true) {
        texture2d.setMipmap(true);
        texture2d.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
    }
    return texture2d;
};

let cubeTexture = new CGE.TextureCube();
cubeTexture.setTexture2ds(
    createTexture2DFromImage('./resources/skybox/px.jpg'),
    createTexture2DFromImage('./resources/skybox/nx.jpg'),
    createTexture2DFromImage('./resources/skybox/py.jpg'),
    createTexture2DFromImage('./resources/skybox/ny.jpg'),
    createTexture2DFromImage('./resources/skybox/pz.jpg'),
    createTexture2DFromImage('./resources/skybox/nz.jpg')
);

cubeTexture.setMipmap(true);
cubeTexture.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

let lutTexture = new CGE.Texture2D();
lutTexture.setImageUrl(env_lut);

let diffTex = new CGE.Texture2D();
diffTex.setImageUrl(brdf_basecolor);
diffTex.setMipmap(true);
diffTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

let normTex = new CGE.Texture2D();
normTex.setImageUrl(brdf_normal);
normTex.setMipmap(true);
normTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

let specTex = new CGE.Texture2D();
specTex.setImageUrl(brdf_specular);
specTex.setMipmap(true);
specTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

let obj3D = new CGE.Object3D();
obj3D.name = '一堆球';

let standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);

standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);

standMat.setBrdfLUTMap(lutTexture);

window['standMat'] = standMat;

mainScene.addChild(obj3D);

for (let ix = 0; ix < 10; ix++) {

    for (let iz = 0; iz < 5; iz++) {
        let mesh = new CGE.Mesh();
        mesh.setGeometry(geo);
        let mat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);

        mat.setBrdfLUTMap(lutTexture);

        mat.setIrradianceMap(cubeTexture);
        mat.setPrefilterMap(cubeTexture);
        
        // mat.setBaseColor(1.000, 0.782, 0.344, 1.0);
        // mat.setSpecular((ix + 1) * 0.1, (iz + 1) * 0.2, 1);
        mesh.setMaterial(mat);

        mesh.setPosition(ix * 20, 0, -iz * 20);
        mesh.setScale(8, 8, 8);

        obj3D.addChild(mesh);
    }

} 

let webgl2: WebGLRenderingContext

let quat = new CGE.Quaternion();
quat.setAxisAngle(new CGE.Vector3(0, 0, 1), 0.02);

let gltfJson = undefined;
let gltfCallback = (event, object) => {
    switch (event) {
        case 'entity':
            // gltfJson = object[0];
            // CGE.Logger.info(gltfJson);
            
            // let mesh = new CGE.Mesh();
            // mesh.setScale(20, 20, 20);
            // mesh.setGeometry(geo);
            // mesh.setMaterial(standMat);
            // mesh.setPosition(0,0,-20);
            // let obj = new CGE.Object3D();
            // obj.addChild(mesh);
            // obj.name = 'gltftest';
            // mainScene.addChild(obj);  
            // app.getTimer().frameLoop(1, this, () => {
            //     obj.setPositionAt(game_app.manager.play.airPlane.getPos());
            //     let rot = obj.getRotate();
            //     rot.multiply(quat);
            //     obj.enableUpdateMat();
            // })
            break;

        case 'error':
            CGE.Logger.error(object);
            break;
    
        default:
            break;
    }
}


// CGE.Loader.loadImage('').then(img => {

// })

let gltfTest = new CGE.GltfLoader();
gltfTest.load('./resources/Cesium_Man/Cesium_Man.gltf', gltfCallback);

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

import { 
    teapotPositions,
    teapotTexCoords,
    teapotNormals,
    teapotBinormals,
    teapotTangents,
    teapotIndices,
} from './teapot';
import { Sprite } from './src/ui/Sprite';

let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 3, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.ShaderConst.normal, 3, CGE.FLOAT, teapotNormals);
teapotGeometry.addSingleAttribute('Binormal', CGE.ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.ShaderConst.tangent, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);

let teapotMesh = new CGE.Mesh();
teapotMesh.setScale(0.002, 0.002, 0.002);
teapotMesh.setPosition(0, 0, 20);
teapotMesh.setGeometry(teapotGeometry);

teapotMesh.setMaterial(standMat);


// const app = new CGE.Application();

window['app'] = app;

let renderer = app.getRenderer();
renderer.enableDepthTest();
let gb = Math.pow(0.5, 2.2);
renderer.setClearColor(1.0, gb, gb, 1.0);
// renderer.setClearColor(0, 0, 0, 1.0);


// camera.lookAt(new CGE.Vector3(0, 1, 10));
mainScene.setActiveCamera(camera);


// mainScene.addChild(teapotMesh);  
// app.getTimer().frameLoop(1, this, () => {
//     teapotMesh.setPositionAt(game_app.manager.play.airPlane.getPos());
//     let rot = teapotMesh.getRotate();
//     rot.multiply(quat);
//     teapotMesh.enableUpdateMat();
// })

let tri_scale = 100;

let tri_num = 20;
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

// console.log(startTime, endTime, endTime - startTime);

// console.log(uvd);

// console.log(results);

let triGeo = new CGE.Geometry();
triGeo.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, vertexd);
triGeo.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 2, CGE.FLOAT, uvd);
// triGeo.setIndexData(indexd);
triGeo.setDrawParameter(vertexd.length / 3);

// let triTexture = new CGE.Texture2D();
// triTexture.setImageUrl(color_diff);
// triTexture.setFilter(CGE.LINEAR, CGE.LINEAR);
// triTexture.setMipmap(true);
let triMaterial = new CGE.DiffuseMaterial('./resources/color.jpg');

let triMesh = new CGE.Mesh();
triMesh.setGeometry(triGeo);
triMesh.setMaterial(triMaterial);
triMesh.setPosition(0, 0, -200000);

// 三角形碰撞检测测试
mainScene.addChild(triMesh);

let cartoonMat = new CGE.CartoonMaterial(cartoon_color, cartoon_light, cartoon_emission);

objLoader.load(cartoon_obj).then(mesh => {
    mesh.setMaterial(cartoonMat);
    mesh.setScale(0.4, 0.4, 0.4);
    mesh.setRotateAt(new CGE.Quaternion().setAxisAngle(new CGE.Vector3(0, 0, 1), Math.PI));
    // mainScene.addChild(mesh);
});

document.body.appendChild(renderer.getCanvas());

let mesh = new CGE.Mesh();
mesh.setPosition(0, 0, 20);
mesh.setScale(20, 20, 20);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(standMat);
mainScene.addChild(mesh);

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

// let _d = 0.5;

// let forward = CGE.Event.createFromFunc(() => {camera.forwardStep(_d);});
// let back = CGE.Event.createFromFunc(() => {camera.forwardStep(-_d);});
// let left = CGE.Event.createFromFunc(() => {camera.horizontalStep(-_d);});
// let right = CGE.Event.createFromFunc(() => {camera.horizontalStep(_d);});

// let verticalTop = CGE.Event.createFromFunc(() => {camera.verticalStep(_d);});
// let verticalDown = CGE.Event.createFromFunc(() => {camera.verticalStep(-_d);});

// window.onblur = function(event) {
//     events.clear();
// }

// let mouseDown = false;

// window.onmousemove = function(event) {
//     if (mouseDown) {
//         let del = 0.005;
//         let moveX = event.movementX * del;
//         let moveY = event.movementY * del;
//         camera.rotateViewFromForward(moveX, moveY);
//     }
// }

// window.onmousedown = function(event) {
//     mouseDown = true;
// }

// window.onmouseup = function(event) {
//     mouseDown = false;
// }

// window.onkeydown = function(e) {
//     console.log(e);
// }
// app.slow = true;
app.start();

// app.getTimer().once(2000, null, () => {
//     app.stop();
// });

