import { value } from '@cerebral/firebase/operators';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default [
  value('chronostrat'),
  {
    error: [],
    success: [set(state`chronostrat`, props`response.value`)]
  }
];
