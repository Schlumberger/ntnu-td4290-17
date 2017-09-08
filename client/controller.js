import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import FirebaseProvider, {
  FirebaseProviderError,
  FirebaseProviderAuthenticationError
} from '@cerebral/firebase';
import Router from '@cerebral/router';

import firebaseConfig from 'configs/firebase';

import AppModule from './modules/App';

export default Controller({
  devtools:
    process.env.NODE_ENV === 'production'
      ? null
      : Devtools({
          host: 'localhost:8787'
        }),
  state: {
    error: null
  },
  modules: {
    app: AppModule,
    router: Router({
      routes: [
        {
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
