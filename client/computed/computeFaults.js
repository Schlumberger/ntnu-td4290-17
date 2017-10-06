import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// Select if faults is going to be rendered
export default compute(
  state`formattedData`,
  state`settings.visibility.faults`,
  state`settings.yAxisUnit`,
  (data = [], visibility, yAxis) => {
    if (!visibility || yAxis === 'age') return [];
    return data.filter(d => d.type === 'fault');
  }
);
