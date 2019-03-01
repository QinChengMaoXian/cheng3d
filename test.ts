import * as CGE from './src/CGE'

/**
 * 这是个庞大的测试用文件。
 * 没啥太大的意义。
 */

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

// import { Main } from './projects/kamihikouki/main';

// let main = new Main();
// main.init();

///////////////////////////////////////////////////////////////////////////
// 以下：初始化与参数设置

let app = new CGE.Application();

app.init(CGE.Platform.width, CGE.Platform.height);

let mainScene = app.getScene();
let stage = app.getStage();

let camera = app.getCamera();

camera.setPosition(-20, 20, 20);

let spr = new CGE.Sprite();
spr.setSize(200, 200);
spr.setPosition(50, 100, 0);

window['app'] = app;

let renderer = app.getRenderer();
renderer.enableDepthTest();
let gb = Math.pow(0.5, 2.2);
renderer.setClearColor(1.0, gb, gb, 1.0);
// renderer.setClearColor(0, 0, 0, 1.0);

// camera.lookAt(new CGE.Vector3(0, 1, 10));
mainScene.setActiveCamera(camera);

document.body.appendChild(renderer.getCanvas());

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

// 应用启动
app.start();

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



// 以上：初始化与参数设置
///////////////////////////////////////////////////////////////////////////
// 以下 鼠标与键盘控制主相机，TODO以下的代码需要封装在相机控制类中。
let _d = 2;
let timer = app.getTimer();
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

        case 'q':
            timer.frameLoop(1, camera, camera.verticalStep, [-_d]);
            break;

        case 'e':
            timer.frameLoop(1, camera, camera.verticalStep, [_d]);
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

        case 'q':
        case 'e':
            timer.remove(camera, camera.verticalStep);
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

window.onblur = function() { 
    timer.remove(camera, camera.forwardStep);
    timer.remove(camera, camera.horizontalStep);
    timer.remove(camera, camera.verticalStep);
}

// 以上 相机控制代码块结束
///////////////////////////////////////////////////////////////////////////////////////
// 下 Brdf 球体阵列
let geo = new CGE.SphereGeometry(1, 32, 32);

let createTexture2DFromImage = function(imgSrc, func?) {
    let texture2d = new CGE.Texture2D();
    texture2d.setImageUrl(imgSrc, CGE.Texture2D.White, func);
    return texture2d;
};

let cubeTexture = new CGE.TextureCube();

let func = () => {
    cubeTexture.needsUpdate();
}

cubeTexture.setTexture2ds(
    createTexture2DFromImage('./resources/skybox/px.jpg', func),
    createTexture2DFromImage('./resources/skybox/nx.jpg', func),
    createTexture2DFromImage('./resources/skybox/py.jpg', func),
    createTexture2DFromImage('./resources/skybox/ny.jpg', func),
    createTexture2DFromImage('./resources/skybox/pz.jpg', func),
    createTexture2DFromImage('./resources/skybox/nz.jpg', func)
);

cubeTexture.setMipmap(true);
cubeTexture.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

let lutTexture = CGE.Texture2D.BrdfLUT;

let diffTex = new CGE.Texture2D();
diffTex.setImageUrl(brdf_basecolor, CGE.Texture2D.White);
diffTex.setMipmap(true);
diffTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
diffTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let normTex = new CGE.Texture2D();
normTex.setImageUrl(brdf_normal, CGE.Texture2D.Normal);
normTex.setMipmap(true);
normTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
normTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let specTex = new CGE.Texture2D();
specTex.setImageUrl(brdf_specular, CGE.Texture2D.White);
specTex.setMipmap(true);
specTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
specTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let obj3D = new CGE.Object3D();
obj3D.name = '一堆球';

let standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
// let standMat = new CGE.StandardMaterial;
standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);
// standMat.setSpecular(0.04, 0, 1);
// standMat.setBrdfLUTMap();
window['standMat'] = standMat;
mainScene.addChild(obj3D);

for (let ix = 0; ix <= 7; ix++) {

    for (let iz = 0; iz <= 7; iz++) {
        let mesh = new CGE.Mesh();
        mesh.setGeometry(geo);

        let mat = new CGE.ReferMaterial(standMat);

        let r = ix === 0 ? 0.1 : ix;
        let m = iz === 0 ? 0.01 : iz;
        
        mat.overrideTexture(CGE.ShaderConst.diffuseMap, CGE.Texture2D.White);
        mat.overrideTexture(CGE.ShaderConst.normalMap, CGE.Texture2D.Normal);
        mat.overrideTexture(CGE.ShaderConst.roughnessMap, CGE.Texture2D.White);
        mat.overrideProperty(CGE.ShaderConst.specular, new CGE.Vector3(r * 0.125, 1.0 - m * 0.125, 1));
        
        mesh.setMaterial(mat);
        mesh.setPosition(ix * 25, 0, iz * 25);
        mesh.setScale(10, 10, 10);

        obj3D.addChild(mesh);
    }

} 

// 以上 Brdf球体阵列
///////////////////////////////////////////////////////////////////////////////////////
// 以下 天空盒测试

let skyboxMat = new CGE.SkyboxMaterial();
skyboxMat.setDiffuseMap(cubeTexture);
// skyboxMat.setFlipFace(true);
skyboxMat.setCullFaceMode(CGE.FRONT);

let boxGeo = new CGE.BoxGeometry();
let bounding = boxGeo.getBounding() as CGE.AABB;
bounding.setMax(Infinity, Infinity, Infinity);
bounding.setMin(-Infinity, -Infinity, -Infinity)

let skyboxMesh = new CGE.Mesh();

skyboxMesh.setGeometry(boxGeo);
skyboxMesh.setMaterial(skyboxMat);

mainScene.addChild(skyboxMesh);

// 以上 天空盒测试
///////////////////////////////////////////////////////////////////////////////////////
// 以下 光源测试

for(let i = 0; i < 20; i++) {
    let p = new CGE.PointLight();
    p.setColor(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    p.setPosition(Math.random() * 100 - 50, Math.random() * 100 - 50, 0);
    mainScene.addChild(p);
}

// 以上 光源测试
///////////////////////////////////////////////////////////////////////////////////////
// 以下 gltf 加载测试

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

// 以上 gltf 加载测试
///////////////////////////////////////////////////////////////////////////////////////
// 以下 大平面

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

standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
standMat.enableAlphaBlend();
standMat.setBaseColor(1.0, 1.0, 1.0, 0.5);
standMat.setBlendFunc(CGE.SRC_ALPHA, CGE.ONE_MINUS_SRC_ALPHA, CGE.SRC_ALPHA, CGE.ONE_MINUS_SRC_ALPHA);
let planeMat = new CGE.ReferMaterial(standMat);
planeMat.setUVOffset(20, 20, 0, 0); 
let mesh = new CGE.Mesh();
mesh.setPosition(0, 0, -10);
mesh.setScale(4000, 4000, 1);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(planeMat);

mainScene.addChild(mesh);

// 以上 大平面
///////////////////////////////////////////////////////////////////////////////////////
// 以下 犹他水壶

import { 
    teapotPositions,
    teapotTexCoords,
    teapotNormals,
    teapotBinormals,
    teapotTangents,
    teapotIndices,
} from './teapot';
import { Sprite } from './src/ui/Sprite';
import { BOOL_VEC3 } from './src/CGE';

let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 3, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.ShaderConst.normal, 3, CGE.FLOAT, teapotNormals);
// teapotGeometry.addSingleAttribute('Binormal', CGE.ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.ShaderConst.tangent, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);

let teapotMesh = new CGE.Mesh();
teapotMesh.setScale(0.5, 0.5, 0.5);
teapotMesh.setPosition(0, 20, 0);
teapotMesh.setGeometry(teapotGeometry);
teapotMesh.setMaterial(standMat);
teapotMesh.name = '水壶';
mainScene.addChild(teapotMesh);

// 以上 犹他水壶
///////////////////////////////////////////////////////////////////////////////////////
// 以下 三角形碰撞检测测试
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
triMesh.setPosition(0, 0, -2500);

// 三角形碰撞检测测试
// mainScene.addChild(triMesh);
// 以上 三角形碰撞检测测试
///////////////////////////////////////////////////////////////////////////////////////
// 以下 卡通渲染测试 
// 
// let cartoonMat = new CGE.CartoonMaterial(cartoon_color, cartoon_light, cartoon_emission);
// objLoader.load(cartoon_obj).then(mesh => {
//     mesh.setMaterial(cartoonMat);
//     mesh.setScale(0.4, 0.4, 0.4);
//     mesh.setRotateAt(new CGE.Quaternion().setAxisAngle(new CGE.Vector3(0, 0, 1), Math.PI));
//     mainScene.addChild(mesh);
// });
// 以上 卡通渲染测试 
///////////////////////////////////////////////////////////////////////////////////////
// app启用


