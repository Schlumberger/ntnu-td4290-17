import { select, event } from 'd3-selection';
import {} from 'd3-transition';
import { area, curveBasis } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { forceSimulation, forceLink, forceManyBody } from 'd3-force';

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
    onLayerClicked
  } = props;

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

  // create simulation links
  const links = createLinksByNodes(nodes, xScale, yScale);

  const updateSubareas = svg
    .select('g#subareas')
    .selectAll('.node')
    .data(nodes, d => d.id);

  // Add new text-elements if nessescary

  const enterSubareas = updateSubareas
    .enter()
    .append('path')
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

  // ________________REMOVE TO PLAY SIMULATION
  // sim.stop();
  // simTick(null); // to actually draw links
  // _________________
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
            // console.log(f);
            return -f;
          })
          .distanceMax(d => areaForceDistScale(d))
      )
      .force(
        'link',
        forceLink(links)
          .id(d => d.id)
          .distance(d => d.prefDist) // to make nodes attract each other to a prefferred distance
          .strength(d => (d.strength === -1 ? 0.3 : d.strength))
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

      // links.push({
      //   source: srcN.id,
      //   target: tarN.id,
      //   prefDist: heightBetween
      // });

      const lin = createLink(n.id, l, heightBetween, 0.0);
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

export const destroy = el => {
  select(el)
    .selectAll('g')
    .remove();
};
