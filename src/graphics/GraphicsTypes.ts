import { GetTypeCount } from '../core/Base';

let _g = GetTypeCount;

export const AttribType = {
    POSITION            : _g(),
    NORMAL              : _g(),
    TANGENT             : _g(),
    BINORMAL            : _g(),
    COLOR               : _g(),
    JOINT               : _g(),
    WEIGHT              : _g(),
    TEXCOORD0           : _g(),
    TEXCOORD1           : _g(),
    TEXCOORD2           : _g(),
    TEXCOORD3           : _g(),
    TEXCOORD4           : _g(),
};

export const MapType = {
    DIFFUSE             : _g(),
    NORMAL              : _g(),
    SPECULAR            : _g(),
    BUMP                : _g(),
    DEPTH               : _g(),
    AMBIENT             : _g(),
    OTHER0              : _g(),
    OTHER1              : _g(),
    OTHER2              : _g(),
    OTHER3              : _g(),
    OTHER4              : _g(),
};

export const MatrixType = {
    //W : world, 
    //M : model, // eqrt world
    //V : view, 
    //P : projection
    WMatrix                     : _g(),
    VMatrix                     : _g(),
    PMatrix                     : _g(),
    MVMatrix                    : _g(),
    MVPMatrix                   : _g(),
    NormalWMatrix               : _g(),
    NormalMVMatrix              : _g(),
    NormalMVPMatrix             : _g(),
    InverseWMatrix              : _g(),
    InverseVMatrix              : _g(),
    InversePMatrix              : _g(),
};

export const UniformType = {
    COLOR                       : _g(),
    LightPosition               : _g(),
    LightPosition01             : _g(),
    LightPosition02             : _g(),
    LightPosition03             : _g(),
    LightPosition04             : _g(),
    OTHER0                      : _g(),
    OTHER1                      : _g(),
    OTHER2                      : _g(),
};

export const RenderTargetLocation = {
    COLOR                       : 0,
    NORMAL                      : 1,
    DEPTH                       : 2,
    // TODO: Add more render target type;
};
