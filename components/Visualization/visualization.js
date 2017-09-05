import { select } from 'd3-selection';
import { transition } from 'd3-transition';

export const create = (el, props, state) => {
  const svg = select(el);

  update(el, props, state);
};

export const update = (el, props, state) => {
  const { data } = props;
  const { width, height } = state;

  // Select the svg
  const svg = select(el);

  // Bind the data to the 'text'-elements
  const update = svg.selectAll('text').data(data);

  // Add new text-elements if nessescary
  const enter = update
    .enter()
    .append('text')
    .attr('font-size', 50)
    .attr('x', width / 2)
    .attr('y', height / 2)
    .text(d => d);

  // Remove if too many
  const exit = update.exit().remove();

  // Update the properties of all elements
  update
    .transition()
    .duration(1000)
    .attr('x', width / 2)
    .attr('y', height / 2)
    .text(d => d);
};

export const destroy = el => {
  select(el)
    .selectAll('text')
    .remove();
};
