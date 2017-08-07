export const VERSION = '04';

export const Logger = {
    info: function(message) {
        console.log(message);
    },

    warn: function(message) {
        console.warn(message);
    },

    error: function(message) {
        console.error(message);
    },
};

export const getTypeCount = function() {
    let TypeCount = 0;
    return function getTypeCount() {
        return TypeCount++;
    };
}();

export const GetObjectCount = function() {
    let ObjectCount = 0;
    return function getObjectCount() {
        return ObjectCount++;
    };
}();

export const GLMAT_EPSILON = 0.000001
export const USE_MULTI_RENDERER = false
