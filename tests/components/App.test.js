import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { assert, expect } from 'chai';
import sinon from 'sinon';

import App from 'client/App';
import { ButtonWrapper } from 'client/App/elements';

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
  it('Should trigger login with no user', () => {
    const routed = sinon.spy();
    const wrapper = mount(
      <Container
        controller={Controller({
          modules: {
            app: {
              signals: {
                routed
              }
            }
          }
        })}
      >
        <App />
      </Container>
    );

    wrapper.find(ButtonWrapper).simulate('click');
    expect(routed).to.have.property('callCount', 1);
  });
});
