export class Platform {
    
    protected static reqAniBindWin = window.requestAnimationFrame.bind(window);
    protected static celAniBindWin = window.cancelAnimationFrame.bind(window);

    public static init() {

    }

    public static now(): number {
        return performance.now() || Date.now()
    }

    public static document(): HTMLDocument {
        return document;
    }

    public static createCanvas(): HTMLCanvasElement {
        return document.createElement('canvas');
    }

    public static get requestAnimationFrame(): (callback: FrameRequestCallback) => number {
        return this.reqAniBindWin;
    }

    public static get cancelAnimationFrame(): (handle: number) => void {
        return this.celAniBindWin;
    }

    public static get width() {
        return window.innerWidth;
    }

    public static get height() {
        return window.innerHeight;
    }
}
