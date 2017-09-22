import { sequence } from 'cerebral';
import { toggle } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Layer Setting Clicked', [
  // Switch the bool value found in settings.visibility.layerID
  // Toggle is a factory, ie. a function returning a functions
  // State is a function that points to the client-state
  // Props is a function that gets the data returned from the previous function or input
  toggle(state`settings.visibility.${props`layerID`}`)
]);
