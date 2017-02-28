'use strict';
const expect = require('chai').expect;

describe('Given the mappings', () => {
    const schemas = require('../lib/schemas.js');

    it('should list properties', () => {
        const result = schemas('foo');
        expect(Object.keys(result).length).to.equal(25);
    });
});
