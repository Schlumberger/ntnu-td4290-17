const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');

svgToJson(res => {
  stackLayers(res);
});
/*
stackLayers([
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 10
      },
      {
        x: 200,
        y: 10
      }
    ]
  },
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 20
      },
      {
        x: 200,
        y: 20
      }
    ]
  },
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 30
      },
      {
        x: 100,
        y: 30
      }
    ]
  }
]);*/
