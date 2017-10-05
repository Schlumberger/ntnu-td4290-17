//areas given with vertically symmetrical points,
//faults given as two points
module.exports = (layers, faults) => {
  // var res = {
  //   layers: [
  //     props..
  //     points: {
  //       points: [{x,y}]
  //     }
  //   ]
  // }
  //
  // var res = [
  //     props..
  //     subareas: [{
  //       subarea_props..
  //       points: []{x,y}]
  //     }]
  //   ]

  console.log('divide by faults script');

  console.log(layers);

  //map original areas to
  layers.map(l => {
    l.points = l.points.map(p => {
      faults.forEach(f => {
        if (faultCutsLayer(l, f)) {
          lineSegmentsDivide(p, f);
        }
      });
    });
  });
};

const faultCutsLayer = (layer, fault) => {
  return true;
};

//returns an object containing the linesegment of the original line before and after the cut.
const lineSegmentsDivide = (origLinePoints, divideLine) => {
  //now splitting on the averaged x-position on the divide line.
  const divideOnX = (divideLine[0].x + divideLine[1].x) / 2;

  for (i = 0; i < origLinePoints.length; i++) {
    if (origLinePoints[i].x > divideOnX) {
      //we are now at a point after our fault cut.
      return {
        precut: origLinePoints.slice(0, i), //to i, not including
        postcut: origLinePoints.slice(i, origLinePoints.length)
      };
    }
  }
};
