import React from 'react';
import { mount } from 'enzyme';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { assert, expect } from 'chai';

import InfoBox from 'client/App/InfoBox';

describe('InfoBox', () => {
  it('Should exist', () => {
    const emptyInfo = [];
    const wrapper = mount(
      <Container controller={Controller()}>
        <InfoBox />
      </Container>
    );
    expect(wrapper).to.exist;
  });
  it('Should update', done => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <InfoBox />
      </Container>
    );
    wrapper.update();
    done();
  });
  it('Should show info', done => {
    const testInfo = {
      id: 'Test',
      minAge: 2,
      maxAge: 3
    };
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            app: {
              info: {
                id: 'foooo',
                minAge: 3,
                maxAge: 4
              }
            }
          }
        })}
      >
        <InfoBox />
      </Container>
    );
    wrapper.update();
    done();
  });
  it('Should show with inspector', done => {
    const testInfo = {
      id: 'Test',
      minAge: 2,
      maxAge: 3
    };
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            app: {
              info: {
                id: 'foooo',
                minAge: 3,
                maxAge: 4
              }
            },
            settings: {
              visibility: {
                inspector: true
              }
            }
          }
        })}
      >
        <InfoBox />
      </Container>
    );
    done();
  });
});
