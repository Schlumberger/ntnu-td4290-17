import React from "react";
import { shallow } from "enzyme";
import { assert, expect } from "chai";

import LayerButton from "components/LayerButton";

describe("<LayerButton />", () => {
  it("Should exist", () => {
    const wrapper = shallow(
      <LayerButton
        children={"testing"}
        inactive
        onClick={() => {
          return true;
        }}
      />
    );
    expect(wrapper).to.exist;
  });
  it("Should exist when inactive", () => {
    const wrapper = shallow(<LayerButton children={"testing"} />);
    expect(wrapper).to.exist;
  });
  it("Should exist when inactive and shown", () => {
    const wrapper = shallow(<LayerButton children={"testing"} show />);
    expect(wrapper).to.exist;
  });
});
