import { sequence } from 'cerebral';
import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

import extractVisibilitySettings from '../actions/extractVisibilitySettings';

export default sequence('Get Dataset', [
  value('dataset'),
  {
    error: [],
    success: [
      set(state`dataset`, props`response.value`),
      extractVisibilitySettings,
      set(state`layers`, props`settings`)
    ]
  }
]);
