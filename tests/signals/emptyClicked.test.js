import { CerebralTest } from 'cerebral/test';
import { assert } from 'chai';

import app from 'modules/App';

describe('Not a layer clicked', function () {
  it('Should set inspector to false', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          visibility: {
            inspector: true
          }
        }
      }
    })
      .runSignal('app.emptyClicked')
      .then(({ state }) => {
        assert.equal(state.settings.visibility.inspector, false);
      });
  });
});
