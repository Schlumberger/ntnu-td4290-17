import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { line } from 'd3-shape';
import { scaleLinear, scalePow } from 'd3-scale';

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
  const maxWidth = 100;

  //Find maxHeight
  const maxHeight = 100;

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
  const lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  // Select the svg
  const svg = select(el)
    .attr('width', width)
    .attr('height', height);

  // Bind the data to the 'text'-elements
  const update = svg.selectAll('path').data(data);

  // Add new text-elements if nessescary
  const enter = update.enter().append('path');

  // Remove if too many
  const exit = update.exit().remove();

  // Update the properties of all elements
  update
    .merge(enter)
    .transition()
    .duration(animDuration)
    .attr('d', d => lineGenerator(d.points))
    .attr(
      'fill',
      d => colorScale(Math.random() * 100) //d.points.map(p => p.x * 0.25).reduce((a, b) => a + b, 0))
    )
    .attr('stroke', 'black')
    .attr('stroke-width', '2px');
};

export const destroy = el => {
  select(el)
    .selectAll('path')
    .remove();
};
