import React from 'react';
import { Wrapper, ActiveText, InactiveText } from './elements';

export default function LayerButton({
  className,
  children,
  inactive,
  onClick
}) {
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
