import React from 'react';
import { string, node, bool, func } from 'prop-types';
import { Wrapper, ActiveText, InactiveText } from './elements';

function LayerButton ({ className, children, inactive, onClick }) {
  const text = inactive ? (
    <InactiveText>{children}</InactiveText>
  ) : (
    <ActiveText>{children}</ActiveText>
  );

  return (
    <Wrapper className={className} onClick={onClick}>
      {text}
    </Wrapper>
  );
}

LayerButton.propTypes = {
  className: string,
  children: node,
  inactive: bool,
  onClick: func
};

export default LayerButton;
