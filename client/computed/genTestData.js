module.exports = () => {
  const mul = 1000;
  const testLayers = [
    {
      category: 'carboniferous',
      fill: '#218e93',
      geometryType: 'area',
      id: 'base-carboniferous',
      age0: 358.9,
      age1: 298.9,
      stroke: 'white',
      type: 'layer',
      points: [
        {
          x: 0 * mul,
          y0: 10 * mul,
          y1: 30 * mul,
          age0: 30,
          age1: 30
        },
        {
          x: 30 * mul,
          y0: 7 * mul,
          y1: 45 * mul,
          age0: 40,
          age1: 40
        },
        {
          x: 60 * mul,
          y0: 30 * mul,
          y1: 37 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 90 * mul,
          y0: 26 * mul,
          y1: 40 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 120 * mul,
          y0: 18 * mul,
          y1: 45 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 150 * mul,
          y0: 26 * mul,
          y1: 40 * mul,
          age0: 50,
          age1: 50
        }
      ]
    },
    {
      category: 'something',
      fill: '#818e13',
      geometryType: 'area',
      id: 'base-something',
      age1: 358.9,
      age0: 298.9,
      stroke: 'white',
      type: 'layer',
      points: [
        {
          x: 0 * mul,
          y0: 30 * mul,
          y1: 60 * mul,
          age0: 30,
          age1: 30
        },
        {
          x: 30 * mul,
          y0: 45 * mul,
          y1: 60 * mul,
          age0: 40,
          age1: 40
        },
        {
          x: 60 * mul,
          y0: 37 * mul,
          y1: 60 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 90 * mul,
          y0: 40 * mul,
          y1: 60 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 120 * mul,
          y0: 45 * mul,
          y1: 60 * mul,
          age0: 50,
          age1: 50
        },
        {
          x: 150 * mul,
          y0: 40 * mul,
          y1: 60 * mul,
          age0: 50,
          age1: 50
        }
      ]
    }
  ];

  const testFaults = [
    {
      category: 'Seabed',
      fill: 'none',
      geometryType: 'line',
      id: 'fault-14',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'black',
      type: 'fault',
      points: [
        {
          x: 15 * mul,
          y: 5 * mul
        },
        {
          x: 81 * mul,
          y: 50 * mul
        }
      ]
    },
    {
      category: 'Seabed',
      fill: 'none',
      geometryType: 'line',
      id: 'fault-15',
      maxAge: 358.9,
      minAge: 298.9,
      stroke: 'black',
      type: 'fault',
      points: [
        {
          x: 96 * mul,
          y: 5 * mul
        },
        {
          x: 90 * mul,
          y: 40 * mul
        }
      ]
    }
  ];

  return {
    testLayers: testLayers,
    testFaults: testFaults
  };
};
