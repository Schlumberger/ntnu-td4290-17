import { props, state } from 'cerebral/tags';
import { runAction } from 'cerebral/test';
import { assert } from 'chai';

import action from '../../client/modules/App/actions/formatData';

describe('Return correct values', function() {
  it('Should compute empty arrays if empty data', function() {
    return runAction(action, {
      state: {
        chronostrat: {},
        dataset: []
      }
    }).then(({ output }) => assert.deepEqual(output, { data: [] }));
  });
});
