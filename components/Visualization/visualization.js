import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { line, area } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

const margins = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15
};
export const create = (el, props, state) => {
  const svg = select(el);
  svg.append('g').attr('id', 'layers');
  svg.append('g').attr('id', 'faults');

  update(el, props, state);
};

export const update = (el, props, state) => {
  const { width, height } = state;
  const { maxWidth = 0, maxHeight = 0, groups = {}, yAxisUnit } = props.data;

  //Coverts coordinates to d-attribute
  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  const areaGenerator = area()
    .x(d => xScale(d.x))
    .y0(d => yScale(yAxisUnit === 'depth' ? d.y : d.maxAge))
    .y1(d => yScale(yAxisUnit === 'depth' ? 0 : d.minAge));

  const generators = { line: lineGenerator, area: areaGenerator };

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

  Object.keys(groups).forEach(group => {
    const data = groups[group];

    // Bind the data to the 'text'-elements
    const update = svg
      .select(`g#${group}`)
      .selectAll('path')
      .data(data, d => d.id);

    // Add new text-elements if nessescary
    const enter = update.enter().append('path');

    // Remove if too many
    const exit = update.exit().remove();

    // Update the properties of all elements
    update
      .merge(enter)
      .transition()
      .duration(2000)
      .attr('d', d => generators[d.geometryType](d.points))
      .attr('fill', d => d.fill)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', '2px');
  });
};

export const destroy = el => {
  select(el)
    .selectAll('path')
    .remove();
};
