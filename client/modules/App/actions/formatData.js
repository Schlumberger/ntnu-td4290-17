import {
  addAgeToPoints,
  getFill,
  getStroke,
  getGeometryType,
  getAge,
  getCategory
} from 'utils/formattingData';

export default function formatData({ state }) {
  const chronostrat = state.get('chronostrat');
  const dataset = state.get('dataset');

  const data = dataset.map(line => {
    const category = getCategory(line.id, chronostrat);
    return Object.assign(
      line,
      {
        points: (line.points || []).map(point =>
          addAgeToPoints(line.type, category, chronostrat, point)
        ),
        fill: getFill(line.type, category, chronostrat),
        stroke: getStroke(line.type),
        geometryType: getGeometryType(line.type),
        category: category
      },
      getAge(category, chronostrat)
    );
  });

  return { data };
}
