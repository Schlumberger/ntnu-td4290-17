import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

import formatData from '../actions/formatData';

export default [formatData, set(state`formattedData`, props`data`)];
