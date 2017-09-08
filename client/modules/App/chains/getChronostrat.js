import { sequence } from 'cerebral';
import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

// Same as getDataset.js
export default sequence('Get Chronostrat', [
  value('chronostrat'),
  {
    error: [],
    success: [set(state`chronostrat`, props`response.value`)]
  }
]);
