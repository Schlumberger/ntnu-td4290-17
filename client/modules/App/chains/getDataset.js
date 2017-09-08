import { sequence } from 'cerebral';
import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

import extractVisibilitySettings from '../actions/extractVisibilitySettings';

export default sequence('Get Dataset', [
  // Get the path 'dataset' from firebase
  value('dataset'),
  {
    // If there was an error, do nothing
    error: [],
    // If success, save it
    success: [
      // Set is a factory for assigning something to client state
      // Here it takes response.value and assigns it to dataset-key in client
      set(state`dataset`, props`response.value`),
      // A custom function I made
      extractVisibilitySettings,
      // Set the returned object from my custom function in state
      set(state`layers`, props`settings`)
    ]
  }
]);
