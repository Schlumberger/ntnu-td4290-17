import { sequence } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Y-Axis option clicked', [
  set(state`settings.yAxisUnit`, props`unit`)
]);
