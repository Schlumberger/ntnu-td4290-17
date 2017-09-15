import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from '../../client/computed/computeVisualizationData';

describe('Compute correct values', function() {
  it('Should compute empty arrays if false filters', function() {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            layers: false,
            faults: false
          },
          yAxisUnit: 'age'
        },
        formattedData: []
      }
    });
    assert.deepEqual(result, {
      groups: {
        layers: [],
        faults: []
      },
      maxWidth: 0,
      maxHeight: 0,
      yAxisUnit: 'age'
    });
  });
});
