import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeIntersections';

describe('Compute correct values', function () {
  it('Should compute empty object if no data', function () {
    const result = runCompute(computed);
    assert.deepEqual(result, []);
  });
  it('Should compute empty arrays if false filters', function () {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            intersects: false
          }
        },
        formattedData: [{ foo: 'bar' }]
      }
    });
    assert.deepEqual(result, []);
  });
  it('Should filter layers', function () {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            intersects: true
          }
        },
        formattedData: [
          { type: 'surface', intersections: [{ foo: 'bar' }] },
          { type: 'notsurface' }
        ]
      }
    });
    assert.deepEqual(result, [{ foo: 'bar' }]);
  });
  it('Should filter layers without intersections', function () {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            intersects: true
          }
        },
        formattedData: [{ type: 'surface' }, { type: 'notsurface' }]
      }
    });
    assert.deepEqual(result, []);
  });
});
