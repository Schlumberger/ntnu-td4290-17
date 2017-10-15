import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import FirebaseProvider, {
  FirebaseProviderError,
  FirebaseProviderAuthenticationError
} from '@cerebral/firebase';
import Router from '@cerebral/router';

import firebaseConfig from 'configs/firebase';

import AppModule from './modules/App';

// Lot of settings, only modules and router are important
export default Controller({
  devtools:
    process.env.NODE_ENV === 'production'
      ? null
      : Devtools({
        host: 'localhost:8787'
      }),
  state: {
    error: null,
    settings: {
      visibility: {
        layers: true,
        faults: true,
        inspector: false,
        subareas: true,
        intersects: true
      },
      yAxisUnit: 'depth'
    }
  },
  modules: {
    // Sections of logic that are grouped together
    app: AppModule,
    // The router
    router: Router({
      routes: [
        {
          // When a url path is match, execute this signal
          path: '/',
          signal: 'app.routed'
        }
      ]
    })
  },
  catch: new Map([
    [FirebaseProviderAuthenticationError],
    [FirebaseProviderError]
  ]),
  providers: [
    FirebaseProvider({
      config: firebaseConfig
    })
  ]
});
