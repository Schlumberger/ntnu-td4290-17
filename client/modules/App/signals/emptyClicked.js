import { sequence } from 'cerebral';
import { state } from 'cerebral/tags';
import { set } from 'cerebral/operators';

export default sequence('emptyClicked', [
  set(state`settings.visibility.inspector`, false)
]);
