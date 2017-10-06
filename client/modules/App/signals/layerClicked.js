import { sequence } from 'cerebral';
import { state, props } from 'cerebral/tags';
import { set } from 'cerebral/operators';

export default sequence('layerClicked', [
  set(state`app.info`, props`info`),
  set(state`settings.visibility.inspector`, true)
]);
