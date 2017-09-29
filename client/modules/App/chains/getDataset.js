import { sequence } from 'cerebral';
import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Get Dataset', [
  // Get the path 'dataset' from firebase
  value('datasets.new'),
  {
    // If there was an error, do nothing
    error: [],
    // If success, save it
    success: [
      // Set is a factory for assigning something to client state
      // Here it takes response.value and assigns it to dataset-key in client
      set(state`dataset`, props`response.value`)
    ]
  }
]);
