import { Shadow } from "./Shadow";
import { LightType } from "./Light";
import { TextureCube } from "../graphics/TextureCube";
import * as CGE from '../graphics/RendererParameter';
import { Texture2D } from "../graphics/Texture2D";
import { Frame, TexTarget } from "../graphics/Frame";
import { RTLocation } from "../graphics/GraphicsTypes";

export class PointShadow extends Shadow {

    protected _depthTex: TextureCube;
    protected _size: number;
    
    protected _frames: Frame[];

    public far: number;

    public pcf: boolean = false;

    constructor() {
        super();
    }

    protected _createTex2D() {
        let tex = new Texture2D();
        tex.setDataType(CGE.UNSIGNED_BYTE);
        tex.setFilter(CGE.NEAREST, CGE.NEAREST);
        return tex;
    }

    public init(size: number = 128) {
        this._size = size;
        let tex = this._depthTex;
        if (!tex) {
            tex = new TextureCube();
            tex.setDataType(CGE.UNSIGNED_BYTE);
            tex.setFilter(CGE.NEAREST, CGE.NEAREST);
            tex.setTexture2ds(
                this._createTex2D(),
                this._createTex2D(),
                this._createTex2D(),
                this._createTex2D(),
                this._createTex2D(),
                this._createTex2D()
            )
            this._depthTex = tex;
        }
        tex.setAllSize(size, size);

        let frames = this._frames;
        if (!frames) {
            frames = [];
            // let depth = new Texture2D();
            // depth.setSize(size, size);
            // depth.setFormat(CGE.DEPTH_STENCIL, CGE.DEPTH_STENCIL);
            // depth.setDataType(CGE.UNSIGNED_INT_24_8);
            // depth.setFilter(CGE.NEAREST, CGE.NEAREST);

            for (let i = 0; i < 6; i++) {
                let frame = new Frame();
                frame.setSize(size, size);
                frame.setTextureCube(RTLocation.COLOR, tex, TexTarget.TEXTURE_CUBE_MAP_POSITIVE_X + i);
                // frame.setDepthStencil(depth);
                frame.enableDepthStencil();
                frame.getState().clearColor.set(1, 1, 1, 1);
                frames.push(frame);
            }
            this._frames = frames;
        }
    }

    public get depthTex() {
        return this._depthTex;
    }

    public get type() {
        return LightType.Point;
    }

    public get frames() {
        return this._frames
    }

}