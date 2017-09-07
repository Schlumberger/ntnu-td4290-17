import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default [
  value('dataset'),
  {
    error: [],
    success: [set(state`dataset`, props`response.value`)]
  }
];
