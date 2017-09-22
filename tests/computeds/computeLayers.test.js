import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeLayers';

describe('Compute correct values', function() {
  it('Should compute empty object if no data', function() {
    const result = runCompute(computed);
    assert.deepEqual(result, []);
  });
  it('Should compute empty arrays if false filters', function() {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            layers: false
          },
          yAxisUnit: 'age'
        },
        formattedData: [{ foo: 'bar' }]
      }
    });
    assert.deepEqual(result, []);
  });
});
