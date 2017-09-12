import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// A function for taking several state dependencies and computing an output
// It is used to get complex logic out of the components
// Advanced stuff, not super important
export default compute(
  state`dataset`,
  state`chronostrat`,
  state`settings.visibility`,
  (dataset, chronostrat, layers = {}) => {
    if (!dataset || !chronostrat) return [];

    return dataset.filter(line => layers[line.type]).map(line => {
      return Object.assign(line, {
        stroke: getStroke(line.category, chronostrat)
      });
    });
  }
);

const getStroke = (period, chronostrat) => {
  if (!period) return 'black';

  return period in chronostrat ? chronostrat[period].color : 'black';
};
