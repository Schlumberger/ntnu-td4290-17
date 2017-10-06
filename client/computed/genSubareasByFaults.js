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
    pairwise(layer.points, (first, next) => {
      let lines = [
        {x3: first.x, y3: first.y0, x4: first.x, y4: first.y1},
        {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1},
        {x3: first.x, y3: first.y0, x4: next.x, y4: next.y0},
        {x3: first.x, y3: first.y1, x4: next.x, y4: next.y1}
      ];
      // console.log(lines);
      faults.forEach(fault => {
        lines.forEach(line => {
          let intersection = lineIntersectionPoint(id, line, fault);
          if (intersection) {
            layer.intersections.push(intersection);
            id++;
          }
        });
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
