import { assert, expect } from 'chai';

import {
  addAgeToPoints,
  getStroke,
  getFill,
  getGeometryType,
  getCategory,
  getAge,
  getMaxHeightByCategory,
  checkUnconformity
} from 'utils/formattingData';

describe('Formatting data utils', function () {
  describe('Get max height by category', function () {
    it('Should get age 0 if no data', function () {
      assert.deepEqual(getMaxHeightByCategory(), 0);
    });
    it('Should get max height', function () {
      const data = [
        { category: 'fooz', points: [{ height: 4 }] },
        { category: 'fooz', points: [{ height: 2 }] }
      ];

      const result = getMaxHeightByCategory(data, 'fooz');

      assert.deepEqual(result, 4);
    });
    it('Should disregard other layers', function () {
      const data = [
        { category: 'foozt', points: [{ height: 4 }] },
        { category: 'fooz', points: [{ height: 2 }] }
      ];

      const result = getMaxHeightByCategory(data, 'fooz');

      assert.deepEqual(result, 2);
    });
    it('Should be minumum 0', function () {
      const data = [
        { category: 'foozt', points: [{ height: -4 }] },
        { category: 'fooz', points: [{ height: -2 }] }
      ];

      const result = getMaxHeightByCategory(data, 'fooz');

      assert.deepEqual(result, 0);
    });
  });
  describe('Get age', function () {
    it('Should get age if in chronostrat', function () {
      const chronostrat = {
        foo: {
          age: [1, 2]
        }
      };

      const result = getAge('foo', chronostrat);

      assert.deepEqual(result, { minAge: 1, maxAge: 2 });
    });
    it('Should get 0 if not in chronostrat', function () {
      const chronostrat = {
        foo: {
          age: [1, 2]
        }
      };

      const result = getAge('bar', chronostrat);

      assert.deepEqual(result, { minAge: 0, maxAge: 0 });
    });
  });
  describe('Add age to points', function () {
    it('Should do nothing if fault', function () {
      const points = {
        x: 4,
        y: 2
      };
      const result = addAgeToPoints('fault', null, null, points);

      assert.deepEqual(result, points);
    });
    it('Should add age if surface', function () {
      const points = {
        x: 4,
        y: 2
      };
      const chronostrat = {
        category: {
          age: [1, 2]
        }
      };
      const result = addAgeToPoints('surface', 'category', chronostrat, points);

      assert.deepEqual(result, {
        x: 4,
        y: 2,
        minAge: 1,
        maxAge: 2,
        age0: 1,
        age1: 2
      });
    });
    it('Should add age if surface and unconform', function () {
      const points = {
        x: 4,
        y: 2
      };
      const chronostrat = {
        category: {
          age: [1, 2]
        }
      };
      const result = addAgeToPoints(
        'surface',
        'category',
        chronostrat,
        points,
        200,
        true
      );

      assert.deepEqual(result, {
        x: 4,
        y: 2,
        minAge: 1,
        maxAge: 2,
        age0: 1,
        age1: 2
      });
    });
  });
  describe('Get Stroke', function () {
    ['surface', 'fault', 'foo'].forEach(type => {
      it('Should return a string when type is ' + type, function () {
        expect(getStroke(type)).to.be.a('string');
      });
    });
  });
  describe('Get Fill', function () {
    it('Should return none as default', function () {
      assert.equal(getFill(), 'none');
    });
    it('Should return none if fault', function () {
      assert.equal(getFill('fault'), 'none');
    });
    it('Should lookup color if surface', function () {
      assert.equal(getFill('surface', 'per', { per: { color: 'red' } }), 'red');
    });
    it('Should lookup color if surface if present, else black', function () {
      assert.equal(
        getFill('surface', 'foo', { per: { color: 'red' } }),
        'black'
      );
    });
  });
  describe('Get Geometry Type', function () {
    it('Should return line as default', function () {
      assert.equal(getGeometryType(), 'line');
    });
    it('Should return area if surface', function () {
      assert.equal(getGeometryType('surface'), 'area');
    });
    it('Should return line if fault', function () {
      assert.equal(getGeometryType('fault'), 'line');
    });
  });
  describe('Get Category', function () {
    it('Should return line if in chronostrat', function () {
      const id = 'foozerino';
      const chronostrat = { foo: true };
      assert.equal(getCategory(id, chronostrat), 'foo');
    });
    it('Should return seabed if contains seabed in name', function () {
      const id = '2-seabed';
      assert.equal(getCategory(id, {}), 'seabed');
    });
    it('Should return other if not in populated chronostrat', function () {
      const id = '2-seabed';
      assert.equal(getCategory(id, { foo: true, bar: true }), 'seabed');
    });
    it('Should return null if none of the above', function () {
      const id = 'seabed';
      assert.equal(getCategory(id, {}), null);
    });
  });
  describe('Check unconformities', function () {
    it('Should return null if not category or unconformities', function () {
      assert.equal(checkUnconformity(), null);
      assert.equal(checkUnconformity('foo'), null);
      assert.equal(checkUnconformity(null, { foo: 'bar' }), null);
    });
    it('Should find category in  unconformities', function () {
      const unconformities = {
        'base-foozerino': true
      };
      assert.equal(checkUnconformity('foozerino', unconformities), true);
    });
    it('Should not find category in unconformities', function () {
      const unconformities = {
        bassdfnsfdl: true
      };
      assert.equal(checkUnconformity('foozerino', unconformities), false);
    });
  });
});
