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
        <InfoBox info={emptyInfo} />
      </Container>
    );
    expect(wrapper).to.exist;
  });
  it('Should update', done => {
    const testInfo = [
      {
        id: 'Test',
        minAge: 2,
        maxAge: 3
      }
    ];
    const wrapper = mount(
      <Container controller={Controller()}>
        <InfoBox info={testInfo} color="black" visible="true" />
      </Container>
    );
    wrapper.update();
    done();
  });
});
