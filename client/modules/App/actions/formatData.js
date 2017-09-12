import {
  addAgeToPoints,
  getFill,
  getStroke,
  getGeometryType
} from 'utils/formattingData';

export default function formatData({ state }) {
  const chronostrat = state.get('chronostrat');
  const dataset = state.get('dataset');

  const data = dataset.map(line => {
    return Object.assign(line, {
      points: line.points.map(point =>
        addAgeToPoints(line.type, line.category, chronostrat, point)
      ),
      fill: getFill(line.type, line.category, chronostrat),
      stroke: getStroke(line.type),
      geometryType: getGeometryType(line.type)
    });
  });

  return { data };
}
