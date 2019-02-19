import encodeFloat2rgb from './mods/encodeFloat2RGB';
import skin_vert from './mods/skinVert'

export const mods = {
    'encodeFloat2rgb': encodeFloat2rgb,
    'skin_vert': skin_vert,
}

const reg = /#include<([a-zA-Z0-9_./]+)>/;

export function repStr(text: string) {
    let src = text;
    let result;

    do {
        result = reg.exec(src);
        if (result) {
            src = src.replace(result[0], mods[result[1]]);
        }
    } while (result);
    return src;
}

import fullscreen_vert from './libs/fullscreen_vert_glsl';
import fullscreen_frag from './libs/fullscreen_frag_glsl';
import color_vert from './libs/color_vert_glsl';
import color_frag from './libs/color_frag_glsl';
import diffuse_vert from './libs/diffuse_vert_glsl';
import diffuse_frag from './libs/diffuse_frag_glsl';
import cartoon_vert from './libs/cartoon_vert_glsl';
import cartoon_frag from './libs/cartoon_frag_glsl';
import standard_vert from './libs/standard_vert_glsl';
import standard_frag from './libs/standard_frag_glsl';
import fxaa_frag from './libs/fxaa_frag_glsl';

export const shaders = {
    'fullscreen': {
        vert: repStr(fullscreen_vert),
        frag: repStr(fullscreen_frag),
    },

    'color': {
        vert: repStr(color_vert),
        frag: repStr(color_frag),
    },
    
    'diffuse': {
        vert: repStr(diffuse_vert),
        frag: repStr(diffuse_frag),
    },

    'cartoon': {
        vert: repStr(cartoon_vert),
        frag: repStr(cartoon_frag),
    },

    'standard': {
        vert: repStr(standard_vert),
        frag: repStr(standard_frag),
    },

    'fxaa': {
        vert: repStr(fullscreen_vert),
        frag: repStr(fxaa_frag),
    }
}