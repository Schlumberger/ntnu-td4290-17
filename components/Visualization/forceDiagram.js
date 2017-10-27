import { select, event } from 'd3-selection';
import {} from 'd3-transition';
import { line, area, circle, curveBasis } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import {
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide,
  forceManyBody
} from 'd3-force';
import { polygonCentroid } from 'd3-polygon';

const margins = {
  top: 35,
  bottom: 0,
  left: 0,
  right: 0
};
export const create = (el, props, state) => {
  const svg = select(el);
  // svg.append('g').attr('id', 'layers');
  svg.append('g').attr('id', 'subareas');
  svg.append('g').attr('id', 'nodes');
  svg.append('g').attr('id', 'links');
  // svg.append('g').attr('id', 'faults');
  // svg.append('g').attr('id', 'intersections');

  update(el, props, state);
};

export const update = (el, props, state) => {
  const { width, height } = state;
  const {
    // faults = [],
    // layers = [],
    // intsctns = [],
    subareas = [],
    dimentions = { maxWidth: 0, maxHeight: 0 },
    diagramOption = 'depth',
    onLayerClicked
  } = props;

  console.log(props);
  console.log(width.toString() + '  ' + height.toString());

  const areaGenerator = area()
    .x(d => xScale(d.x))
    .y0(d => yScale(d.y0))
    .y1(d => yScale(d.y1))
    // makes interpolate of the form curveCardinal
    .curve(curveBasis);

  // Select how to scale values to x positions
  const xScale = scaleLinear()
    .domain([0, dimentions.maxWidth])
    .range([margins.left, width - margins.right]);

  // Select how to scale values to y positions
  const yScale = scaleLinear()
    .domain([0, dimentions.maxHeight])
    .range([margins.top, height - margins.bottom]);

  // Select the svg
  const svg = select(el)
    .attr('width', width)
    .attr('height', height);

  // create simualtion nodes
  const nodes = createNodes(subareas, xScale, yScale);

  console.log(nodes);

  // create simulation links
  const links = createLinksByNodes(nodes, xScale, yScale);

  console.log(
    'subareas skipped: ' + (subareas.length - nodes.length).toString()
  );

  const updateSubareas = svg
    .select('g#subareas')
    .selectAll('.node')
    .data(nodes, d => d.id);

  // Add new text-elements if nessescary

  const enterSubareas = updateSubareas
    .enter()
    .append('path')
    .attr('opacity', 0)
    .on('click', (d, ...args) => {
      onLayerClicked({ info: d });
      event.stopPropagation();
    });

  // Remove if too many
  updateSubareas
    .exit()
    .transition()
    .duration(500)
    .attr('opacity', 0)
    .remove();

  // Update the properties of all elements
  updateSubareas
    .merge(enterSubareas)
    .attr('opacity', 1)
    .attr('d', d => areaGenerator(d.points))
    .attr('fill', d => d.fill);

  // create visual links
  const link = svg
    .select('g#links')
    .selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', '#999')
    .attr('stroke-width', '1.5px');

  // create visual nodes
  const node = svg
    .select('g#nodes')
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 5)
    .attr('fill', '#000');

  const simTick = e => {
    // update visualized nodes
    node.attr('cx', d => d.x).attr('cy', d => d.y);

    // update visualized subareas by setting the translate attribute
    enterSubareas.attr('transform', d => {
      return (
        'translate(' +
        (d.x - d.scaledStartPos.x) +
        ',' +
        (d.y - d.scaledStartPos.y) +
        ')'
      );
    });

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  };

  createSimulation(nodes, links, simTick);
};

const createSimulation = (nodes, links, tickFunc) => {
  // find min and max area
  const minArea = nodes.reduce(
    (acc, currVal) => (acc = Math.min(acc, currVal.area)),
    Infinity
  );
  const maxArea = nodes.reduce(
    (acc, currVal) => (acc = Math.max(acc, currVal.area)),
    0
  );

  // create a scale mapping from sublayer area to force strength
  const areaForceScale = scaleLinear()
    .domain([minArea, maxArea])
    .range([0, 30]);

  // create a scale mapping from area to force distance
  const areaForceDistScale = scaleLinear()
    .domain([minArea, maxArea])
    .range([50, 700]);

  return (
    forceSimulation(nodes)
      .alphaDecay(0) // simulation will never stop
      // .force('bounding', d => forceCollide().radius(d => d.r))
      // .force('bounding', forceCollide().radius(d => d.r))

      // simulate a collision force
      .force(
        'repulse by area size',
        forceManyBody()
          .strength(d => {
            const f = areaForceScale(d.area); // negative to repel
            console.log(f);
            return -f;
          })
          .distanceMax(d => areaForceDistScale(d))
      )
      .force(
        'link',
        forceLink(links)
          .id(d => d.id)
          .distance(d => d.prefDist) // to make nodes attract each other to a prefferred distance
          .strength(d => 0.5)
      )
      .on('tick', tickFunc)
  );
};

const createNodes = (subareas, xScale, yScale) => {
  const nodes = [];
  subareas.forEach(layer => {
    let category = layer.category;

    layer.subareas.forEach(sub => {
      // set x and y values to the center of the object. And scale it to the right size
      // sub.scaledCenter = { x: xScale(sub.center.x), y: yScale(sub.center.y) };

      // set the category of the node
      sub.category = category;

      // scale x and y, and add the center coords
      const { x: x0, y0 } = sub.points[0];
      sub.x = xScale(sub.center.x);
      sub.y = yScale(sub.center.y);

      // add a scaled start
      sub.scaledStartPos = { x: sub.x, y: sub.y };

      nodes.push(sub);
    });
  });
  return nodes;
};

const createLinksByNodes = (nodes, xScale, yScale) => {
  const links = [];
  const nodeCategories = {};

  for (let i = 0; i < nodes.length - 1; i++) {
    const currNode = nodes[i];

    // if other nodes of the same category exists, create a link between this and the last of them (neighbour).
    // then add this node to that category mapping
    // if another node doesnt exist, add an array with the currNode to the given category
    if (nodeCategories.hasOwnProperty(currNode.category)) {
      const srcN = currNode;
      const tarN = nodeCategories[currNode.category][0];

      // calculate the preferred distance between the layers
      const srcLen = srcN.points[srcN.points.length - 1].x - srcN.points[0].x;
      const tarLen = tarN.points[tarN.points.length - 1].x - tarN.points[0].x;
      const distBetween = xScale(Math.abs(srcLen * 0.5 + tarLen * 0.5));

      links.push({
        source: srcN.id,
        target: tarN.id,
        prefDist: distBetween
      });

      nodeCategories[currNode.category].unshift(currNode);
    } else {
      nodeCategories[currNode.category] = [currNode];
    }

    // let currSublayerName = nodes[i].id;
    // let nextSublayerName = nodes[i + 1].id;
    //
    // // retrieve layer name without sublayer index
    // let currLayerName = currSublayerName.substr(
    //   0,
    //   currSublayerName.lastIndexOf('-')
    // );
    // let nextLayerName = nextSublayerName.substr(
    //   0,
    //   nextSublayerName.lastIndexOf('-')
    // );

    // // create links between sublayers that belong to the same layer
    // if (currLayerName === nextLayerName) {
    //   links.push({ source: currSublayerName, target: nextSublayerName });
    // }
  }
  return links;
};

export const destroy = el => {
  select(el)
    .selectAll('g')
    .remove();
};

// got from http://bl.ocks.org/pbellon/4b875d2ab7019c0029b636523b34e074
// inspired from http://bl.ocks.org/larsenmtl/39a028da44db9e8daf14578cb354b5cb
function forceCollidePolygon (polygon, radius) {
  var nodes,
    n,
    iterations = 1,
    max = Math.max,
    min = Math.min;
  var absub = function (a, b) {
    return max(a, b) - min(a, b);
  };
  var center = polygonCentroid(polygon);

  // took from d3-force/src/collide.js
  if (typeof radius !== 'function') {
    radius = constant(radius == null ? 1 : +radius);
  }

  // took from d3-force/src/constant.js
  function constant (x) {
    return function () {
      return x;
    };
  }
  // took from d3-force/src/jiggle.js
  function jiggle () {
    return (Math.random() - 0.5) * 1e-6;
  }

  // adapted from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
  function intersection (p0, p1, p2, p3) {
    var s1 = [p1[0] - p0[0], p1[1] - p0[1]];
    var s2 = [p3[0] - p2[0], p3[1] - p2[1]];
    // intersection compute
    var s, t;
    s = -s1[1] * (p0[0] - p2[0]) + s1[0] * (p0[1] - p3[1]);
    t = s2[0] * (p0[1] - p2[1]) - s2[1] * (p0[0] - p3[0]);
    s = s / (-s2[0] * s1[1] + s1[0] * s2[1]);
    t = t / (-s2[0] * s1[1] + s1[0] * s2[1]);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      // intersection coordinates
      return {
        x: p0[0] + t * s1[0],
        y: p0[1] + t * s1[1]
      };
    }
    return false;
  }

  function force () {
    for (var l = 0; l < iterations; l++) {
      for (var k = 0; k < nodes.length; k++) {
        var node = nodes[k];
        var r = radius(node);
        var px = node.x >= center[0] ? 1 : -1;
        var py = node.y >= center[1] ? 1 : -1;

        var t = [node.x + px * r, node.y + py * r];

        // we loop over polygon's edges to check collisions
        for (var j = 0; j < polygon.length; j++) {
          var n = j + 1 < polygon.length ? j + 1 : 0;
          var p1 = polygon[j];
          var p2 = polygon[n];
          var i = intersection(p1, p2, center, t);
          if (i) {
            // give a small velocity at the opposite of the collision point
            // this can be tweaked
            node.vx = -px / Math.sqrt(absub(i.x, t[0]) + jiggle());
            node.vy = -py / Math.sqrt(absub(i.y, t[1]) + jiggle());
            break;
          }
        }
      }
    }
  }
}

// This is the first create node func from when we didnt use "subarea" property.

// const createNodes = (subareas, xScale, yScale) => {
//   const nodes = [];
//   subareas.forEach(sub => {
//     // create a polygon on the format [[x,y],[x,y],...]
//     let pol = [];
//     sub.points.forEach(p => pol.push([p.x, p.y0]));
//     for (let i = sub.points.length - 1; i >= 0; i--) {
//       pol.push([sub.points[i].x, sub.points[i].y1]);
//     }
//
//     // calculate center
//     let center = polygonCentroid(pol);
//
//     // if center cannot be found, skip this sublayer. Its probably too small
//     if (!isFinite(center[0]) || !isFinite(center[1])) {
//       return;
//     }
//
//     let x = xScale(isFinite(center[0]) ? center[0] : sub.points[0].x);
//     let y = yScale(isFinite(center[1]) ? center[1] : sub.points[0].y0);
//
//     // calculate width and height
//     // assuming points are given from left to right
//     const width = sub.points[sub.points.length - 1].x - sub.points[0].x;
//     const height =
//       sub.points[Math.floor(sub.points.length / 2)].y1 -
//       sub.points[Math.floor(sub.points.length / 2)].y0; // jalla
//
//     // console.log(width.toString() + '    ' + height.toString());
//
//     // let radius be half of the largest of width and height
//     let r = Math.max(width, height) / 2;
//
//     nodes.push({
//       id: sub.id,
//       x: x,
//       y: y,
//       startX: x,
//       startY: y,
//       points: sub.points,
//       fill: sub.fill,
//       r: r,
//       pol: pol
//     });
//   });
//   return nodes;
// };
