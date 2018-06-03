export const VERSION = '05';

export const GetTypeCount = function() {
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

export function init() {
    
}
