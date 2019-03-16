export const LightingDefine = `

#ifndef LIGHTING_DEFINE
#define LIGHTING_DEFINE

#ifdef DIRECTION_LIGHT
    uniform vec3 u_directionDirs[DIRECTION_LIGHT];
    uniform vec4 u_directionColors[DIRECTION_LIGHT];
#endif

#ifdef POINT_LIGHT
    uniform vec3 u_pointPos[POINT_LIGHT];
    uniform vec4 u_pointColors[POINT_LIGHT];
#endif

#ifdef SPOT_LIGHT
    uniform vec3 u_spotPos[SPOT_LIGHT];
    uniform vec4 u_spotDirs[SPOT_LIGHT];
    uniform vec4 u_spotColors[SPOT_LIGHT];
#endif

#endif

`;
