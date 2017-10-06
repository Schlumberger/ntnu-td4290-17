import React from 'react';
import { string, node, func } from 'prop-types';
import { Wrapper } from './elements';

function Wrapper16A ({ className, children, onClick }) {
  return (
    <Wrapper className={className} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

Wrapper16A.propTypes = {
  className: string,
  children: node,
  onClick: func
};

export default Wrapper16A;
