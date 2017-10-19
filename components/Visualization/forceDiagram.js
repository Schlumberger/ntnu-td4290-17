import { select, event } from 'd3-selection';
import {} from 'd3-transition';
import { line, area, circle, curveBasis } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import {
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide
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
    faults = [],
    layers = [],
    intsctns = [],
    subareas = [],
    dimentions = { maxWidth: 0, maxHeight: 0 },
    diagramOption = 'depth',
    onLayerClicked
  } = props;

  console.log(props);
  console.log(width.toString() + '  ' + height.toString());

  // try to push a sublayer to the right
  // if (subareas.length >= 1) {
  //   for (let i = 0; i < 10; i++) {
  //     subareas[i].points.forEach(p => {
  //       console.log(p);
  //       return (p.y1 *= 0.5);
  //     });
  //   }
  // }

  // // Coverts coordinates to d-attribute
  // const lineGenerator = line()
  //   .x(d => xScale(d.x))
  //   .y(d => yScale(d.y));

  const areaGenerator = area()
    .x(d => xScale(d.x))
    .y0(d => yScale(d.y0))
    .y1(d => yScale(d.y1))
    // makes interpolate of the form curveCardinal
    .curve(curveBasis);

  // const areaGeneratorWithOrigin = (ox, oy, points) => {
  //   return areaGenerator(
  //     points.map(p => {
  //       return { x: p.x + ox, y0: p.y0 + oy, y1: p.y1 + oy };
  //     })
  //   );
  // };

  // const generators = {
  //   line: lineGenerator,
  //   area: areaGenerator
  // };

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

  // create links
  const links = createLinksByNodes(nodes);

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
    // update nodes
    node.attr('cx', d => d.x).attr('cy', d => d.y);

    enterSubareas.attr('transform', d => {
      // console.log(d);
      return 'translate(' + (d.x - d.startX) + ',' + (d.y - d.startY) + ')';
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
  return (
    forceSimulation(nodes)
      .alphaDecay(0) // simulation will never stop
      .force(
        'link',
        forceLink(links)
          .id(d => d.id)
          // .distance(d => d.source.r + d.target.r) // to make nodes not collide
          .strength(d => 0.05)
      )
      .force('bounding', d => forceCollide().radius(d => d.r))
      // .force('bounding', forceCollide().radius(d => d.r))
      .on('tick', tickFunc)
  );
};

const createNodes = (subareas, xScale, yScale) => {
  const nodes = [];
  subareas.forEach(sub => {
    // create a polygon on the format [[x,y],[x,y],...]
    let pol = [];
    sub.points.forEach(p => pol.push([p.x, p.y0]));
    for (let i = sub.points.length - 1; i >= 0; i--) {
      pol.push([sub.points[i].x, sub.points[i].y1]);
    }

    // calculate center
    let center = polygonCentroid(pol);

    // if center cannot be found, skip this sublayer. Its probably too small
    if (!isFinite(center[0]) || !isFinite(center[1])) {
      return;
    }

    let x = xScale(isFinite(center[0]) ? center[0] : sub.points[0].x);
    let y = yScale(isFinite(center[1]) ? center[1] : sub.points[0].y0);

    // calculate width and height
    // assuming points are given from left to right
    const width = sub.points[sub.points.length - 1].x - sub.points[0].x;
    const height =
      sub.points[Math.floor(sub.points.length / 2)].y1 -
      sub.points[Math.floor(sub.points.length / 2)].y0; // jalla

    // console.log(width.toString() + '    ' + height.toString());

    // let radius be half of the largest of width and height
    let r = Math.max(width, height) / 2;

    nodes.push({
      id: sub.id,
      x: x,
      y: y,
      startX: x,
      startY: y,
      points: sub.points,
      fill: sub.fill,
      r: r,
      pol: pol
    });
  });
  return nodes;
};

const createLinksByNodes = nodes => {
  const links = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    let currSublayerName = nodes[i].id;
    let nextSublayerName = nodes[i + 1].id;

    // retrieve layer name without sublayer index
    let currLayerName = currSublayerName.substr(
      0,
      currSublayerName.lastIndexOf('-')
    );
    let nextLayerName = nextSublayerName.substr(
      0,
      nextSublayerName.lastIndexOf('-')
    );

    // create links between sublayers that belong to the same layer
    if (currLayerName === nextLayerName) {
      links.push({ source: currSublayerName, target: nextSublayerName });
    }
  }
  return links;
};

export const destroy = el => {
  select(el)
    .selectAll('g')
    .remove();
  // select(el)
  //   .selectAll('path')
  //   .remove();
  // select(el)
  //   .selectAll('.node')
  //   .remove();
  // select(el)
  //   .selectAll('.link')
  //   .remove();
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
