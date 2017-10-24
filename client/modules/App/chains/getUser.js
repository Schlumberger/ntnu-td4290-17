import { getUser, signInWithGoogle } from '@cerebral/firebase/operators';
import { state, props } from 'cerebral/tags';
import { set, when } from 'cerebral/operators';

export default [
  getUser(),
  when(props`response.user`),
  {
    true: [],
    false: [signInWithGoogle()]
  },
  set(state`app.user`, props`response.user`)
];
