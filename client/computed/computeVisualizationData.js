import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

export default compute(
  state`chronostrat`,
  state`dataset`,
  (chronostrat, dataset) => {
    return ['Foo'];
  }
);
