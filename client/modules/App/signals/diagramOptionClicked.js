import { sequence } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('diagram option clicked', [
  set(state`settings.diagramOption`, props`option`)
]);
