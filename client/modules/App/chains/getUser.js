import {getUser, createUserWithEmailAndPassword, signInWithGoogle} from '@cerebral/firebase/operators';
import {state, props} from 'cerebral/tags';
import {set} from 'cerebral/operators';

export default [
    getUser(), {
        error: [
            createUserWithEmailAndPassword(email, password)
        ]
    },
    signInWithGoogle({
        redirect: false,
    }),
    set(state`app.user`, props`response`)
]