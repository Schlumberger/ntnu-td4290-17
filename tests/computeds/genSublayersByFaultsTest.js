import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert } from 'chai';

import genTestData from 'computed/genTestData';
import genSublayersByFaults from 'computed/genSublayersByFaults';

describe('Sublayers should be split by this function', function() {
  //create test data
  const { testLayers, testFaults } = genTestData();

  it('should be able to determine if a fault is over a layer', function() {
    const faultCutsLayer = genSublayersByFaults.faultCutsLayer(layer, fault);
    assert.deepEquals(faultCutsLayer, true);
  });

  // it('', () => {
  //
  // })
});
