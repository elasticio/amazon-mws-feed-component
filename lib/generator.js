'use strict';
const mappings = require('./mwsfeeds').generated;
const debug = require('debug')('generator');

function lookupType(typeName) {
    const nameParts = typeName.split('.');
    const [module,name] = [nameParts[0], nameParts.splice(1).join('.')];
    return mappings.typeInfos.find((t) => t.localName === name);
}


debug('Generating component.json');
const pdata = mappings.typeInfos.find((t) => t.localName === 'Product.ProductData');
const ptypes = pdata.propertyInfos.map((t) => t.name);
const result = require('../templates/component.json');
const actions = result.actions = {};
ptypes.forEach((name) => {
    const title = 'Create ' + name.charAt(0).toUpperCase() + name.slice(1);
    actions[name] = {
        title,
        main: `./generated/actions/create${name}.js`,
        metadata: {
            in: `./generated/schemas/${name}.in.json`,
            out: {
                type: 'object',
                properties: {
                    result: {
                        type: 'boolean',
                        required: 'true'
                    }
                }
            }
        }
    };
});
console.log(JSON.stringify(result, null, '  '));
//console.log(JSON.stringify(toProperties(product), null, ' '));
