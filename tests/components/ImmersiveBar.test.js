import React from 'react';
import { mount } from 'enzyme';
import { assert, expect } from 'chai';
import { Controller } from 'cerebral';
import { Container } from '@cerebral/react';

import ImmersiveBar from 'client/App/ImmersiveBar';

/* describe('<ImmersiveBar />', () => {
  it('Should exist', () => {
    const controller = Controller({
      state: {
        setting: {
          visibility: {
            inspector: true,
            layers: false,
            faults: true
          }
        }
      }
    });
    const wrapper = mount(
      <Container controller={controller}>
        <ImmersiveBar />
      </Container>
    );
    expect(wrapper).to.exist;
  });
});
*/
