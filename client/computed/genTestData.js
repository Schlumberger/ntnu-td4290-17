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
          x: 30,
          y0: 7,
          y1: 45,
          minAge: 40,
          maxAge: 40
        },
        {
          x: 60,
          y0: 30,
          y1: 37,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 90,
          y0: 26,
          y1: 40,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 120,
          y0: 18,
          y1: 45,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 150,
          y0: 26,
          y1: 40,
          minAge: 50,
          maxAge: 50
        }
      ]
    },
    {
      category: 'something',
      fill: '#818e13',
      geometryType: 'area',
      id: 'base-something',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'white',
      type: 'layer',
      points: [
        {
          x: 0,
          y0: 30,
          y1: 60,
          minAge: 30,
          maxAge: 30
        },
        {
          x: 30,
          y0: 45,
          y1: 60,
          minAge: 40,
          maxAge: 40
        },
        {
          x: 60,
          y0: 37,
          y1: 60,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 90,
          y0: 40,
          y1: 60,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 120,
          y0: 45,
          y1: 60,
          minAge: 50,
          maxAge: 50
        },
        {
          x: 150,
          y0: 40,
          y1: 60,
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
          x: 15,
          y: 5
        },
        {
          x: 81,
          y: 50
        }
      ]
    },
    {
      fill: 'none',
      geometryType: 'line',
      id: 'fault-15',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'black',
      type: 'fault',
      points: [
        {
          x: 96,
          y: 5
        },
        {
          x: 90,
          y: 40
        }
      ]
    }
  ];

  return {
    testLayers: testLayers,
    testFaults: testFaults
  };
};
