import React from 'react';
import { Container } from '@cerebral/react';
import { Controller } from 'cerebral';
import { mount } from 'enzyme';
import { assert, expect } from 'chai';
<<<<<<< HEAD
import { Controller } from 'cerebral';
import { Container } from '@cerebral/react';
=======
import sinon from 'sinon';
>>>>>>> f5d2f16d62004b5820980a18c8d972720f6986a9

import ImmersiveBar from 'client/App/ImmersiveBar';
import ImmersiveButton from 'components/ImmersiveButton';

describe('<ImmersiveBar />', () => {
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
<<<<<<< HEAD
      <Container controller={controller}>
=======
      <Container controller={Controller()}>
>>>>>>> f5d2f16d62004b5820980a18c8d972720f6986a9
        <ImmersiveBar />
      </Container>
    );
    expect(wrapper).to.exist;
<<<<<<< HEAD
=======
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
>>>>>>> f5d2f16d62004b5820980a18c8d972720f6986a9
  });
});
