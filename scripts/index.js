const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');

svgToJson(res => {
  stackLayers(res);
});
