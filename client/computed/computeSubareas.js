import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// Select if layers is going to be rendered
export default compute(
  state`formattedData`,
  state`settings.visibility.subareas`,
  (data = [], visibility) => {
    if (!visibility) return [];
    return [].concat.apply([], data.filter(d => d.type === 'surface').map(layer => {
      layer.subareas = layer.subareas.filter(s => s.points != undefined).map(subarea => {
        if (subarea.points) {
          subarea.fill = '#ffffff';
          subarea.stroke = '#000000';
          subarea.minAge = layer.minAge;
          subarea.maxAge = layer.maxAge;
          subarea.geometryType = 'area';
          return subarea;
        } else {
          console.log('jbmnt');
        }
      })
      return layer.subareas
    })).reverse();
  }
);
