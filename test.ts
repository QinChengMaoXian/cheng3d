import * as CGE from './src/CGE'

/**
 * 这是个庞大的测试用文件。
 * 没啥太大的意义。
 */

// let test_diff = './res/spnza_bricks_a_diff.jpg';
// let test_ddn = './res/spnza_bricks_a_ddn.jpg';
// let test_spec = './res/spnza_bricks_a_spec.png';

// let cartoon_color = './res/bronya_color.png';
// let cartoon_light = './res/bronya_lightmap.jpg';
// let cartoon_emission = './res/bronya_emission.jpg';
// let cartoon_obj = './res/bronya.obj';

let brdf_basecolor = 'brdfTest/rustediron2_basecolor.jpg';
let brdf_normal = 'brdfTest/rustediron2_normal.jpg';
let brdf_specular = 'brdfTest/rustediron2_specular.jpg'

window['cge'] = CGE;

CGE.Loader.setBaseUrl('./resources/');

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
// 以下：第一人称相机控制。

let fpc = new CGE.FirstPersonControl(camera, stage, app.getTimer());

// 以上 相机控制代码块结束
///////////////////////////////////////////////////////////////////////////////////////
// 下 Brdf 球体阵列
let geo = new CGE.SphereGeometry(1, 32, 32);

let createTexture2DFromImage = function(imgSrc: string, func?) {
    let texture2d = new CGE.Texture2D();
    texture2d.setUrl(imgSrc, CGE.Texture2D.White, func);
    return texture2d;
};

let cubeTexture = new CGE.TextureCube();

let func = () => {
    cubeTexture.needsUpdate();
}

cubeTexture.setTexture2ds(
    createTexture2DFromImage('skybox/px.jpg', func),
    createTexture2DFromImage('skybox/nx.jpg', func),
    createTexture2DFromImage('skybox/py.jpg', func),
    createTexture2DFromImage('skybox/ny.jpg', func),
    createTexture2DFromImage('skybox/pz.jpg', func),
    createTexture2DFromImage('skybox/nz.jpg', func)
);

cubeTexture.setMipmap(true);
cubeTexture.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);

// cubeTexture = CGE.TextureCube.Black;

let diffTex = new CGE.Texture2D;
diffTex.setUrl(brdf_basecolor, CGE.Texture2D.White);
diffTex.setMipmap(true);
diffTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
diffTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let normTex = new CGE.Texture2D;
normTex.setUrl(brdf_normal, CGE.Texture2D.Normal);
normTex.setMipmap(true);
normTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
normTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let specTex = new CGE.Texture2D;
specTex.setUrl(brdf_specular, CGE.Texture2D.White);
specTex.setMipmap(true);
specTex.setFilter(CGE.LINEAR_MIPMAP_LINEAR, CGE.LINEAR);
specTex.setWarp(CGE.REPEAT, CGE.REPEAT);

let obj3D = new CGE.Object3D();
obj3D.name = '一堆球';

let standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
// let standMat = new CGE.StandardMaterial;
standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);
standMat.enableStencil = true;
standMat.setStencilFunc(CGE.ALWAYS, 0x80, 0x80);
standMat.setStencilOp(CGE.KEEP, CGE.KEEP, CGE.REPLACE);
// standMat.setUVOffset(2, 2, 0, 0);
let defStandMat = standMat;

// standMat.setSpecular(0.04, 0, 1);
// standMat.setBrdfLUTMap();
window['standMat'] = standMat;
mainScene.addChild(obj3D);

for (let ix = 0; ix <= 7; ix++) {

    for (let iz = 0; iz <= ix; iz++) {
        let mesh = new CGE.Mesh();
        mesh.setGeometry(geo);

        let mat = new CGE.StandardMaterial();

        let r = ix === 0 ? 0.1 : ix;
        let m = iz === 0 ? 0.01 : iz;
        mat.setIrradianceMap(cubeTexture);
        mat.setPrefilterMap(cubeTexture);
        mat.enableStencil = true;
        mat.setStencilFunc(CGE.ALWAYS, 0x80, 0x80);
        mat.setStencilOp(CGE.KEEP, CGE.KEEP, CGE.REPLACE);

        mat.setSpecular(r * 0.125, 1.0 - m * 0.125, 1);
        
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
skyboxMat.depthMask = false;
skyboxMat.setDiffuseMap(cubeTexture);
skyboxMat.setCullFaceMode(CGE.FRONT);
skyboxMat.depthFunc = CGE.LEQUAL; 

let boxGeo = new CGE.BoxGeometry();
boxGeo.removeBounding();
// bounding.setMax(Infinity, Infinity, Infinity);
// bounding.setMin(-Infinity, -Infinity, -Infinity)

let skyboxMesh = new CGE.Mesh();

skyboxMesh.setGeometry(boxGeo);
skyboxMesh.setMaterial(skyboxMat);

mainScene.addChild(skyboxMesh);

// 以上 天空盒测试
///////////////////////////////////////////////////////////////////////////////////////
// 以下 更大一堆球

// let boxes = new CGE.Object3D();
// boxes.name = '更大一堆球';
// mainScene.addChild(boxes);

// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         for (let k = 0; k < 10; k++) {
//             let skyboxMesh = new CGE.Mesh();

//             skyboxMesh.setPosition((i - 4) * 15, (j - 4) * 15, k * 15 + 10);
//             skyboxMesh.setScale(5, 5, 5);
//             skyboxMesh.setGeometry(geo);
//             skyboxMesh.setMaterial(standMat);

//             boxes.addChild(skyboxMesh);
//         }
//     }
// }

// 以上 box组
///////////////////////////////////////////////////////////////////////////////////////
// 以下 光源测试

for(let i = 0; i < 4; i++) {
    let p = new CGE.PointLight();
    p.setColor(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5);
    p.setPosition(Math.random() * 100 - 50, Math.random() * 100 - 50, 0);
    p.setFactor(0.999);
    mainScene.addChild(p);
}

// app.getScene().getMainLight().enableShadow();

{
    let p = new CGE.SpotLight();
    p.setColor(1, 4, 1);
    p.setPosition(20, 20, 20);
    p.setDir(-1, 1, 1);
    p.angle = 0.5 * Math.PI * 0.5;
    p.enableShadow();
    p.setFactor(0.9999);
    mainScene.addChild(p);
    window['sss'] = p;
}
let pl;
{

    let p = new CGE.PointLight();
    p.setColor(4, 0, 0);
    p.setPosition(150, -30, 50);
    p.enableShadow();
    p.setFactor(0.9999);
    mainScene.addChild(p);
    window['ppp'] = p;
    pl = p;
}

// {
//     let p = new CGE.PointLight();
//     p.setColor(1, 1, 1);
//     p.setPosition(150, 30, 80);
//     p.enableShadow();
//     mainScene.addChild(p);
//     window['ppp2'] = p;
// }

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

let gltfTest = new CGE.GltfLoader();
gltfTest.load('Cesium_Man/Cesium_Man.gltf', gltfCallback);

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

let planeMat = new CGE.StandardMaterial();
// let planeMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
planeMat.setIrradianceMap(cubeTexture);
planeMat.setPrefilterMap(cubeTexture);
planeMat.setUVOffset(20, 20, 0, 0); 
planeMat.enableStencil = true;
planeMat.setStencil(standMat.stencil);
let mesh = new CGE.Mesh();
// mesh.castShadow = false;
mesh.setPosition(0, 0, -10);
mesh.setScale(4000, 4000, 1);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(planeMat);

mainScene.addChild(mesh);


planeMat = new CGE.StandardMaterial();
planeMat.setIrradianceMap(cubeTexture);
planeMat.setPrefilterMap(cubeTexture);
planeMat.enableStencil = true;
planeMat.setStencil(defStandMat.stencil);

let planes = new CGE.Object3D();
mainScene.addChild(planes);
planes.name = '一堆平面';
planes.y = 50;

mesh = new CGE.Mesh();
mesh.setPosition(0, 0, 10);
mesh.setScale(20, 20, 1);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(planeMat);
planes.addChild(mesh);

mesh = new CGE.Mesh();
mesh.setPosition(10, 10, 15);
mesh.setScale(20, 20, 1);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(planeMat);
planes.addChild(mesh);

mesh = new CGE.Mesh();
mesh.setPosition(20, 20, 20);
mesh.setScale(20, 20, 1);
mesh.setGeometry(planeVertexGeometry);
mesh.setMaterial(planeMat);
planes.addChild(mesh);


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

let teapotGeometry = new CGE.Geometry();
teapotGeometry.addSingleAttribute('Position', CGE.ShaderConst.position, 3, CGE.FLOAT, teapotPositions);
teapotGeometry.addSingleAttribute('UV', CGE.ShaderConst.texcoord, 3, CGE.FLOAT, teapotTexCoords);
teapotGeometry.addSingleAttribute('Normal', CGE.ShaderConst.normal, 3, CGE.FLOAT, teapotNormals);
// teapotGeometry.addSingleAttribute('Binormal', CGE.ShaderConst.binomial, 3, CGE.FLOAT, teapotBinormals);
teapotGeometry.addSingleAttribute('Tangent', CGE.ShaderConst.tangent, 3, CGE.FLOAT, teapotTangents);
teapotGeometry.setIndexData(teapotIndices);
teapotGeometry.setDrawParameter(teapotIndices.length);

standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
standMat.enableAlphaTest();
standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);
// standMat.enableStencil = true;
// standMat.setStencil(defStandMat.stencil);
standMat.setBaseColor(1.0, 1.0, 1.0, 0.5);

let teapotMesh = new CGE.Mesh();
teapotMesh.setScale(0.5, 0.5, 0.5);
teapotMesh.setPosition(0, 20, 0);
teapotMesh.setGeometry(teapotGeometry);
teapotMesh.setMaterial(standMat);
teapotMesh.name = '水壶';
mainScene.addChild(teapotMesh);


standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
standMat.enableAlphaBlend();
standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);
standMat.setBaseColor(1.0, 1.0, 1.0, 0.5);
standMat.setBlendFunc(CGE.SRC_ALPHA, CGE.ONE_MINUS_SRC_ALPHA, CGE.SRC_ALPHA, CGE.ONE_MINUS_SRC_ALPHA);
standMat.depthMask = false;

teapotMesh = new CGE.Mesh();
teapotMesh.setScale(0.5, 0.5, 0.5);
teapotMesh.setPosition(40, 20, 0);
teapotMesh.setGeometry(teapotGeometry);
teapotMesh.setMaterial(standMat);
teapotMesh.name = '水壶2';
mainScene.addChild(teapotMesh);


standMat = new CGE.StandardMaterial(diffTex, normTex, specTex, specTex, specTex);
standMat.setIrradianceMap(cubeTexture);
standMat.setPrefilterMap(cubeTexture);
standMat.setCullFaceMode(CGE.ZERO);
standMat.enableStencil = true;
standMat.setStencil(defStandMat.stencil);
standMat.setBaseColor(1.0, 1.0, 1.0, 1.0);

teapotMesh = new CGE.Mesh();
teapotMesh.setScale(2, 2, 2);
teapotMesh.setPosition(100, 100, 0);
teapotMesh.setGeometry(teapotGeometry);
teapotMesh.setMaterial(standMat);
teapotMesh.name = '水壶3';
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

let t1p1 = tri1.p1;
let t1p2 = tri1.p2;
let t1p3 = tri1.p3;

let t2p1 = tri2.p1;
let t2p2 = tri2.p2;
let t2p3 = tri2.p3;

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
let triMaterial = new CGE.DiffuseMaterial('color.jpg');

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
// new CGE.OBJLoader().load(cartoon_obj).then(mesh => {
//     mesh.setMaterial(cartoonMat);
//     mesh.setScale(0.4, 0.4, 0.4);
//     mesh.setRotateAt(new CGE.Quaternion().setAxisAngle(new CGE.Vector3(0, 0, 1), Math.PI));
//     mainScene.addChild(mesh);
// });
// 以上 卡通渲染测试 
///////////////////////////////////////////////////////////////////////////////////////
// 以下 射线检测测试 

let raycaster = new CGE.Raycaster();
let vec2 = new CGE.Vector2(0, 0);

let obj: CGE.Object3D = null;
let color: CGE.Vector4 = new CGE.Vector4();

stage.on(CGE.Event.CLICK, this, (e: CGE.Event) => {
    vec2.set(e.stageX / renderer.getWidth() * 2 - 1, (1 - e.stageY / renderer.getHeight()) * 2 - 1);
    raycaster.setFromCamera(vec2, camera);
    let result = raycaster.intersectObject(mainScene, [], true);

    if (obj instanceof CGE.Mesh) {
        const mat = obj.getMaterial();
        if (mat instanceof CGE.StandardMaterial) {
            mat.setBaseColor(color.x, color.y, color.z, color.w);
        }
    }

    if (result[0]) {
        let mesh = result[0].object;
        if (mesh instanceof CGE.Mesh) {
            const mat = mesh.getMaterial();
            if (mat instanceof CGE.StandardMaterial) {
                color.copy(mat.getBaseColor())
                mat.setBaseColor(1, 0.5, 0.5, color.w);
                obj = mesh;
            }
        }
    }

    console.log(result);
});

// 以上 射线检测测试 
///////////////////////////////////////////////////////////////////////////////////////
// 以下 动画测试

let vecTrack = new CGE.VectorTrack('pos', 30, true);

vecTrack.addVectorByFrame(0, new CGE.Vector3(10, 10, 50));
vecTrack.addVectorByFrame(10, new CGE.Vector3(10, 20, 50));
vecTrack.addVectorByFrame(20, new CGE.Vector3(10, 30, 50));
vecTrack.addVectorByFrame(30, new CGE.Vector3(10, 40, 50));
vecTrack.addVectorByFrame(40, new CGE.Vector3(10, 30, 50));
vecTrack.addVectorByFrame(50, new CGE.Vector3(10, 20, 50));
vecTrack.addVectorByFrame(60, new CGE.Vector3(10, 10, 50));

let aniClip = new CGE.AnimationClip('test');
aniClip.addTrack(vecTrack);

let animater = new CGE.Animater(pl);
animater.addAnimationClip(aniClip);

pl.animater = animater;
animater.play('test');


// 以上 动画测试
///////////////////////////////////////////////////////////////////////////////////////


