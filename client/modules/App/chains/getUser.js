import { getUser, signInWithGoogle } from '@cerebral/firebase/operators';
import { state, props } from 'cerebral/tags';
import { set, when } from 'cerebral/operators';

export default function (cont) {
  return [
    getUser(),
    when(props`response.user`),
    {
      true: [set(state`app.user`, props`response`), cont],
      false: [
        signInWithGoogle(),
        {
          error: [],
          success: [set(state`app.user`, props`response`), cont]
        }
      ]
    }
  ];
}
