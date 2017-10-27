import { CerebralTest } from 'cerebral/test';
import { assert } from 'chai';

import app from 'modules/App';

describe('Layer clicked', function () {
  it('Should set info to info', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        app: {
          info: null
        }
      }
    })
      .runSignal('app.layerClicked', { info: 'foobarbaz' })
      .then(({ state }) => {
        assert.equal(state.app.info, 'foobarbaz');
      });
  });
  it('Should set show inspector to true', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          visibility: {
            inspector: false
          }
        }
      }
    })
      .runSignal('app.layerClicked', { info: 'foobarbaz' })
      .then(({ state }) => {
        assert.equal(state.settings.visibility.inspector, true);
      });
  });
});
