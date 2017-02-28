'use strict';
const expect = require('chai').expect;

describe('Given the mappings', () => {
    const schemas = require('../lib/schemas.js');

    it('should list properties', () => {
        const result = schemas('miscellaneous');
        expect(Object.keys(result).length).to.equal(25);
        expect(Object.keys(result.descriptionData.properties).length).to.equal(47);
        expect(Object.keys(result.productData.properties.miscellaneous.properties).length).to.equal(11);
    });
});
