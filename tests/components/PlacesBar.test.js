import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { assert, expect } from 'chai';

import PlacesBar from 'components/PlacesBar';

const places = [
  {
  "id" : "loppa-high",
  "text" : "Loppa High",
  "x" : 235250
  }
];

describe('<PlacesBar />', () => {
  it('Should exist', () => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <PlacesBar
          places={places}
          dimensions={{ maxWidth: 10 }}
        />
      </Container>
    );
    expect(wrapper).to.exist;
  });
  it('Should update and unmount', done => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <PlacesBar
          places={places}
          dimensions={{ maxWidth: 10 }}
        />
      </Container>
    );
    wrapper.update();
    wrapper.unmount();
    done();
  });
});
