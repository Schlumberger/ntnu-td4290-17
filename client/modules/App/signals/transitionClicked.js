import { sequence } from 'cerebral';
import { set, equals } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default sequence('Transition Clicked', [
  equals(state`figure`),
  {
    rect: [set(state`figure`, 'tri')],
    tri: [set(state`figure`, 'line')],
    line: [set(state`figure`, 'rect')]
  }
]);
