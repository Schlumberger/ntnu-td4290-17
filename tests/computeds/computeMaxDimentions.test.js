import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeMaxDimentions';

describe('Compute max dimensions', function() {
  it('Should return maxWidth and maxHeight to 0', function() {
    const result = runCompute(computed);
    assert.deepEqual(result,  {
      maxWidth: 0,
      maxHeight: 0
    });
  });
});
