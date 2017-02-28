'use strict';
const Jsonix = require('jsonix').Jsonix;
const fs = require('fs');
const expect = require('chai').expect;

describe('Given the mappings', () => {
    const mappings = require('../lib/mwsfeeds').generated;
    it('should generate XML', () => {
        const expected = fs.readFileSync('./spec/data/misc-product.xml', 'utf-8').replace(/(?:\r\n|\r|\n|\t| )/g, '');
        const context = new Jsonix.Context([mappings]);
        const marshaller = context.createMarshaller();
        const doc = marshaller.marshalString({
            name: {
                localPart: 'Product'
            },
            value: require('./data/misc-product.json')
        });
        expect(doc).to.equal(expected);
    });
});
