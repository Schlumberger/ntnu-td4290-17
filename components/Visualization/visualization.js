import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

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
  const maxWidth = Math.max(
    ...data.map(el => Math.max(...el.points.map(p => p.x || 0)))
  );

  //Find maxHeight
  const maxHeight = Math.max(
    ...data.map(el => Math.max(...el.points.map(p => p.y || 0)))
  );

  //Coverts coordinates to d-attribute
  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  // Select how to scale values to x positions
  const xScale = scaleLinear()
    .domain([0, maxWidth])
    .range([margins.left, width - margins.right]);

  // Select how to scale values to y positions
  const yScale = scaleLinear()
    .domain([0, maxHeight])
    .range([margins.top, height - margins.bottom]);

  // Select the svg
  const svg = select(el)
    .attr('width', width)
    .attr('height', height);

  // Bind the data to the 'text'-elements
  const update = svg.selectAll('path').data(data, d => d.id);

  // Add new text-elements if nessescary
  const enter = update.enter().append('path');

  // Remove if too many
  const exit = update.exit().remove();

  // Update the properties of all elements
  update
    .merge(enter)
    .transition()
    .duration(1000)
    .attr('d', d => lineGenerator(d.points))
    .attr('fill', 'none')
    .attr('stroke', d => d.stroke)
    .attr('stroke-width', '2px');
};

export const destroy = el => {
  select(el)
    .selectAll('path')
    .remove();
};
