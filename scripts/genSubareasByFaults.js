const debug = false;

function log(msg) {
  if (debug) {
    console.log(msg);
  }
}

/*
 * Returns undefined if intersection not found, otherwise {x, y} of that intersection point
 */
function lineIntersectionPoint(id, point, fault, force=false) {
  const {x: x1, y: y1} = fault.points[0];
  const {x: x2, y: y2} = fault.points[1];
  const {x3, x4, y3, y4} = point;
  const divisor = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
  if (divisor == 0) {
    return undefined;
  };
  const y = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4))/divisor;
  // Check if intersection is within line segments, force allows to ignore check and get line i. not just segment
  if ((y > Math.max(y1, y2) || y < Math.min(y1, y2) || y > Math.max(y3, y4) || y < Math.min(y3, y4)) && !force) {
    return undefined;
  } else {
    return {
      x: ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4))/divisor,
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
    //console.log('ERROR: wrong activity detected.');
  };
}

function generateLinesForArea(act, next) {
  if (act.y0 == act.y1 && next.y0 == next.y1) {
    return {};
  }
  const ret = {
    top: {x3: act.x, y3: act.y0, x4: next.x, y4: next.y0},
    bottom: {x3: act.x, y3: act.y1, x4: next.x, y4: next.y1}
  };
  if (act.y0 != act.y1) {
    ret.left = {x3: act.x, y3: act.y0, x4: act.x, y4: act.y1};
  }
  if (next.y0 != next.y1) {
    ret.right = {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1};
  }
  return ret;
}

function getOppositeYPoint(isect, line) {
  if (line.x3 == line.x4 && line.y3 == line.y4 && line.x3 == isect.x && line.y3 == isect.y) {
    return isect;
  }
  const fline = {points: [{x: isect.x, y: isect.y}, {x: isect.x, y: isect.y+10}]};
  return lineIntersectionPoint(9, line, fline, true);
}

function getPointSplit(point, isect) {
  return {
    top: {x: point.x, y0: point.y0, y1: isect.y},
    bottom: {x: point.x, y0: isect.y, y1: point.y1}
  }
}

function getNewPoint(point, x0, y0, y1) {
  return {
    x: x0,
    y0: Math.min(y0, y1),
    y1: Math.max(y0, y1)
  }
}

function computeSubareas(stack) {

  stack.filter(x => x.type == 'surface').map(layer => {

    let id = 0;
    layer.intersections = [];

    // init first subarea, then divide it on coliding faults
    if (!layer.hasOwnProperty('subareas')) {
      layer.subareas = [{
        id: layer.id,
        points: layer.points,
        type: layer.type
      }];
    };

    // stack.filter(x => x.type == 'fault').slice(0, 2).forEach(fault => {
    stack.filter(x => x.type == 'fault').forEach(fault => {

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
              const cuttingPoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, oppositeYPoint.y);
              const edgePoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, lineCuts['top'].y + 1);
              const {top, bottom} = getPointSplit(act, lineCuts['left']);

              leftArea.push(top);
              leftArea.push(edgePoint);
              rightArea.push(bottom);
              rightArea.push(cuttingPoint);
            } else if (lineCuts.hasOwnProperty('left') && lineCuts.hasOwnProperty('bottom')) {
              directionCheck(faultDirection, 'left');

              const oppositeYPoint = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPoint);
              const cuttingPoint = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, oppositeYPoint.y);

              const edgePoint = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, lineCuts['bottom'].y + 1);
              const {top, bottom} = getPointSplit(act, lineCuts['left']);

              leftArea.push(bottom);
              leftArea.push(edgePoint);
              rightArea.push(top);
              rightArea.push(cuttingPoint);
            } else if (lineCuts.hasOwnProperty('right') && lineCuts.hasOwnProperty('top')) {
              directionCheck(faultDirection, 'left');

              const oppositeYPoint = getOppositeYPoint(lineCuts['top'], lines['bottom']);
              layer.intersections.push(oppositeYPoint);
              const cuttingPoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, oppositeYPoint.y);
              const edgePoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, lineCuts['top'].y + 1);

              leftArea.push(act);
              leftArea.push(cuttingPoint);
              rightArea.push(edgePoint);
            } else if (lineCuts.hasOwnProperty('right') && lineCuts.hasOwnProperty('bottom')) {
              directionCheck(faultDirection, 'right');

              const oppositeYPoint = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPoint);
              const cuttingPoint = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, oppositeYPoint.y);
              const edgePoint = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, lineCuts['bottom'].y + 1);

              leftArea.push(act);
              leftArea.push(cuttingPoint);
              rightArea.push(edgePoint);
            } else if (lineCuts.hasOwnProperty('left') && lineCuts.hasOwnProperty('right')) {
              const {top, bottom} = getPointSplit(act, lineCuts['left']);
              switch (faultDirection) {
                case 'left':
                  leftArea.push(bottom);
                  rightArea.push(top);
                  break;
                case 'right':
                  leftArea.push(top);
                  rightArea.push(bottom);
                  break;
              };
            } else if (lineCuts.hasOwnProperty('top') && lineCuts.hasOwnProperty('bottom')) {

              const oppositeYPointL = getOppositeYPoint(lineCuts['bottom'], lines['top']);
              layer.intersections.push(oppositeYPointL);
              const cuttingPointL = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, oppositeYPointL.y);
              const edgePointL = getNewPoint(act, lineCuts['bottom'].x, lineCuts['bottom'].y, lineCuts['bottom'].y + 1);

              const oppositeYPointR = getOppositeYPoint(lineCuts['top'], lines['bottom']);
              const cuttingPointR = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, oppositeYPointR.y);
              const edgePointR = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, lineCuts['top'].y + 1);
              layer.intersections.push(oppositeYPointR);

              switch (faultDirection) {
                case 'left':
                  leftArea.push(cuttingPointL);
                  rightArea.push(edgePointL);
                  leftArea.push(edgePointR);
                  rightArea.push(cuttingPointR);
                  break;
                case 'right':
                  leftArea.push(cuttingPointL);
                  rightArea.push(edgePointL);
                  leftArea.push(edgePointR);
                  rightArea.push(cuttingPointR);
                  break;
                case 'straight':
                  leftArea.push(cuttingPointL);
                  rightArea.push(cuttingPointL);
                  break;
              };
            }
            wasCut = true;

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
        // TODO check the last fro cuts
        const lastPoint = subarea.points[subarea.points.length-1];
        if (lastPoint) {
          if (!wasCut) {
            leftArea.push(lastPoint);
          } else {
            // where do we push
            rightArea.push(lastPoint);
          }
        };

        if (leftArea.length > 0 && rightArea.length > 0) {
          layer.subareas.splice(
            layer.subareas.indexOf(subarea), 1,
            {
              id: subarea.id,
              points: leftArea,
              type: subarea.type
            },
            {
              id: subarea.id,
              points: rightArea,
              type: subarea.type
            }
          );
        } else if (leftArea.length > 0) {
          layer.subareas.splice(layer.subareas.indexOf(subarea),  1, {
            id: subarea.id,
            points: leftArea,
            type: subarea.type
          });
        } else if (rightArea.length > 0) {
          layer.subareas.splice(layer.subareas.indexOf(subarea),  1, {
            id: subarea.id,
            points: rightArea,
            type: subarea.type
          });
        }
      })
    });
    // log(layer.intersections);
  });

  stack.filter(x => x.type == 'surface').map(layer => {
    let index = 0;
    return layer.subareas.map(subarea => {
      subarea.id = subarea.id + '-' + index;
      subarea.order = index;
      index++;
      return subarea;
    })
  })

  // stack.filter(x => x.type == 'surface').map(layer => {
  //   layer.subareas.map(subarea => {
  //     console.log(subarea);
  //   });
  // })

  log('done that');
  return stack;
}

module.exports = (stack) => {

  // return computeSubareas(stack);
  try {
    return computeSubareas(stack);
  } catch (e) {
    console.error(e);
  }
};
