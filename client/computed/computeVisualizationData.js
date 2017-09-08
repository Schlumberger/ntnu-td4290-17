import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

export default compute(
  state`dataset`,
  state`chronostrat`,
  state`layers`,
  (dataset, chronostrat, layers = {}) => {
    if (!dataset || !chronostrat) return [];

    return dataset.filter(line => layers[line.id]).map(line => {
      return Object.assign(line, { stroke: getStroke(line.id, chronostrat) });
    });
  }
);

const getStroke = (id, chronostrat) => {
  const period = id.split('-')[1];
  return period in chronostrat ? chronostrat[period].color : 'black';
};
