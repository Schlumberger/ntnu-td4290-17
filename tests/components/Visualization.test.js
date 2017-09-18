import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { expect } from 'chai';

import Viz from 'components/Visualization';

const layers = [
  {
    id: 'foo',
    points: [{ x: 4, y: 4, minAge: 2, maxAge: 3 }],
    fill: 'green',
    stroke: 'red',
    geometryType: 'area'
  }
];

const faults = [
  {
    id: 'bar',
    points: [{ x: 4, y: 4 }],
    fill: 'none',
    stroke: 'black',
    geometryType: 'line'
  }
];

describe('<Visualization />', () => {
  it('Should add a svg-element', () => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz data={{}} />
      </Container>
    );
    expect(wrapper.find('svg')).to.have.length(1);
  });
  it('Should update and unmount', done => {
    const data = {
      groups: { layers, faults },
      yAxisUnit: 'depth',
      maxWidth: 100,
      maxHeight: 100
    };
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz data={data} />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
  it('Should update and unmount with yAxisUnit age', done => {
    const data = {
      groups: { layers, faults },
      yAxisUnit: 'age',
      maxWidth: 100,
      maxHeight: 100
    };
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz data={data} />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
});
