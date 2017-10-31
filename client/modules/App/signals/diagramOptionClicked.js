import { sequence } from 'cerebral';
import { set, when } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('diagram option clicked', [
  set(state`settings.diagramOption`, props`option`),
  when(props`option`, opts => opts === 'age'),
  {
    true: [set(state`settings.visibility.layers`, true)],
    false: []
  }
]);
