import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

function ColorLuminance (hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

function getColor (x = 0.1) {
  return -x;
}

// Select if layers is going to be rendered
export default compute(
  state`formattedData`,
  // state`settings.visibility.subareas`,
  (data = [], visibility) => {
    // if (!visibility) return [];
    return [].concat
      .apply(
        [],
        data.filter(d => d.type === 'surface' && d.hasOwnProperty('subareas')).map(layer => {
          var lum = getColor();
          layer.subareas = layer.subareas
            .filter(s => s.points != undefined)
            .map(subarea => {
              lum = getColor(lum);
              // console.log(lum);

              if (subarea.points) {
                subarea.fill = ColorLuminance(layer.fill, lum);
                subarea.stroke = '#000000';
                subarea.minAge = layer.minAge;
                subarea.maxAge = layer.maxAge;
                subarea.geometryType = 'area';
                return subarea;
              } else {
                console.log('jbmnt');
              }
            });
          return layer.subareas;
        })
      )
      .reverse();
  }
);
