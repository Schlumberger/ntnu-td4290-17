module.exports.addAgeToPoints = (type, category, chronostrat, point) => {
  if (type === 'fault') return point;

  const age = chronostrat[category].age;

  point.minAge = age[0];
  point.maxAge = age[1];

  return point;
};

module.exports.getAge = (category, chronostrat) => {
  const age = category in chronostrat ? chronostrat[category].age : [0, 0];

  const minAge = age[0];
  const maxAge = age[1];
  return { minAge, maxAge };
};

module.exports.getStroke = type => {
  switch (type) {
    case 'surface':
      return 'white';
    case 'fault':
      return 'black';
    default:
      return 'black';
  }
};

module.exports.getFill = (type, period, chronostrat) => {
  switch (type) {
    case 'surface':
      return period in chronostrat ? chronostrat[period].color : 'black';
    case 'fault':
      return 'none';
    default:
      return 'none';
  }
};

module.exports.getGeometryType = type => {
  switch (type) {
    case 'surface':
      return 'area';
    case 'fault':
      return 'line';
    default:
      return 'line';
  }
};

module.exports.getCategory = (id, chronostrat) => {
  for (let category of Object.keys(chronostrat)) {
    if (id.indexOf(category) >= 0) {
      console.log(category);
      return category;
    }
  }
  return 'seabed';
};
