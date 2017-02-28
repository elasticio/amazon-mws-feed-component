'use strict';
const debug = require('debug')('generator');
const mkdir = require('mkdirp');
const rmrf = require('rmrf');
const fs = require('fs');
const schemas = require('./schemas.js');

/**
 * This function will create an action file with given type name and located under filename
 * @param name
 * @param filename
 */
function createAction(name, filename) {
    debug(`Creating action ${filename}`);
    const content = `"use strict";
module.exports.process = require('../../lib/common.js').newProcess('${name}');
  `;
    fs.writeFileSync(filename, content);
}

/**
 * This method should generate a schema for given type into given filename
 *
 * @param type
 * @param filename
 */
function createSchema(type, filename) {
    debug(`Generating ${filename}`);
    const content = {
        type: 'object',
        title: 'ProductFeedItem'
    };
    content.properties = schemas(type);
    fs.writeFileSync(filename, JSON.stringify(content, null, '  '));
}

debug('Cleaning-up ./generated');
rmrf('./generated');
debug('Creating directories structure');
mkdir.sync('./generated/actions');
mkdir.sync('./generated/schemas');
debug('Loading types data');
const mappings = require('./mwsfeeds').generated;
const pdata = mappings.typeInfos.find((t) => t.localName === 'Product.ProductData');
const ptypes = pdata.propertyInfos.map((t) => t.name);

debug(`Found ${ptypes.length} types names="${ptypes.join(',')}"`);
const result = require('../templates/component.template.json');
const actions = result.actions = {};
ptypes.forEach((name) => {
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    const title = `Create ${capName}`;
    const main = `./generated/actions/create${capName}.js`;
    const schema = `./generated/schemas/${name}.in.json`;
    actions[name] = {
        title,
        main,
        metadata: {
            in: schema,
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
    createSchema(name, schema);
    createAction(name, main);
});
debug('Writing component.json out');
fs.writeFileSync('./component.json', JSON.stringify(result, null, '  '));
debug('Generation completed');

