import { sequence } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Transition Clicked', [
  // if ()
  set(state`figure.${props`layerID`}`)
]);
