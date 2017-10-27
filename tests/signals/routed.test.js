import { CerebralTest } from 'cerebral/test';
import { provide } from 'cerebral';
import { assert } from 'chai';
import sinon from 'sinon';

import app from 'modules/App';

describe('Layer clicked', function () {
  it('Should work with no state', done => {
    CerebralTest({
      modules: {
        app
      },
      state: {
        app: {
          info: null
        }
      },
      providers: [
        provide('firebase', {
          getUser: () =>
            new Promise((resolve, reject) => resolve({ response: true })),
          signInWithGoogle: () =>
            new Promise((resolve, reject) => resolve({ response: true })),
          value: () => new Promise((resolve, reject) => resolve({ data: [] }))
        })
      ]
    })
      .runSignal('app.routed')
      .then(() => done());
  });
});
