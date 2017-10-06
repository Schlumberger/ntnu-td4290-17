import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// Finds maxWidth and maxHeight
export default compute(
  state`formattedData`,
  state`settings.yAxisUnit`,
  (data = [], yAxis) => {
    const maxWidth = Math.max(
      0,
      ...data.map(el => Math.max(...el.points.map(p => p.x)))
    );

    const maxHeight = Math.max(
      0,
      ...data.map(el =>
        Math.max(
          ...el.points.map(p => (yAxis === 'depth' ? p.y : p.maxAge || 0))
        )
      )
    );
    return { maxWidth, maxHeight };
  }
);
