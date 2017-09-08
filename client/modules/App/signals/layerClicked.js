import { sequence } from 'cerebral';
import { toggle } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Layer Clicked', [
  toggle(state`layers.${props`layerID`}`)
]);
