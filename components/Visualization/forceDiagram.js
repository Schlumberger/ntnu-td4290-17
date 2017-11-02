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

  var svg = select(el);
  // svg.append('g').attr('id', 'layers');
  svg.append('g').attr('id', 'subareas');
  svg.append('g').attr('id', 'nodes');
  svg.append('g').attr('id', 'links');
  // svg.append('g').attr('id', 'faults');
  // svg.append('g').attr('id', 'intersections');

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
  svg = select(el)
    .attr('width', width)
    .attr('height', height);

  // create simualtion nodes
  const nodes = createNodes(subareas, xScale, yScale);

  console.log('nodes', nodes);

  // create simulation links
  const links = createLinksByNodes(nodes, xScale, yScale);

  console.log('links', links);
  console.log(
    'link strengths',
    links.map(d => (d.strength === -1 ? 0.5 : d.strength))
  );

  // console.log(
  //   'subareas skipped: ' + (subareas.length - nodes.length).toString()
  // );

  const updateSubareas = svg
    .select('g#subareas')
    .selectAll('.node')
    .data(nodes, d => d.id);

  // Add new text-elements if nessescary

  const enterSubareas = updateSubareas
    .enter()
    .append('path')
    .attr('opacity', 0)
    .attr('class', 'node')
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
    .transition()
    .duration(300)
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
    .attr('stroke', d => `${d.strength === -1 ? '#999' : '#f00'}`)
    .attr('stroke-width', d => `${d.strength === -1 ? 1 : 0.5}px`)
    .attr('stroke-dasharray', d => `${d.strength === -1 ? 0 : (5, 5)}px`);

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
    .attr('r', -1) // set later
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-width', '0.5px');

  const simTick = e => {
    // update visualized nodes
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r); // setting radius in the createSimulation

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

  el.sim = createSimulation(nodes, links, simTick).stop();

  // lock center node.
  // const centerNode = el.sim.find(width / 2, height / 2); // finds node closest to center
  // centerNode.fx = centerNode.x;
  // centerNode.fy = centerNode.y;

  // find and link edge sublayers to the edge
  const edgeConnectIterations = 10;
  const heightStep = width / edgeConnectIterations;
  const nodesChecked = {};
  for (let i = 0; i < edgeConnectIterations; i++) {
    const y = heightStep * i;
    // check nodes in left edge
    let node = el.sim.find(0, y);
    if (!nodesChecked.hasOwnProperty(node)) {
      nodesChecked.node = true;
      node.fx = node.x;
      node.fy = node.y;
    }
    // check nodes on right
    node = el.sim.find(width, y);
    if (!nodesChecked.hasOwnProperty(node)) {
      nodesChecked.node = true;
      node.fx = node.x;
      node.fy = node.y;
    }
  }

  simTick(); // visualize nodes and links

  setTimeout(() => {
    // legges til super elementet, kanskje ikke optimalt
    el.sim.restart();
  }, 2000);

  update(el, props, state);
};

export const update = (el, props, state) => {
  // const { width, height } = state;
  // const {
  //   // faults = [],
  //   // layers = [],
  //   // intsctns = [],
  //   subareas = [],
  //   dimentions = { maxWidth: 0, maxHeight: 0 },
  //   diagramOption = 'depth',
  //   onLayerClicked
  // } = props;
};

export const destroy = el => {
  select(el)
    .selectAll('g')
    .remove();

  // remove last simulation if exists
  el.sim.stop();
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
    .range([10, 100]);

  // create a scale mapping from area to force distance
  const areaForceDistScale = scaleLinear()
    .domain([minArea, maxArea])
    .range([300, 1000]);

  const areaRadiusScale = scaleLinear()
    .domain([minArea, maxArea])
    .range([20, 80]);

  const sim = forceSimulation(nodes)
    .alphaDecay(0.001) // simulation will never stop
    // .force('bounding', d => forceCollide().radius(d => d.r))
    // .force('bounding', forceCollide().radius(d => d.r))
    .force(
      'collision',
      forceCollide().radius(d => {
        d.r = areaRadiusScale(d.area); // setting radius here, not good
        return d.r;
      })
    )
    // simulate a collision force
    // .force(
    //   'repulse by area size',
    //   forceManyBody()
    //     .strength(d => {
    //       const f = areaForceScale(d.area); // negative to repel
    //       // console.log(f);
    //       return -f;
    //     })
    //     .distanceMax(d => areaForceDistScale(d))
    // )
    .force(
      'link',
      forceLink(links)
        .id(d => d.id)
        .distance(d => d.prefDist) // to make nodes attract each other to a prefferred distance
        .strength(d => (d.strength === -1 ? 0.5 : d.strength))
    )
    .on('tick', tickFunc);

  return sim;
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
  const links = createSublayerConnectorLinksByNodes(
    nodes,
    xScale,
    yScale
  ).concat(createOntopLinksByNodes(nodes, xScale, yScale));

  return links;
};

// Creates links between "neighbouring" sublayers that belong to the same layer.
// Neighbouring sublayers doesnt need to be intersecting
const createSublayerConnectorLinksByNodes = (nodes, xScale, yScale) => {
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

      links.push(createLink(srcN.id, tarN.id, distBetween, -1));

      nodeCategories[currNode.category].unshift(currNode);
    } else {
      nodeCategories[currNode.category] = [currNode];
    }
  }
  return links;
};

// Create links based on precomputed information about what sublayers are on top of this one
const createOntopLinksByNodes = (nodes, xScale, yScale) => {
  const links = [];

  nodes.forEach(n => {
    // only look at nodes that has links to other nodes ontop
    if (!n.hasOwnProperty('links')) return;

    for (let l in n.links) {
      // check if the property/key is defined in the object itself, not in parent

      const srcN = n;
      // find the node by name
      let tarN = null;
      for (let i in nodes) {
        if (nodes[i].id === l) {
          // console.log('node to be linked');
          // console.log(nodes[i].id);
          // console.log(l);

          tarN = nodes[i];
          break;
        }
      }

      // if (tarN === null) {
      //   console.log('didnt find target node of ontop link');
      // }
      // console.log(tarN);

      // calculate the preferred distance between the layers

      // find max height of the two nodes
      const srcHeight = srcN.points.reduce(
        (acc, p) => Math.max(acc, p.y1 - p.y0),
        // p.hasOwnProperty('height') ? Math.max(acc, p.height) : acc,
        0
      ); // srcN.points[srcN.points.length - 1].x - srcN.points[0].x;
      const tarHeight = tarN.points.reduce(
        (acc, p) => Math.max(acc, p.y1 - p.y0),
        // p.hasOwnProperty('height') ? Math.max(acc, p.height) : acc,
        0
      );
      const heightBetween = xScale(Math.abs(srcHeight * 0.5 + tarHeight * 0.5));

      // remove links that are between layers far apart (shouldnt be necessary if ontop layers are calculated correctly)
      // if (Math.abs(tarN.y - srcN.y) > heightBetween * 2) {
      //   break;
      // }

      const lin = createLink(n.id, l, heightBetween, 0.1);
      // console.log(lin);
      links.push(lin);
    }
  });

  return links;
};

const createLink = (src, tar, dist, strength) => {
  return {
    source: src,
    target: tar,
    prefDist: dist,
    strength: strength
  };
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
