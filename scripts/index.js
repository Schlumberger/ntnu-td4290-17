const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');

module.exports = svgToJson().then(json => stackLayers(json));
