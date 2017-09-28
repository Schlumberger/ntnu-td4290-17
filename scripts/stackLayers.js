const STEPS = 300;

const findXDimentions = data => {
  const max = Math.max(
    ...data.map(layer => Math.max(...layer.points.map(point => point.x)))
  );
  const min = Math.min(
    ...data.map(layer => Math.min(...layer.points.map(point => point.x)))
  );
  return { min, max, span: max - min };
};

module.exports = data => {
  const layers = data.filter(d => d.type === 'surface');

  const { max, min, span } = findXDimentions(layers);

  const stepSize = span / STEPS;

  for (let x = min; x < max; x += stepSize) {
    console.log(x);
  }
};
