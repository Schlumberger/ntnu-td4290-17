module.exports.addAgeToPoints = (type, category, chronostrat, point) => {
  if (type === 'fault') return point;

  const age = chronostrat[category].age;

  point.minAge = age[0];
  point.maxAge = age[1];

  return point;
};

module.exports.getStroke = type => {
  switch (type) {
    case 'layer':
      return 'white';
    case 'fault':
      return 'black';
    default:
      return 'black';
  }
};

module.exports.getFill = (type, period, chronostrat) => {
  switch (type) {
    case 'layer':
      return period in chronostrat ? chronostrat[period].color : 'black';
    case 'fault':
      return 'none';
    default:
      return 'none';
  }
};

module.exports.getGeometryType = type => {
  switch (type) {
    case 'layer':
      return 'area';
    case 'fault':
      return 'line';
    default:
      return 'line';
  }
};
