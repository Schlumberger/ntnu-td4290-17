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
  // console.log(next);
  return {
    left: {x3: act.x, y3: act.y0, x4: act.x, y4: act.y1},
    right: {x3: next.x, y3: next.y0, x4: next.x, y4: next.y1},
    top: {x3: act.x, y3: act.y0, x4: next.x, y4: next.y0},
    bottom: {x3: act.x, y3: act.y1, x4: next.x, y4: next.y1}
  };
}

function getOppositeYPoint(isect, line) {
  const fline = {points: [{x: isect.x, y: isect.y}, {x: isect.x, y: isect.y+10}]};
  return lineIntersectionPoint(9, line, fline, true);
}

function getPointSplit(point, isect) {
  return {
    top: {x: point.x, y0: point.y0, y1: isect.y, age0: point.age0, age1: point.age1},
    bottom: {x: point.x, y0: isect.y, y1: point.y1, age0: point.age0, age1: point.age1}
  }
}

function getNewPoint(point, x0, y0, y1) {
  return {
    x: x0,
    y0: Math.min(y0, y1),
    y1: Math.max(y0, y1),
    age0: point.age0,
    age1: point.age1
  }
}

//areas given with vertically symmetrical points,
//faults given as two points
module.exports = (stack) => {

  const layers = [];
  const faults = [];

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
              const cuttingPoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, oppositeYPoint.y);
              const edgePoint = getNewPoint(act, lineCuts['top'].x, lineCuts['top'].y, lineCuts['top'].y + 1);
              const {top, bottom} = getPointSplit(act, lineCuts['left']);

              // console.log('cepe');
              // console.log(cuttingPoint);

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
              // console.log(edgePoint);
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
    console.log(layer);
  })

  stack.forEach(x => {
    if (x.type == 'surface') {
      console.log(x);
    }
  })

  return stack;
};
