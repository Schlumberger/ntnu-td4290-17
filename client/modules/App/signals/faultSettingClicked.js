import { sequence } from 'cerebral';
import { toggle, when } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Layer Setting Clicked', [
  when(state`settings.diagramOption`, d => d === 'depth'),
  {
    true: [toggle(state`settings.visibility.faults`)],
    false: []
  }
]);
