import { CerebralTest } from 'cerebral/test';
import { assert } from 'chai';

import app from 'modules/App';

describe('Layer Clicked signal', function () {
  it('Should switch layer', () => {
    return CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          visibility: {
            faults: true,
            layers: true
          }
        }
      }
    })
      .runSignal('app.layerSettingClicked')
      .then(({ state }) => {
        assert.equal(state.settings.visibility.faults, true);
      });
  });
  it('Should switch layer if invoked twice', () => {
    const cerebral = CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          visibility: {
            faults: true,
            layers: true
          }
        }
      }
    });

    return cerebral.runSignal('app.faultSettingClicked').then(({ state }) => {
      assert.equal(state.settings.visibility.faults, true);
      return cerebral.runSignal('app.faultSettingClicked').then(({ state }) => {
        assert.equal(state.settings.visibility.faults, true);
      });
    });
  });
  it('Should switch layer twice if invoked simultaneously', () => {
    const cerebral = CerebralTest({
      modules: {
        app
      },
      state: {
        settings: {
          visibility: {
            faults: true,
            layers: true
          }
        }
      }
    });

    return Promise.all([
      cerebral.runSignal('app.layerSettingClicked'),
      cerebral.runSignal('app.layerSettingClicked')
    ]).then(res => {
      assert.equal(res[0].state.settings.visibility.faults, true);
      assert.equal(res[1].state.settings.visibility.faults, true);
    });
  });
});
