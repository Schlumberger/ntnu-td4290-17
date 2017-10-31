import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeFaults';

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
            faults: false
          },
          diagramOption: 'age'
        },
        formattedData: [{ foo: 'bar' }]
      }
    });
    assert.deepEqual(result, []);
  });
  it('Should filter faults', function () {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            faults: true
          },
          diagramOption: 'depth'
        },
        formattedData: [{ type: 'fault' }, { type: 'groijdgoijrdg' }]
      }
    });
    assert.deepEqual(result, [{ type: 'fault' }]);
  });
});
