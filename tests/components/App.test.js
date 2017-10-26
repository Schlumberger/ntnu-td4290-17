import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { assert, expect } from 'chai';

import App from 'client/App';

describe('<App />', () => {
  it('Should exist', () => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <App />
      </Container>
    );
    expect(wrapper).to.exist;
  });
  it('Should exist with user', () => {
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            app: {
              user: true
            }
          }
        })}
      >
        <App />
      </Container>
    );
    expect(wrapper).to.exist;
  });
});
