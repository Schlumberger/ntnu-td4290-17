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
  it('Should find the correct max', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [{ points: [{ x: 10 }, { x: 20 }, { x: 5, maxAge: 0 }] }]
      }
    });
    assert.deepEqual(result, { maxWidth: 20, maxHeight: 0 });
  });
  it('Should find the correct max with diagramOption equal depth', function () {
    const result = runCompute(computed, {
      state: {
        settings: {
          diagramOption: 'depth'
        },
        formattedData: [
          { points: [{ x: 10, y1: 3 }, { x: 20, y1: 2 }, { x: 5, y: 4 }] }
        ]
      }
    });
    assert.deepEqual(result, { maxWidth: 20, maxHeight: 4 });
  });
});
