import fullscreen_vert from 'shaderLibs/fullscreen_vert.glsl';
import fullscreen_frag from 'shaderLibs/fullscreen_frag.glsl';
import color_vert from 'shaderLibs/color_vert.glsl';
import color_frag from 'shaderLibs/color_frag.glsl';


export interface IShader {
    vert: string;
    frag: string;
}


let shaders = {
    'fullscreen': {
        vert: fullscreen_vert,
        frag: fullscreen_frag,
    },

    'color': {
        vert: color_vert,
        frag: color_frag,
    },
}

export default {
    shaders: shaders
}

