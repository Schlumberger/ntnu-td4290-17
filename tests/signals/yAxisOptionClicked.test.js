import { CerebralTest } from 'cerebral/test';
import { assert } from 'chai';

import app from 'modules/App';

describe('Y axis option clicked', function () {
  it('Should set yAxis', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          yAxisUnit: ''
        }
      }
    })
      .runSignal('app.yAxisOptionClicked', { unit: 'foo' })
      .then(({ state }) => {
        assert.equal(state.settings.yAxisUnit, 'foo');
      });
  });
});
