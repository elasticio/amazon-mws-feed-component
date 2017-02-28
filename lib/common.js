'use strict';

/**
 * This function will be used by individual actions that are generated
 * automatically
 *
 * @param typeName name of the ProductDescription type
 */
module.exports.newProcess = function generateProcessFunction(typeName) {
    return function process(cfg, msg) {
        console.log(`Generating product description type ${typeName}`);
        return Promise.resolve(msg);
    };
};
