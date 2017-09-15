import { props, state } from 'cerebral/tags';
import { runAction } from 'cerebral/test';
import { assert } from 'chai';

import action from 'modules/App/actions/formatData';

describe('Return correct values', function() {
  it('Should compute empty arrays if empty data', function() {
    return runAction(action, {
      state: {
        chronostrat: {},
        dataset: []
      }
    }).then(({ output }) => assert.deepEqual(output, { data: [] }));
  });
  it('Should compute properties', function() {
    return runAction(action, {
      state: {
        chronostrat: {
          foo: {
            color: 'green',
            age: [1, 2]
          }
        },
        dataset: [{ type: 'layer', category: 'foo', points: [{ x: 4, y: 5 }] }]
      }
    }).then(({ output }) =>
      assert.deepEqual(output, {
        data: [
          {
            type: 'layer',
            fill: 'green',
            stroke: 'white',
            geometryType: 'area',
            category: 'foo',
            points: [{ x: 4, y: 5, minAge: 1, maxAge: 2 }]
          }
        ]
      })
    );
  });
});
