import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// Select if layers is going to be rendered
export default compute(
  state`formattedData`,
  state`settings.visibility.intersects`,
  (data = [], visibility) => {
    if (!visibility) return [];
    return [].concat.apply(
      [],
      data.filter(d => d.type === 'surface').map(x => {
        return x.hasOwnProperty('intersections') ? x.intersections : [];
      })
    );
  }
);
