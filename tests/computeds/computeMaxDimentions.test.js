import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeMaxDimentions';

describe('Compute max dimensions', function () {
  it('Should return maxWidth and maxHeight to 0', function () {
    const result = runCompute(computed);
    assert.deepEqual(result, {
      maxWidth: 0,
      maxHeight: 0
    });
  });
  it('Should find the correct maxHeigh', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [{ points: [{ x: 10 }, { x: 20 }, { x: 5 }] }]
      }
    });
    assert.deepEqual(result, { maxWidth: 20, maxHeight: 0 });
  });
});
