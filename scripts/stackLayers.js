const STEPS = 300;
const MULT = 1000;

const findXDimentions = data => {
  const max = Math.max(
    ...data.map(layer => Math.max(...layer.points.map(point => point.x)))
  );
  const min = Math.min(
    ...data.map(layer => Math.min(...layer.points.map(point => point.x)))
  );
  return { min: min * MULT, max: max * MULT, span: max * MULT - min * MULT };
};

const getPoints = (x, layerIndex, data) => {
  // For every point in the layer
  for (let i = 0; i < data[layerIndex].points.length; i++) {
    // If the x-value of the point is higher than our x-value
    if (data[layerIndex].points[i].x * MULT >= x) {
      if (data[layerIndex].points[i].x * MULT === x)
        return { x: x, y: Math.floor(data[layerIndex].points[i].y * MULT) };
      if (i === 0) return false;

      const after = data[layerIndex].points[i];
      const before = data[layerIndex].points[i - 1];
      const deltaX = (after.x - before.x) * MULT;
      const deltaY = (after.y - before.y) * MULT;
      const progressX = x - before.x * MULT;
      const y = Math.floor(before.y * MULT + deltaY * (progressX / deltaX));

      return { x, y };
    }
  }

  return false;
};

module.exports = data => {
  const layers = data.filter(d => d.type === 'surface');
  const faults = data.filter(d => d.type === 'fault').map(fault => {
    return Object.assign(fault, {
      points: fault.points.map(point => {
        return { x: Math.floor(point.x * MULT), y: Math.floor(point.y * MULT) };
      })
    });
  });

  const { max, min, span } = findXDimentions(layers);
  const stepSize = span / STEPS;

  const newData = [];

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const points = [];

    for (let x = min; x <= max; x += stepSize) {
      points.push(getPoints(Math.floor(x), i, data));
    }

    newData.push(Object.assign(layer, { points: points.filter(p => p) }));
  }

  console.log(JSON.stringify(newData.concat(faults), null, 2));
  return data;
};
