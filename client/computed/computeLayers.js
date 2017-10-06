import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// Select if layers is going to be rendered
export default compute(
  state`formattedData`,
  state`settings.visibility.layers`,
  (data = [], visibility) => {
    if (!visibility) return [];
    return data.filter(d => d.type === 'surface').reverse();
  }
);
