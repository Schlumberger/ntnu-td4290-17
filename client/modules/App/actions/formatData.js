import {
  addAgeToPoints,
  getFill,
  getStroke,
  getGeometryType,
  getAge,
  getCategory,
  getMaxHeightByCategory,
  checkUnconformity
} from 'utils/formattingData';

export default function formatData ({ state }) {
  const chronostrat = state.get('chronostrat') || [];
  const dataset = state.get('dataset') || [];
  const unconformities = state.get('unconformities');

  const data = dataset.map((line, index, data) => {
    const category = getCategory(line.id, chronostrat);
    return Object.assign(
      line,
      {
        fill: getFill(line.type, category, chronostrat),
        stroke: getStroke(line.type),
        geometryType: getGeometryType(line.type),
        category: category,
        unconform: checkUnconformity(category, unconformities)
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
          getMaxHeightByCategory(data, line.category),
          line.unconform
        )
      )
    });
  });

  return { data: withPoints };
}
