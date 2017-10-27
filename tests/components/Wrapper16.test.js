import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';

import Wrapper16 from 'components/Wrapper16';

describe('<Wrapper16 />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<Wrapper16 />);
    expect(wrapper).to.exist;
  });
});
