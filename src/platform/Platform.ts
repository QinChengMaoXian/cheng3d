export class Platform {
    
    public static init() {

    }

    public static now(): number {
        return Date.now()
    }

    public static document(): HTMLDocument {
        return document;
    }

    public static createCanvas(): HTMLCanvasElement {
        return document.createElement('canvas');
    }

    public static get requestAnimationFrame(): (callback: FrameRequestCallback) => number {
        return window.requestAnimationFrame.bind(window);
    }

    public static get cancelAnimationFrame(): (handle: number) => void {
        return window.cancelAnimationFrame.bind(window);
    }

    public static 
}
