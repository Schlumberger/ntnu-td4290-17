const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');

/*svgToJson(res => {
  stackLayers(res);
});*/
stackLayers([
  {
    type: 'surface',
    points: [
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      }
    ]
  }
]);
