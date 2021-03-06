'use strict';
const debug = require('debug')('schema');

const TYPES_MAP = {
    NormalizedString: 'string',
    DateTime: 'date',
    PositiveInteger: 'number',
    Decimal: 'number',
    Boolean: 'boolean',
    Date: 'date',
    Int: 'number',
    NonNegativeInteger: 'number',
    AnyType: 'string',
    Integer: 'number'
};
const mappings = require('./mwsfeeds.js').generated;
let indent = 0;

function lookupType(typeName) {
    const nameParts = typeName.split('.');
    const [module, name] = [nameParts[0], nameParts.splice(1).join('.')];
    return mappings.typeInfos.find((t) => t.localName === name);
}

function convertType(type) {
    if (!type) {
        return 'string';
    }
    let result = TYPES_MAP[type];
    if (!result) {
        const foundType = lookupType(type);
        if (!foundType) {
            throw new Error(`Can't find type ${type}`);
        }
        if (foundType.propertyInfos) {
            result = 'object';
        }
    }
    return result;
}

function toProperties(type, productDataType) {
    indent++;
    const suffix = new Array(indent + 1).join('\t');
    const props = {};
    debug(`${suffix} Processing ${JSON.stringify(type)}`);
    if (!type.propertyInfos) {
        throw new Error(`Type ${type.localName} has no propertyInfos property ${JSON.stringify(type)}`);
    }
    type.propertyInfos.filter((prop) => {
        // We only filter when in ProductData
        if (type.localName && type.localName === 'Product.ProductData') {
            return prop.name === productDataType;
        }
        return true;
    }).forEach((prop) => {
        const type = convertType(prop.typeInfo);
        const required = prop.required || false;
        const name = prop.name;
        const result = {
            required,
            type
        };
        if (prop.elementName && prop.elementName.localPart) {
            result.title = prop.elementName.localPart;
        }
        if (prop.values) {
            result.enum = prop.values;
        }
        if (type === 'object') {
            if (!prop.typeInfo) {
                throw new Error(`Can not convert prop=${JSON.stringify(prop)}`);
            }
            const subType = lookupType(prop.typeInfo);
            if (!subType) {
                throw new Error(`Can not lookup typeInfo of prop=${JSON.stringify(prop)}`);
            }
            result.properties = toProperties(subType, productDataType);
        } else if (prop.typeInfo && prop.typeInfo.indexOf('.') >= 0) {
            // Sometimes we have enums defined as types
            const subType = lookupType(prop.typeInfo);
            if (!subType) {
                throw new Error(`Can not lookup typeInfo of prop=${JSON.stringify(prop)}`);
            }
            if (subType.type === 'enumInfo') {
                result.enum = subType.values;
            } else {
                throw new Error(`Don't know what to do here prop prop=${JSON.stringify(prop)}`);
            }
        }
        debug(`${suffix} Result ${JSON.stringify(result)}`);
        props[name] = result;
    });
    indent--;
    return props;
}

/**
 * This function will return a map of properties for given product data type
 */
module.exports = function generateProperties(type) {
    const product = mappings.typeInfos.find((t) => t.localName === 'Product');
    return toProperties(product, type);
};
