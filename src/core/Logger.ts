export const Logger = {
    info: function(...message) {
        console.log(...message);
    },

    warn: function(...message) {
        console.warn(...message);
    },

    error: function(...message) {
        console.error(...message);
    },
};