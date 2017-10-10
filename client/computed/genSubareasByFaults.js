/*
 * Returns undefined if intersection not found, otherwise {x, y} of that intersection point
 */
function lineIntersectionPoint(id, point, fault, force=false) {
  const {x: x1, y: y1} = fault.points[0];
  const {x: x2, y: y2} = fault.points[1];
  // let {x: x3, x: x4, y0: y3, y1: y4} = point;
  const {x3, x4, y3, y4} = point;
  const y = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4));
  // if (y > Math.max(y3, y4) || y < Math.min(y3, y4)) {
  if ((y > Math.max(y1, y2) || y < Math.min(y1, y2) || y > Math.max(y3, y4) || y < Math.min(y3, y4)) && !force) {
    return undefined;
  } else {
    return {
      x: ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)),
      y: y,
      id: id,
    }
  }
}

function getOppositeYPoint(isect, line) {
  const fline = {points: [{x: isect.x, y: isect.y}, {x: isect.x, y: isect.y+10}]};
  return lineIntersectionPoint(9, line, fline, true);
}

function pairwise(arr, func) {
    for(var i=0;i<arr.length-1;i++){
        func(arr[i], arr[i+1])
    }
}

function getFaultDirection(fault) {
  let x1 = fault.points[0].x;
  let x2 = fault.points[1].x;
  if (x1 === x2) {
    return 'straight';
  } else {
    return x1 < x2 ? 'left' : 'right';
  }
}

function directionCheck(value, cond) {
  if (value !== cond) {
    console.log('ERROR: wrong activity detected.');
  };
}

function generateLinesForArea(act, next) {
  return {
    left: {x3: act.x, y3: act.y0, x4: act.x, y4: act.y1},
    right: {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1},
    top: {x3: act.x, y3: act.y0, x4: next.x, y4: next.y0},
    bottom: {x3: act.x, y3: act.y1, x4: next.x, y4: next.y1}
  };
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

    // init first subarea, then divide it on coliding faults
    if (!layer.hasOwnProperty('subareas')) {
      layer.subareas = [
        {id: layer.id+'-0', points: layer.points},
      ];
    };
    // console.log(layer);



    faults.forEach(fault => {
      // Subareas that area divided area stored as temp
      // let tempArea;
      // let subCount = layer.subareas.length;  // ?!
      let faultDirection = getFaultDirection(fault);

      layer.subareas.forEach(subarea => {
        let leftArea = [];
        let rightArea = [];
        let wasCut = false; // if area was cut, other subareas will be pushed to the rightArea

        // console.log(subarea);
        pairwise(subarea.points, (act, next) => {
          let lines = generateLinesForArea(act, next);

          let lineCuts = {};
          for (var key in lines) {
            let intersection = lineIntersectionPoint(id, lines[key], fault);
            if (intersection) {
              layer.intersections.push(intersection);
              lineCuts[key] = intersection;
              id++;
            };
          };

          if (Object.keys(lineCuts).length !== 0) {
            // Straight fault cutting the layer directly over area line should be tested
            if (lineCuts.hasOwnProperty('left') && lineCuts.hasOwnProperty('top')) {
              directionCheck(faultDirection, 'right');

              const oppositeYPoint = getOppositeYPoint(lineCuts['top'], lines['bottom']);
              layer.intersections.push(oppositeYPoint);
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            } else if (lineCuts.hasOwnProperty('left') && lineCuts.hasOwnProperty('bottom')) {
              directionCheck(faultDirection, 'left');

              const oppositeYPoint = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPoint);
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            } else if (lineCuts.hasOwnProperty('right') && lineCuts.hasOwnProperty('top')) {
              directionCheck(faultDirection, 'left');

              const oppositeYPoint = getOppositeYPoint(lineCuts['top'], lines['bottom']);
              layer.intersections.push(oppositeYPoint);
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            } else if (lineCuts.hasOwnProperty('right') && lineCuts.hasOwnProperty('bottom')) {
              directionCheck(faultDirection, 'right');

              const oppositeYPoint = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPoint);
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            } else if (lineCuts.hasOwnProperty('left') && lineCuts.hasOwnProperty('right')) {
              switch (faultDirection) {
                case 'left':
                  // Two additional points
                  break;
                case 'right':
                  // Two additional points
                  break;
                case 'straight':
                  // one additional point
                  break;
              };
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            } else if (lineCuts.hasOwnProperty('top') && lineCuts.hasOwnProperty('bottom')) {

              const oppositeYPointL = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPointL);

              const oppositeYPointR = getOppositeYPoint(lineCuts['top'], lines['bottom']);
              layer.intersections.push(oppositeYPointR);

              switch (faultDirection) {
                case 'left':
                  // Two additional points
                  break;
                case 'right':
                  // Two additional points
                  break;
                case 'straight':
                  // one additional point
                  break;
              };
              if (!wasCut) {
                leftArea.push(act);
              } else {
                // where do we push
                rightArea.push(act);
              }
            }
            wasCut = true;

            // console.log(Object.keys(lineCuts));
            // TODO Detect new subareas based on intersections

          } else {
            // console.log('no intersections');
            if (!wasCut) {
              leftArea.push(act);
            } else {
              // where do we push
              rightArea.push(act);
            }
          };

          // tempArea = subarea;
        });
        if (!wasCut) {
          leftArea.push(subarea.points[subarea.points.length-1]);
        } else {
          // where do we push
          rightArea.push(subarea.points[subarea.points.length-1]);
        }
        // tempSubareas
        // console.log(leftArea);
        // console.log(rightArea);
        // console.log(layer.subareas);
        if (rightArea.length > 0) {
          layer.subareas.splice(
            layer.subareas.indexOf(subarea),
            1,
            {id: subarea.id+'0', points: leftArea},
            {id: subarea.id+'1', points: rightArea}
          );
        } else {
          layer.subareas.splice(layer.subareas.indexOf(subarea),  1, {id: subarea.id, points: leftArea});
        }
      })

      // TODO layer.subareas = tempSubareas // maybe some condition?
    });
    console.log(layer.subareas);
  })
    // Iterating over layer by small pieces
    // Pieces that intersect with faults get divided
    // pairwise(layer.points, (act, next) => {
    //   let lines = {
    //     left: {x3: act.x, y3: act.y0, x4: act.x, y4: act.y1},
    //     right: {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1},
    //     top: {x3: act.x, y3: act.y0, x4: next.x, y4: next.y0},
    //     bottom: {x3: act.x, y3: act.y1, x4: next.x, y4: next.y1}
    //   };
    //
    //   faults.forEach(fault => {
    //     let lineCuts = {};
    //     for (var key in lines) {
    //       let intersection = lineIntersectionPoint(id, lines[key], fault);
    //       if (intersection) {
    //         layer.intersections.push(intersection);
    //         lineCuts[key] = intersection;
    //         id++;
    //       }
    //     };
    //
    //     if (Object.keys(lineCuts).length !== 0) {
    //       console.log(Object.keys(lineCuts));
    //     } else {
    //       console.log('no intersections');
    //     }
    //   });
    //
    //   // console.log(layer.intersections);
    // })



    // layer.points.forEach(point => {
    //   faults.forEach(fault => {
    //     //Find intersection
    //     let intersection = lineIntersectionPoint(id++, point, fault);
    //     if (intersection) {
    //       layer.intersections.push(intersection);
    //     }
    //   })
    // })


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
