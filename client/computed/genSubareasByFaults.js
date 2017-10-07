/*
 * Returns undefined if intersection not found, otherwise {x, y} of that intersection point
 */
function lineIntersectionPoint(id, point, fault) {
  let {x: x1, y: y1} = fault.points[0];
  let {x: x2, y: y2} = fault.points[1];
  // let {x: x3, x: x4, y0: y3, y1: y4} = point;
  let {x3, x4, y3, y4} = point;
  let y = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4));
  if (y > Math.max(y3, y4) || y < Math.min(y3, y4)) {
    return undefined;
  } else {
    return {
      x: ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)),
      y: y,
      id: id,
    }
  }
}

function pairwise(arr, func) {
    for(var i=0;i<arr.length-1;i++){
        func(arr[i], arr[i+1])
    }
}

function faultDirection(fault) {
  let x1 = fault.points[0].x;
  let x2 = fault.points[1].x;
  if (x1 === x2) {
    return 'straight';
  } else {
    return x1 < x2 ? 'left' : 'right';
  }
}

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

  layers.forEach(layer => {
    let id = 0;
    layer.intersections = [];

    // Iterating over layer by small pieces
    // Pieces that intersect with faults get divided
    pairwise(layer.points, (act, next) => {
      let lines = {
        left: {x3: act.x, y3: act.y0, x4: act.x, y4: act.y1},
        right: {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1},
        top: {x3: act.x, y3: act.y0, x4: next.x, y4: next.y0},
        bottom: {x3: act.x, y3: act.y1, x4: next.x, y4: next.y1}
      };

      faults.forEach(fault => {
        let lineCuts = {};
        for (var key in lines) {
          let intersection = lineIntersectionPoint(id, lines[key], fault);
          if (intersection) {
            layer.intersections.push(intersection);
            lineCuts[key] = intersection;
            id++;
          }
        };

        if (Object.keys(lineCuts).length !== 0) {
          console.log(lineCuts);
        } else {
          console.log('no intersections');
        }
      });

      // console.log(layer.intersections);
    })
    // layer.points.forEach(point => {
    //   faults.forEach(fault => {
    //     //Find intersection
    //     let intersection = lineIntersectionPoint(id++, point, fault);
    //     if (intersection) {
    //       layer.intersections.push(intersection);
    //     }
    //   })
    // })

  })

  //map original areas to
  // layers.map(l => {
  //   faults.forEach(f => {
  //     if (faultCutsLayer(l, f)) {
  //       const layerPoints = l.points;
  //       const faultPoints = f.points;
  //       const { firstPart, secondPart } = lineSegmentsDivide(
  //         layerPoints,
  //         faultPoints
  //       );
  //       if (firstPart != null) {
  //         l.subareas = [
  //           {
  //             points: firstPart
  //           },
  //           {
  //             points: secondPart
  //           }
  //         ];
  //       }
  //     }
  //   });
  //
  //   return l;
  // });
};

const faultCutsLayer = (layer, fault) => {
  return true;
};

//returns an object containing the linesegment of the original line before and after the cut.
const lineSegmentsDivide = (origLinePoints, divideLinePoints) => {
  //console.log(origLinePoints);
  //console.log(divideLinePoints);

  //now splitting on the averaged x-position on the divide line.
  const divideOnX = (divideLinePoints[0].x + divideLinePoints[1].x) / 2;

  for (let i = 0; i < origLinePoints.length; i++) {
    console.log('divideX, lineX: ' + divideOnX + ' ' + origLinePoints[i].x);

    if (origLinePoints[i].x > divideOnX) {
      //we are now at a point after our fault cut.
      return {
        firstPart: origLinePoints.slice(0, i), //to i, not including
        secondPart: origLinePoints.slice(i, origLinePoints.length)
      };
    }
  }
  console.log('lines did not intersect');
  return { firstPart: null, secondPart: null };
};
