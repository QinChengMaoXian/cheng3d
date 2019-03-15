import { Texture } from "../graphics/Texture";
import { RenderCulling } from "./RenderCulling";

export interface lightData {
    pos?: { data: Float32Array }, 
    dir?: { data: Float32Array }, 
    colors: { data: Float32Array }, 
    mats?: { data: Float32Array },
    ranges?: { data: Float32Array },
    textures?: Texture[],
}

export class LightDatasCache {

    protected _dirs: Map<number, lightData> = new Map();
    protected _points: Map<number, lightData> = new Map();
    protected _spots: Map<number, lightData> = new Map();

    protected _shadowDirs: Map<number, lightData> = new Map();
    protected _shadowPoints: Map<number, lightData> = new Map();
    protected _shadowSpots: Map<number, lightData> = new Map();

    protected _getDir(num: number, isShadow: boolean) {
        let dirs = isShadow ? this._shadowDirs : this._dirs;

        let obj = dirs.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            dir: { data: new Float32Array(num * 3) },
            colors: { data: new Float32Array(num * 4) }
        }
        if (isShadow) {
            obj.textures = new Array(num);
            obj.mats = { data: new Float32Array(num * 16) };
        }
        dirs.set(num, obj);

        return obj;
    }

    protected _getPoint(num: number, isShadow: boolean) {
        let points = isShadow ? this._shadowPoints: this._points;

        let obj = points.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            pos: { data: new Float32Array(num * 3) },
            colors: { data: new Float32Array(num * 4) }
        }
        if (isShadow) {
            obj.textures = new Array(num);
            obj.ranges = { data: new Float32Array(num * 2) };
        }
        points.set(num, obj);

        return obj;
    }

    public _getSpot(num: number, isShadow: boolean) {
        let spots = isShadow ? this._shadowSpots : this._spots;

        let obj = spots.get(num);
        if (obj) {
            return obj;
        }
        obj = {
            pos: { data: new Float32Array(num * 3) },
            dir: { data: new Float32Array(num * 4) },
            colors: { data: new Float32Array(num * 4) }
        }
        if (isShadow) {
            obj.textures = new Array(num);
            obj.mats = { data: new Float32Array(num * 16) };
            obj.ranges = { data: new Float32Array(num * 4) };
        }
        spots.set(num, obj);

        return obj;
    }

    public updateDatasFromCulling(renderCulling: RenderCulling) {
        let lightDatasCache = this;
        let pData: Float32Array;
        let dData: Float32Array;
        let cData: Float32Array;
        let texs: Texture[];
        
        let rData: Float32Array;
        let mData: Float32Array;

        // light shadow
        if (renderCulling.dirShadowLightSize > 0) {
            let dirShadows = renderCulling.dirShadowLights;
            let dirShadowDatas = lightDatasCache.getShadowDir(renderCulling.dirShadowLightSize);
            dData = dirShadowDatas.dir.data;
            cData = dirShadowDatas.colors.data;
            texs = dirShadowDatas.textures;
            mData = dirShadowDatas.mats.data;
            for (let i = 0, l = renderCulling.dirShadowLightSize; i < l; i++) {
                let d = dirShadows[i];
                dData.set(d.dir.v, i * 3);
                cData.set(d.color.v, i * 4);
                mData.set(d.shadow.matrix.data, i * 16);
                texs[i] = d.shadow.depthTex;
            }
        }

        if (renderCulling.spotShadowLightSize > 0) {
            let spotShadows = renderCulling.spotShadowLights;
            let spotShadowDatas = lightDatasCache.getShadowSpot(renderCulling.spotShadowLightSize);
            dData = spotShadowDatas.dir.data;
            pData = spotShadowDatas.pos.data;
            cData = spotShadowDatas.colors.data;
            rData = spotShadowDatas.ranges.data;
            mData = spotShadowDatas.mats.data;
            texs = spotShadowDatas.textures;
            for (let i = 0, l = renderCulling.spotShadowLightSize; i < l; i++) {
                let s = spotShadows[i];
                let ss = s.shadow;
                dData.set(s.dir.v, i * 4);
                dData[i * 4 + 3] = Math.cos(s.angle);
                pData.set(s.pos.v, i * 3);
                cData.set(s.color.v, i * 4);
                mData.set(ss.matrix.data, i * 16);
                rData[i * 4] = ss.far;
                rData[i * 4 + 1] = 1.0 / ss.far;
                rData[i * 4 + 2] = rData[i * 4 + 3] = 1.0 / ss.size;
                texs[i] = ss.depthTex;
            }
        }

        if (renderCulling.pointShadowLightSize > 0) {
            let pointShadows = renderCulling.pointShadowLights;
            let pointShadowDatas = lightDatasCache.getShadowPoint(renderCulling.pointShadowLightSize);
            pData = pointShadowDatas.pos.data;
            cData = pointShadowDatas.colors.data;
            rData = pointShadowDatas.ranges.data;
            texs = pointShadowDatas.textures;

            for (let i = 0, l = renderCulling.pointShadowLightSize; i < l; i++) {
                let p = pointShadows[i];
                let ps = p.shadow;
                pData.set(p.pos.v, i * 3);
                cData.set(p.color.v, i * 4);
                let dd = ps.far * Math.sqrt(3.0);
                rData[i * 2] = dd;
                rData[i * 2 + 1] = 1.0 / dd;
                texs[i] = ps.depthTex;
            }
        }

        // light

        let pointLights = renderCulling.pointLights;
        let dirLights = renderCulling.dirLights;
        let spotLights = renderCulling.spotLights;

        let dirDatas = lightDatasCache.getDir(renderCulling.dirLightSize);
        let pointDatas = lightDatasCache.getPoint(renderCulling.pointLightSize);
        let spotDatas = lightDatasCache.getSpot(renderCulling.spotLightSize);

        dData = dirDatas.dir.data;
        cData = dirDatas.colors.data;
        
        for (let i = 0, l = renderCulling.dirLightSize; i < l; i++) {
            let d = dirLights[i];
            dData.set(d.dir.v, i * 3);
            cData.set(d.color.v, i * 4);
        }

        pData = pointDatas.pos.data;
        cData = pointDatas.colors.data;

        for (let i = 0, l = renderCulling.pointLightSize; i < l; i++) {
            let p = pointLights[i];
            pData.set(p.pos.v, i * 3);
            cData.set(p.color.v, i * 4);
        }

        pData = spotDatas.pos.data;
        dData = spotDatas.dir.data;
        cData = spotDatas.colors.data;

        for (let i = 0, l = renderCulling.spotLightSize; i < l; i++) {
            let s = spotLights[i];
            pData.set(s.pos.v, i * 3);
            dData.set(s.dir.v, i * 4);
            dData[i * 4 + 3] = Math.cos(s.angle);
            cData.set(s.color.v, i * 4);
        }
    }

    public getDir(num: number) {
        return this._getDir(num, false);
    }
    public getShadowDir(num: number) {
        return this._getDir(num, true);
    }

    
    public getPoint(num: number) {
        return this._getPoint(num, false);
    }

    public getShadowPoint(num: number) {
        return this._getPoint(num, true);
    }


    public getSpot(num: number) {
        return this._getSpot(num, false);
    }

    public getShadowSpot(num: number) {
        return this._getSpot(num, true);
    }
}
