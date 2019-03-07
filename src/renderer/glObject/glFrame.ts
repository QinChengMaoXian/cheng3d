import { Logger } from '../../core/Logger';
import { glObject } from './glObject';

import { Frame, ITexTarget, TexTarget } from '../../graphics/Frame';
import { WebGLRenderer } from '../WebGLRenderer';
import { glTexture2D } from './glTexture2D';
import { glTextureCube } from './glTextureCube';
import { WebGLSupports } from '../WebGLSupports';

export class glFrame extends glObject {
    protected _frame: WebGLFramebuffer = undefined;
    protected _depthStencil = undefined;
    protected _drawBufferMap = new Map();
    protected _drawBuffers = [];

    constructor() {
        super();
    }

    public checkTextures(renderer: WebGLRenderer, textureMap, depthStencilTexture) {
        let completed = true;
        textureMap.forEach(function(texTarget: ITexTarget, location: number) {
            let glTexture = renderer.initTexture(texTarget.tex);
            if (glTexture === undefined) {
                completed = false;
            }
            this._drawBufferMap.set(location, glTexture);
        }.bind(this));

        if (depthStencilTexture) {
            let glTexture = renderer.initTexture(depthStencilTexture);
            if (glTexture !== undefined ) {
                this._depthStencil = glTexture;
            }
        }
        return completed;
    }

    public generateFromFrame(gl: WebGLRenderingContext, renderer: WebGLRenderer, frame: Frame) {
        let textureMap = frame.getTextureMap();
        let depthStencilTexture = frame.getDepthStencilTexture();
        const maxAttachment = 4;
        this._drawBuffers = [];
        if (this.checkTextures(renderer, textureMap, depthStencilTexture) === false) {
            return undefined;
        }
        let frameBuffer =  this._frame || gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        this._drawBufferMap.forEach((glTexure, location) => {
            if (location >= maxAttachment) {
                Logger.error('current just support ' + maxAttachment + ' attachments, but you set ' + location);
                return undefined;
            }
            let attachment = gl.COLOR_ATTACHMENT0 + location;
            this._drawBuffers.push(attachment);
            let texTarget = textureMap.get(location);
            let target = texTarget.target === TexTarget.TEXTURE_2D ? gl.TEXTURE_2D : (gl.TEXTURE_CUBE_MAP_POSITIVE_X + texTarget.target - TexTarget.TEXTURE_CUBE_MAP_POSITIVE_X);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, target, glTexure.getHandler(), 0);
        });
        if (depthStencilTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.TEXTURE_2D, this._depthStencil.getHandler(), 0);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._frame = frameBuffer;
        this.updated();
        // this.setLocalVersion(frame.getUpdateVersion());
        return this;
    }

    public apply(gl: WebGLRenderingContext, ext: WebGLSupports) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frame);
        if (this._drawBuffers.length > 1 && ext.drawBuffers) {
            ext.drawBuffers(this._drawBuffers);
        } 
    }
}
