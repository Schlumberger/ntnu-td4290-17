import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

// A function for taking several state dependencies and computing an output
// It is used to get complex logic out of the components
// Advanced stuff, not super important
export default compute(state`figure`, figure => {
  switch (figure) {
    case 'rect':
      return [
        {
          color: 'blue',
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 100
            },
            {
              x: 100,
              y: 100
            },
            {
              x: 100,
              y: 0
            }
          ]
        }
      ];

    case 'tri':
      return [
        {
          color: 'green',
          points: [
            {
              x: 50,
              y: 0
            },
            {
              x: 0,
              y: 100
            },
            {
              x: 100,
              y: 100
            },
            {
              x: 50,
              y: 0
            }
          ]
        }
      ];

    case 'line':
      return [
        {
          color: 'red',
          points: [
            {
              x: 50,
              y: 0
            },
            {
              x: 50,
              y: 0
            },
            {
              x: 50,
              y: 100
            },
            {
              x: 50,
              y: 100
            }
          ]
        }
      ];

    default:
  }
});
