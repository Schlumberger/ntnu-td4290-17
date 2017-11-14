import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { expect } from 'chai';
import sinon from 'sinon';

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
        <Viz
          layers={[]}
          faults={[]}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          diagramOption={'age'}
        />
      </Container>
    );
    expect(wrapper.find('svg')).to.have.length(1);
  });
  it('Should update and unmount', done => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz
          layers={layers}
          faults={faults}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          diagramOption={'depth'}
        />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
  it('Should update and unmount with yAxisUnit age', done => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz
          layers={[]}
          faults={[]}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          diagramOption={'age'}
        />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
  it('Should update and unmount with crazy diagram', done => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz
          faults={[]}
          layers={[]}
          subareas={[
            {
              type: 'surface',
              subareas: [
                { center: { x: 1, y: 2 }, points: [{ x: 1, y: 1 }] },
                { center: { x: 1, y: 2 }, points: [{ x: 1, y: 1 }] }
              ]
            }
          ]}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          diagramOption={'force'}
        />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
  it('Should trigger on empty layer click', done => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz
          layers={layers}
          faults={faults}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          diagramOption={'age'}
          onEmptyClicked={spy}
        />
      </Container>
    );

    wrapper
      .find('div')
      .first()
      .simulate('click');

    expect(spy).to.have.property('callCount', 1);
    done();
  });
});
