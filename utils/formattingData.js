module.exports.addAgeToPoints = (
  type,
  category,
  chronostrat,
  point,
  maxHeight,
  unconform
) => {
  if (type === 'fault') return point;

  const age = chronostrat[category].age;

  point.minAge = age[0];
  point.maxAge = age[1];

  console.log(unconform);
  if (unconform) {
    const ageDiff = age[1] - age[0];
    const height = Math.abs(point.height);

    point.age0 = age[0];
    point.age1 = Math.min(age[0] + ageDiff * (height / maxHeight || 1), age[1]);
  } else {
    point.age0 = age[0];
    point.age1 = age[1];
  }
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
      return category;
    }
  }
  if (id.indexOf('seabed')) return 'seabed';
  return null;
};

module.exports.getMaxHeightByCategory = (data, category) => {
  return Math.max(
    0,
    ...(data || [])
      .filter(d => d.category && d.category === category)
      .map(data => Math.max(0, ...data.points.map(point => point.height)))
  );
};

module.exports.checkUnconformity = (category, unconformities) => {
  for (let place of Object.keys(unconformities)) {
    var placeString = place.toString();
    if (category.toString() == placeString.slice(5)) {
      return true;
    } else {
      return false;
    }
  }
};
