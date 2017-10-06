import React from 'react';
import { string, node } from 'prop-types';
import { Typ20 as Text } from './elements';

function Typ20 ({ children, className }) {
  return <Text className={className}>{children}</Text>;
}

Typ20.propTypes = {
  className: string,
  children: node
};

export default Typ20;
