import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { expect } from 'chai';

import Viz from 'components/Visualization';

describe('<Visualization />', () => {
  it('Should add a svg-element', () => {
    const controller = Controller({
      state: {
        foo: 'bar'
      }
    });
    const wrapper = mount(
      <Container controller={controller}>
        <Viz data={{}} />
      </Container>
    );
    expect(wrapper.find('svg')).to.have.length(1);
  });
});
