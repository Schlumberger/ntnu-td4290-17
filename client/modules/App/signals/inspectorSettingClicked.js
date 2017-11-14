import { sequence } from 'cerebral';
import { toggle } from 'cerebral/operators';
import { state } from 'cerebral/tags';

export default sequence('Layer Setting Clicked', [
  toggle(state`settings.visibility.inspector`)
]);
