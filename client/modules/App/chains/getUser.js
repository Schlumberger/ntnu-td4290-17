import {getUser} from '@cerebral/firebase/operators';
import {state, props} from 'cerebral/tags';
import {set} from 'cerebral/operators';

export default [
    getUser(),
    set(state`app.user`, props`response`)
]