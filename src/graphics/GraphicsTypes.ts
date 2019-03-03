/**
 * Render Target Location Type
 */
export const enum RTLocation {
    RT0 = 0,
    RT1 = 1,
    RT2 = 2,
    RT3 = 3,
    COLOR = 0,
    NORMAL = 1,
    DEPTH = 2,
}

export enum AlphaType {
    NONE = 0,
    TEST,
    BLEND,
}

export enum FaceType {
    NONE = 0,
    FRONT,
    BACK,
    DOUBLE,
}
