import React from "react";
import { mount } from "enzyme";
import { assert, expect } from "chai";
import { Controller } from "cerebral";
import { Container } from "@cerebral/react";
import sinon from "sinon";

import ImmersiveBar from "client/App/ImmersiveBar";
import ImmersiveButton from "components/ImmersiveButton";
import LayerButton from "components/LayerButton";

describe("<ImmersiveBar />", () => {
  it("Should exist", () => {
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

  it("Should add correct amount of ImmersiveButtons", () => {
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
    expect(wrapper.find(ImmersiveButton)).to.have.length(2);
  });
  it("Should add correct amount of LayerButtons", () => {
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
    expect(wrapper.find(LayerButton)).to.have.length(3);
  });
  it("Should trigger yAxisOptionClicked for each button with age", () => {
    const diagramOptionClicked = sinon.spy();
    const layerSettingClicked = sinon.spy();
    const faultSettingClicked = sinon.spy();
    const inspectorSettingClicked = sinon.spy();
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            settings: {
              diagramOption: "age",
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
                diagramOptionClicked,
                layerSettingClicked,
                faultSettingClicked,
                inspectorSettingClicked
              }
            }
          }
        })}
      >
        <ImmersiveBar />
      </Container>
    );

    wrapper.find(ImmersiveButton).forEach(el => el.simulate("click"));
    wrapper.find(LayerButton).forEach(el => el.simulate("click"));

    expect(diagramOptionClicked).to.have.property("callCount", 2);
    expect(layerSettingClicked).to.have.property("callCount", 1);
    expect(faultSettingClicked).to.have.property("callCount", 1);
    expect(inspectorSettingClicked).to.have.property("callCount", 1);
  });
  it("Should trigger yAxisOptionClicked for each button with age", () => {
    const diagramOptionClicked = sinon.spy();
    const layerSettingClicked = sinon.spy();
    const faultSettingClicked = sinon.spy();
    const inspectorSettingClicked = sinon.spy();
    const wrapper = mount(
      <Container
        controller={Controller({
          state: {
            settings: {
              diagramOption: "depth",
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
                diagramOptionClicked,
                layerSettingClicked,
                faultSettingClicked,
                inspectorSettingClicked
              }
            }
          }
        })}
      >
        <ImmersiveBar />
      </Container>
    );

    wrapper.find(ImmersiveButton).forEach(el => el.simulate("click"));
    wrapper.find(LayerButton).forEach(el => el.simulate("click"));

    expect(diagramOptionClicked).to.have.property("callCount", 2);
    expect(layerSettingClicked).to.have.property("callCount", 1);
    expect(faultSettingClicked).to.have.property("callCount", 1);
    expect(inspectorSettingClicked).to.have.property("callCount", 1);
  });
});
