import {
  addAgeToPoints,
  getFill,
  getStroke,
  getGeometryType,
  getAge,
  getCategory,
  getMaxHeightByCategory
} from 'utils/formattingData';

export default function formatData ({ state }) {
  const chronostrat = state.get('chronostrat') || [];
  const dataset = state.get('dataset') || [];

  const data = dataset.map((line, index, data) => {
    const category = getCategory(line.id, chronostrat);
    return Object.assign(
      line,
      {
        fill: getFill(line.type, category, chronostrat),
        stroke: getStroke(line.type),
        geometryType: getGeometryType(line.type),
        category: category
      },
      getAge(category, chronostrat)
    );
  });

  const withPoints = data.map(line => {
    return Object.assign(line, {
      points: (line.points || []).map(point =>
        addAgeToPoints(
          line.type,
          line.category,
          chronostrat,
          point,
          getMaxHeightByCategory(data, line.category)
        )
      )
    });
  });

  return { data: withPoints };
}
