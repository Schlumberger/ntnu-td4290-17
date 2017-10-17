import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { line } from 'd3-shape';
import { scaleLinear, scalePow } from 'd3-scale';
import {
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide
} from 'd3-force';
import { drag } from 'd3-drag';

const animDuration = 300;

const margins = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15
};
export const create = (el, props, state) => {
  const svg = select(el);

  update(el, props, state);
};

export const update = (el, props, state) => {
  const { data = [] } = props;
  const { width, height } = state;

  //Find maxWidth
  const maxWidth = 100 * 4; //times 4 to make the figures smaller

  //Find maxHeight
  const maxHeight = 100 * 4;

  //position scale
  const xScale = scaleLinear()
    .domain([0, maxWidth])
    .range([0, width]);
  const yScale = scaleLinear()
    .domain([0, maxHeight])
    .range([0, height]);

  //color scale
  const colorScale = scaleLinear()
    .domain([0, maxWidth])
    .range(['red', 'white', 'green']);

  //Coverts coordinates to d-attribute
  // const lineGenerator = line()
  //   .x(d => xScale(d.x))
  //   .y(d => yScale(d.y));

  // Select the svg
  const svg = select(el)
    .attr('width', width)
    .attr('height', height);

  // const node1 = svg.append('node');
  // const node2 = svg.append('node');

  // //create a circle to be drawn
  // const circ1 = node1.append('circle');
  // const circ2 = node2.append('circle');
  //
  // //add some properties to the circle
  // circ1
  //   .attr('cx', 50)
  //   .attr('cy', 50)
  //   .attr('r', 20)
  //   .attr('fill', 'green')
  //   .attr('class', 'circNode');
  //
  // circ2
  //   .attr('cx', 150)
  //   .attr('cy', 50)
  //   .attr('r', 15)
  //   .attr('fill', 'red')
  //   .attr('class', 'circNode');

  //nodes as an array of objects with node names
  // var nodes = [
  //   { id: 'circ1', x: 50, y: 50, r: 30 },
  //   { id: 'circ2', x: 200, y: 50, r: 40 },
  //   { id: 'circ3', x: 200, y: 200, r: 20 }
  // ];
  var nodes = [];

  //generate random nodes
  for (let i = 0; i < 10; i++) {
    let sx = Math.random() * width;
    let sy = Math.random() * height;
    let r = Math.random() * 40 + 10;

    nodes.push({ id: 'circ' + i, x: sx, y: sy, r: r });
  }

  console.log(nodes);

  //force links
  // const links = [
  //   { source: 'circ1', target: 'circ2', strength: 0.2 },
  //   { source: 'circ1', target: 'circ3', strength: 0.05 }
  // ];

  var links = [];

  //create links by nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() < 0.6) continue;

      let s = nodes[i];
      let t = nodes[j];
      let strength = Math.random() * 0.01;

      links.push({ source: s, target: t, strength: strength });
    }
  }

  //apply force layout
  var simulation = forceSimulation(nodes)
    .alphaDecay(0)
    .force(
      'link',
      forceLink(links)
        .id(d => d.id)
        .distance(d => d.source.r + d.target.r) //to make nodes not collide
        .strength(d => d.strength)
    )
    .force('bounding', forceCollide().radius(d => d.r))
    .on('tick', tickFunc);
  //.force('center', forceCenter([120, 120]));

  console.log(links);

  var link = svg
    .selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', '#999')
    .attr('stroke-width', '1.5px');

  //generate a node element per node in the simulation for visualization
  var node = svg
    .selectAll('.node')
    .data(simulation.nodes()) //add
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', d => d.r) //radius of circle
    .attr('fill', 'red')
    .call(
      drag()
        //.subject(d => simulation.find(event.x, event.y))
        //.on('start', dragstarted)
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)

      //.on('end', dragended)
    );
  // .call(
  //   drag()
  //     //.subject(() => simulation.find(event.x, event.y))
  //     .on('drag', dragged)
  // );

  function tickFunc(e) {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node.attr('cx', d => d.x).attr('cy', d => d.y);
  }

  function dragstarted(d) {
    select(this)
      .raise()
      .classed('active', true);
  }

  function dragged(d) {
    select(this)
      .attr('cx', (d.x = event.x))
      .attr('cy', (d.y = event.y));
  }

  function dragended(d) {
    select(this).classed('active', false);
  }

  // const dragged = elem => {
  //   console.log(elem);
  //   d3
  //     .select(this)
  //     .attr('cx', (d.x = d3.event.x))
  //     .attr('cy', (d.y = d3.event.y));
  //
  //   // subject.x += event.dx;
  //   // subject.y += event.dy;
  //   //event.subject.x = event.x;
  //   //node.attr('cx', d => d.x).attr('cy', d => d.y);
  // };
};

export const destroy = el => {
  select(el)
    .selectAll('path')
    .remove();
};
