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

const subareas = [
  {
    id: 'foo',
    category: 'quaternary',
    points: [],
    fill: 'green',
    stroke: 'red',
    maxAge: 2.5,
    minAge: 0,
    geometryType: 'area',
    type: 'surface',
    unconform: true,
    subareas: [
      {
        id: 'subbar',
        order: 0,
        area: 2087255120,
        length: 559293.5037123569,
        center: { x: 94543.92202366833, y: 7607.731038803488 },
        points: [{ x: 4, y0: 30, y1: 65, height: 35 }],
        links: {
          subfoo: { x: 105397.13110209153, y: 37594.71386452252 }
        },
        scaledStartPos: { x: 211.08022607079982, y: 56.467554088731376 },
        type: 'surface',
        maxAge: 2.5,
        minAge: 0,
        fill: 'blue',
        stroke: 'yellow',
        geometryType: 'area'
      },
      {
        id: 'subfoo',
        order: 0,
        area: 78186948.01925647,
        length: 559293.5037123569,
        center: { x: 94543.92202366833, y: 7607.731038803488 },
        points: [{ x: 4, y0: 30, y1: 65, height: 35 }],
        links: {},
        scaledStartPos: { x: 211.08022607079982, y: 56.467554088731376 },
        type: 'surface',
        maxAge: 2.5,
        minAge: 0,
        fill: 'blue',
        stroke: 'yellow',
        geometryType: 'area'
      }
    ]
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
  it('Should trigger on empty layer click', done => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Container controller={Controller()}>
        <Viz
          layers={layers}
          faults={faults}
          dimentions={{ maxWidth: 5, maxHeight: 5 }}
          yAxisUnit={'age'}
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

  it('Should be able to change to forceLayout and not break', done => {
    // const vizElem = (
    //   <Viz
    //     layers={[]}
    //     faults={[]}
    //     subareas={subareas}
    //     dimentions={{ maxWidth: 5, maxHeight: 5 }}
    //     diagramOption={'depth'}
    //   />
    // );

    const wrapper = mount(
      <Viz
        layers={[]}
        faults={[]}
        subareas={subareas}
        dimentions={{ maxWidth: 5, maxHeight: 5 }}
        diagramOption={'depth'}
      />
    );
    wrapper.update();

    // switch to force layout
    wrapper.setProps({ diagramOption: 'force' });
    wrapper.update();

    // switch back
    wrapper.setProps({ diagramOption: 'depth' });
    wrapper.update();

    wrapper.unmount();
    done();
  });
});
