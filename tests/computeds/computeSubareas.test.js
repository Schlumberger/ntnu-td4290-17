import { props, state } from 'cerebral/tags';
import { runCompute } from 'cerebral/test';
import { assert, expect } from 'chai';

import computed from 'computed/computeSubareas';

describe('Compute subareas', function () {
  it('Should compute empty object if no data', function () {
    const result = runCompute(computed);
    assert.deepEqual(result, []);
  });
  it('Should reject non-surface', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [{ type: 'nonsurface' }]
      }
    });
    assert.deepEqual(result, []);
  });
  it('Should accept surface with subarea', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [{ type: 'surface', subareas: [] }]
      }
    });
    expect(result).to.be.an('array');
    expect(result).to.have.property('length', 1);
  });
  it('Should accept surface with subarea without points', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [{ type: 'surface', subareas: [{ points: false }] }]
      }
    });
    expect(result).to.be.an('array');
    expect(result).to.have.property('length', 1);
  });
  it('Should calculate color for subareas', function () {
    const result = runCompute(computed, {
      state: {
        formattedData: [
          { type: 'surface', subareas: [{ points: [{ x: 1, y: 2 }] }] }
        ]
      }
    });
    expect(result).to.be.an('array');
    expect(result[0]).to.have.property('subareas');
    expect(result[0].subareas).to.be.an('array');
    expect(result[0].subareas[0]).to.have.property('points');
    expect(result[0].subareas[0]).to.have.property('fill');
    expect(result[0].subareas[0]).to.have.property('stroke');
    expect(result[0].subareas[0]).to.have.property('minAge');
    expect(result[0].subareas[0]).to.have.property('geometryType', 'area');
  });
});
