import React from 'react';
import { Wrapper, ActiveText, InactiveText } from './elements';

export default function ImmersiveButton({
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
