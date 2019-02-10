import fullscreen_vert from './libs/fullscreen_vert_glsl';
import fullscreen_frag from './libs/fullscreen_frag_glsl';
import color_vert from './libs/color_vert_glsl';
import color_frag from './libs/color_frag_glsl';
import diffuse_vert from './libs/diffuse_vert_glsl';
import diffuse_frag from './libs/diffuse_frag_glsl';
import cartoon_vert from './libs/cartoon_vert_glsl';
import cartoon_frag from './libs/cartoon_frag_glsl';

export default {
    'fullscreen': {
        vert: fullscreen_vert,
        frag: fullscreen_frag,
    },

    'color': {
        vert: color_vert,
        frag: color_frag,
    },
    
    'diffuse': {
        vert: diffuse_vert,
        frag: diffuse_frag,
    },

    'cartoon': {
        vert: cartoon_vert,
        frag: cartoon_frag,
    },
}
