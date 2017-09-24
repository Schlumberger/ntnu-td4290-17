import { sequence } from 'cerebral';
import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Get Places', [
  // Get the path 'places' from firebase
  value('places'),
  {
    // If there was an error, do nothing
    error: [],
    // If success, save it
    success: [
      set(state`places`, props`response.value`)
    ]
  }
]);
