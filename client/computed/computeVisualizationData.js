import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// A function for taking several state dependencies and computing an output
// It is used to get complex logic out of the components
// Advanced stuff, not super important
export default compute(
  state`formattedData`,
  state`settings.visibility`,
  state`settings.yAxisUnit`,
  (formattedData, layers = {}, yAxisUnit) => {
    if (!formattedData) return {};

    if (yAxisUnit === 'age') layers.faults = false;

    const groups = Object.keys(layers).reduce((acc, layerID) => {
      if (!layers[layerID]) {
        acc[layerID] = [];
        return acc;
      }
      acc[layerID] = formattedData
        .filter(line => isSameType(layerID, line.type))
        .reverse();
      return acc;
    }, {});

    const maxWidth = Math.max(
      ...formattedData.map(el => Math.max(...el.points.map(p => p.x || 0)))
    );

    const maxHeight = Math.max(
      ...formattedData.map(el =>
        Math.max(
          ...el.points.map(p => (yAxisUnit === 'depth' ? p.y : p.maxAge || 0))
        )
      )
    );

    return {
      groups,
      maxWidth,
      maxHeight,
      yAxisUnit
    };
  }
);

const isSameType = (plural, singular) => {
  return plural.substring(0, plural.length - 1) === singular;
};
