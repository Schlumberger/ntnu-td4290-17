import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// A function for taking several state dependencies and computing an output
// It is used to get complex logic out of the components
// Advanced stuff, not super important
export default compute(
  state`dataset`,
  state`chronostrat`,
  state`settings.visibility`,
  state`settings.yAxisUnit`,
  (dataset, chronostrat, layers = {}, yAxisUnit) => {
    if (!dataset || !chronostrat) return [];

    if (yAxisUnit === 'age') layers.faults = false;

    const groups = Object.keys(layers).reduce((acc, layerID) => {
      if (!layers[layerID]) {
        acc[layerID] = [];
        return acc;
      }
      acc[layerID] = dataset
        .filter(line => isSameType(layerID, line.type))
        .map(line => {
          return Object.assign(line, {
            points: line.points.map(point =>
              addAgeToPoints(
                line.type,
                line.category,
                chronostrat,
                yAxisUnit,
                point
              )
            ),
            fill: getFill(line.type, line.category, chronostrat),
            stroke: getStroke(line.type),
            geometryType: getGeometryType(line.type)
          });
        })
        .reverse();
      return acc;
    }, {});

    const maxWidth = Math.max(
      ...dataset.map(el => Math.max(...el.points.map(p => p.x || 0)))
    );

    const maxHeight = Math.max(
      ...dataset.map(el =>
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

const addAgeToPoints = (type, category, chronostrat, yAxisUnit, point) => {
  if (type === 'fault' || yAxisUnit === 'depth') {
    return point;
  }

  const age = chronostrat[category].age;
  point.minAge = age[0];
  point.maxAge = age[1];
  return point;
};

const getStroke = (type, period, chronostrat) => {
  switch (type) {
    case 'layer':
      return 'white';
    case 'fault':
      return 'black';
    default:
      return 'black';
  }
};

const getFill = (type, period, chronostrat) => {
  switch (type) {
    case 'layer':
      return period in chronostrat ? chronostrat[period].color : 'black';
    case 'fault':
      return 'none';
    default:
      return 'none';
  }
};

const getGeometryType = type => {
  switch (type) {
    case 'layer':
      return 'area';
    case 'fault':
      return 'line';
    default:
      return 'line';
  }
};
