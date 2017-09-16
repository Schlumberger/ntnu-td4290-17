import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import computed from 'computed/computeVisualizationData';

describe('Compute correct values', function() {
  it('Should compute empty object if no data', function() {
    const result = runCompute(computed);
    assert.deepEqual(result, {});
  });
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
  it('Should compute with depth and layers:true and faults:true', function() {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            layers: true,
            faults: true
          },
          yAxisUnit: 'depth'
        },
        formattedData: [{ type: 'layer', points: [{ x: 1, y: 2 }] }]
      }
    });
    assert.deepEqual(result, {
      groups: {
        layers: [{ type: 'layer', points: [{ x: 1, y: 2 }] }],
        faults: []
      },
      maxWidth: 1,
      maxHeight: 2,
      yAxisUnit: 'depth'
    });
  });
  it('Should compute with age and layers:true and faults:true and reject faults', function() {
    const result = runCompute(computed, {
      state: {
        settings: {
          visibility: {
            layers: true,
            faults: true
          },
          yAxisUnit: 'age'
        },
        formattedData: [
          { type: 'layer', points: [{ x: 1, y: 2, maxAge: 3, minAge: 2 }] },
          { type: 'fault', points: [{ x: 1, y: 2 }] }
        ]
      }
    });
    assert.deepEqual(result, {
      groups: {
        layers: [
          { type: 'layer', points: [{ x: 1, y: 2, maxAge: 3, minAge: 2 }] }
        ],
        faults: []
      },
      maxWidth: 1,
      maxHeight: 3,
      yAxisUnit: 'age'
    });
  });
});
