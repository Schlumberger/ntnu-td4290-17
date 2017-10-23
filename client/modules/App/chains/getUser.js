import {getUser, createUserWithEmailAndPassword, signInWithGoogle} from '@cerebral/firebase/operators';
import {state, props} from 'cerebral/tags';
import {set} from 'cerebral/operators';

export default [
    signInWithGoogle(),
    set(state`app.user`, props`response`)
]
