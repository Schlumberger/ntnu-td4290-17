import { assert, expect } from 'chai';

import {
  addAgeToPoints,
  getStroke,
  getFill,
  getGeometryType
} from 'utils/formattingData';

describe('Formatting data utils', function() {
  describe('Add age to points', function() {
    it('Should do nothing if fault', function() {
      const points = {
        x: 4,
        y: 2
      };
      const result = addAgeToPoints('fault', null, null, points);

      assert.deepEqual(result, points);
    });
    it('Should add age if layer', function() {
      const points = {
        x: 4,
        y: 2
      };
      const chronostrat = {
        category: {
          age: [1, 2]
        }
      };
      const result = addAgeToPoints('layer', 'category', chronostrat, points);

      assert.deepEqual(result, {
        x: 4,
        y: 2,
        minAge: 1,
        maxAge: 2
      });
    });
  });
  describe('Get Stroke', function() {
    ['layer', 'fault', 'foo'].forEach(type => {
      it('Should return a string when type is ' + type, function() {
        expect(getStroke(type)).to.be.a('string');
      });
    });
  });
  describe('Get Fill', function() {
    it('Should return none as default', function() {
      assert.equal(getFill(), 'none');
    });
    it('Should return none if fault', function() {
      assert.equal(getFill('fault'), 'none');
    });
    it('Should lookup color if layer', function() {
      assert.equal(getFill('layer', 'per', { per: { color: 'red' } }), 'red');
    });
    it('Should lookup color if layer if present, else black', function() {
      assert.equal(getFill('layer', 'foo', { per: { color: 'red' } }), 'black');
    });
  });
  describe('Get Geometry Type', function() {
    it('Should return line as default', function() {
      assert.equal(getGeometryType(), 'line');
    });
    it('Should return area if layer', function() {
      assert.equal(getGeometryType('layer'), 'area');
    });
    it('Should return line if fault', function() {
      assert.equal(getGeometryType('fault'), 'line');
    });
  });
});