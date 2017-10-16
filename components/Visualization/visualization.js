import { select, event } from 'd3-selection';
import {} from 'd3-transition';
import { line, area, curveBasis } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

const margins = {
  top: 35,
  bottom: 0,
  left: 0,
  right: 0
};
export const create = (el, props, state) => {
  const svg = select(el);
  svg.append('g').attr('id', 'layers');
  svg.append('g').attr('id', 'faults');
  svg
    .append('text')
    .attr('id', 'logo')
    .text('SubSee')
    .attr('x', props.dimentions.maxWidth)
    .attr('y', props.dimentions.maxHeight)
    .attr('text-anchor', 'end')
    .attr('font-family', 'Fudd');

  update(el, props, state);
};

export const update = (el, props, state) => {
  const { width, height } = state;
  const {
    faults = [],
    layers = [],
    dimentions = { maxWidth: 0, maxHeight: 0 },
    yAxisUnit = 'depth',
    onLayerClicked
  } = props;

  // Coverts coordinates to d-attribute
  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  const areaGenerator = area()
    .x(d => xScale(d.x))
    .y0(d => yScale(yAxisUnit === 'depth' ? d.y0 : d.age0))
    .y1(d => yScale(yAxisUnit === 'depth' ? d.y1 : d.age1))
    //makes interpolate of the form curveCardinal
    .curve(curveBasis);

  const generators = {
    line: lineGenerator,
    area: areaGenerator
  };

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

  // Bind the data to the 'text'-elements
  const updateFaults = svg
    .select('g#faults')
    .selectAll('path')
    .data(faults, d => d.id);

  const updateLayers = svg
    .select('g#layers')
    .selectAll('path')
    .data(layers, d => d.id);

  // Add new text-elements if nessescary
  const enterFaults = updateFaults
    .enter()
    .append('path')
    .attr('opacity', 0);

  const enterLayers = updateLayers
    .enter()
    .append('path')
    .attr('opacity', 0)
    .on('click', (d, ...args) => {
      onLayerClicked({ info: d });
      event.stopPropagation();
    });

  select('text')
    .attr('x', width)
    .attr('y', height);

  // Remove if too many
  updateFaults
    .exit()
    .transition()
    .duration(500)
    .attr('opacity', 0)
    .remove();

  updateLayers
    .exit()
    .transition()
    .duration(500)
    .attr('opacity', 0)
    .remove();

  // Update the properties of all elements
  updateFaults
    .merge(enterFaults)
    .transition()
    .duration(1000)
    .attr('opacity', 1)
    .attr('d', d => generators[d.geometryType](d.points))
    .attr('fill', d => d.fill)
    .attr('stroke', d => d.stroke)
    .attr('stroke-width', '2px');

  updateLayers
    .merge(enterLayers)
    .transition()
    .duration(1000)
    .attr('opacity', 1)
    .attr('d', d => generators[d.geometryType](d.points))
    .attr('fill', d => d.fill)
    .attr('stroke', d => d.stroke)
    .attr('stroke-width', '2px');
};

export const destroy = el => {
  select(el)
    .selectAll('path')
    .remove();
};
