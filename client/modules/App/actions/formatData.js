import {
  addAgeToPoints,
  getFill,
  getStroke,
  getGeometryType,
  getAge
} from 'utils/formattingData';

export default function formatData({ state }) {
  const chronostrat = state.get('chronostrat');
  const dataset = state.get('dataset');
  const places = state.get('places');

  places.map(place => {
    console.log(place.text);
  });
  const data = dataset.map(line => {
    return Object.assign(
      line,
      {
        points: line.points.map(point =>
          addAgeToPoints(line.type, line.category, chronostrat, point)
        ),
        fill: getFill(line.type, line.category, chronostrat),
        stroke: getStroke(line.type),
        geometryType: getGeometryType(line.type)
      },
      getAge(line.category, chronostrat)
    );
  });

  return { data };
}
