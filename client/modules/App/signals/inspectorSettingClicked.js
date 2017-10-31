import { sequence } from 'cerebral';
import { toggle, when } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Layer Setting Clicked', [
  toggle(state`settings.visibility.inspector`)
]);
