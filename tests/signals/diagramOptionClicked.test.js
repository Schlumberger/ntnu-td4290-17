import { CerebralTest } from 'cerebral/test';
import { assert } from 'chai';

import app from 'modules/App';

describe('Diagram option clicked', function () {
  it('Should set diagramOption', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          diagramOption: ''
        }
      }
    })
      .runSignal('app.diagramOptionClicked', { option: 'foo' })
      .then(({ state }) => {
        assert.equal(state.settings.diagramOption, 'foo');
      });
  });
});
