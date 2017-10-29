import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';

import ImmersiveButton from 'components/ImmersiveButton';

describe('<ImmersiveButton />', () => {
  it('Should exist', () => {
    const wrapper = shallow(
      <ImmersiveButton
        children={'testing'}
        inactive
        onClick={() => {
          return true;
        }}
      />
    );
  });
});
