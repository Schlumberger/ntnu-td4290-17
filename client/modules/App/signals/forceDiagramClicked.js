import { sequence } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

// When button is clicked, swap between forceDiagram and regular diagrams

export default sequence('Force diagram clicked', [
  set(state`settings.visibility.forceDiagram`, props`diagramType`)
]);
