import { Texture2D } from '../graphics/Texture2D'
import { TextureCube } from '../graphics/TextureCube'
import { Geometry } from '../graphics/Geometry'

import { Entity } from '../object/Entity.js'
import { Component } from '../object/Component'
import { Object3D } from '../object/Object3D';
import { Mesh } from '../object/Mesh';
import { Loader } from '../io/Loader';
import { ShaderConst } from '../graphics/ShaderConst';
import { FLOAT } from '../graphics/RendererParameter';

export class OBJLoader {
    private _reObj = /^o/;
    private _reGroup = /^g/;
    private _reMtllib = /^mtllib /;
    private _reUsemtl = /^usemtl /;
    private _reSmooth = /^s /;
    // v float float float
    private _reVertexPattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
    // vn float float float
    private _reNormalPattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
    // vt float float
    private _reUvPattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
    // f vertex vertex vertex ...
    private _reFaceSpaces = /f\s+(([\d]{1,}[\s]?){3,})+/;
    // f vertex/uvs vertex/uvs vertex/uvs ...
    private _reFaceVU = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    // f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal ...
    private _reFaceVUN = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    // f vertex//normal vertex//normal vertex//normal ...
    private _reFaceVN = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;

    private _meshes: Mesh[];
    private _mesh: Mesh;
    private _materialNamesAll: string[][];
    private _materialNames: string[];

    private _posRawArray: number[];
    private _uvRawArray: number[];
    private _normalRawArray: number[];

    private _lines: string[];
    private _lineIdx: number;

    private _posRawTot: number;
    private _uvRawTot: number;
    private _normalTot: number;

    private _numVertices: number;
    private _numFaces: number;

    private _mtlPath: string;

    //private csTot: number;
    public posData: any[] = [];
    public uvData: any[] = [];
    public normalData: any[] = [];
    public tangentData: any[] = [];
    public indexData: any[] = [];

    /**
     * 构造函数
     * @param {string} filePath 相对于项目的obj文件路径
     */
    constructor() {
        
    }

    load(filePath: string) {
        return Loader.loadUrl(filePath).then(data => {
            return this.parseData(data.responseText);
        });
    }

    /**
     * 开始解析
     * 
     * @param {*} data 文件数据
     */
    protected parseData(data: any) {
        this._meshes = [];
        this._materialNamesAll = [];

        this._lines = data.split("\n");
        this._lineIdx = 0;

        this._posRawTot = 0;
        this._uvRawTot = 0;
        this._normalTot = 0;

        this._numVertices = 0;
        this._numFaces = 0;

        this._posRawArray = [];
        this._uvRawArray = [];
        this._normalRawArray = [];

        this._mtlPath = null;

        this.createMesh();

        return this._mesh;

        // if (this._mtlPath == null) {
        //     this.end();
        // }
        // else {
        //     this.parseMtl();
        //     // this.end();//cs
        // }
    }
    // /**
    //  * 解析mtl数据块
    //  */
    // private parseMtl(): void {
    //     let paths = this.filePath.split(/[/\\]/);
    //     paths.pop();
    //     let rootUrl = paths.join('/') + '/';
    //     let mtlLoader = new MTLLoader(rootUrl + this._mtlPath, rootUrl);
    //     mtlLoader.addEventListener(ModelEvent.COMPLETE, this.parsedMtl, this);
    //     mtlLoader.start();
    // }
    /**
     * mtl解析完成
     * 
     * @param {Event} e 事件对象
     */
    // private parsedMtl(e: Event): void {
    //     // let mtlLoader: MTLLoader = e.target;
    //     // mtlLoader.removeEventListener(ModelEvent.COMPLETE, this.parsedMtl, this);
    //     let materialMap = mtlLoader.materialMap;
    //     for (let i = 0; i < this._meshes.length; ++i) {
    //         let mesh = this._meshes[i];
    //         let names = this._materialNamesAll[i];
    //         for (let j = 0; j < names.length; ++j) {
    //             let material = materialMap[names[j]];
    //             if (material == null) {
    //                 if (mtlLoader.defaultMaterial == null) {
    //                     console.error("OBJLoader.parseMtl:...undefined material.mesh=", mesh.name, names[j]);
    //                     continue;
    //                 }
    //                 material = mtlLoader.defaultMaterial;
    //             }
    //             mesh.materialList[j] = material;
    //         }
    //     }
    //     this.end();
    // }
    /**
     * 重置源数组
     */
    private resetRawArray(): void {
        this._posRawTot += this._posRawArray.length / 3;
        this._uvRawTot += this._uvRawArray.length / 2;
        this._normalTot += this._normalRawArray.length / 3;
        this._posRawArray = [];
        this._uvRawArray = [];
        this._normalRawArray = [];
    }

    /**
     * 开始创建显示模型
     */
    private createMesh(): void {
        let posArray: number[] = new Array();
        let uvArray: number[] = new Array();
        let normalArray: number[] = new Array();
        let indexArray: number[] = new Array();

        let posData: Float32Array;
        let uvData: Float32Array;
        let normalData: Float32Array;
        let tangentData: Float32Array;
        let indexData: any;

        let hashHelper: Object = new Object();
        let hashArray: { idPos: number, idUV: number, idNormal: number }[] = new Array();

        let hasUV: boolean;
        let hasNormal: boolean;
        let hasTangent: boolean;
        let hasUV2: boolean;

        let curIndex: number = 0;

        let lastIndexCount: number = 0;
        let curIndexCount: number = 0;

        let bMeshNext: boolean = false;
        let bResetRaw: boolean = false;

        let addHashArray = (hashCode: string) => {
            if (hashHelper[hashCode] == null) {
                hashHelper[hashCode] = curIndex;
                let ids: string[] = hashCode.split("/");
                let posID: number = parseInt(ids[0]) - 1;
                let uvID: number;
                let normalID: number;
                if (ids[1] != '')
                    uvID = parseInt(ids[1]) - 1;
                else
                    uvID = null;
                if (ids[2] != null)
                    normalID = parseInt(ids[2]) - 1;
                else
                    normalID = null;
                hashArray.push({ idPos: posID, idUV: uvID, idNormal: normalID });

                curIndex++;
            }
            indexArray.push(hashHelper[hashCode]);
            ++curIndexCount;
        };
        let addVertex = (result: string) => {
            let faceIndex: string[] = result.trim().split(" ");
            for (let j: number = 0; j < 3; j++) {
                addHashArray(faceIndex[j]);
            }
            if (faceIndex.length == 4) {
                addHashArray(faceIndex[0]);
                addHashArray(faceIndex[2]);
                addHashArray(faceIndex[3]);
            }
        };

        let result;
        let materialName: string;
        let len: number = this._lines.length;
        for (let i: number = this._lineIdx; i < len; i++) {
            let line: string = this._lines[i];
            line.trim();

            if (line.length === 0 || line.charAt(0) === '#') {
                continue;
            }

            if ((result = this._reVertexPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                this._posRawArray.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));

            } else if ((result = this._reNormalPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                this._normalRawArray.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));

            } else if ((result = this._reUvPattern.exec(line)) !== null) {
                if (this._mesh != null && indexArray.length > 0) {
                    bMeshNext = true;
                    bResetRaw = true;
                    this._lineIdx = i;
                    break;
                }
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                this._uvRawArray.push(parseFloat(result[1]), parseFloat(result[2]));

            } else if ((result = this._reFaceVUN.exec(line)) !== null) {
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                addVertex(result[1]);
                // let faceIndex: string[] = result[1].trim().split(" ");
                // for (let j: number = 0; j < 3; j++) {
                //     addHashArray(faceIndex[j]);
                // }



            } else if ((result = this._reFaceVN.exec(line)) !== null) {
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                addVertex(result[1]);

            } else if ((result = this._reFaceVU.exec(line)) !== null) {
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                addVertex(result[1]);

            } else if ((result = this._reFaceSpaces.exec(line)) !== null) {
                //["f 1 2 3", "1 2 3"...]
                let faceIndex: string[] = result[1].trim().split(" ");
                for (let j: number = 0; j < 3; j++) {
                    let hashCode: string = faceIndex[j];
                    if (hashHelper[hashCode] == null) {
                        hashHelper[hashCode] = curIndex;
                        let posID: number = parseInt(hashCode) - 1;
                        let uvID: number = posID;
                        let normalID: number = posID;
                        hashArray.push({ idPos: posID, idUV: uvID, idNormal: normalID });

                        curIndex++;
                    }
                    indexArray.push(hashHelper[hashCode]);
                }
                curIndexCount += 3;
                //Define a mesh or an object
                //Each time this keyword is analysed, create a new Object with all data for creating a babylonMesh
            } else if (this._reGroup.test(line) || this._reObj.test(line)) {
                //Create a new mesh corresponding to the name of the group.
                //Definition of the mesh
                //TODO: currently use single object
                let name: string = line.substring(2).trim();
                if (this._mesh == null) {
                    this._mesh = new Mesh();
                    this._materialNames = [];
                } else {
                    if (indexArray.length == 0) {
                        this._mesh = new Mesh();
                        this._materialNames = [];
                    } else {
                        this._lineIdx = i;
                        bMeshNext = true;
                        break;
                    }
                }
                //console.log('group:....numMeshs=' + this.meshs.length+',mesh.name=' + this.mesh.name);

            } else if (this._reUsemtl.test(line)) {
                materialName = line.substring(6).trim();
                //Get the name of the material
                //We just generate a new subMesh currently
                if (lastIndexCount != curIndexCount) {
                    let materialIdx;
                    if (materialName == null || materialName == '') {
                        materialIdx = 0;
                    } else {
                        materialIdx = this._materialNames.length;
                        this._materialNames.push(materialName);
                    }
                    // let subMesh: SubMesh = new SubMesh(materialIdx, lastIndexCount, curIndexCount - lastIndexCount);
                    // this._mesh.addSubMesh(subMesh);
                    lastIndexCount = curIndexCount;
                }
            } else if (this._reMtllib.test(line)) {
                //Get the name of mtl file
                this._mtlPath = line.substring(6).trim();
                //Apply smoothing
            } else if (this._reSmooth.test(line)) {
                // smooth shading => apply smoothing
                //Toda  y I don't know it work with babylon and with obj.
                //With the obj file  an integer is set
            } else {
                //If there is another possibility
                console.log("Unhandled expression at line : " + line);
            }
        }

        if (indexArray.length > 0) {
            //Append the last subMesh
            if (lastIndexCount != curIndexCount) {
                let materialIdx;
                if (materialName == null || materialName == '') {
                    materialIdx = 0;
                } else {
                    materialIdx = this._materialNames.length;
                    this._materialNames.push(materialName);
                }
                // let subMesh: SubMesh = new SubMesh(materialIdx, lastIndexCount, curIndexCount - lastIndexCount);
                // this._mesh.addSubMesh(subMesh);
                lastIndexCount = curIndexCount;
            }

            for (let i: number = 0; i < curIndex; i++) {
                let posID: number = hashArray[i].idPos;
                let uvID: number = hashArray[i].idUV;
                let normalID: number = hashArray[i].idNormal;
                posArray.push(this._posRawArray[(posID - this._posRawTot) * 3], this._posRawArray[(posID - this._posRawTot) * 3 + 1], this._posRawArray[(posID - this._posRawTot) * 3 + 2]);
                if (uvID != null)
                    uvArray.push(this._uvRawArray[(uvID - this._uvRawTot) * 2], this._uvRawArray[(uvID - this._uvRawTot) * 2 + 1]);
                if (normalID != null)
                    normalArray.push(this._normalRawArray[(normalID - this._normalTot) * 3], this._normalRawArray[(normalID - this._normalTot) * 3 + 1], this._normalRawArray[(normalID - this._normalTot) * 3 + 2]);
            }

            posData = new Float32Array(posArray);

            if (normalArray.length != 0) {
                hasNormal = true;
                normalData = new Float32Array(normalArray);
            } else {
                hasNormal = false;
            }

            if (uvArray.length != 0) {
                hasUV = true;
                uvData = new Float32Array(uvArray);
            } else {
                hasUV = false;
                console.warn("OBJLoader:...unsupport no uv.");
            }

            // indexData = new Uint16Array(indexArray);
            indexData = this.getIndicesByPosition(posArray, indexArray);

            if (hasUV && hasNormal) {
                // tangentData = GeometryUtil.calcTangent(posData, uvData, normalData, indexData);
                hasTangent = true;
            } else {
                hasTangent = false;
            }

            if (!hasNormal) {
                // normalData = GeometryUtil.calcNormal(posData, indexData);
                // tangentData = GeometryUtil.calcTangent(posData, uvData, normalData, indexData);
            }

            //2.old
            // let geometry: Geometry = new Geometry([posData, uvData, normalData, tangentData], indexData);
            //this.indexData.push(indexData);
            //this.posData.push(posData);
            //this.uvData.push(uvData);
            //this.normalData.push(normalData);
            //this.tangentData.push(tangentData);

            //3.
            // let cPos: any[] = GeometryUtil.quantizeData(posData, 3);
            // let cUV: any[] = GeometryUtil.quantizeData(uvData, 2);
            // let cTangentQuat: Int16Array = GeometryUtil.calcTangentFrame(normalData, tangentData);
            // let geometry: Geometry = new CompressedGeometry([cPos[0], cUV[0], cTangentQuat], indexData, cPos[1], cPos[2], cUV[1], cUV[2]);
            let geometry: Geometry = new Geometry();
            console.log(uvData);
            console.log(this._uvRawArray);
            geometry.addSingleAttribute('Position', ShaderConst.position, 3, FLOAT, posData);
            geometry.addSingleAttribute('UV', ShaderConst.texcoord, 2, FLOAT, uvData);
            geometry.addSingleAttribute('Normal', ShaderConst.normal, 3, FLOAT, normalData);
            geometry.setIndexData(indexData);
            geometry.setDrawParameter(indexData.length);
            //this.indexData.push(indexData);

            ////indexData = GeometryUtil.shuffleIndices(indexData, indexData.length / 3, posArray.length / 3);
            //4.
            // let result: any = GeometryUtil.shuffleGeomData([posData, uvData, normalData, tangentData], indexData, posArray.length / 3);
            // let shuffledData = result[0];
            // let shuffledPos: Float32Array = shuffledData[0];
            // let shuffledUV: Float32Array = shuffledData[1];
            // let shuffledNormal: Float32Array = shuffledData[2];
            // let shuffledTangent: Float32Array = shuffledData[3];

            // let shuffledIndices = result[1];

            // //Compress position and uv array
            // let cPos: any[] = GeometryUtil.quantizeData(shuffledPos, 3);
            // let cUV: any[] = GeometryUtil.quantizeData(shuffledUV, 2);
            // let cTangentQuat: Int16Array = GeometryUtil.calcTangentFrame(shuffledNormal, shuffledTangent);

            // let geometry: Geometry = new CompressedGeometry([cPos[0], cUV[0], cTangentQuat], shuffledIndices, cPos[1], cPos[2], cUV[1], cUV[2]);
            //this.indexData.push(shuffledIndices);

            //
            //this.posData.push(cPos[0]);
            //this.uvData.push(cUV[0]);
            //this.tangentData.push(cTangentQuat);


            this._mesh.setGeometry(geometry);

            this._numVertices += hashArray.length;
            this._numFaces += indexArray.length / 3;
            // console.log('posData.length=' + posData.length + ',uv=' + uvData.length + ',normal=' + normalData.length, ',tangentData=' + tangentData.length, ',index=' + indexData.length);
            // console.log('cTangentQuat', cTangentQuat.length);
            this._meshes.push(this._mesh);
            this._materialNamesAll.push(this._materialNames);
        } //end if (indexArray.length > 0)

        if (bMeshNext) {
            // if (this.meshs.length < this.csTot) {
            if (bResetRaw)
                this.resetRawArray();
            this.createMesh();
            //}
        }
    }

    /**
     * 动态获取索引数组
     * 
     * @param {number[]} posArray 顶点位置数组
     * @param {number[]} indices 源索引数组
     * @returns {*} 类型化索引数组
     */
    private getIndicesByPosition(posArray: number[], indices: number[]): any {
        let count = posArray.length / 3;
        if (count <= 0xff) {
            return new Uint8Array(indices);
        }
        if (count <= 0xffff) {
            return new Uint16Array(indices);
        }
        return new Uint32Array(indices);
    }

    /**
     * 合并类型化数组
     * 
     * @param {*} target 目标数组
     * @param {*} source 源数组
     * @returns {*} 新的数组
     */
    private merge(target: any, source: any): any {
        if (target == null)
            return source;
        if (source == null)
            return target;

        //let res = new Float32Array(target.length + source.length);//2.
        let res = new Int16Array(target.length + source.length);
        res.set(target);
        res.set(source, target.length);
        return res;
    }

    get mesh() {
        return this._mesh;
    }
}//end class


export class LoadObj {
    private constructor() {

    }

    static loadFile(url: string): Object3D {
        let obj = new Object3D();



        return obj;
    }
}
