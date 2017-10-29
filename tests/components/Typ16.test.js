import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';

import Typ16 from 'components/Typ16';

describe('<Typ16 />', () => {
  it('Should exist', () => {
    const wrapper = shallow(<Typ16 />);
    expect(wrapper).to.exist;
  });
});
