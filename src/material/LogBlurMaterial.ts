import { GaussianBlurMaterial } from "./GaussianBlurMaterial";

export class LogBlurMaterial extends GaussianBlurMaterial {

    public get type(): string {
        return 'log_blur';
    }

}