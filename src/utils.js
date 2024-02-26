module.exports = {
    isObjectEmpty: object => {
        if (object == undefined || object === null) return !object; 
        return !Object.keys(object).length;
    },
};