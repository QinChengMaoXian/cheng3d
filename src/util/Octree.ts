import { Box } from "../math/Box";
import { Object3D } from "../object/Object3D";
import { Vector3 } from "../math/Vector3";

/** 八叉树场景管理 */

enum OctType {
    PX_PY_PZ = 0,
    NX_PY_PZ,
    PX_NY_PZ,
    NX_NY_PZ,
    PX_PY_NZ,
    NX_PY_NZ,
    PX_NY_NZ,
    NX_NY_NZ,
}

class OctreeNode {
    
    public root: Octree;
    public box: Box;
    public nodes: OctreeNode[];
    public objects: Set<Object3D> = new Set();
    public enableNode: boolean = false;
    public depth: number = 0;

    constructor(depth: number, box: Box, root: Octree) {
        this.root = root;
        this.depth = depth;
        this.box = box;
    }

    public updateObject(obj: Object3D): OctreeNode {
        let bounding = obj.getBounding();

        if (!this.box.containBounding(bounding)) {
            return null;
        }

        if (this.enableNode) {
            let nodes = this.nodes;
            let l = nodes.length;
            for (let i = 0; i < l; i++) {
                let node = nodes[i];
                let result = node.updateObject(obj);
                if (result) {
                    return result;
                }
            }
            this.objects.add(obj);
            return this;
        } else {
            if (this.objects.size < this.root.maxCount || this.depth === this.root.maxDepth) {
                if (!this.objects) {
                    this.objects = new Set();
                }
                this.objects.add(obj);
                return this;
            } else {
                let max = this.box.max;
                let min = this.box.min;
                let center = Vector3.pubTemp;
                center.copy(max).subAt(min).mul(0.5).addAt(min);
                let expandPCT = this.root.expandPCT;

                // 构建新的8个节点
                for (let i = 0; i < 8; i++) {

                }
            }
        }
    }
}

export class Octree {
    public objects: Map<Object3D, OctreeNode> = new Map();
    public outRange: Set<Object3D> = new Set();

    public rootNode: OctreeNode;
    public maxDepth: number = 8;
    public maxCount: number = 8;

    public expandPCT: number = 0.125;

    constructor(maxDepth: number, maxCount: number, box: Box) {
        this.maxDepth = maxDepth;
        this.maxCount = maxCount;
        this.rootNode = new OctreeNode(0, box, this);
    }

    public updateObject(obj: Object3D) {
        let node = this.objects.get(obj);

        if (!node) {
            this._addObject(obj);
        } else {
            let result = node.updateObject(obj);
            if (result) {
                this.objects.set(obj, result);
            } else {
                this._addObject(obj);
            }
        }
    }

    protected _addObject(obj: Object3D) {
        let result = this.rootNode.updateObject(obj);
        if (result) {
            this.objects.set(obj, result);
        } else {
            this.outRange.add(obj);
        }
    }

}
