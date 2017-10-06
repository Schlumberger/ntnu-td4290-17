import React from 'react';
import { string, node } from 'prop-types';
import { Typ16 as Text } from './elements';

function Typ16 ({ children, className }) {
  return <Text className={className}>{children}</Text>;
}

Typ16.propTypes = {
  className: string,
  children: node
};

export default Typ16;
