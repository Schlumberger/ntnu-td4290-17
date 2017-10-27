import React from 'react';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { mount } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon';

import ImmersiveBar from 'client/App/ImmersiveBar';
import ImmersiveButton from 'components/ImmersiveButton';

describe('<ImmersiveBar />', () => {
  it('Should exist', () => {
    const wrapper = mount(
      <Container controller={Controller()}>
        <ImmersiveBar />
      </Container>
    );
    expect(wrapper).to.exist;
  });
  it('Should add correct amount of buttons', () => {
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            settings: {
              visibility: {
                foo: true,
                bar: true,
                baz: true
              }
            }
          }
        })}
      >
        <ImmersiveBar />
      </Container>
    );

    expect(wrapper.find(ImmersiveButton)).to.have.length(5);
  });
  it('Should trigger yAxisOptionClicked for each button', () => {
    const yAxisOptionClicked = sinon.spy();
    const layerSettingClicked = sinon.spy();
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            settings: {
              visibility: {
                foo: true,
                bar: true,
                baz: true
              }
            }
          },
          modules: {
            app: {
              signals: {
                yAxisOptionClicked,
                layerSettingClicked
              }
            }
          }
        })}
      >
        <ImmersiveBar />
      </Container>
    );

    wrapper.find(ImmersiveButton).forEach(el => el.simulate('click'));

    expect(yAxisOptionClicked).to.have.property('callCount', 2);
    expect(layerSettingClicked).to.have.property('callCount', 3);
  });
});
