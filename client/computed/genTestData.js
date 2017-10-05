module.exports = () => {
  const testLayers = [
    {
      category: 'carboniferous',
      fill: '#218e93',
      geometryType: 'area',
      id: 'base-carboniferous',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'white',
      type: 'layer',
      points: [
        {
          x: 0,
          y0: 10,
          y1: 30,
          minAge: 30,
          maxAge: 30
        },
        {
          x: 10,
          y0: 7,
          y1: 45,
          minAge: 40,
          maxAge: 40
        },
        {
          x: 20,
          y0: 30,
          y1: 37,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 30,
          y0: 26,
          y1: 50,
          minAge: 50,
          maxAge: 50
        }
      ]
    }
  ];

  const testFaults = [
    {
      fill: 'none',
      geometryType: 'line',
      id: 'fault-14',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'black',
      type: 'fault',
      points: [
        {
          x: 5,
          y: 0
        },
        {
          x: 17,
          y: 50
        }
      ]
    }
  ];

  return {
    testLayers: testLayers,
    testFaults: testFaults
  };
};
